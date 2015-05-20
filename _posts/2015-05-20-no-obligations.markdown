--- 
wordpress_id: 16
layout: post
title: 没有义务
wordpress_url: http://zinking.github.com/?p=16
---
[翻译】 http://www.yegor256.com/2014/04/17/how-xdsd-is-different.html

No Obligations

13 April 2014 modified on 2 October 2014 17 comments
xdsd mgmt


It is a very common problem in project management — how to make team members more responsible and avoid micro management?


We start with creating plans, drawing Gantt charts, announcing milestones, motivating everybody and promising big bonuses on success.

这是个在项目管理里非常常见的问题 - 如何让团队成员更加负责并且避免微管理？

项目开始的时候我们创建计划，画甘特图， 宣布里程碑， 激励每个人并且承诺项目成功后每个人都能获得可观的奖金。
Excuses

Then everybody begins working and we start hearing excuses:

"The task is not yet ready. I was doing something else"
"May I take a day off? Tomorrow is my birthday?"
"May I skip the unit test because I don't know how to fix it?"
"I don't know how to do it, can someone help me?"
"I tried, but this doesn't work; what can I do?"
"This installation requires all of my time. I can't finish the task"

借口

然后每个人开始干活，我们开始听见各种各样的借口：
》 任务还没准备好呢。 我先干点儿别的
》 我能休一天假吗？ 明天是我生日？
》 我可以跳过单元测试么？我不知道怎么修这个单元测试
》 我不知道怎么搞， 有人能帮帮我吗 ？
》 我试过了，可这样不行， 我该怎么办？
》 这项安装要搞一整天，我没法完成任务


With excuses, team members transfer responsibility back to the project manager. There was a very famous article "Management Time: Who's Got the Monkey?" published in the Harvard Business Review about this very subject.
I recommend that you read it. Its authors present problems as monkeys sitting on our shoulders. When the project manager assigns a task to a programmer — he moves the monkey from his shoulders to the programmer's shoulders.

The programmer usually presents the excuse "I don't know what to do". Now the monkey is back on the shoulders of the managers. The goal of the manager is to send the monkey back to make it the programmer's problem again.


One of traditional way of transferring responsibility back to team members is to become an aggressive manager. For instance the manager may say, "You have a birthday tomorrow? I don't care, you still have to meet your deadline" or "You don't know how to fix the unit test? Not my problem, it should be fixed by tomorrow," etc.

因为有接口，团队成员可以把责任转移回给项目经理。  有篇著名的文章 “管理时间：谁搞定了猴子？” 发表在哈佛商业评论上，谈论的就是这个问题。

我推荐阅读这篇评论。 作者将问题表述称猴子坐在我们的肩膀上。 当项目经理把一个任务分配给一个程序员 - 他就把猴子从他的肩膀移到其他程序员的肩膀。

程序员通常会用这样的接口 “我不知道怎么做” ， 然后这只猴子又坐回了项目经理的肩膀上。 然后项目经理的目标就是把这只猴子再次送到程序员的肩膀上把它变成程序员的问题。

一种传统的方式来把责任转回程序员就是变成强势的老板。 比如老板可以说 “你明天过生日？ 关我什么事， 你还是得赶截止日期” 或者说 “你不知道怎么修单元测试？ 不关我事， 你明天就得修好 ” 诸如此类。
We've all seen multiple examples of that type of aggressive management. Personally, I find this management style extremely annoying and destructive for the project. The project environment becomes very unhealthy and good people usually end up leaving.

Another traditional management method is micro-management. This results when the project manager checks task statuses every few hours and tells people what to do and how to handle problems. Needless to say, this management style ruins the team and causes good people to leave even faster.


However, in order to keep the project on track and meet all milestones, responsibility must be on the shoulders of the team members. They should be responsible for their own tasks and report back to the project manager when they are finished with their jobs.

我们肯定都见过这种强势的管理方式。 个人而言我对这种方式非常反感而且对于项目而言是毁灭性的。 项目环境变得非常不健康，好的程序员往往最后选择离开。

另外一种传统的管理方式是微管理。 这就导致项目经理每隔几小时就要检查一下项目进度然后要告知大家要干什么如何解决问题。 要不着说，这种管理方式会毁灭团队并且导致好的团队成员更快地离开。

然而，要保证项目的进度正常并且达成所有的里程碑， 所有的团队成员都必须承担责任。 他们必须对他们自己的任务负责并且当任务完成的时候向项目经理报告。
The Big Lebowski (1998) by Joel Coen

Implementation problems should be solved by team members on their own. So, how do we accomplish this in XDSD?
实现问题应该由团队程序自己解决。 那么，我们如何通过XDSD开放方式达成这一目标呢？


I Owe You Nothing
我不欠你
In XDSD, there is the first fundamental principle that says everybody should be paid for deliverables. Based on this idea, we can go even further and declare a "No Obligations" principle.

In essence, for every team member, it says: if you don’t like the task assigned to you, don’t have time or you’re simply not in the mood — don't do it.

You have no obligation to do anything. You're free to reject every second task that a project manager gives to you or even all of them.

On the other hand, though, the project manager is not obliged to keep a task assigned to you for longer than 10 days (we think that this time frame is logical).


If you get a task, and don't deliver within ten days, the project manager can take it away and pay you nothing — no matter how much time you invested in the task already or the reasons for your failure to complete it.

在XDSD 开放方式里， 第一要义就是说所有人应该通过最终成果获得报酬。 基于此，我们可以进一步宣布这种“没有义务”的原则。

本质上来说，对 每一个团队成员，这意味着： 如果你不喜欢分配给你的任务， 没时间或者你状态不佳 - 那就别搞

你没有义务做任何事情。 有可以自由的拒绝项目经理分派给你的第二个任务后者所有任务。

另一方面， 然而， 项目经理也没有义务仍然将这个任务保持给你如果已经超过了10天 （我们觉得这个时间是合理的）

如果你获得一个任务， 并且你没有在10天内完成这项任务， 项目经理可以将这项任务拿走并且啥都不付给你 - 不管你在这项任务上已经花了多少时间， 或者你有任何的理由你没能做完这项任务。

Where Are The Monkeys Now?
现在猴子去哪儿啦？
This principle helps us to separate responsibilities between project manager and team members. The manager is responsible for finding the right people and assigning them appropriate tasks. There is a problem with the project manager's management style if he receives too many rejections from the team.


On the other hand, his team members are responsible for their tasks and should not provide excuses for non-completion. Well, team members can make excuses, but they won't change anything. No matter what their excuses are, the deliverables will be purchased only from members who manage to complete their tasks on time.

这项原则帮助我们将项目经理和团队成员的角色分开来。 项目经理的角色是找到合适的人选并且给他们分配合适的任务。 如果一个项目经理收到了太多的项目成员的拒绝任务，那么这个项目经理的管理方式肯定存在问题。

另一方面来说， 他得项目成员应该完成他们的任务并且不应该以任何借口拒绝完成该任务。 当然，项目成员还是可以有借口， 但是那也改变不了什么。 不管他们的借口是什么， 最终的成果只会从那些及时完成了任务的组员那里购得。

How Does This Affect Me?
这种方法如何影响我？
When you're working with XDSD-inspired project, you should always keep the "No Obligations" principle in mind. You should start a task only if you're sure that you can finish it in a few days. You should pursue your tasks and control deadlines yourself. The project manager will not ask you for status updates, as usually happens with traditional projects. He will just take the task away from you after ten days if you don’t finish it. To avoid that, you should control your tasks and their deadlines.

With every task, try to be as lazy as possible and cut every corner you can. The smaller the amount of work you perform on a task, the easier it will be to deliver it and pass all quality controls.


Always remember that your efforts are not appreciated — only the deliverables matter.

当你工作在XDSD方法论的项目里， 你应该谨记“没有义务”这项原则。 只有当你确定你能在几天完成一个任务的时候你才能开始一个任务。 你应该自己追求这项任务并且自己控制好时间进度。 项目经理不会来找你要任务的状态更新， 这种事情只会在传统的项目管理里才会发生。 他只会在你10天还没完成这个任务的时候把这项任务从你那里移除。 要避免这种情况的发生， 你应该控制你自己的任务和任务的截止时间。

对于每一项任务， 一定要尽可能的懒，切掉方方面面不需要的地方。 你在任务上花的时间越短， 它通过质量控制和最终发布起来就越容易。

谨记 没人会欣赏你的努力 - 只有最终成果才是最重要的