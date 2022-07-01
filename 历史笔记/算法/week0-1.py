# 先定义这个类中的方法
def func(self, name='NJ'):
  	print('Student, %s.' % name)

# 用 type() 创建类，三个参数：类名、父类、类的方法
Student = type('Student', (object, ), dict(name = func))

h = Student()
h.name('Moxy')
h.name()