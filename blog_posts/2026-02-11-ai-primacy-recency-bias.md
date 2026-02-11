---
title: Understanding AI Primacy and Recency Bias
tags:
  - AI
  - Context Coding
  - Artificial Intelligence
  - Development
toc: >
  - [What is Primacy and Recency Bias?](#what-is-primacy-and-recency-bias)
  - [Why This Matters for AI Coding](#why-this-matters-for-ai-coding)
    - [The Messy Middle](#the-messy-middle)
    - [The Frustration Loop](#the-frustration-loop)
  - [Emprace the Clear](#embrace-the-clear)
    - [Your First Prompt is Everything](#your-first-prompt-is-everything)
    - [Context That Lives Outside the Session](#context-that-lives-outside-the-session)
  - [Putting It Into Practice](#putting-it-into-practice)
  - [Conclusion](#conclusion)
---

In my last post about context management, I talked about using requirements markdown files as context for AI coding sessions and briefly mentioned primacy and recency bias. I want to go deeper on this because understanding how these biases work in AI conversations has fundamentally changed how I use AI coding assistants. Once you get this, a lot of the frustration people have with AI coding tools just melts away.

<!-- truncate -->

# What is Primacy and Recency Bias?

Primacy and recency bias is a well-studied phenomenon in human psychology. When people are presented with a list of information, they tend to remember the first items (primacy) and the last items (recency) much better than the stuff in the middle. It's why the first impression matters so much and why the last thing someone says to you tends to stick.

It turns out, large language models exhibit something very similar. The first messages in a conversation and the most recent messages carry significantly more weight in how the model generates its response than the messages in the middle. This isn't a bug. It's a byproduct of how attention mechanisms work in transformer architectures. The model is literally paying more attention to the beginning and end of the context window.

For casual conversation, this doesn't really matter. But for AI-assisted coding sessions where precision and consistency are critical, this has massive implications.

# Why This Matters for AI Coding

## The Messy Middle

Think about what a typical AI coding session looks like. You start with a prompt describing what you want to build. The AI generates some code. You try it out, find an issue, and send a correction. The AI adjusts. You test again, find another issue, correct again. Maybe you also ask it to refactor something along the way, or you change your mind about an approach.

Thirty messages in, you've got a long conversation with a lot of back-and-forth. There are contradictions in there. Early corrections that were later revised. Tangents that got abandoned. Approaches that were tried and thrown out. This is the messy middle and the model is _losing track of it_.

The model is heavily weighing your very first prompt and your most recent messages. Everything in between is getting progressively less attention. Those critical corrections you made on message 12? The constraint you clarified on message 18? They're fading into the noise. The model isn't ignoring them entirely, but they carry less weight than you think they do.

This is why you'll see the AI suddenly "forget" something you told it earlier. It didn't forget in the human sense. It's that the information got buried in the middle of the context where it receives the least attention. Meanwhile, the model is still heavily influenced by your original prompt (which may have been vague or incomplete) and whatever you said most recently.

## The Frustration Loop

This is the root cause of the frustration loop I mentioned in my [last post](https://www.mikeheijmans.com/blog/post/llm-coding-context-management). You correct the AI, it seems to get it, but a few messages later it reverts to an earlier behavior or makes the same mistake in a different way. So you correct it again, more forcefully this time. It adjusts. Then it breaks something else that you thought was settled.

What's happening is a tug of war between primacy and recency. Your original prompt is pulling the model in one direction. Your latest correction is pulling it in another. And all those important clarifications in the middle? They're getting squeezed out.

The natural reaction is to keep prompting. Keep correcting. Keep pushing. But every message you add makes the middle noisier and pushes your earlier corrections further from the edges where they'd have the most impact. You are literally making the problem worse by trying to fix it. It's a death spiral and the only way to break out of it is to understand what's actually happening.

# Embrace the Clear

Here's the thing that you **NEED TO USE**: `/clear`.

That's it. Clear the conversation. Start fresh. It sounds counterintuitive because you feel like you've built up all this context over 30 messages and throwing it away seems wasteful. But that "context" you built up is mostly noise at this point. The model isn't using it the way you think it is.

When you `/clear` and start a new session with a single well-crafted prompt, you are putting _all_ of your important information right at the beginning of the context window where it has the most weight. There is no messy middle competing for attention. There are no contradictions from abandoned approaches. Just a clean, focused context that the model will pay full attention to.

I cannot overstate how much better AI coding gets when you embrace the clear. Stop trying to salvage a conversation that's gone sideways. Just start over with better context.

## Your First Prompt is Everything

Since the first message carries the most weight, you should treat it accordingly. Your first prompt isn't a casual request. It's the foundation that everything in the session is built on.

A bad first prompt:

> "Build me a notification system"

A better first prompt:

> "I need to build a notification system. Here are the requirements: [paste your requirements doc]. The relevant existing code is in src/lib/events.ts for the pub/sub pattern and we already have SendGrid integrated for email. Please start with the SSE endpoint for real-time in-app notifications."

See the difference? The second prompt front-loads all the critical information: the requirements, the constraints, the existing patterns, and the specific starting point. That information will influence every single response in the session because it's sitting at the very beginning of the context window where primacy bias works in your favor.

This is also why your most recent prompt matters so much. If the AI starts drifting, don't just say "no, that's wrong." Give it a focused correction that restates the relevant constraint. You're writing to the recency end of the bias. Make it count.

## Context That Lives Outside the Session

This is where it all connects back to [requirements as context](/blog/post/llm-coding-context-management). If the most important parts of a conversation are the first and last messages, then you need a way to make that first message really good every single time. You can't do that from memory. You can't do that by trying to remember what you told the AI three sessions ago.

But you _can_ do that if your requirements are written down in a markdown file sitting in your repo. Every new session starts the same way: clear, load the requirements file as context, and give a focused prompt about what you're working on right now. The AI gets a pristine first message packed with everything it needs.

This is also why the requirements files I talked about in the last post should contain things like API examples. When you start a new session that needs to integrate with an existing feature, you paste in that feature's requirements doc and the AI has the endpoints, the response shapes, and the constraints right there in the primacy position. No 15-message buildup needed.

The combination is incredibly effective. Requirements files give you durable, reusable context. Understanding primacy and recency bias tells you _when_ and _how_ to load that context for maximum impact. Together, they turn `/clear` from feeling like "starting over" into the most powerful tool in your workflow.

# Putting It Into Practice

Here's what my workflow looks like now:

1. **Start every session with `/clear`** - Don't carry over stale context. A fresh session with a strong first prompt beats a long conversation every time.

2. **Front-load your first prompt** - Load your requirements file, reference the relevant code, and be specific about what you want to accomplish in this session. This is the primacy position. Make it count.

3. **Keep sessions focused** - One feature, one task, one clear objective per session. The shorter the conversation, the less the messy middle can hurt you.

4. **Clear when things go sideways** - If you find yourself correcting the AI more than twice on the same thing, don't keep pushing. Clear and start fresh with a better first prompt that addresses the confusion up front.

5. **Use your last message wisely** - When giving corrections, restate the full constraint, don't just say "no." Your most recent message has recency weight. Use it to reinforce what matters.

The counterintuitive truth is that more conversation is not better. Shorter, focused sessions with strong first prompts will outperform marathon conversations every single time. Once you internalize this, AI coding goes from frustrating to genuinely productive.

# Conclusion

Primacy and recency bias in AI isn't some obscure academic concept. It's the single most practical thing you can understand about how these tools work. Your first prompt and your last prompt matter the most. The middle is noise that grows noisier with every message.

Stop fighting long conversations. Start clearing them. Write your context down in files that live outside the session so you can reload it fresh whenever you need to.

The best AI coding sessions aren't the longest ones. They're the ones that started with the right context.
