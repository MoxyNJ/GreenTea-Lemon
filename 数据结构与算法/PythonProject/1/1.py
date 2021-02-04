# date: 2021/2/3
print('hello world!')

# 将数据输出到文件中
fp = open('/Users/moxy/Desktop/见到你很高兴.md', 'a+')
print('hello world again!', file=fp)
fp.close()

# 转义字符 \n  \r  \t  \b
# 转义字符 换行 回车 制表 腿格

# 字符编码
# 0b开头，二进制
# 0o开头，八进制
# 0x开头，十六进制
print(chr(0b100111001011000))
# "乘"
print(ord('乘'))
# "20056"   十进制

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
# int, float, bool, str

# bool
True and True   # 且 &&
True or False   # 或 ||
not True        # 非 !

# if ... else
age = 25
if age >= 18:
    print('adult')
else:
    print('teenager')

# 空值: None表示空值，不是 0
print(None)

# 常量用大写表示，但是python没有一个机制可以限制常量不被修改。
# 变量赋值类似 JavaScript 一样，动态语言。

# 除法： / 精确除法  // 地板除法，保留正数
print(10 / 3)   # 3.3333333333333335
print(10 // 3)  # 3


