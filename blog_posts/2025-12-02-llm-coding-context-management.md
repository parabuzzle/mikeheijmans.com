---
title: AI Coding Context Management
tags:
  - AI
  - Context Coding
  - Artificial Intelligence
  - Development
toc: >
  - [The Problem with Vibe Coding](#the-problem-with-vibe-coding)
  - [Requirements as Context](#requirements-as-context)
    - [What Does This Look Like?](#what-does-this-look-like)
  - [Why This Works So Well](#why-this-works-so-well)
    - [You Have to Think Before You Build](#you-have-to-think-before-you-build)
    - [It Stays with the Codebase](#it-stays-with-the-codebase)
    - [It Becomes Your Documentation](#it-becomes-your-documentation)
    - [It Gives the AI What It Actually Needs](#it-gives-the-ai-what-it-actually-needs)
    - [The Value Compounds Over Time](#the-value-compounds-over-time)
  - [How I Do It](#how-i-do-it)
  - [Conclusion](#conclusion)
---

I've been using AI coding assistants heavily for the last year or so. Claude Code, Copilot, Cursor, you name it. I've used them for everything from quick scripts to full features on production applications. Through all of this, I've landed on a practice that has made a massive difference in the quality of AI-assisted code on larger projects: writing requirements as markdown files and keeping them in the repo as context for the AI.

<!-- truncate -->

It sounds so obvious, but hear me out. The magic isn't what the AI does with the requirements. It's what writing them forces _you_ to do which results in WAY better results overall.

# The Problem with Vibe Coding

There's this thing people are calling "vibe coding" where you just open up an AI chat, describe what you want in natural language, and let the AI generate the code. For small stuff this works great. Need a utility function? A quick script? A one-off component? Vibe code it. Seriously, its fantastic for that.

But when you scale this up to a real feature on a real project with real complexity, vibe coding falls apart. And it falls apart fast.

The problem is context. These AI models have a context window and your entire codebase doesn't fit in it. Even if it could, dumping everything in there doesn't help because the AI doesn't know what _matters_. It doesn't know your intentions, your constraints, or why you made the architectural decisions you made. It's just guessing based on the code it can see and the prompt you gave it.

So what happens? You get code that _works_ in isolation but doesn't fit the bigger picture. It might use the wrong patterns, ignore existing utilities, or solve a problem you didn't actually have. You end up spending more time fixing the AI's output than you would have spent just writing it yourself. I've been there. More than once.

The other failure mode is the "just keep prompting" loop. The AI gets something wrong, so you correct it. Then it breaks something else. So you correct that. Three hours later you've had a 47-message conversation and the code is a frankenstein monster of patches on patches. Sound familiar? There is something else at play in this loop which I'll cover in a later blog post about primacy and recency bias.

# Requirements as Context

So here's what I started doing instead. Before I write a single line of code (or ask the AI to), I write a requirements document in markdown and save it in the repo. Not a novel. Not a formal spec. Just a clear description of what I'm building, why, and the constraints.

Then when I start a coding session with the AI, that requirements file _is_ the context. The AI reads it, understands the scope, and produces code that actually aligns with what I'm trying to accomplish.

## What Does This Look Like?

I keep a `requirements/` directory in my project. Each feature or major change gets its own markdown file. Something like this:

```
my-project
├── requirements/
│   ├── user-auth.md
│   ├── notification-system.md
│   └── api-rate-limiting.md
├── src/
└── package.json
```

A requirements file might look something like:

````markdown
# Notification System

## Goal

Add a notification system that alerts users when specific events
occur in their account.

## Requirements

- Notifications should be real-time using SSE (not WebSocket, we
  don't want to maintain persistent connections at our scale)
- Must support email and in-app notifications
- Users can configure which events trigger notifications
- Notifications must be persisted for 90 days
- Must work within our existing auth middleware

## Constraints

- We are on Vercel, so no long-running processes
- Use the existing Postgres database, no new datastores
- Keep the API surface small, 3 endpoints max

## Technical Notes

- The event system should use our existing pub/sub pattern
  in src/lib/events.ts
- Email delivery through the SendGrid integration we already have
- In-app notifications should use the same SSE pattern as the
  activity feed

## API Examples

### Get notifications for a user

`GET /api/notifications?userId=123`

```json
{
  "notifications": [
    {
      "id": "notif_abc123",
      "type": "event_triggered",
      "message": "New login detected from Chrome on macOS",
      "read": false,
      "createdAt": "2025-11-15T08:30:00Z"
    }
  ],
  "total": 42,
  "unread": 5
}
```
````

### Mark notification as read

`PATCH /api/notifications/notif_abc123`

```json
{
  "id": "notif_abc123",
  "read": true,
  "readAt": "2025-11-15T09:00:00Z"
}
```

## Out of Scope

- Push notifications (mobile)
- Notification grouping/digest
- Admin notification management UI

```

Notice the API examples section. You don't need to write formal API documentation here. Just copy and paste. Hit the endpoint, grab the JSON response, and drop it in the file. "This URL gets you this JSON." That's it. The AI can work with that and so can a human reading it six months from now. Don't overthink it.

# Why This Works So Well

## You Have to Think Before You Build

This is the big one. The single biggest benefit of this practice has nothing to do with AI at all.

When you sit down to write requirements, you are _forced_ to think through what you're building before you start building it. You have to answer questions like: What exactly am I building? What are the boundaries? What patterns should I follow? What's explicitly out of scope?

I can't tell you how many times the act of writing requirements has saved me from building the wrong thing. You start writing and realize "wait, this doesn't make sense" or "I need to figure out X before I can even define this properly." These are exactly the kinds of realizations you want to have _before_ you've written 5000 lines of code, not after.

This is really just good engineering discipline, but the AI gives you a practical reason to do it. You're writing the requirements because the AI needs them as context, but the real beneficiary is you.

## It Stays with the Codebase

Requirements docs in the repo travel with the code. They're versioned with git. They show up in pull requests. New team members can read them to understand _why_ something was built the way it was.

Compare this to requirements scattered across Jira tickets, Slack threads, and meeting notes. Good luck piecing together the full picture six months later. With markdown files in the repo, the context is right there next to the code it describes. `git blame` will tell you when a requirement was added and who added it. Its just way cleaner.

## It Becomes Your Documentation

Here's a nice bonus I didn't expect when I started doing this: the requirements files become a solid foundation for documentation. They already describe what the feature does, why it exists, and what the constraints are. That's 80% of good documentation right there.

After a feature ships, I'll go back and update the requirements file to reflect what was actually built (because lets be real, things change during implementation). What you end up with is a living document that serves as both the historical "why" and the current "what" of the feature. It's not perfect documentation, but it's a hell of a lot better than no documentation, which is what most projects have.

## It Gives the AI What It Actually Needs

When you give an AI assistant a well-written requirements doc, the quality of its output goes way up. And I mean _way_ up. Instead of guessing at your intentions, it knows the goal, the constraints, and the patterns you want it to follow. It knows what's in scope and what's not. It knows which existing code to integrate with.

The result is code that actually fits your project on the first try rather than after 15 rounds of corrections. This is the difference between AI as a productivity multiplier and AI as a fancy autocomplete that creates more work than it saves.

## The Value Compounds Over Time

This is where it you can see serious dividend returned on this method. These requirements files don't just help you build the feature they describe. They become context for _everything that comes after_.

Say you built that notification system and the requirements file is sitting in your repo with the API examples, the constraints, and the technical decisions. Six months later you need to build a dashboard that displays notification analytics. You point the AI at the notification requirements file and it already knows the data model, the endpoints, and the response shapes. It can write integration code against your notification system without you having to re-explain any of it.

This works across features too. Building something that needs to trigger a notification? The AI reads the notification requirements file and knows exactly how to integrate with it. It knows the endpoints, the expected payloads, and the constraints. No guessing.

But here's the real kicker: these requirements files can be used to produce LLM-friendly spec files for _other projects_ entirely. If another team or another codebase needs to integrate with your notification system, you can hand them the requirements markdown and they can feed it directly to their AI assistant. Their AI now understands your API without anyone writing a formal integration guide or sitting in a meeting to explain it. The requirements file _is_ the integration guide. It's already in a format that both humans and AI can parse.

The more requirements files you accumulate, the richer the context becomes for every future feature. It's one of those things that starts out as a nice-to-have and turns into a "how did we ever work without this" over time.

# How I Do It

My workflow looks something like this:

1. **Write the requirements** - Before touching any code, I create a markdown file in `requirements/` that describes what I'm building and why. I think through the constraints and document the technical decisions.

2. **Review and refine** - I re-read the requirements and ask myself if someone else (or an AI) could build this feature with only this document and the codebase for context. If the answer is no, I add more detail.

3. **Start the AI session** - I point the AI at the requirements file and the relevant parts of the codebase. The requirements doc becomes the primary context for the session.

4. **Iterate with the requirements as the anchor** - When the AI goes off track, I don't just say "no, do it differently." I go back to the requirements and either clarify them or point to the specific requirement being violated. This keeps the conversation grounded.

5. **Update after shipping** - Once the feature is done, I update the requirements doc to reflect reality. This is the documentation step.

It's not a revolutionary process. It's basically what good engineering teams have always done, just adapted for an AI-assisted workflow. The AI gives you an immediate practical reason to write things down, and then writing things down makes everything better. Everybody wins.

# Conclusion

The irony of AI coding is that the best way to get great output from an AI is to do the one thing developers have always avoided: writing things down before building. Requirements as context isn't some new methodology or framework. It's just good discipline with a new motivation.

The AI gets better context. You get clearer thinking. The codebase gets documentation. Future you (or your teammates) get a paper trail of decisions. It's one of those rare practices where everyone benefits and nothing is lost.

So next time you're about to start a big feature by opening an AI chat and typing "build me a...", stop. Write the requirements first. Save them in the repo. _Then_ build it. Your code will be better for it, and so will you.
```
