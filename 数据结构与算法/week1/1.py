def f1(a, b, c=0, *args, **kw):
    print('a=', a, 'b=', b, 'c=', c, 'args=', args, 'kw=', kw)


f1(1, 2, 3, 'a', 'b')  			# a= 1 b= 2 c= 3 args= ('a', 'b') kw= {}
f1(1, 2, 3, 'a', 'b', x=99) # a= 1 b= 2 c= 3 args= ('a', 'b') kw= {'x': 99}
# 通过一个 tuple 和 dict 巧妙调用：
t = (1, 2, 3, 4)
d = {'name': "moxy"}
f1(*t, **d)