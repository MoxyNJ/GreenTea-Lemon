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