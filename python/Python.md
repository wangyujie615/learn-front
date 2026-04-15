# Python

## 常见库

### typing

**`typing`** 是 Python 3.5+ 的标准库，用于**类型提示（Type Hints）**，帮助静态类型检查器（如 mypy）、IDE 和语法检查器理解代码中的类型信息 。

| 类型               | 说明       | 示例                                                    |
| :----------------- | :--------- | :------------------------------------------------------ |
| `List[T]`          | 列表       | `List[int]` = `[1, 2, 3]`                               |
| `Dict[K, V]`       | 字典       | `Dict[str, int]` = `{"a": 1}`                           |
| `Tuple[T1, T2]`    | 元组       | `Tuple[str, int]` = `("a", 1)`                          |
| `Optional[T]`      | 可选类型   | `Optional[str]` = `str | None`                          |
| `Union[A, B]`      | 联合类型   | `Union[int, str]` = `int | str`                         |
| `Callable[[A], B]` | 可调用对象 | `Callable[[int], str]` 表示接受 `int` 返回 `str` 的函数 |
| `Any`              | 任意类型   | 跳过类型检查 csdn+1                                     |
| `Sequence[T]`      | 序列类型   | 比 `List` 更通用的抽象                                  |

### dataclasses

**`dataclasses`** 是 Python 3.7+ 引入的标准库，用于**自动生成类的特殊方法**（如 `__init__`、`__repr__`、`__eq__` 等），简化数据类的定义 。(类似springboot种的注解可以自动生成一些类的方法)

`@dataclass` 是 Python 3.7 引入的一个装饰器，用于**自动生成类的样板代码**

| 参数     | 默认值  | 说明                                                         |
| :------- | :------ | :----------------------------------------------------------- |
| `init`   | `True`  | 是否生成 `__init__` 方法                                     |
| `repr`   | `True`  | 是否生成 `__repr__` 方法  |
| `eq`     | `True`  | 是否生成 `__eq__` 方法  |
| `order`  | `False` | 是否生成 `<`, `>`, `<=`, `>=` 方法  |
| `frozen` | `False` | 是否不可变（只读）  |
| `slots`  | `False` | 是否使用 `__slots__` 节省内存  |

#### `field()`

`field()` 用来**对 dataclass 中的字段进行更细粒度控制**。

当你需要：

- 默认值是可变对象
- 不参与初始化
- 不参与比较
- 添加元信息

```python
@dataclass
class A:
    items: list = field(default_factory=list)

# 控制是否参与__init__
@dataclass
class User:
    name: str
    id: int = field(init=False)
        
# 控制是否参与比较       
@dataclass
class User:
    name: str
    cache: dict = field(compare=False)
    
# 控制 repr（打印） 
@dataclass
class User:
    password: str = field(repr=False)
        
# 默认值
@dataclass
class User:
    age: int = field(default=18)

# metadata（高级用法）        
@dataclass
class User:
    name: str = field(metadata={"max_length": 20})

```





# 基础语法

## 面向对象

```python
#!/usr/bin/python
# -*- coding: UTF-8 -*-
 
class Employee:
   '所有员工的基类'
   # 类变量：empCount 变量是一个类变量，它的值将在这个类的所有实例之间共享。你可以在内部类或外部类使用 Employee.empCount 访问。
   empCount = 0
 
   def __init__(self, name, salary):
   	  # 构造函数或初始化方法
      self.name = name
      self.salary = salary
      Employee.empCount += 1
   
   def displayCount(self):
     print "Total Employee %d" % Employee.empCount
 
   def displayEmployee(self):
      print "Name : ", self.name,  ", Salary: ", self.salary
```

`self` 代表的是类的实例，代表当前对象的地址，而 **self.__class__** 则指向类。

```python
emp1.age = 7  # 添加一个 'age' 属性
emp1.age = 8  # 修改 'age' 属性
del emp1.age  # 删除 'age' 属性

# 访问类的属性
hasattr(emp1, 'age')    # 如果存在 'age' 属性返回 True。
getattr(emp1, 'age')    # 返回 'age' 属性的值
setattr(emp1, 'age', 8) # 添加属性 'age' 值为 8
delattr(emp1, 'age')    # 删除属性 'age'
```

### 内置类属性

- `__dict__ `: 类的属性（包含一个字典，由类的数据属性组成）
- `__doc__`:类的文档字符串
- `__name__`: 类名
- `__module__`: 类定义所在的模块（类的全名是`__main__.className`，如果类位于一个导入模块mymod中，那么`className.__module__`等于 mymod）
- `__bases__` : 类的所有父类构成元素（包含了一个由所有父类组成的元组）

### 垃圾回收机制

Python 使用了**引用计数**这一简单技术来跟踪和回收垃圾。

在 Python 内部记录着所有使用中的对象各有多少引用。

一个内部跟踪变量，称为一个引用计数器。

当对象被创建时， 就创建了一个引用计数， 当这个对象不再需要时， 也就是说， 这个对象的引用计数变为0 时， 它被垃圾回收。但是回收不是"立即"的， 由解释器在适当的时机，将垃圾对象占用的内存空间回收。



### 继承

```python
class 派生类名(基类名)
    ...
```

在python中继承中的一些特点：

- 1、如果在**子类中需要父类的构造方法就需要显式的调用父类的构造方法**，或者不重写父类的构造方法。详细说明可查看：[ python 子类继承父类构造函数说明](https://www.runoob.com/w3cnote/python-extends-init.html)。
- 2、在调用基类的方法时，需**要加上基类的类名前缀，且需要带上 self 参数变量**。区别在于类中调用普通函数时并不需要带上`self`参数
- 3、Python 总是**首先查找对应类型的方法，如果它不能在派生类中找到对应的方法，它才开始到基类中逐个查找。（先在本类中查找调用的方法，找不到才去基类中找）**。

如果在继承元组中列了一个以上的类，那么它就被称作"多重继承" 。

```python
class SubClassName (ParentClass1[, ParentClass2, ...]):
    ...
```

可以使用`issubclass()`或者`isinstance()`方法来检测。

- `issubclass()` - 布尔函数判断一个类是另一个类的子类或者子孙类，语法：`issubclass(sub,sup)`
- `isinstance(obj, Class) `布尔函数如果`obj`是`Class`类的实例对象或者是一个`Class`子类的实例对象则返回`true`。

### 方法重写

```python
#!/usr/bin/python
# -*- coding: UTF-8 -*-
 
class Parent:        # 定义父类
   def myMethod(self):
      print '调用父类方法'
 
class Child(Parent): # 定义子类
   def myMethod(self):
      print '调用子类方法'
 
c = Child()          # 子类实例
c.myMethod()         # 子类调用重写方法
```

### 类属性与方法

#### 类的私有属性

**__private_attrs**：两个下划线开头，声明该属性为私有，不能在类的外部被使用或直接访问。在类内部的方法中使用时 **self.__private_attrs**。

#### 类的方法

在类的内部，使用 **def** 关键字可以为类定义一个方法，与一般函数定义不同，类方法必须包含参数 self,且为第一个参数

#### 类的私有方法

**__private_method**：两个下划线开头，声明该方法为私有方法，不能在类的外部调用。在类的内部调用 **self.__private_methods**



Python不允许实例化的类访问私有数据，但你可以使用 **object._className__attrName**（ **对象名._类名__私有属性名** ）访问属性



**单下划线、双下划线、头尾双下划线说明：**

- **__foo__**: 定义的是特殊方法，一般是系统定义名字 ，类似 **__init__()** 之类的。
- **_foo**: 以单下划线开头的表示的是 protected 类型的变量，即保护类型只能允许其本身与子类进行访问，不能用于 **from module import \***
- **__foo**: 双下划线的表示的是私有类型(private)的变量, 只能是允许这个类本身进行访问了。
