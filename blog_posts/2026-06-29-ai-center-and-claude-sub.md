---
title: I'm Getting 20x My Money's Worth From Claude Code (Here's the Data)
image: https://www.mikeheijmans.com/img/postimgs/ai-center-og.png
tags:
  - Coralogix
  - AI
  - Context Coding
  - Artificial Intelligence
  - Development
  - Observability
toc: >
  - I'm Getting 20x My Money's Worth From Claude Code
    - [Total Cost and Token Usage](#total-cost-and-token-usage)
    - [About That 20x Claim](#about-that-20x-claim)
    - [Setting it up](#setting-it-up)
---

I recently wired up AI Center (Coralogix's AI observability product) for coding agents on my local development hosts. (yes it's plural... I use multiple computers to develop and run coding agents). Its original intention was to just see token usage and efficiency of coding sessions. Plus it was a fun project to play with AI Center. It turns out there was more to the data than I realized and a genuinely useful data point I hadn't considered. As a Claude Code Max subscriber, I found out I'm getting **WAY MORE than my money's worth** on that $200 a month cost.

<!-- truncate -->

# Total Cost and Token Usage

Let me jump to the punchline. When I wired it up (more on that later) I noticed that my 24 hour total cost was over my monthly cost of the subscription. I pay for the personal Max subscription and I use Opus a lot. I also knew that if I was just paying for the raw token usage that I would likely be paying more than the $200 a month that I currently pay. I had no idea how much, though.

Consider this screenshot. This is a single 24 hour period, and the total cost of $246.62 already exceeds my entire monthly subscription cost!

![AI Center Token View](/img/postimgs/ai-center-usage-cost.png)

Now, I don't push it this hard every single day. But if I average a number like that across the work days in a month, I'm easily looking at something on the order of $4000 a month in raw token cost on a $200 subscription. WOW!

So how is this calculated? When Claude Code (and any of the other AI coding agents) finish their turn they report the total tokens up and total tokens down. The number in the Coralogix AI Center applies the per-million-token (mtok) rates to that token usage to estimate the cost (at list prices, excluding any discounts or special plans). So this is roughly the token cost as it would be if I was just paying for tokens.

This was extremely cool insight and really helped me understand the value I'm getting out of Claude Code coding agents and my subscription.

# About That 20x Claim

Here's the part that made me chuckle. Anthropic sells the $200 Max plan as **"20x Pro usage"** (the [pricing page](https://support.claude.com/en/articles/11049762-choose-a-claude-plan) literally lists it as "20x Pro capacity per session"). But they're pretty vague about what that 20x actually buys you. 20x the messages? 20x the tokens? 20x of what, exactly? They never really spell it out.

Well, my data kind of answers the question. A $200 plan that hands me somewhere around $4000 of raw token value a month is, quite literally, about 20x. I went looking for some token efficiency stats and came out with the receipts. That "20x" on the pricing page isn't just marketing fluff, and now I can actually see it in dollars.

# Setting it up

There's a really great document published in the Coralogix docs you can read [here](https://coralogix.com/docs/integrations/ai-observability/claude-code/) that explains how to set this up. If you're lazy, you just point Claude or your Claude Code session to the url and it can just do it for you.

But the simple setup is to edit your `~/.claude/settings.json` file and add:

```json
{
  "env": {
    "CLAUDE_CODE_ENABLE_TELEMETRY": "1",
    "OTEL_METRICS_EXPORTER": "otlp",
    "OTEL_LOGS_EXPORTER": "otlp",
    "OTEL_EXPORTER_OTLP_PROTOCOL": "grpc",
    "OTEL_EXPORTER_OTLP_ENDPOINT": "<YOUR_CX_OTLP_ENDPOINT>",
    "OTEL_EXPORTER_OTLP_HEADERS": "Authorization=Bearer <YOUR_CX_API_KEY>",
    "OTEL_RESOURCE_ATTRIBUTES": "cx.application.name=claude-code,cx.subsystem.name=<TEAM_NAME>",
    "OTEL_EXPORTER_OTLP_METRICS_TEMPORALITY_PREFERENCE": "delta",
    "OTEL_LOG_USER_PROMPTS": "1",
    "OTEL_LOG_TOOL_DETAILS": "1"
  }
}
```

Replace your endpoint, key, and team name. In my case I use the dev host name as my "TEAM_NAME" so I can keep my sessions and costs attributed to which host. So mine ends up looking like:

```json
 "env": {
    "CLAUDE_CODE_ENABLE_TELEMETRY": "1",
    "OTEL_METRICS_EXPORTER": "otlp",
    "OTEL_LOGS_EXPORTER": "otlp",
    "OTEL_EXPORTER_OTLP_PROTOCOL": "grpc",
    "OTEL_EXPORTER_OTLP_ENDPOINT": "https://ingress.coralogix.us:443",
    "OTEL_EXPORTER_OTLP_HEADERS": "Authorization=Bearer <REDACTED>",
    "OTEL_RESOURCE_ATTRIBUTES": "cx.application.name=claude-code,cx.subsystem.name=Lab1",
    "OTEL_EXPORTER_OTLP_METRICS_TEMPORALITY_PREFERENCE": "delta",
    "OTEL_LOG_USER_PROMPTS": "1",
    "OTEL_LOG_TOOL_DETAILS": "1"
  },
```

Restart your claude code and the sweet data will flow.

**NOTE: I chose to log my user prompts and tool details. Be careful with this! This will leak everything you put in the prompt and their results. I'm the only user of this Coralogix org so I don't care. You should think about if this is good for your case though.**

So that's pretty much it. No more work than just setting some environment variables and restarting the session.

Anyway, I guess by publishing this I'm basically showing Anthropic exactly how hard I'm leaning on that "20x." Please don't cut me off, I promise I'll use my tokens responsibly. (I won't, but I promise.) 😅
