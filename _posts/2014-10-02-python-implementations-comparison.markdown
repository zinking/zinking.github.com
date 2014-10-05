--- 
wordpress_id: 8 
layout: post
title: python各实现版本的比较
wordpress_url: http://zinking.github.com/?p=8   
---
自从python流行以来，python运行时的各种实现版本层出不穷。 Java程序员根据Python的特性研制出了Jython以便能够继续复用Java代码。 C#程序员也希望能配合部分现有Python程序库来完成某些特定工作，因此有了ironPython，这样python里面就可以兼容.NET程序库。 风靡世界的Python程序语言最主要的实现版本还是Cpython。因其语音的灵活性，丰富的语法糖以及对可读性的严格要求 吸引了各行各业的程序员使用python来开发各领域的应用程序库。 图像处理研究人员开发了VTK， 自然语言处理研究小组开发了NLTK， 从事数值计算的研究人员模仿昂贵的商用软件Mathlab开发了Numpy 等等。 这一系列高精尖开源的Python程序库吸引了大量的程序员在这些夯实的基础之上构建海量的应用程序。 用的人多了，Python的局限性也就受到越来越多的重视。 起初人们觉得可以通过给Python运行时打一些“补丁”让它运行的更快一点。 比如Pysco，比如Cython。 后来人们还是不能满意这些补丁驼补丁的做法带来的运行时效率改善， 越来越多的意见觉得Python之所以慢，并且在驼了补丁之后仍然很慢 肯定是因为Python运行时一开始就没有设计/实现对，那么不管后来如何努力，都要受限制于这些错误的设计给Python施加的无益限制。 于是Pypy，Pyston应运而生，它们和Jython IronPython不同，它们的目标不是要和其他的流行语言进行前向兼容。 它们要改进Cpython，要做出运行的更快的Python。 让更多的场景和用户受益于Python平台的多年积累。

和很多其他语言一样，Python语言只是一种规范，它并没有具体的实现规定，因此才会出现这么多的Python运行时。 同时也正是这种对多样性的宽容，Python社区才会如此茁壮的成长 发展成今天这样一个有影响力的编程语言。

1. 兼容其他语言特性的Python运行时

1.1 Jython

Jython是Guido的同事Jim领导开发的，Jython的目的就是为了和Java前向兼容，这样流行的Java程序库就可以移植到Python平台，用在Python平台的项目开发上。

可以想象Jython是在JVM的基础上实现了Python运行时所需的各个组件。 那么一般意义下，Jython程序的运行效率肯定也不会受制于JVM所施加的限制，当然同样地Jython程序也能够受益于JVM的JIT优化。          

1.2 IronPython

有意思的是，IronPython也是Jim领导开发的， IronPython的目的也是为了打开.NET世界和Python世界沟通的桥梁。 

在所有的Python运行时实现中，很大的一点挑战就是对于Cpython本身的前向兼容。 有不少新的Python实现能够实现一定程度的性能改善，但是同时该种改善缺带来了前向不兼容的问题。 Ironpython投入了大量的精力来保障和CPython的前向兼容。 值得提到的另外一点是IronPython改进了Cpython的垃圾回收方式，不再使用引用计数对Python进行内存管理。 

其实就垃圾回收来讲：引用计数本身就有着循环引用这个无法回避的问题，如果要解决循环引用势必会引入另外一种垃圾回收算法，例如标记清除。 一般说来都会避免使用引用计数，而直接采用标记清除。 而CPython却坚定不移的实现了两种垃圾回收方式。 无疑，增加了运行时本身的复杂程度。

虽然我们说这些版本的Python运行时为不同语言的程序员沿用已有程序集带来了很大的帮助，但是这些运行时也是有很大问题的。 实现不同的Python运行时所面临的最大挑战就是前向兼容。 Jython和IronPython都无法完美的前向兼容Cpython的所有程序库， 也就是说有不少CPython（标准Python运行时）程序库是无法为IronPython和Jython所使用的。 例如Numpy，这个非常流行的数值处理Python程序库无法被Jython和IronPython所使用。

通常，人们总是对新实现的Python的实现版本寄予厚望，觉得他们不仅带来了不同编程领域的好处，甚至在性能上更甚一筹。 然而不管是Jython还是IronPython都是实现在虚拟机之上的语言。可以预期它们的效率不会好过CLR JVM相对原生应用程序的表现。 所以即使在某些指标上这些运行时表现突出，那样的场景也应该是相对特殊,不具有[一般性][2]。

2. 改进运行时执行效率的Python运行时工作

2.1 PyPy

Pypy的思路就是重新彻底的重造Python，并且给予Python快的多的运行时效率。 据[pypy speed center][3] 的基准速度测试显示，Pypy的速度是Cpython得3-10倍。 Pypy先通过Rpython(Cpython的一个静态子集）对Python应用程序进行解析产生初步的字节码，再通过Rpython将JIT加入一个解释器获得子集的编译器来解释执行Python代码。 JIT是Pypy改善Python运行效率的关键。

然而pypy并没有得到大规模的采用，问题同样出在[前向兼容][4]， 虽然Pypy声称对Cpython进行前向兼容， 事实是很多Cpython的程序库并不能被pypy所兼容。 这其实和Pypy的那种独特的实现方式有关。 另外一点，Pypy的最大优势在于JIT，而Python目前的很大用例在于短小精悍的脚本，那样长度的脚本和执行周期根本无法满足JIT所要求的执行次数。 因此pypy所带来的性能改善对很多python开发者而言仅仅是镜中月水中花。

2.2 Pyston

大概是因为Guido在Dropbox工作了一段时间， Dropbox的人也想在这个问题上有所建树，于是有了[Pyston][5]。Guido本人对Dropbox的这种提案还是持保守态度。 这个2014年4月份发起的新兴项目同样致力于改善Python的运行时效率， 在目睹了如此之多的尝试之后，Pyston提出了他们的计划： 为了保证前向兼容，他们将在一些扩展执行上使用保守的垃圾回收等策略。 Pyston同样将致力于采用JIT提高Python的运行时效率，他们将Python代码编译成llvm中间代码，最后再投入运行环境。

截止本稿写作，Pyston仍然是进行中的项目，到目前为止整个项目都还火热的进行着。 但是很难说Pyston就能避免Pypy Jython IronPython的命运。 前向兼容是软件工程所面临的最严峻挑战之一， 当初微软为了维持操作系统的前向兼容花费了大量的人力物力。 很难想象光靠社区光靠一家并不以python为主业的公司能够在短时间内解决Python的前向兼容问题。

2.3 Pysco

Pysco是Python上较早的尝试对Python进行JIT加速的项目了， 通过Pysco对Python进行JIT加速，能够使Python获得2-3倍的效率提升。 和前述方法不同的是，它一开始并没有尝试对Cpython进行彻头彻尾的重造。 而是仅仅对现有的Python进行一定程度上得加速。 然而不幸的是项目的创始人最终还是停止了Pysco上得开发，转而投向了Pypy对Python进行本质上得改造。

2.4 Cython

[Cython][1] 并非完整的Python运行时实现（能够兼容大部分Python语法），Cython通过将现有的Python代码编译成更加高效的字节码供运行时使用。 Cython的介绍显示在一般的Pybench测试中超过Cpython效率30%，对于一般的循环优化等等则达到了20%-60%的改善。
    
2.5 Stackless

函数的调用总是伴随着开销，即便是在最底层的C语言下也是这样，所以C语言里会有内联这样的编译特性来取消不必要的函数调用开销。 在python里也是如此，stackless通过引入一种开销很低的纤程，类似coroutine。 如果使用得当，能够改善多线程程序的性能，可读性；提高程序员效率。
    
然而Stackless并没有流行开来，虽然官网仍然维持着一些稳定版本，但是引用量并不高。 stackless的主要的贡献人员也已经[转向了pypy][6]，他们将stackless的一些主要思想在pypy中进行了更好的实现。 在标准的python版本中stackless也没有能够取得一席之地， 主要原因在于stackless的发起者并没有能够很系统理论的陈述stackless， 并且stackless无法在Jython和IronPython中实现。

==

  [1]:https://github.com/cython/cython/wiki/FAQ#id10 
  [2]:http://jimmyg.org/blog/2009/ironpython-jython-scala.html
  [3]:http://www.oschina.net/translate/why-are-there-so-many-pythons
  [4]:http://stackoverflow.com/questions/18946662/why-shouldnt-i-use-pypy-over-cpython-if-pypy-is-6-3-times-faster
  [5]:https://tech.dropbox.com/2014/04/introducing-pyston-an-upcoming-jit-based-python-implementation/
  [6]:http://stackoverflow.com/questions/588958/what-are-the-drawbacks-of-stackless-python