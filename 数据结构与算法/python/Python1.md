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









