# 1 基础

```python
x = input('输入：')
print('Hello World')
print(x)
# input 返回的是str字符串，需要用强制类型转换为其他类型
number = int(x)  # 转换为 int类型

# 将数据输出到文件中
fp = open('/Users/moxy/Desktop/见到你很高兴.md', 'a+')
print('hello world again!', file = fp)
fp.close()
```

### 转义字符

```python
# 转义字符 \n  \r  \t  \b
# 转义字符 换行 回车 制表 腿格
```

### 字符编码

```python
# 0b开头，二进制
# 0o开头，八进制
# 0x开头，十六进制
chr(0b100111001011000)		# "乘"
ord('乘')						 # "20056"   十进制

ord('A')  # 65
ord('中') # 20013
chr(66)   # 'B'
chr(25991)  # '文'
```

### 变量 &  数据类型

```python
# 变量的定义和使用
# 变量的组成：
#   id      标识：对象的存储地址，使用 id(obj) 获取
#   type    类型：对象的数据类型，使用 type(obj) 获取
#   value   值：对象的值，使用 print(obj) 打印
name = 'Moxy'
print('id: ', id(name))
print('type: ', type(name))
print('value: ', name)
# id:  140458852403696
# type:  <class 'str'>
# value:  Moxy

# 数据类型
# int, float, bool, str, list

# bool
print(True and True)   # 且 &&
print(True or False)   # 或 ||
print(not True)        # 非 !

# 空值: None表示空值，不是 0
print(None)

# 常量用大写表示，但是python没有一个机制可以限制常量不被修改。
# 变量赋值类似 JavaScript 一样，动态语言。
```



#### 数据类型转换

```python
int('123')			# 123
int(12.34)			# 12
float('12.34')	# 1,23
str(1.23)		# '1.23'
str(100)		# '100'
bool(1) 		# True
bool('')		# False
```





#### [list]

列表：类似 JavaScript中的数组。

```python
s = ['Moxy', 'Ninjee', 'Jack']

# 方法
len(classmates)    # 3 总数量为3
s[-1]           # 'Jack'   获取最后一个元素
s[-2]           # 'Ninjee' 获取倒数第二个元素

# 插入：末尾
s.append('Bob')
print(s)   # ['Moxy', 'Ninjee', 'Jack', 'Bob']

# 插入：任意下标位置
s.insert(2, 'Happy')
print(s)   # ['Moxy', 'Ninjee', 'Happy', 'Jack', 'Bob']

# 删除：末尾
s.pop()    # 返回：'Bob'

# 删除：任意下标位置
s.pop(2)   # 返回：'Happy'
```



#### (tuple)

元组：有序列表，一旦初始化就不能修改。

```python
t = ('A', 'B', 'C')
t = (123, )    # 定义一个元素时，为了消除歧义必须加一个逗号，不然会判定为int变量。
```



#### {dict}

dict和map类似，是一个 K/V 键/值对。

- Key 不可重复。

```python
d = {'Michael': 95, 'Bob': 75, 'Tracy': 85}

# 根据 K 找 V
d['Michael']  # 95

# in 判断是否元素存在
'Michael' in d. # True

# get 获取一个 V
d.get('Michael', '错误')  # 95, 如果元素不存在，会返回第二个参数：'错误'

# pop 删除一个 v
d.pop('Bob')
```

对比 list 和 dict

- dict 插入、查找速度更快，不会随着key的增加而变慢
- dict 需要占用更高的内存资源
- list 插入、查找速度随着element增加而变慢
- list 占用更少的内存资源

hash 哈希算法：dict中，通过key查找 value是利用的哈希算法，所以 key 是唯一的，不可重复。



#### ([set])

Set 只存储不可重复的 key。没有value。

如果加入了重复的元素，就会自动被过滤。

```python
s = set([1, 2, 3])
print(s)    # {1, 2, 3}

# add 添加元素
s.add(3)
s.add(4)
print(s)     # {1, 2, 3, 4}

# remove 删除元素
s.remove(4)

# 交集、并集
s1 = set([1, 2, 3])
s2 = set([2, 3, 4])
print(s1 & s2)   # {2, 3} 交集
print(s1 | s2)   # {1, 2, 3, 4} 并集
```





### 基本运算

```python
# 除法： / 精确除法  // 地板除法，保留正数
print(10 / 3)   # 3.3333333333333335
print(10 // 3)  # 3
```



### 格式化

| 占位符 | 替换内容     |
| :----- | :----------- |
| %d     | 整数         |
| %f     | 浮点数       |
| %s     | 字符串       |
| %x     | 十六进制整数 |

```python
a = 'Hello'
b = 'Moxy'
c = 25
print('%s, %s: bye %d' % (a, b, c))
# Hello, Moxy: bye 25
```



### 语句 

```python
#❗️if ... else
age = 25
if age == 0:
  	print('No')
elif age <= 18:
    print('tennager')
    print('age<=10')
elif age <= 30:
    print('age<=30')
else:
  	print('age>30')
    
    
# ❗️for in 迭代
s = [1, 2, 3, 4]
for number in s:
  	print(number)
    
# 生成一个 1到50到list，然后迭代相加，最后输出
s = range(50)
sum = 0
for number in s:
  	sum = sum + number
print('answer is:', sum)  # answer is: 1225


# ❗️while
n = 10;
while n > 0:
  	print(n)
    n --

# ❗️break continut 和以前一样
```



# 2 函数

### 定义函数

```python
def func(x):
	x = x + 1
	return x

print(func(1))   # 2


# return none 可以简写为 return


# ❗️空函数pass，相当于一个占位符。
def nop():
  pass

# 空if else
if x > 10:
  pass
```



### 参数

```python
# isinstance 设置参数类型检查
def func(x):
	if not isinstance(x, (int, float)):
		raise TypeError('you input number that are wrong!')
	return x

print(func(123))   # 123
print(func('123')) # 报错：Traceback ...


# 可以return多个值，事实上是return了一个tuple：
def func():
  x = 100
  y = 200
  return x, y

a, b = func()
print(a, b)   # 100, 200
t = func()
print(t)      # (100, 200)

# ❗️必选参数、默认参数、可变参数、命名关键字参数和关键字参数默认参数
# 默认参数如果是多个，指定参数名传递数值
def func(x, y=2, z=3):
  return x + y + z

func(1, 1, 1)   # 3
func(2)      # 7
func(1, z=1) # 4，指定参数名传递数值
# 最函数参数的初始化，在定义的时候就被计算出，所以此处要尽量使用不变变量：str、none。


# ❗️可变参数 *
# 参数长度可变，传入的参数会自动组装为 (tuple)
def func(*numbers):
  sum = 0
  for n in numbers:
    sum += n
  return sum

print(func(1, 2, 3))		# 6
print(func(1))					# 1
print(func(1, 2, 3, 4))	# 10

# ❗️关键字参数 
# 参数长度可变，传入的参数会自动组装为 {dict}
def person(name, age, **more):
    print('name:', name, 'age', age, 'other', more)

person('Moxy', 26, in1='I\'m a happy', in2='guy', in3=77)
person('Ninjee', 16)
# name: Moxy age 26 other {'in1': "I'm a happy", 'in2': 'guy', 'in3': 77}
# name: Ninjee age 16 other {}

# ❗️命名关键字参数：参数必须命名参数
# 添加一个 *，* 后的参数变成命名参数，传入参数时必须有对应相同的名称。
def person(name, age, *, city, job):
    print(name, age, city, job)

person('Moxy', 26, 'TY', 'Student')  # 错误，必须命名
person('Moxy', 26, 30, 30, 30, city='TY', job='Student') # 错误，不是可变参数
person('Moxy', 26, city='TY', job='Student')  # 正确

# ❗️参数组合顺序：必选参数、默认参数、可变参数、命名关键字参数、关键字参数
# ❗️参数组合顺序：   a   、  b=3 、  *c   、   *, e, f  、  **d  
def f1(a, b, c=0, *args, **kw):
    print('a=', a, 'b=', b, 'c=', c, 'args=', args, 'kw=', kw)
    
f1(1, 2, 3, 'a', 'b')  			# a= 1 b= 2 c= 3 args= ('a', 'b') kw= {}
f1(1, 2, 3, 'a', 'b', x=99) # a= 1 b= 2 c= 3 args= ('a', 'b') kw= {'x': 99}

# 调用函数时，也可以用 * 或 ** 传入一个 tuple 或 dict
# 通过一个 tuple 和 dict 巧妙调用：
t = (1, 2, 3, 4)
d = {'name': "moxy"}
f1(*t, **d)                 # a= 1 b= 2 c= 3 args= (4,) kw= {'name': 'moxy'}

```



### 切片

从一个list中，取出一小段。还可以两个分号，实现类似每间隔两个数，取一个数这样的效果。

```python
L = list(range(100))

print(L)            # 【0, 1, 2, ...  99]

# 0开始取，到3前截止
print(L[0:3])       # 0, 1, 2
print(L[5:8])       # 1, 2
print(L[3:2])       # [], 第二个数不能小于第一个

# 支持负数
print(L[-3:-1])     # [97, 98]
print(L[-3:])       # [97, 98, 99] 取后三个数
print(L[:3])        # [0, 1, 2]    取前三个数

```



### 迭代

```python
L = list(range(10))     # list 可更改的有序列表     [ ]
T = tuple(range(10))    # tuple 不可更改的有序列表   ( )
D = {'a': 1, 'b': 2, 'c': 3}     # dict == map K/V对       { }
S = set(range(10))      # set K                  ([ ])

# 迭代
for l in L:
    print('L:', l)

for t in T:
    print('T:', t)

for key in D:   # 通常是遍历 key
    print('D:', key)

for value in D.values():
    print('D.value:', value)

for key, value in D.items():
    print('D.key:', key, 'D.value:', value)

for s in S:
    print('S:', s)
    
# 判断可迭代对象
from collections import Iterable
isinstance(obj, Iterable)

# 下标循环
for key, value in enumerate(list(range(10, 20))):
    print(key, value)
# 0 10
# 1 11
# 2 12
# 3 13
# 4 14
# 5 15
# 6 16
# 7 17
# 8 18
# 9 19
```



### 列表生成式

```python
# 输出1到11
list(range(1, 11))
# [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

# 最终要保留的元素，写在最前面
# 每个元素都平方一下，输出。
[x * x for x in range(1, 11)]
# [1, 4, 9, 16, 25, 36, 49, 64, 81, 100]

# 只输出偶数的平方，添加if条件
[x * x for x in range(1, 11) if x % 2 == 0]
# [4, 16, 36, 64, 100]

# 两层 for in 循环
[m + n for m in 'ABC' for n in 'XYZ']
# ['AX', 'AY', 'AZ', 'BX', 'BY', 'BZ', 'CX', 'CY', 'CZ']
```



### generator

```python
# 创建 list 用[方括号]
L = [x * x for x in range(10)]
print(L)		# [0, 1, 4, 9, 16, 25, 36, 49, 64, 81]

# 创建 generator 用(小括号)
g = (x * x for x in range(10))
print(g)		# <generator object <genexpr> at 0x7fbd8018e150>

print(next(g))		# 0
print(next(g))		# 1
print(next(g))		# 4

for n in g:
  print(n)				# 0  1  4  ..
  
# yield 类 似 JavaScript中的yield
# 定义一个generator对象，名为 odd
def odd():
    print('step 1')
    yield 1
    print('step 2')
    yield 3
    print('step 3')
    yield 5
# 对象实例化 + 调用
o = odd()
a = next(o)
b = next(o)
c = next(o)
print("return next:", a, b, c)
# step 1
# step 2
# step 3
# return next: 1 3 5
# 在执行过程中，遇到yield就中断，下次从中断位置继续执行
```



### Iterator

可以被`next()`函数调用并不断返回下一个值的对象称为迭代器：`Iterator`。

- `Generator` 是 `Iterator` 的一个子集。
- `list`、`dict`、`str`是`Iterable`，不是`Iterator`。

```python
# generator
from collections.abc import Iterator
g = (x * x for x in range(10))  # 小括号创建了一个 generator
isTrue = isinstance(g, Iterator)# 判断是否为一个Iterator
print(isTrue)										# True
print(next(g))  		# 0
print(next(g))			# 1

# Iterable 转化为 Iterator
# iter()
l = list(range(5))
print(isinstance(l, Iterator))		# False
l2 = iter(l)
print(isinstance(l2, Iterator))		# True


```

- 凡是可作用于`for`循环的对象都是`Iterable`类型；

- 凡是可作用于`next()`函数的对象都是`Iterator`类型，它们表示一个惰性计算的序列；
  - 惰性序列：只有在调用 `next()`时，才会计算下一个元素是什么，这样节约运行开销。
  - `for`：Python的`for`循环本质上就是通过不断调用`next()`函数实现的



# 3 函数式编程

### map()

`map(func, Iterable)`

- 原理：map() 函数会遍历一次Iterable序列。每遍历到一个元素，就会把这个元素传递给 func，执行一次func。最后，返回一个新的map序列。
- Func：传入每个元素后，进行处理，最后 return 这个元素。
- 返回：map最终返回一个map序列

```python
# map() 实现对list的每个元素都平方。
l1 = list(range(10))
def f(x):
    return x * x

l2 = map(f, l1)
print(l1)
print(l2)
print(list(l2))

# [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
# <map object at 0x7fea901d5090>
# [0, 1, 4, 9, 16, 25, 36, 49, 64, 81]

# 技巧：
# 把一个list中，所有数字转换为字符串：
a = str(1)  # '1',转换方式时str(number）

l1 = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
l2 = list(map(str, l1))
# ['1', '2', '3', '4', '5', '6', '7', '8', '9']
```



### reduce()

`reduce(func, Iterable)`

- 需要引入：`from functools import reduce`

- 原理：reduce()函数会遍历一次Iterable序列。每遍历到一个元素，就会把这个元素传递给func，执行一次func，然后执行结果会传递给下一个func。最后返回这个值。
- func：传递两个参数：上一个func的处理结果，当前遍历到的元素。返回新的处理结果。
- 返回：一个值。

```python
# 对 1～9进行累加。
from functools import reduce
l1 = list(range(10))
def f(x, y):
    return x + y

result = reduce(f, l1)
print(l1)
print(result)
# [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
# 45

# 技巧：
# 把一个str转换为一个int
from functools import reduce

def f(x, y):
	return x * 10 + y

# 转换方式：利用dict不可重复的key，参数s只要匹配到相同的key，就返回这个value。
def toInt(s):
    d = {'0': 0, '1': 1, '2': 2, '3': 3, '4': 4, '5': 5, '6': 6, '7': 7, '8': 8, '9': 9}
    return d[s]

str1 = '13579'
number = reduce(f, map(toInt, '13579'))
print(number)		# 13579

# 技巧2: 上面的函数合二为一

```



### filter()

`filter(f, Iterable)`

- 原理：用于过滤。`filter()`函数依次作用于每个元素，根据返回值是`True`还是`False`决定保留还是丢弃该元素。

```python
# 在一个list中，删掉偶数，只保留奇数
def is_odd(n):
    return n % 2 == 1

list(filter(is_odd, [1, 2, 4, 5, 6, 9, 10, 15]))
# 结果: [1, 5, 9, 15]
```



### sorted

`sorted(Iterable [, func])`

- 如果不加 func，默认升序。从小到大。
- 如果加 func：
  - 对每个元素都进行一次func。
  - key用法叫为多变，遇到再说。



### lambda

匿名函数，相当于箭头函数。

```python
# 使用 Iambda
list(map(lambda x: x * x, [1, 2, 3, 4, 5, 6, 7, 8, 9]))
[1, 4, 9, 16, 25, 36, 49, 64, 81]
```



# 4 面向对象编程

定义：

```python
class Student(object):
    # 构造函数
    def __init__(self, name, score):
        self.name = name
        self.score = score

    # 方法
    def printScore(self):
        print('%s: %s' % (self.name, self.score))

# 实例化
Moxy = Student('Moxy', 99)

# 地址
print(Student)  # <class '__main__.Student'>
print(Moxy)     # <__main__.Student object at 0x7f98e81d5550>

# 调用
print(Moxy.name, Moxy.score) # Moxy 99
Moxy.printScore() # Moxy: 99
```



### 私有变量 

"封装"

在需要设置 private 的变量前，添加两个下划线即可。 `__`

```python
class Student(object):
    # 构造函数
    def __init__(self, name, score):
        self.__name = name
        self.__score = score
   	

    # 方法
    def printScore(self):
        print('%s: %s' % (self.__name, self.__score))

# 实例化
Moxy = Student('Moxy', 99)

# 调用
print(Moxy.name, Moxy.score)     
# 错误：AttributeError: 'Student' object has no attribute 'name'

print(Moxy.__name, Moxy.__score) 
# 错误：AttributeError: 'Student' object has no attribute '__name'

Moxy.printScore() # Moxy: 99

# 不建议强制访问：
print(Moxy._Student__name)  # Moxy
print(Moxy._Student__score) # 99
```



对比：

- `__name`：private 私有变量
- `__name__`：特殊变量，但是可以直接访问。
- `_name`：“虽然我可以被访问，但是，请把我视为私有变量，不要随意访问”。



set get：

```python
class Student(object):
    # 构造函数
    def __init__(self, name, score):
        self.__name = name
        self.__score = score

    # private: get set
    def get_score(self):
        return self.__score

    def set_score(self, score):
        if 0 <= score <= 100:
        	self.__score = score
        	return True
    	else:
        	return False

    # 方法

    def printScore(self):
        print('%s: %s' % (self.__name, self.__score))

Moxy = Student('Moxy', 99)

print(Moxy.set_score(-1)) 	# False
print(Moxy.set_score(100)) 	# True
print(Moxy.get_score()) 		# 100
```



### 继承

- 一个子类如果想继承一个父类：
  - 不是 Java 中的：`class 子类 extends 父类 {...}`
  - 而是传入参数：`class 子类(父类1, 父类2, 父类3)`
  - Python 支持多重继承

这是一个不同的风格，注意区分。

#### 定义：

```python
# 父类
class Animal(object):
    def run(self):
        print("I'm a Animal method")

# 子类 新方法
class Dog(Animal):
    def dogRun(self):
        print("I'm a dog method")

# 子类 多态：覆盖父类方法
class Cat(Animal):
    def run(self):
        print("I'm a cat method")

# 实例化
animal = Animal()
dog = Dog()
cat = Cat()

# run() 地址不相同
print(animal.run)	# <bound method Animal.run of <__main__.Animal object at 0x7fcbd019b490>>
print(dog.run)		# <bound method Animal.run of <__main__.Dog object at 0x7fcbd019b510>>

# 继承
dog.dogRun()	# I'm a dog method

# 多态
animal.run()	# I'm a Animal method
dog.run()			# I'm a Animal method
cat.run()			# I'm a cat method

# 判断：数据类型
print(isinstance(Animal, object))	# True 所有对象都是 object

print(isinstance(animal,Animal))	# True 实例化是 Animal数据类型
print(isinstance(cat,Cat))				# True
print(isinstance(cat,Animal))			# True
```



#### 多态：数据类型相同的特点

```python
# 传入一个 Animal数据类型的实例时，调用各自的方法。
def runDifferent(Animal):
	Animal.run()
  
runDifferent(Animal())				# I'm a Animal method
runDifferent(Cat())						# I'm a Cat method
```



#### 动态语言的多态：

对于静态语言（例如Java）来说

- 如果需要传入`Animal`类型，传入对象必须是`Animal`类型或者它的子类。否则，将无法调用`run()`方法。

对于Python这样的动态语言来说

- 则不一定需要传入`Animal`类型。只需要保证传入的对象有一个`run()`方法就可以了：



### 对象信息

#### type() & isinstance()

```python
# 基本数据类型
print(type(123))        # <class 'int'>
print(type('123å'))     # <class 'str'>

# 自定义的类
print(type(Animal()))   # <class '__main__.Animal'>
print(type(Animal))     # <class 'type'>

# 方法
print(type(abs))        # <class 'builtin_function_or_method'>

# 用instance也能判断：
print(isinstance(123,int))      # True
print(isinstance('123',str))    # True

# instance 还能判断是否是一下多个类型中的一个：
print(isinstance('123', (str, int)))    # True
print(isinstance(123, (str, int)))      # True
```



#### type() 创建对象

- 从上面可以看到，一个class的类型，就是type；而一个实例化Student类的对象，他的类型是Student。所以，可以用type来创建对象。

```python
# 先定义这个类中的方法
def func(self, name='NJ'):
  	print('Student, %s.' % name)

# 用 type() 创建类，三个参数：类名、父类、类的方法
Student = type('Student', (object, ), dict(name = func))

h = Student()
h.name('Moxy')
h.name()
# Student, Moxy.
# Student, NJ.
```



#### dir()

- 获取这个**对象**的所有属性和方法，不是用来获取**类**的。
- 返回一个包含字符串的list

```python
print(dir(123))
print(dir('123'))	
# ['__add__', '__class__',..., '__subclasshook__', 'capitalize',..., 'zfill']

print(dir(Animal))
print(dir(Animal()))
# 内容相同：['__class__', '__delattr__', '__dict__', '__dir__', '__doc__', '__eq__', '__format__', '__ge__', '__getattribute__', '__gt__', '__hash__', '__init__', '__init_subclass__', '__le__', '__lt__', '__module__', '__ne__', '__new__', '__reduce__', '__reduce_ex__', '__repr__', '__setattr__', '__sizeof__', '__str__', '__subclasshook__', '__weakref__', 'run']

# __xxx__ 是特殊保存方式：以下调用方式相同。 len()方法在python中，是用 __len__()保存的
len('ABC')			# 返回 3
'ABC'.__len__()	# 返回 3
```



#### getattr()	setattr()	hasattr()

获取、设置、判断某个**对象**的某个属性。

```python
class Person(object):
    def __init__(self, name, age):
        self.name = name
        self.age = age


moxy = Person('Moxy', 25)

# 判断：
print(hasattr(Person, 'name'))  # False，不能用来判断类
print(hasattr(moxy, 'name'))    # True
print(hasattr(moxy, 'class'))   # False

# 设置：
print(setattr(moxy, 'class', 1))# None 没有返回值

# 获取：
print(getattr(moxy, 'name'))    # Moxy
print(getattr(moxy, 'class'))   # 1

print(getattr(moxy, 'sex'))       # 报错：AttributeError: 'Person' object has no attribute 'sex'
print(getattr(moxy, 'sex', False))  # False 设置default，没有该属性就返回default
```



### 实例属性

- python的实例属性，"类似" java 中的静态属性。

```python
class Person(object):
    Pname = 'Person'
    
    def __init__(self, name, age):
        self.name = name
        self.age = age
    
moxy = Person('moxy', 25)

# 实例属性
print(moxy.name, moxy.age)  # moxy 25

# 类属性,子类都可访问
print(moxy.Pname)   # Person 子类没该属性就会找父类的属性
print(Person.Pname) # Person

# 可以给子类绑定父属性
moxy.Pname = 'Stuedent' 
print(moxy.Pname)   # Stuedent

# 删除子类的父属性定义
del moxy.Pname
print(moxy.Pname)   # Person
```



# 5 面向对象高级编程

### `__slots__`

- 限制 class 实例，使其只能添加的限定的属性，不能给这个class添加其他属性。

```python
# 如果没有添加限制，在实例化一个Student类后，可以添加其他属性上去：
class Student(object):
		pass
  
s = Studnet()
s.name = 'Moxy'
s.age = 'age'
s.class = 1

# 添加了 __slots__ 限制，给实例添加 name 和 age 这两个属性，其他属性报错
class Student(object):
  	__slots__ = ('name', 'age')

s = Studnet()
s.name = 'Moxy'
s.age = 'age'
s.class = 1 	# AttributeError: 'Student' object has no attribute 'class'

# 如果有子类继承了Student类，这个限制不作用在子类的实例上
class Man(Student):
  pass

m = Man()
m.class = 1 # 允许添加该属性
```



### @property

装饰器，把事情变简单，可以替换 get 和 set 函数。



### metaclass

元类。类似type()创建对象一样，提供一种创建对象的方法。

- 可以先定义metaclass，就可以创建类，最后创建实例。

```python
# 辨认：从 type继承而来的，通常就是一个 metaclass
class ListMetaclass(type):
    def __new__(cls, name, bases, attrs):
        attrs['add'] = lambda self, value: self.append(value)
        return type.__new__(cls, name, bases, attrs)
```



# 6 错误和调试

### try 捕获

```python
try:
  	pass
except someError as e:
  	print('except:', e)
finally:
  	print('finally...')s
```



### raise 抛出

```python
def func(s):
  	# some codes
    raise FuncError('error:....')
```



### assert 断言





