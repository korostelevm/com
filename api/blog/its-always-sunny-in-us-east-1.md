---
title: Its Always Sunny in us-east-1 - The gang does business continuity
slug: its-always-sunny-in-us-east-1
summary: 'The gang experiences an AWS outage; customers report SHOWSTOPPERs; the gang triages the issues and attempts to implement an elaborate disaster recovery plan'
colId: 60d0f077b69e2df6b324616c
id: 623b2c46371050340e82e69e
createdAt: 'Wed Mar 23 2022 14:18:46 GMT+0000 (Coordinated Universal Time)'
updatedAt: 'Tue Apr 19 2022 13:33:52 GMT+0000 (Coordinated Universal Time)'
publishedOn: 'Tue Apr 19 2022 13:33:52 GMT+0000 (Coordinated Universal Time)'
author: mike-korostelev
category: AWS
hidden: false
featured: false
public: Thu Mar 24 2022 00:00:00 GMT+0000 (Coordinated Universal Time)
image: /blog/img/623b4df73710503348866d01.png
thumbnail: /blog/img/623b4df73710503348866d01.png
---
_TLDR: The gang experiences an AWS outage; customers report SHOWSTOPPERs; the gang triages the issues and attempts to implement an elaborate disaster recovery plan_

It is 11:03 AM on a Thursday, US-EAST-1, Pennsylvania. You've been triple booked just right and everyone at each call thinks you're at the other call. In this rare moment of freedom, you are adding custom emojis to slack.

A message from a developer:

![](/blog/img/623b2bac320ad6b1f2c29c14_nb5Pt8iNWIeakqh64ZRzCdyvwQJoh5dqa3DLMw3VuRharHKff1CBXKBUKWtXIIxBIXOcFpaMW6VXC-vq9STLnr4_H1O16CU8P2N6jGPXMaiaa7njhzSLGvsqih8h-zkX0OIMDeLs.png)

*   "dude you free? we're having failures in prod."

This is unfortunate, it is your week on support rotation so the other calls cant get you out of this one.

The triage process
------------------

You've crafted your triage process over many incidents and honed cutting diagnostic inquisitions. The goal here is efficiency and the mitigation of risk to lunchtime and as always, the secondary objective to expose the truth about how the PR comment you left was ignored and best practices spitefully neglected.

**1\. Estimate priority**: Did a customer report it? Did we find it ourselves?

*   "No we saw alarms but no one knows yet, support team is doing these manually"

**2\. Assess impact**: How many have failed?

*   "A few, we've seen it earlier this morning, we think it might be AWS or they might be one-offs"

**3\. Establish precise language:** A few is not a number, earlier is not a timestamp. Did you check the AWS status page?

*   "Just messaged support team. Checking AWS status now..."
*   "AWS status is ✅ ✅ ✅"

**4\. Identify patterns**: Are they all failing the same way? What is the error signature?

*   "Its _random_, some of them timed out after **_random_** time, some have errors **randomly**."

**5\. Analyze chain of events**: What did we change last?

*   "Nothing, the last deployment was two weeks ago"

The nuances in this last question is that a lot happens outside of the standard change management process. Some of these off-the-record/alternative-record things covered in triage include:

*   Configuration changes made to toggle features
*   New users introduced never before seen behaviors
*   Off-cycle hot-fixes deployed from feature branches

These three, plus the normal sprint work is at best recorded into only four different systems of record. Each of the systems is almost certainly the best tool for its job and each probably even has excellent integration capabilities. Unfortunately, the four are integrated manually in excel by four different people producing out-of-sync csv exports.

**6\. Initiate holy crusade**: Some of the worst atrocities committed against software get to production under the guise of hot-fixes. The perpetrators must be identified.  

*   "We should call in \_\_\_\_\_\_\_, I think they were on the last incident call"

‍

This continues as more participants join the call - until - even though AWS status page is still showing ✅✅✅, someone announces:

### **"Some people on twitter are saying AWS is having an outage in us-east-1"**

_If you get nothing else out of this article - please walk away with this: If_ _you are having doubts about the status of AWS, check twitter._

**This is good news.**

While numerous system failure notifications are signaling that **shit is hitting the fan**, the mood on the call improves briefly as all are absolved of any potential guilt, its no ones fault.

**Disaster** 🔥
===============

This calm is short lived, the customers have been notified. They've escalated pissed-ness from `CRITICAL` to `SHOWSTOPPER` (from the resting baseline of `URGENT`). They are asking for an ETA on the resolution and hourly updates on the status.

Large organizations have _Recovery Time Objective (RTO)_ and _Recovery Point Objective (RPO)_ standards for disaster/outage scenarios. RTO/RPO can be internal standards or sometimes compliance requirements. What RPO/RTO actually means is best illustrated with an example:

_If you're playing a video game - a crash is a disaster. The time it takes to boot the game back up is the recovery time. When the game starts back up, you've lost some progress time and have to start from an earlier autosave - thats the recovery point._

The goal is to have systems in place to maintain business continuity by reducing data loss and minimizing downtime for end users. This is done by deploying redundant infrastructure and data backups in alternate locations since physical infrastructure is geographically vulnerable.

Recovery Strategy
=================

The org's AWS technical account manager tries to reassure everyone by confirming that issue is **only regional**. Having seen an amazing disaster recovery demo from the tech team six months ago, an executive on the call, feeling like they're about to save the day asks:

*   `"We built DR capability. Why can't we recover to east-2?"

This is where we discover that DR capability is different from a DR demo proving that failover is possible. Software changes over time. If there is an expectation that the application has recovery capability, each change must be made with the consideration for how it will behave in failure scenarios. To be clear - not try/except wrapping some new code for some feature - but how will the system with this new code and feature behave when infrastructure around it starts to break. **Adopting DR is a culture change that goes beyond the developer.** Maintaining availability requires continuous overhead in time and effort on development, management and architecture.

The answer is to this question is as usual -

*   "We could try it but we're not sure what would happen, we have to ask the devops lead, but they're out today."

The contributing factors to this lack of confidence come from those same nuances of the `What did we change last?` question.

When the devops lead is finally located. They remember that something has changed since the DR demo. The recovery process has changed and someone has to write an additional script. They explain the functionality briefly but unfortunately they can't do it. They have "a hard stop" and have "to drop" to watch their pets and children on their day off.  They will then hand-off to you.

35 highly paid managers on the call that are normally skeptical of pair programming -  become an engaged operating theater audience to a couple of developers [hacking together a script](https://www.cyclic.sh/posts/write-shitty-code) that will never make it to version control.

When the script is finally written, **a decision must be made.**

"Ok should we run it?"
======================

The story has had a number of twists so far. It was determined that the original recovery plan is out of date and had to be duct taped back together. The plan's original creators have given their warnings and **someone new must own the success or failure of the recovery**. The decision should be made with caution of course, and so, the risks need to be discussed.

QA will list the environments they would like the script to be tested in, the business execs will bring up the need to work together on this with other organizational units. A few more people will join the call for a final per-hour burn rate approaching a developer’s monthly salary.

**AWS will inevitably fix us-east-1, and very probably before the discussion concludes.** Someone will interrupt to announce:

*   "We're seeing less failures, looks like we're good!"

Everyone congratulates everyone on their hard work. The tech team sees a bright and hopeful future. They vow to bring this up in the post-mortem as an indisputable argument to [convince product to finally pay down the tech debt](https://www.cyclic.sh/posts/we-sound-like-idiots-when-we-talk-about-technical-debt).

‍

⚠️ **Educational content**
==========================

There are multiple [very well documented strategies](https://aws.amazon.com/blogs/architecture/disaster-recovery-dr-architecture-on-aws-part-i-strategies-for-recovery-in-the-cloud/) and architecture patterns to achieving recovery objectives. While there is a number of these, they can be reduced to just two:

* Active-Active - multiple independent, regionally redundant and interoperable systems functioning concurrently and as mutual back-ups without needing to be manually switched over
* Not Active-Active - dusty, manually run Rube Goldberg machines designed for impressive demos and can only be operated by one dude who happens to be on vacation

![](/blog/img/623b37698dc82a7ba4eda92f_BG_oAOIfVIFsvST2nqtZfBEzcpuAP6QipgKosUKp9EBYAQ_wUUDSvoXNoe1l7XW_4KIC_TZ9BTjVxmHgimWyA5p9Vp4_QGzRjIXuXmA3vId-F5K2OQlyPpEkdkS9b9ZFmzfEcOak.png)

please share all of your great successes with manually orchestrating active-passive/pilot light recoveries in the comments

‍

There is nothing fundamentally wrong about the passive approaches to recovery. The real problem is that unless the organization has capacity to continuously pay the overhead of maintaining and practicing recovery strategies, the recovery plan will always be out of date like in the story above. In active-active configuration, application have to naturally become regionally agnostic and shifting from one region to another naturally has to be automatic.

It is true that for many systems, especially those built on always-on infrastructure that have a per-hour cost, active-active is really expensive. For every compute instance you have serving traffic, you need to have another that is also turned on in a different region.

On-demand pricing is common for most products calling themselves serverless. With that, redundancy doesn't have to cost double and with much of serverless being heavily config driven the complexity is also reduced.

‍

**We will be posting a series on building global applications with serverless. Check out the first part in the series >>** [Routing and Health Checks](https://www.cyclic.sh/posts/considerations-for-serverless-active-active-routing)

‍

‍
