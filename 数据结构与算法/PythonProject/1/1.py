# date: 2021/2/3
print('hello world!')

# 将数据输出到文件中
fp = open('/Users/moxy/Desktop/1.md', 'a+')
print('hello world again!', file=fp)
fp.close()

# 不进行换行输出
