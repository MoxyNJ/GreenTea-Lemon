from functools import reduce

def f(x, y):
    d = {'0': 0, '1': 1, '2': 2, '3': 3, '4': 4, '5': 5, '6': 6, '7': 7, '8': 8, '9': 9}
    return x * 10 + d[y]

str1 = '13579'
number = reduce(f, '13579'))
print(number) # 123456789
# 13579
