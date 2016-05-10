--- 
wordpress_id: 15
layout: post
title: 别唧唧歪歪了，赶紧写代码吧！
wordpress_url: http://zinking.github.com/?p=15
---

原文链接： http://www.yegor256.com/2014/10/07/stop-chatting-start-coding.html

Stop Chatting, Start Coding
别唧唧歪歪了，赶紧写代码吧！
7 October 2014 modified on 22 October 2014  7 comments

The first principle of eXtremely Distributed Software Development (XDSD) states that "everyone gets paid for verified deliverables". This literally means that, in order to get paid, every programmer has to write the code, commit it to the repository, pass a code review and make sure the code is merged into the destination branch. Only then, is his result appreciated and paid for.

极度分布式软件开发的第一要义就是 “你只有写了最终有人用的东西才能领到报酬”。 字面上来讲就是：要领报酬， 每个程序员都得写代码， 提交到代码仓库， 通过评审并且确保代码最终会被合并到发布主干。 只有到那个时候你的报酬才有保证。 

For most of my clients this already sounds extreme. They are used to a traditional scheme of paying per hour or per month. They immediately realize the benefits of XDSD, though, because for them this approach means that project funds are not wasted on activities that don't produce results.

就以上这些，大概已经能把我的大部分客户雷翻了。 他们已经习惯了那种按每个小时每个月的方式付费了。 于是他们马上就意识到了极度分布式软件开发的好处， 因为这种方式对于他们来说意味着项目的经费不会被浪费到最终不产生任何结果的活动中去。

But that's not all.
这当然不是全部
Barton Fink (1991) by Joel Coen
This principle also means that nobody is paid for anything except tasks explicitly assigned to him/her. Thus, when a programmer has a question about current design, specification, configuration, etc. — nobody will be interested in answering it. Why not? Because there is no payment attached to this. Answering questions in Skype or Hipchat or by email is something that is not appreciated in XDSD in any way. The project simply doesn't pay for this activity. That's why none of our programmers do this.


We don't use any (I mean it!) informal communication channels in XDSD projects. We don't do meetings or conference calls. We never discuss any technical issues on Skype or by phone.

这项原则也意味着没人能获得报酬除非那项任务是显式的安排给他得。 因此，当一个程序员对当前的设计，规范， 配置等有疑问的时候，没有人会鸟他的。 为什么呢？ 因为没人付钱。 通过Skype或者HipChat或者电子邮件什么的来回答问题不是XDSD所鼓励的。 项目就不会为这些事情投资一毛钱。 这也是为什么我们的程序员没人这样去做。

在XDSD项目中我们不会用任何非正式的沟通工具（我是说真的）。 我们不会开会也不会做电话会议。 从来不会在Skype或者是手机上讨论任何技术问题。
So, how do we resolve problems and share information?

We use task tracking systems for that. When a developer has a question, he submits it as a new "ticket". The project manager then picks it up and assigns it to another developer, who is able to answer it. Then, the answer goes back through the tracking system or directly into the source code.

The "question ticket" gets closed when its author is satisfied with the answer. When the ticket is closed, those who answered it get paid.


Using this model, we significantly improve project communications, by making them clean and transparent. We also save a lot of project funds, since every hour spent by a team member is traceable to the line of code he produced.

那么，我们如何解决问题分享信息呢？

我们使用任务追踪系统。 当一个开发人员有问题的时候，他提交一个“Ticket” 项目经理查看这些记录并且将其分配给另外一个开发人员， 然后答案会完整的经过整个追踪系统或者直接进入源代码。

当问题记录的原作者对答案感到满意的时候他就会关闭这个问题记录。 当记录一被关闭， 回答问题的人就能领到报酬

通过这种模型，我们极大的提高了项目的沟通， 使之干净透明。 我们同时节省了大量的资金， 因为每个团队成员所花得每一个小时都被定位到他产生的任意一行代码

You can see how this happens in action, for example, in this ticket (the project is open source; that's why all communications are open): jcabi/jcabi-github#731. One Java developer is having a problem with his Git repository. Apparently he did something wrong and couldn't solve the problem by himself. He asked for help by submitting a new bug to the project. He was paid for the bug report. Then, another team member was assigned to help him. He did, through a number of suggestions and instructions. In the end, the problem was solved, and he was also paid for the solution. In total, the project spent 45 minutes, and the problem was solved.

这绝对不是说说而已，可以看看现实中这是如何运作的， 例如， 这条记录（该项目是开源的， 这也是为什么这些交流记录都是公开的） 一个Java开发任意对他得Git有点问题。 显然他做错了某件事情并且没法修正这个问题。 他通过向项目提交一个Bug来报告这个问题。 他报告这个问题获得了报酬。 然后另一个团队成员被分配去帮助他。 通过一系列的建议和指令，最终这个问题被解决了， 他也因为这个解决方案获得了报酬。 总之， 项目花了45分钟，然后这个问题被解决了。


===
确实被雷翻了， 这种软件开发哲学肯定有很多其他的细节待讨论， 很多匪夷所思的说法，比如：通过鼓励同事之间不要交流解决了交流问题。