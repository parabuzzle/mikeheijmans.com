---
title: "Multi-Repo AI Coding: Move the Context to Linear"
image: https://www.mikeheijmans.com/img/postimgs/multi-repo-linear-og.png
date: 2026-07-10 08:00
tags:
  - AI
  - Context Coding
  - Artificial Intelligence
  - Development
  - Agents
  - Linear
toc: >
  - Multi-Repo AI Coding: Move the Context to Linear
    - [Where In-Repo Context Breaks Down](#where-in-repo-context-breaks-down)
    - [Moving the Context to Linear](#moving-the-context-to-linear)
    - [How the Agents Use It](#how-the-agents-use-it)
    - [Why This Works So Well](#why-this-works-so-well)
      - [One Source of Truth, Zero Drift](#one-source-of-truth-zero-drift)
      - [The Comments Become a Message Bus](#the-comments-become-a-message-bus)
      - [Negotiate the Contract Before the Code](#negotiate-the-contract-before-the-code)
      - [It Plays Perfectly with Primacy Bias](#it-plays-perfectly-with-primacy-bias)
      - [Humans Get the Status for Free](#humans-get-the-status-for-free)
    - [What Stays in the Repo](#what-stays-in-the-repo)
    - [Gotchas](#gotchas)
    - [Conclusion](#conclusion)
---

A while back I wrote about using requirements markdown files as context for AI coding sessions, and then about why loading that context fresh at the top of a session works so well. That workflow is still the foundation of how I code with AI. But recently I hit its ceiling.

The ceiling is called "a project that spans multiple repos." An API repo, a frontend repo, a firmware repo, an infra repo, and multiple Claude Code sessions working across them, sometimes at the same time. The requirements-file-in-the-repo approach starts to crack here, because the question becomes: _which_ repo? So I moved the project-level context out of the repos entirely and into Linear. It has been one of the best workflow changes I've made this year.

<!-- truncate -->

(If you haven't read them, the two earlier posts are [requirements as context](/blog/post/llm-coding-context-management) and [primacy and recency bias](/blog/post/ai-primacy-recency-bias). This one builds directly on both.)

# Where In-Repo Context Breaks Down

The in-repo requirements file has one huge strength: it lives next to the code it describes. For a single-repo feature, that's exactly where it belongs and I'm not changing that.

But real projects don't stay in one repo. The feature I'm building right now touches an API service, a web frontend, and a hardware/firmware layer. Three repos. Three separate Claude Code sessions, each with its own working directory, its own CLAUDE.md, its own context window. And one shared set of requirements that all of them need.

Your options with in-repo files are all bad:

- **Put the requirements in one repo.** Now the agents in the other two repos can't see them. An agent can't read a file that isn't in its checkout.
- **Copy the file into every repo.** Now you have three copies, and the moment one changes, the other two are lying to their agents. Context drift is worse than no context, because the agent trusts it.
- **You become the courier.** Paste the doc into every session, paste updates between sessions, tell the frontend agent what the API agent just changed. Congratulations, you're a human message bus. This is the multi-repo version of playing QA middleman, and it's just as boring.

There's a second problem stacked on top: coordination. When the API session finishes an endpoint, the frontend session needs to know the contract: the route, the payload shape, the error cases. That information is born in one agent's context window and needed in another's. Context windows don't talk to each other. Something durable has to sit in between.

# Moving the Context to Linear

So here's the setup I landed on. The project-level context moves to Linear, and every agent connects to it through the Linear MCP.

The mapping is dead simple:

- **The Linear project** is the initiative. One project per cross-repo effort.
- **The project description / spec doc** is the requirements file. Same content I used to keep in `requirements/`, same discipline: goal, requirements, constraints, technical notes, API examples, out of scope. It just lives in Linear now, where every agent (and every human) can reach it.
- **Issues** are the workstreams, roughly one per repo per chunk of work. The issue description carries the repo-specific requirements.
- **Comments** are the coordination layer. This is the part that surprised me (more on it below).

Every Claude Code session, in every repo, gets the Linear MCP:

```bash
claude mcp add linear --transport sse https://mcp.linear.app/sse
```

And each repo's CLAUDE.md tells the agent the conventions: which Linear team/project it belongs to, that it should read its assigned issue and the project spec before starting work, and that it must comment on the issue when it finishes with what changed and any contract details another repo would need.

# How the Agents Use It

A session now starts like this: `/clear`, then "Read ENG-142 and its comments, then implement it." That's the whole prompt. The agent pulls the issue, the spec, and the comment trail through the MCP, and all of that lands at the _top_ of a fresh context window.

The agent does the work. When it's done, it posts a comment on the issue: here's what was implemented, here are the endpoints, here are the payload shapes, here's the one gotcha. Then it moves the issue to review.

Now the magic part. I switch to the frontend repo, `/clear`, and say "Read ENG-143. Note the API contract in the comments on ENG-142." The frontend agent reads the comment the API agent left an hour ago and integrates against the real contract. I didn't re-explain anything. I didn't paste a single payload. The two agents never shared a context window, but they effectively handed off work to each other, with Linear as the drop point.

The handoff that really sold me is cloud-to-firmware. A cloud service agent changes a message schema and leaves the new schema in a comment. The firmware agent, a completely separate session in a completely separate repo working in C against embedded constraints, reads that comment and updates the device side to match. Those two codebases could not be more different, and the agents working on them still coordinate cleanly because the contract lives in a place they can both reach.

It also doesn't matter _where_ the agents run. Some of my sessions are local Claude Code terminals, some are cloud agents chewing on longer tasks. Linear doesn't care. The coordination layer is completely agnostic to where the work happens, which means you can mix local and cloud agents on the same project and the handoffs work exactly the same way.

Multiply that across a week of development on three repos, and the amount of human courier work it eliminates is genuinely hard to overstate.

# Why This Works So Well

## One Source of Truth, Zero Drift

There is exactly one copy of the project spec, and every agent in every repo reads the same one, live, at session start. When the requirements change mid-project (they always do), I update the Linear doc once and every future session in every repo picks it up automatically. No copies, no drift, no "wait, which version of the doc did that agent see?"

## The Comments Become a Message Bus

I set out to solve a context problem and accidentally solved a coordination problem. Issue comments turn out to be a perfect async message channel between agents: durable, ordered, scoped to the work, and readable by both machines and humans. An agent finishing work writes down what the next agent needs to know. The next agent reads it. That's it. It's the same "API examples in the requirements file" trick from my first post, except now the agents write the examples for each other.

One rule makes this work: I tell agents (via CLAUDE.md) to write comments _for the next agent_, not for a human standup. Contract details, changed behavior, decisions made. Not "I successfully completed the implementation of..." fluff. A comment is a future prompt. Write it like one.

## Negotiate the Contract Before the Code

Once the comments existed as a channel, I took it a step further, and this has turned out to be the most valuable part of the whole setup: I require the agents to _agree on the contract before either side implements it_.

The flow looks like this. The API agent proposes the contract as a comment on the ticket: endpoints, payload shapes, error cases, the works. The firmware agent reads the proposal and responds in a comment with its side of the story, and embedded constraints mean it usually has one. "That payload won't fit in our message buffer," or "we can't poll that often, give me a push," or just "agreed, proceeding." Only when the thread reaches agreement does anybody write code.

Sometimes the contract isn't obvious enough for a one-shot proposal. Maybe the interface genuinely needs insight from both sides: the API side knows the data model, the firmware side knows the memory budget and the timing realities, and neither one can fully specify the thing alone. Same flow, more rounds. One side writes a proposal with its open questions right there in the comment. The other side answers what only it knows, pushes back where it has to, and asks its own questions. Back and forth in comments until the spec is fully realized and both sides sign off. The ticket becomes the design document, assembled one comment at a time by the two parties that actually hold the knowledge.

If that flow sounds familiar, it should. It's exactly what we've always done by pulling stakeholder engineers into a meeting room and whiteboarding the interface until everyone agrees. Same negotiation, same open questions, same back-and-forth. We just do it with agents in comments now. No scheduling, no whiteboard photos nobody looks at again, and it converges in minutes instead of waiting on next week's meeting slot.

This kills the most expensive failure mode of multi-repo AI development: two agents implementing two slightly different versions of the same interface and you discovering it at integration time. The disagreement still happens, but it happens in comments before the code exists, where it costs nothing to resolve.

And here's the part I love: I'm in that thread too. I read the negotiation. I can veto a design, add a constraint the agents don't know about, or just watch two AIs talk each other out of a bad idea. It's a design review where I'm the only human in the room, and I only have to speak up when it matters.

The history pays off later in a big way. Months from now, some agent in some session is going to look at that message schema and decide it should "simplify" it, because agents love to rip up something critical with total confidence. Now there's a paper trail. The ticket holds the entire negotiation: what was proposed, what the firmware side pushed back on, and why the contract looks the way it does. Point the agent at the thread and it stops treating a load-bearing decision like an accident of history. It's the same reason architecture decision records exist, except nobody had to sit down and write these. The negotiation _was_ the documentation.

## It Plays Perfectly with Primacy Bias

If you read my [primacy and recency post](/blog/post/ai-primacy-recency-bias), you know the drill: the first thing in the context window carries the most weight, so start fresh sessions and front-load the good stuff. This workflow is that advice with the loading made automatic. Every session begins by pulling the current spec and the current coordination state through the MCP into the primacy position. No stale carryover from the last session, no messy middle. The freshest possible context, every time, in every repo, and I never have to remember to paste it.

## Humans Get the Status for Free

Here's the bonus: Linear is still Linear. The issues the agents are updating are real issues on a real board. I can glance at the project and see what's in progress, what's in review, and what's blocked across all repos, without opening a single terminal. If you work with other humans, they see it too, and they don't need to know or care that half the comments were written by an AI. The project management artifact and the AI context are now the same artifact, which means neither one goes stale while you maintain the other.

# What Stays in the Repo

I didn't move everything, and you shouldn't either. There's a hierarchy now:

- **Linear**: cross-repo specs, coordination state, contracts between repos, status. Anything two or more repos care about.
- **The repo**: CLAUDE.md conventions, repo-specific requirements that no other repo needs, architecture notes that only make sense next to the code. The `requirements/` directory still exists and still earns its keep.

The rule of thumb: context follows its audience. If only this repo's agent needs it, it lives in the repo. If more than one agent needs it, it goes to Linear. Single-repo features get the exact same workflow as before. My first two posts didn't stop being true.

# Gotchas

A few things I learned the annoying way:

- **Don't let the agent slurp the whole project.** An enthusiastic agent will happily pull every issue and every comment in the project into context "for background." That's your context window budget gone before any work starts. The convention is: read your issue, the spec, and explicitly linked issues. Nothing else unless asked.
- **Comment quality is contract quality.** A vague agent comment ("updated the API to support the new flow") is useless to the next agent and it will guess. Structure beats prose: endpoints, shapes, breaking changes, decisions. When a handoff goes badly, the fix is almost always "make the writing agent leave a better comment," not "make the reading agent smarter."
- **Update the spec after shipping.** Same discipline as the requirements files: when implementation reality diverges from the doc (it will), fix the doc. Future sessions trust it completely (that's the whole point), which means a stale doc actively poisons them.
- **Watch the issue-state churn.** Agents moving issues around the board is great until an agent gets creative with your workflow states. Spell out in CLAUDE.md exactly which state transitions it's allowed to make.

# Conclusion

The through-line of this whole series is the same idea wearing bigger and bigger pants: AI coding quality is determined by context quality, and the best context lives _outside_ the session in a durable, reloadable form. First that was a markdown file in the repo. Then it was understanding how to load that file so the model actually weighs it. Now, for projects too big for one repo and one agent, it's Linear: one spec every agent reads, and a comment trail that lets agents hand work to each other without me in the middle.

The requirements file grew up and got a project management job. Same discipline, bigger scope. And I'm back to the highest-leverage position in the loop: deciding what gets built, while the agents coordinate the how among themselves.
