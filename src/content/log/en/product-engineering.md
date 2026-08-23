---
title: From Software Engineer to Product Engineer
description: The paradigm shift that's already here, and how I'm adapting to it
date: 2026-08-15
translationKey: product-engineering
tags: [product, engineering, software]
draft: false
cover: ../_images/product-engineering-cover.png
coverAlt: Illustration of a robot shaking hands with a smiling person
---

Throughout 2026, the way I work has been changing at a dizzying pace. We're iterating on new features faster than ever, improving existing ones without blinking, and, generally, evolving the whole ecosystem that makes this possible at a relentless rhythm. Because of this, I've stopped thinking of myself as a developer who obsesses over every line they write, chasing the best balance between readability and performance, and have climbed a few layers up (quite a few, actually) to a vantage point from which I can see what actually brings value to the user and focus on that. I've come to think of myself as a _product engineer_.

## The paradigm shift that's already here

I'm not going to explain something we're all already living through, to some degree, every day: _agentic development_ (a terrible term, if you ask me) has burst onto the scene and is here to stay. How deeply each of us folds it into our day-to-day depends on the person (and largely on their company). What's clear is that the way I work today looks nothing like it did exactly a year ago. And that's a good thing.

I need to spend less time thinking about how to build a new feature, and more time describing how it relates to existing ones, its scope, and everything around it that could break. The result is a more robust, more reliable product.

It also opens the door to small details we used to never pay attention to, usually because of the time invested / return on investment ratio: transitions, animations, and other UI touches that only add value once everything underneath is useful and functional.

## How I'm adapting to it

My preferred way of learning has always been videos and courses, never books — for me, it's the most dynamic and visual way to learn. These days, you only need to glance at the major YouTube creators to confirm that everything has shifted to focus on AI: how to build with it, which harnesses to use, benchmarks and model comparisons...

It hasn't really changed that much compared to the pre-AI days: how to build in X/Y/Z, which frameworks and libraries to use, comparisons between them (yes, I mean the classic Vue vs. React, Java vs. Ruby, and so on).

I'll admit this is still my favorite way to keep up with everything that comes out, and there's a lot of it. So far this year alone we've gone through:

- Building with _plans_
- _Loop engineering_
- _Harness engineering_

And I'm sure I'm forgetting plenty. Honestly, there's a lot of noise to filter through lately, and it'll take time for a settled way of working to emerge. Or maybe it won't, because I can't picture the point at which models will stop evolving — and, with them, the way we work. We have some very interesting years ahead.

## My definition of a _Product Engineer_

So far I've talked about how AI has changed the way I work, but it's worth explaining what I consider a _Product Engineer_ to actually be — because, like many other terms in this industry, it can mean something different depending on the person or company you ask.

- _Product first_: what matters most (I think it always has) is the quality of the final product you ship. We used to spend a lot of time taking care of things like code quality, readability, and scalability. Those things are still important, but they no longer depend so much on us — we delegate them to AI agents. Our time now goes into conversations about _what_ to build, rather than _how_ to build it.
- Context: now that we can step back from the code and have more time to look at what we're building from a wider angle, I think it's become extremely important for us to turn into _walking context_. Reading through countless Slack threads, listening in on conversations between managers, and continuously using our own product, we manage to stay up to date on where the project stands and where it's headed, why certain architectural decisions were made, and what the rest of the company's teams are working on. That lets us give agents much better context — pointing them to a specific PR or a particular Slack conversation.
- Metrics: no more _ship and forget_, or, more accurately, ship and let the PM validate it. Now I'm the one who defines what it means for a feature to work, I instrument the events needed to measure it, and I check the numbers days after launching it. The metric stops being a report handed to me and becomes just another tool in my kit.
- Observability: if I'm responsible for a feature working in production, I need to be able to see what's happening without depending on someone else to tell me. Logs, traces, and dashboards stop being exclusive to the platform team and become part of development itself: if I can't observe it, I haven't finished building it.

## _High agency_

I think one of the most valuable skills an engineer can have, now and always, is _agency_: being proactive within the team and the company, instead of waiting for a manager to assign you a task or for the team to kick off a new sprint.

Since the cost of taking a feature from ideation all the way to production (with its corresponding monitoring) has plummeted, the ability to find, on your own initiative, what can bring value to the product has become one of the defining traits of a _product engineer_.

And this doesn't necessarily mean we should launch into rewriting our core service in Rust, or skip past whatever layers of hierarchy exist. Sometimes it's as simple as using the product you're building yourself, finding a bug, and deciding to fix it — without needing a JIRA ticket for it.

## Traditional roles are blurring together

Until now, in any product company, you'd find three main roles: the _software engineer_, the _product designer_, and the _product manager_.
Before AI, the responsibilities of these three profiles were clearly delimited: one defined tasks and delivery timelines, another adapted and refined them for the product, and the last one turned those PRDs and JIRA tickets into code. It was the combined effort of these roles that created _the product_.

Now, where each of these roles begins and ends couldn't be blurrier. My manager colleagues are able to ship fixes or add metrics straight into the code. Designers can implement entire features on the project's frontend. Engineers create new designs from scratch and define the success criteria, able to validate end to end the adoption and impact of what we've built.

I don't know how these roles will evolve — whether they'll keep merging until a single person ends up covering all three (and maybe a few more along the way), or whether each of us will keep contributing what we're best at, just collaborating more closely than before.

## Adapt or die?

While we adapt to this new paradigm and build the skills it requires (remember, absolutely everything can be trained and developed), I like to remember a phrase I've heard many times throughout my career: _this job is a long-distance race_.

I don't know at what pace most companies will adopt this expanded scope of responsibility for their engineers, but I'm sure it'll get there, to some degree. I find it hard to imagine that, five years from now, a company could still advertise frontend positions, an agile methodology, and a "stable project with a solid future" — and have the industry see that as a good thing. In the end, you want to be on the winning side (the one with the most future employability), and that side belongs to the product engineer.
