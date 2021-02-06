from collections.abc import Iterator
g = (x * x for x in range(10))  # 小括号创建了一个 generator
isTrue = isinstance(g, Iterator)# 判断是否为一个Iterator
print(isTrue)										# True
print(next(g))  		# 1
print(next(g))			# 4

l = list(range(5))
print(isinstance(l, Iterator))
l2 = iter(l)
print(isinstance(l2, Iterator))