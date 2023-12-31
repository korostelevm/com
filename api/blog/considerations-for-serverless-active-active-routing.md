---
title: Considerations for Serverless Active-Active
slug: considerations-for-serverless-active-active-routing
summary: 'Building active-active in multiple regions can be expensive and complex. Serverless-native applications can make it simpler to serve users globally and enable more effective recoveries with less effort.'
colId: 60d0f077b69e2df6b324616c
id: 623b3aed20c9065ace10b837
createdAt: 'Wed Mar 23 2022 15:21:17 GMT+0000 (Coordinated Universal Time)'
updatedAt: 'Tue Apr 19 2022 16:03:40 GMT+0000 (Coordinated Universal Time)'
publishedOn: 'Wed Jun 08 2022 20:06:23 GMT+0000 (Coordinated Universal Time)'
author: mike-korostelev
category: AWS
hidden: false
featured: false
public: Thu Mar 24 2022 00:00:00 GMT+0000 (Coordinated Universal Time)
image: /blog/img/623b489a8dc82ac713edaba0.png
thumbnail: /blog/img/623b489a8dc82ac713edaba0.png
---
_(Part 1 of a series)_

Building active-active in multiple regions can be expensive and complex. Serverless-native applications can make it simpler to serve users globally and enable more effective recoveries with less effort.

Starting from the end user making an http request and assuming there are two identical instances of an application running in two AWS regions - this and next several posts will discuss considerations, tools and solutions for building serverless active-active architectures.

**Routing**
-----------

The first touchpoint for a request is DNS routing. This where the cloud DNS ([AWS Route53](https://aws.amazon.com/route53/)) connects the request to your application's endpoints - in whatever region they are in the world.

#### Which regional instance of the application to send the request to?

AWS Route53 lets you select a routing policy for DNS records. A regional policy will route users the closest geographic region ($0.70 per million queries). A latency policy will route to the the lowest query latency record ($0.60 per million queries). For high traffic web services, the TTL value should be considered as most web clients cache dns for the specified TTL.

If the record is configured as an alias to an AWS service (like cloudfront and api gateway) - the dns queries are free.

#### How to know that the instance in the region is actually healthy ✅ before routing the request?

If a region is down (and it's not even your fault), Route53 does not know not to send requests there. To make Route53 know the state of an endpoint, health checks can be configured. Depending on the config, a health check is somewhere between $0.50 - $2.00 per month. Two ways to configure a health check are:

*   Monitor an endpoint by continuously polling it from multiple regions - this will result in multiple requests per second to some endpoint where your application responds with some kind of 200. Since all these requests must be handled by something and can get expensive downstream from the traffic generated by the health check itself.
*   Monitor cloudwatch alarms - this lets you be more creative about what ‘healthy’ means and can go both ways on cost/complexity. This option is likely going to have more lag than monitoring an endpoint directly.

Here the TTL is a more important consideration - since clients will cache dns - faster health-check polling intervals will not give you instantaneous routing switchover. So if users are actively using a service at the moment the switch over happens, you should have the expectation that they may still be hitting the failing endpoint until their dns cache expires.

**_The next few posts will discuss these and other considerations, approaches and dirty hacks for building a low overhead active-active strategy with serverless on AWS:_**

#### **Compute**

##### How to process the requests in both regions without having to pay for two computes?

##### How to scale capacity if suddenly a single regional application instance must pick up the slack for a whole other region’s worth of traffic?

#### **Data**

##### How to make sure the data created by either regional application instance is available to the other?

#### **Ops**

##### Human decisions are political decisions, politics takes time, in a disaster time is scarce - how to remove humans from the process?

##### How to manage infrastructure across multiple regions without multiplying operational overhead?

#### **Latency**

##### How to deal with eventual consistency and the fact that data replication is not instantaneous?

‍
