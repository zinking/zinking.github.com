--- 
wordpress_id: 17
layout: post
title: 为什么极度分布式软件开发不一样
wordpress_url: http://zinking.github.com/?p=17
---
[翻译】 http://www.yegor256.com/2014/04/17/how-xdsd-is-different.html

How XDSD Is Different
为什么极度分布式软件开发不一样

17 April 2014 modified on 27 February 2015 4 comments
xdsd mgmt


eXtremely Distributed Software Development, or XDSD for short, is a methodology that differs significantly from working in traditional software development teams. MostXDSD methods are so different (yet critical) that many newcomers get confused. This article should help you bootstrap once you join a project managed with by XDSD principles — either as a developer or a project sponsor.

极度分布式软件开发， 或者简称XDSD， 是一种与传统的软件开发完全不一样的开发方法论。 大部分XDSD方法是如此与众不同（差异巨大）， 很多新人会搞混。 这篇文章能够帮你起步，不论你以项目经理的角色或者项目开发者的角色加入采用XDSD方法论的项目。

We Pay Only For Closed Tasks
我们只付给那些完成了的任务钱

Unlike with many other projects, in XDSD, we pay only for closed tasks and the agreed upon time budget. Let me explain by example. Let's say, you are a Ruby programmer and you a get a new task that requires you to fix a broken unit test. The task has a time budget of 30 minutes, as is the case most of the time. Sometimes, though, tasks may have time budgets of fifteen minutes or one hour.

不像很多其他项目，在XDSD中，我们支付给那些完成了的任务钱，并且是以约定的时间价。 让我来举个例子解释一下。 比如说， 你是一个Ruby开发人员并且你分到了一项任务要去修复一个坏掉的单元测试。 这项任务的时间预算是30分钟， 这也是最常见的时间预算。 当然偶尔也有一些15分钟或者是1小时的时间预算。

In our example, we agree upon a contract rate of $50 per hour. With the broken test, you will receive $25 for completing the task — 30 minute tasked billed at $50 per hour.

在我们的例子中，如果我们约定的合约价是50刀每小时。 那么对于修复这个坏掉的单元测试， 你会获得25刀如果你完成了任务。 30分钟乘以50刀每小时。
It does not matter how long it actually takes you to fix the test. Your actual time spent on the project may be five minutes or five hours. Nevertheless, you will receive compensation for 30 minutes of work only. If you fix the broken test in 5 minutes, you receive $25. If the task takes you an hour, or even a month, to complete, you still receive only $25.


Furthermore, if you fail to fix the unit test and close the task altogether, you will receive no pay at all for the assignment.

实际你花了多长时间去修复这个测试并不重要。 你实际花费的时间可能是5分钟或者5小时。 然而你只会获得30分钟的时间报酬。 如果修复这个测试你只花了5分钟，你赚25刀。 如果这项任务花了你1小时，或者哪怕一个月来完成， 你还是只得25刀。

更进一步，如果你没能修复该单元测试并顺利的关闭该任务， 这项任务你根本没有报酬。

You can view more details about this principle in the following articles: No Obligations Principle or Definition of Done.

你可以在下列文章里获得关于这项原则的更多细节： 没有义务原则 和 完成的定义
Revolver (2005) by Guy Ritchie

As mentioned above, this is one of the most important differences between XDSD and other methods. Many people get confused when they see this principle in action, and some leave our projects because of it. They simply are used to being paid by the end of the month — no matter how much work they actually deliver. In XDSD, we consider this type of approach very unfair. We feel that people who deliver more results should receive more cash. Conversely, those who don't deliver should get less.

如上所述， 这是XDSD和其他方法的最大区别。 很多人在实际接触这一原则的时候会产生混淆， 有些人会因为这个原则离开项目。 简单说他们已经习惯了月底收工资的那种工作方式 - 不管他们实际上做了多少事情。 在XDSD里， 我们觉得这种方式是不合理的。 我们觉得那些做的多得人应该获得更多报酬。 相反， 那些什么都不做的应该获得更少的报酬。

We Deliver Unfinished Components
我们发布未完成的组件

Since most of our tasks are half an hour in size, we encourage developers to deliver unfinished components. Read more about this concept in the article below: Puzzle Driven Development.

因为我们大部分的任务都是半小时左右的规模， 我们鼓励开发者发布未完成的组件。 阅读下文来了解关于这种观点的更多细节和概念 ： 谜题驱动的软件开发

No Informal Communications
无非正式沟通

Unlike many other projects or teams you may have worked with, XDSD usesno informal communication channels. To clarify, we never use emails, we never chat on Skype and we don't do any meetings or phone calls. Additionally, XDSD maintains no type mailing list. Our only method of communication is a ticket tracking system (which in most projects consists ofGithub Issues.)

和许多其他你工作过的项目或团队不一样， XDSD采用了无非正式沟通的原则。 澄清一点：我们从不使用电子邮件，从不在Skype上聊天并且从不参加电话会议。 另外， XDSD绝对没有任何形式的邮件列表。 我们唯一的沟通方式就是票券追踪系统 （ 对于大部分项目而言和github问题一致)

Moreover, we discourage horizontal communications between developers regarding the scope of individual tasks. When assigned a task, your single and only point of contact (and your only customer) is the task author. You communicate with the author in the ticket to clarify task requirements.

更重要的时，我们不鼓励任何开发人员之间关于各自任务范围的横向沟通。 当分配到了一项任务， 你的单点接触（你唯一的客户） 就是任务作者。 你在该任务票券记录下和作者沟通获得任务的需求。

When the requirements of a task are clear — and you understand them fully — deliver the result to the author and wait for him to close the task. After the author closes the task, the project manager pays you.

当任务的需求搞清楚了之后 - 并且你完全理解这些需求 - 把结果递交给作者并且等他关闭这项任务。 当作者关闭这项任务之后， 项目经理就会付报酬给你。 
Goodfellas (1990) by Martin Scorsese
We're very strict about this principle — no informal communications. However, it doesn't mean that we are not interested in your opinions and constructive criticism. Rather, we encourage everyone to submit their suggestions and bugs. By the way, we pay for bugs (see the next section for further details about bug reporting and payments.)


Since we have no formal communications, members of project teams are not required to work at specific times. Instead, team members work at times convenient for them in their time zones. This includes weekdays and weekends.

我们对于这项原则非常严格 - 没有非正式的沟通 然而这并不意味着我们不在意你得观点和你的富有建设性的批评意见。 想法我们鼓励每一个人提交他们的建议和缺陷。 顺便说一下，对于报告的软件错误我们也会支付报酬 （阅读下面的部分来了解软件错误报酬的细节）

因为我们么有正式的沟通方式， 项目组成员并不需要在指定的时间工作。 相反， 项目成员仅选择他们自己合适的时间来工作。 包括工作日和非工作日） 

We Pay For Bugs
我们对发现的软件错误支付报酬
Unlike many other software teams, XDSD welcomes bug reports in all our projects. Therefore, we ask for bugs openly and expect team members to report them. Review the following article for complete details on XDSD bug reporting: Bugs are welcome

We expect everyone involved with a project to report every bug found. Additionally, we encourage team members to make suggestions. In XDSD, we pay team members for every properly reported bug.


XDSD makes payments for reported bugs because we believe that the more of them we can find, the higher the quality of the end product. Some new developers are surprised when they receive tasks such as "you must find 10 bugs in class A." Often, the natural reaction is to ask "what if there are no bugs?" However, we believe that any software product may have an unlimited amount of bugs; it is just a matter of expending the time and effort needed to discover them.

不像其他的软件开发团队， XDSD在所有我们的项目中欢迎对软件错误的报告。 因此，我们公开的向团队成员询问软件错误。 你可以阅读以下的文章来了解XDSD软件报告的完整细节： 欢迎错误

我们期待项目里的每个人都报告他们发现的软件错误。 另外，我们鼓励团队成员提出建议。 在XDSD里， 我们给每一个恰当报告了的的软件错误支付报告者报酬。

XDSD之所以给报告了的软件错误报酬因为我们相信我们发现的软件错误越多，那么最终产品的质量越高。 一些新的开发者一开始收到“你必须在ClassA里面找出10个错误”这样的任务的时候非常惊讶。 通常最直观的反应就是反问：“如果没有错误怎么办？” 然而，我们相信任何软件产品里都有无限的错误， 只不过是要花费时间和精力来发现它们而已。

Only Pull Request
只有合并请求
We never grant team member access to the master branch — no matter how long you work on a project. Consequently, you must always submit your changes through pull requests (most of our projects are done in Github.)


We enforce this policy not because we don't trust our developers, but simply because we don't trust anyone :) Read this article: Master Branch Must Be Read-Only.

我们从来不会给予团队成员访问Master代码分支的权利 - 不管你在这个项目上已经工作了多久。 相应地， 你只能通过合并请求来提交你的改动 （我们大部分的项目都是通过Github完成的）

我们严格执行这项策略并不是因为我们不相信我们的开发人员。 简单说来我们不相信任何人。 阅读这篇文章： Master分支必须是只读的

No Compromises About Code Quality
对于代码质量没有任何妥协

Before merge any changes to the master branch, we check the entire code base with unit tests and static analyzers. Unit testing is a very common component in modern software development, and one by which you should not be surprised. However, the strictness of static analysis is something that often frustrates XDSD newcomers, and we understand that. We pay much more attention to the quality and uniformity of our source code than most of our competing software development teams.
在把任何改动合并到Master分支之前，我们会通过单元测试和静态分析检查整个代码库。 单元测试是现代软件开发中常见的组成部分， 任何人都不应该不知道， 然而静态分析的严格性却吓到了一批XDSD的新加入者， 我们非常理解这一点。 相比其他竞争的软件开发团队我们投入了大量的精力专注软件开发的质量和一致性。 

Even more important is that we never make compromises. If your pull request violates even one rule of the static analyzer, it won't be accepted. And, it doesn't matter how small or innocent that violation may look. This merging process is fully automated and can't be bypassed.

更重要的是，关于这一点我们从不妥协。 如果你的合并请求违反了静态分析的任何一条规则，那么你的改动就不会被接受。 并且，不管这个改动是多么小，这个违反看起来多么无关紧要。 这项合并过程是完全自动化的，没有任何办法可以绕过。