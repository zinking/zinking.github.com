用Python破解MI6密码

2015年圣诞英国情报机构GCHQ发布了一款圣诞贺卡，贺卡上印着一道“以数绘画”(Nonogram) 的谜题。 据说解开这个谜题就可以获得加入英国情报机构MI6的机会。 “以数绘画”是一种逻辑游戏，以猜谜的方式绘画位图。 在一个网格中， 每一行和和列都有一组数，玩家需要根据它们来填满或者留空各自，最后就可以由此得出一副位图。 例如：“4 8 3”的意思就是该行或者列上有三条独立的连块，长度分别为4，8和3。每个连块至少要由一个空格分开。

你可以到这个位置体验一下这个游戏: http://chat.kongregate.com/gamez/0020/5542/live/PicrossMadness_kongregate.swf
GCHQ发布的以数绘画是这样的 Copyright GCHQ. See the GCHQ post for the full image.

跟上面的简单版本不一样的是，这个以数绘画的版本高出几个数量级，你可以尝试手动解出这幅画，当然也可以借助计算机来解决这个难题。直观上来讲，这是个搜索问题，回溯搜索加各种剪枝应该能解决这个问题。 这里另辟蹊径，尝试将谜题转换成布尔可满足问题(SAT），然后借助现有的SAT解法器来解决这个问题。

布尔可满足性问题（SAT）在算法课上的P/NP环节听到过，有大概的映像这是一类非常困难的NPC完全问题。 把一个谜题转换成NPC问题听起来似乎并不明智，并且用SAT解法不一定有回溯搜索快。 然而， 首先SAT作为一个研究的热点（广泛应用在人工智能，电路设计，自动定理证明），近来的算法效率不断提升；其次，困难问题之间的相互转化比问题的解要有意思的多；再者，SAT算法有个非常好用的python包 picosat。

重点是探索难题之间的互相转换提供了解决问题时候的发散思维， 将困难的问题转换成著名的问题是非常重要的思维方式。

那么要将“以数绘画”转换成SAT问题重要的就是要把以数绘画问题转换成SAT的合取范式。 

快速回顾一下：什么是合取范式？合取范式简单来说就是一系列并的交集. 例如： 布尔表达式 `A & (B|!(D|E))` 写成合取范式就是 `A & (B|!D)&(B|!E)`
SAT算法能够决定合取范式里变量的布尔值，给出最后使得表达式为真的变量组合。 例如上面的例子中：可能的一组解是：
`A = True, B = True, C = False, D=True`

那么将“以数绘画“转换成CNF，就是要获得每个像素的状态，满足一组行和列的约束要求。 很自然需要row*col个变量表示像素状态Shade(i,j) Sij为真那么就填充该像素。 25*25的位图就有625的状态

复杂的地方在于约束，如何将行和列上的约束表示成布尔表达式进一步写成CNF呢？
首先尝试用语言描述一下这些约束
-1. 行上的约束限制了行里的格子的状态
-2. 反过来说，如果一个格子被填充了，那么肯定有对应的行约束来表示这种状态
-3. 一个行约束最多在一个位置
-4. 某个位置的行约束意味着下一个行约束必然出现在第一个行约束之后
-5. 行约束必须位于正确的位置
以上描述对于列同样适用

基于上面的讨论引出下面的布尔变量：
RowRunPos(i,j,k) 第i行的第j个约束出现在第k列
ColRunPos(i,j,k) 第i列的第j个约束出现在第k行
也就是说对于图画边上的每个约束数字，引入了25个变量 （k为自由维度）

有了这些变量，用代码来表示上面的规则
```
def row_run_implies_shaded():
    clauses = []
    for (row, run_idx, start_col), run_var in row_run_vars.items():
        run_len = ROW_RUNS[row][run_idx]
        for col in range(start_col,
                         min(start_col + run_len, WIDTH)):
            clauses.append([-run_var.idx, shaded_vars[row, col].idx])
    return clauses
```

描述下上面的代码：
对于每一个行约束 ，其所在行，第几个约束， 约束开始列，约束长度。 如果该行约束成立那么该行约束下的所有格子必须是填充的。 也就是 A->B，写成合取范式就是!AVB

真正生成的何去范式数据是这样的
[
     [
          -809, #就是第一行的第二个行约束从第8列开始的话 => 第一行第8列是填充的
          34, #第一行第8列个约束是25+8，第34个布尔变量。 809也是变量编号
     ],
     [
          -809, #同样上面的行约束也推出第9列也是填充的 因为行约束长度缘故
          35,
     ]
]

```
def shaded_implies_row_run():
    clauses = []
    for (row, col), shaded_var in shaded_vars.items():
        clause = [-shaded_var.idx]
        for run_idx, run_len in enumerate(ROW_RUNS[row]):
            clause += [row_run_vars[row, run_idx, start_col].idx
                            for start_col in range(max(0, col - run_len + 1),
                                                   col + 1)]
        clauses.append(clause)
    return clauses
```

填充反过来也约束行约束
如果 i行j列格子如果填充的话，那么约束这个格子的行约束也必须成立

```
def row_run_ordering():
    clauses = []
    for (row, run_idx, start_col), run_var in row_run_vars.items():
        if run_idx < len(ROW_RUNS[row]) - 1:
            first_valid_col = start_col + ROW_RUNS[row][run_idx] + 1
            for other_start_col in range(min(first_valid_col, WIDTH)):
                other_run_var = row_run_vars[row, run_idx + 1, other_start_col]
                clauses.append([-run_var.idx, -other_run_var.idx])
    return clauses
```

行约束之间必须要有间隔。同一行的相邻约束，例如第一个约束和第二个约束，如果第二哥约束的开始列紧挨着第一个约束，那么这两个约束不能同时成立

```
def row_run_at_most_one_position():
    clauses = []
    for (row, run_idx, start_col), run_var in row_run_vars.items():
        for other_start_col in range(WIDTH):
            if other_start_col != start_col:
                other_run_var = row_run_vars[row, run_idx, other_start_col]
                clauses.append([-run_var.idx, -other_run_var.idx])
    return clauses
```

同一行的，同一个位置的不同列开始的约束中，两个不能都成立
```
def row_run_at_least_one_position():
    clauses = []
    for row in range(HEIGHT):
        for run_idx, run_len in enumerate(ROW_RUNS[row]):
            clause = []
            for start_col in range(WIDTH):
                clause.append(row_run_vars[row, run_idx, start_col].idx)
            clauses.append(clause)
    return clauses
```

但是这些行约束中必须至少有一个要成立

```
def exclude_invalid_row_run_positions():
    clauses = []
    for row in range(HEIGHT):
        for run_idx, run_len in enumerate(ROW_RUNS[row]):
            for start_col in range(WIDTH - run_len + 1, WIDTH):
                clauses.append([-row_run_vars[row, run_idx, start_col].idx])
    return clauses
```

排除那些开始列+约束长度超过了边长的约束

```
def fix_givens():
    clauses = []
    for row, col in GIVENS:
        clauses.append([shaded_vars[row, col].idx])

    return clauses
```

已经给定的那些约束要满足

最后打印结果

```
def pretty_print_solution(sol):
    true_var_indices = {t for t in sol if t > 0}
    for row in range(HEIGHT):
        print "".join(".#"[shaded_vars[row, col].idx in true_var_indices]
                                                       for col in range(WIDTH))
    print
```

完整代码： https://github.com/matthewearl/gchq-xmas/blob/master/gchq-xmas.py

以数化猜的SAT解法的复杂性在于表达行列约束，以及施加行列约束好谜题本身的关注点格子填充之间的关系。 但是代码本身的可读性还是很模块化，逻辑化的。 代码完全就是以人的思维方式在描述谜题本身所满足的各种约束。 只是虽然这些约束写在纸上虽然非常直观，但是在自己去表达的时候难免有所遗漏，恐怕也不是一蹴而就。 

问题转化带来的脑洞扩张是有用的：比如你可能想到这个也可以拿来解决八皇后问题。 

举个例子, 一起来尝试一下Einstein 谜题 - The Einstein Puzzle
There are 5 houses in five different colors. They are lined up in a row side by side. 
In each house lives a person with a different nationality. 
These 5 owners drink a certain drink, smoke a certain brand of tobacco and keep a certain pet. 
No owners have the same pet, smoke the same tobacco, or drink the same drink. 
As you look at the 5 houses from across the street, the green house is adjacent to the left of the white house 

The Big Question is: Who owns the Fish?

CLUES: 
1、The Brit lives in the red house 
2、The Swede keeps dogs as pets 
3、The Dane drinks tea 
4、The green house is on the immediate left of the white house as you stare at the front of the 5 houses 
5、The green house owner drinks coffee 
6、The person who smokes Pall Mall raises birds 
7、The owner of the yellow house smokes Dunhill 
8、The man living in the house right in the center drinks milk 
9、The Norwegian lives in the first house 
10、The man who smokes Blends lives next to the one who keeps cats 
11、The man who keeps horses lives next to the one who smokes Dunhill 
12、The owner who smokes Bluemaster drinks juice 
13、The German smokes Prince 
14、The Norwegian lives next to the blue house 
15、The man who smokes Blend has a neighbor who drinks water. 

那么我们的变量有：
房子 H1 H2 H3 H4 H5 (R,G,W,B,Y)
国籍 N1 N2 N3 N4 N5 (Brit,Swede,Dane,German,Nor)
饮料 D1 D2 D3 D4 D5 (Tea,coffee,milk, juice, water) 
香烟 G1 G2 G3 G4 G5 (pm, dunhill, blends, blue master, prince)
宠物 P1 P2 P3 P4 P5(dog, birds, cats, horses, fish 

从前面的解法中我们得到的经验就是不要担心SAT的维度, 而应该侧重于运用代数逻辑将谜题里的限制条件表达出来. 那么这里,一共有5个维度. 每个维度的每个变量都存在着5个可能的位置, 于是我们为每个维度变量的这5个位置都生成一个SAT变量. 

```
def make_dimension(name, vals, dmap):
    clauses = []
    grid =  [[0 for i in range(W)] for j in range(W)]
    row = 0
    #for val in ["Red","Green","White","Blue","Yellow"]:
    for val in vals:
        for i in range(W):
            dim_val_var = DimVar(name,val,i)
            dmap[(val,i)] = dim_val_var
            grid[row][i] = dim_val_var.idx
        clauses.extend(rule_one_dimval_one_position(grid[row]))
        row += 1
    for col in range(W):
        column = [grid[i][col] for i in range(W)]
        clauses.extend(rule_one_dimval_one_position(column))
    return clauses;
```

第二点是维度与维度之间的合取关系.  规则“住绿房子的人喝着咖啡”让我们知道绿房子的人可能住在5个坐标的任意一个上, 咖啡也同样可能出现在5个位置上. 用逻辑表达式表示出来就是
(G1^Coffee1)V(G2^Coffee2)V(G3^Coffee3)V(G4^Coffee4)V(G5^Coffee5)
也就是5个状态中任意一个均可行. 注意到这是一个析取范式, 和解法器需要的合取范式有较大差别. 如果强行将析取范式转换成合取范式,那么得到的结果没有办法理解也容易出错. 

```
BooleanConvert[(g1∧c1)∨(g2∧c2)∨(g3∧c3)∨(g4∧c4), CNF]
```


可以借鉴”以数绘画”谜题的解法, 引入蕴含谓词 p, G^Coffee -> p && p -> G^Coffee 那么析取范式里的合取都可以转换成两个条件: G^Coffee -> p 以及 p -> G^Coffee. 这两者条件是同时存在的关系, 于是G^Coffee就等价于蕴含为此的成立. 将他们转换成合取范式:
G^Coffee -> p => ~(G^Coffee)v(p) => (~Gv~Coffeevp)
P -> (G^Coffee) => ~p v (G^Coffe) => (~p v G) ^ (~p v Coffee)
于是每个析取范式里的合取都可以转换成三个合取范式: (~Gv~Coffeevp) ^ (~p v G) ^ (~p v Coffee)
以及整个析取范式可以转换成一个额外的合取(p1 v p2 v p3 v p4 v p5)

```
def middle_p(v1, v2, p):
    clauses = []
    clauses.append([-v1,-v2,p])
    clauses.append([-p,v1])
    clauses.append([-p,v2])        
    return clauses

def rule_imply(dim1,val1,dim2,val2):
    clauses = []
    relations = []
    prelations = []
    for i in range(W):
        v1 = dim1[(val1,i)].idx
        v2 = dim2[(val2,i)].idx
        p = Var("Imp[%d^%d]"%(v1,v2)).idx
        clauses.extend(middle_p(v1,v2,p))
        prelations.append(p)
    clauses.append(prelations)
    return clauses
```

这种转换方式在后面的逻辑条件里也被大量运用. 比如邻居关系, 同样适用析取范式更容易表示更直观, 然后可以适用上面的方法将其转换成合取范式.

```
def rule_neighbor(dim1,val1,dim2,val2):
    clauses = []
    prelations = []
    for i in range(W):
        j1 = i-1
        j2 = i+1
        if j1 >= 0 : #to the left
            v1 = dim1[(val1,i)].idx
            v2 = dim2[(val2,j1)].idx
            p = Var("NLImp[%d^%d]"%(v1,v2)).idx
            clauses.extend(middle_p(v1,v2,p))
            prelations.append(p)
        if j2 < W: # to the right
            v1 = dim1[(val1,i)].idx
            v2 = dim2[(val2,j2)].idx
            p = Var("NRImp[%d^%d]"%(v1,v2)).idx
            clauses.extend(middle_p(v1,v2,p))
            prelations.append(p)
    clauses.append(prelations)
    return clauses
```

运行后的结果是
[(0, 'Yellow'), (1, 'Blue'), (2, 'Red'), (3, 'Green'), (4, 'White')]
[(0, 'Norwish'), (1, 'Dane'), (2, 'British'), (3, 'German'), (4, 'Swede')]
[(0, 'Water'), (1, 'Tea'), (2, 'Milk'), (3, 'Coffee'), (4, 'Juice')]
[(0, 'DunHill'), (1, 'Blends'), (2, 'PallMall'), (3, 'Prince'), (4, 'BlueMaster')]
[(0, 'Cats'), (1, 'Horses'), (2, 'Birds'), (3, 'Fishes'), (4, 'Dogs')]
而且只有一组解. 

完整代码：https://github.com/zinking/gchq-xmas/blob/master/einstein-puzzle.py [7] 算不上简单, 比起传统的回溯搜索来解决这个问题看起来复杂了不少, 代码量也增加了不少. 但是重要的是从另外一个角度来思考解决问题. 从SAT这种”直观”的问题表述我们也可以进一步理解说为什么所有的问题都能转换成”是或者否”的问题, 为什么SAT解法器的发展对人工智能至关重要.


[1] https://matthewearl.github.io/2015/12/10/gchq-xmas-card/

[2] https://www.reddit.com/r/programming/comments/3wcyu5/how_i_solved_gchqs_xmas_card_with_python_and/

[3] http://www.chiark.greenend.org.uk/%7Esgtatham/puzzles/js/pattern.html

[4] http://chat.kongregate.com/gamez/0020/5542/live/PicrossMadness_kongregate.swf

[5] https://github.com/matthewearl/gchq-xmas/blob/master/gchq-xmas.py

[6] https://zh.wikipedia.org/wiki/Nonogram

[7] https://github.com/zinking/gchq-xmas/blob/master/einstein-puzzle.py







