
# Python

## 常见库

### typing

**`typing`** 是 Python 3.5+ 的标准库，用于**类型提示（Type Hints）**，帮助静态类型检查器（如 mypy）、IDE 和语法检查器理解代码中的类型信息 。

|         类型         |  说明   |                       示例                       |     |
| :----------------: | :---: | :--------------------------------------------: | --- |
|     `List[T]`      |  列表   |           `List[int]` = `[1, 2, 3]`            |     |
|    `Dict[K, V]`    |  字典   |         `Dict[str, int]` = `{"a": 1}`          |     |
|  `Tuple[T1, T2]`   |  元组   |         `Tuple[str, int]` = `("a", 1)`         |     |
|   `Optional[T]`    | 可选类型  |            `Optional[str]` = `str`             |     |
|   `Union[A, B]`    | 联合类型  |           `Union[int, str]` = `int`            |     |
| `Callable[[A], B]` | 可调用对象 | `Callable[[int], str]` 表示接受 `int` 返回 `str` 的函数 |     |
|       `Any`        | 任意类型  |                     跳过类型检查                     |     |
|   `Sequence[T]`    | 序列类型  |                比 `List` 更通用的抽象                 |     |
|`Literal`| 字面量类型 | 表示变量**必须是**一组特定字面量值（常量）中的**某一个**| | 

### dataclasses

**`dataclasses`** 是 `Python 3.7+` 引入的标准库，用于**自动生成类的特殊方法**（如`__init__`、`__repr__`、`__eq__` 等），简化数据类的定义 。(类似`springboot`种的注解可以自动生成一些类的方法)

`@dataclass` 是 Python 3.7 引入的一个装饰器，用于**自动生成类的样板代码**

|    参数    |   默认值   |              说明              |
| :------: | :-----: | :--------------------------: |
|  `init`  | `True`  |      是否生成 `__init__` 方法      |
|  `repr`  | `True`  |      是否生成 `__repr__` 方法      |
|   `eq`   | `True`  |       是否生成 `__eq__` 方法       |
| `order`  | `False` | 是否生成 `<`, `>`, `<=`, `>=` 方法 |
| `frozen` | `False` |          是否不可变（只读）           |
| `slots`  | `False` |    是否使用 `__slots__` 节省内存     |

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

### time

|   方法   | 作用  |                例子                |
| :------: | :-----: | :--------------------------------: |
|`time.time()`|当前时间戳（秒，从1970-01-01开始）||
|`time.localtime(secs)`|将时间戳转为本地时间的结构化对象||
|`time.gmtime(secs)`|将时间戳转为`UTC`时间的结构化对象||
|`time.sleep(secs)`|暂停程序执行指定秒数||
|`time.strptime(string, format)`|将字符串解析为结构化时间||
|`time.strftime(format, t)`|将结构化时间转为字符串||
### queue

`queue` 模块提供了**线程安全**的队列类，专门用于多线程编程中的安全数据交换。它实现了所有必要的锁语义，多个线程可以同时访问队列而不会出现数据竞争。

| 类              | 特点                     | 适用场景                     |
| :-------------- | :----------------------- | :--------------------------- |
| `Queue`         | **FIFO**（先进先出）     | 任务调度、生产者-消费者模式  |
| `LifoQueue`     | **LIFO**（后进先出，栈） | 需要最近添加的数据优先处理   |
| `PriorityQueue` | **优先级队列**           | 任务有优先级，高优先级先执行 |
| `SimpleQueue`   | 简化版 FIFO（3.7+）      | 不需要任务跟踪的简单场景     |

| 方法                                  | 描述                       | 阻塞行为                    |
| :------------------------------------ | :------------------------- | :-------------------------- |
| `put(item, block=True, timeout=None)` | 添加元素到队列             | 队列满时阻塞                |
| `get(block=True, timeout=None)`       | 取出并移除元素             | 队列空时阻塞                |
| `put_nowait(item)`                    | 非阻塞添加                 | 队列满时立即抛 `Full` 异常  |
| `get_nowait()`                        | 非阻塞取出                 | 队列空时立即抛 `Empty` 异常 |
| `qsize()`                             | 返回队列**大致**大小       | -                           |
| `empty()`                             | 判断是否为空（不保证精确） | -                           |
| `full()`                              | 判断是否已满（不保证精确） | -                           |

###  pydantic
**Pydantic** 是 Python 中最流行的**数据验证和设置管理库**。它利用 Python 的类型注解（Type Hints）在**运行时**自动校验数据是否符合预期格式。

官方文档：https://pydantic.dev/docs/validation/latest/get-started/

---
基本用法
```
from pydantic import BaseModel

# 1. 定义数据模型（就像定义表格结构）
class User(BaseModel):
    name: str          # 名字必须是字符串
    age: int           # 年龄必须是整数
    email: str         # 邮箱必须是字符串

# 2. 传入数据（Pydantic 自动校验）
user = User(name="张三", age=25, email="zhangsan@example.com")
print(user.name)   # 输出: 张三
print(user.age)    # 输出: 25

# 3. 如果数据不符合规则，会报错
try:
    bad_user = User(name="李四", age="不是数字", email="test")
except Exception as e:
    print(e)
    # age: Input should be a valid integer, unable to parse string as an integer
```

- `BaseModel`：所有 Pydantic 数据模型都必须继承自 `BaseModel`。
- `ConfigDict`：用于配置模型的行为。
```
from pydantic import BaseModel, ConfigDict

class Product(BaseModel):
    model_config = ConfigDict(
        # 1. 额外字段处理
        extra="forbid",  # "forbid": 禁止额外字段, "ignore": 忽略, "allow": 允许
        
        # 2. 字段排序
        json_schema_extra={"examples": [{"name": "示例产品", "price": 99.9}]},
        
        # 3. 字符串处理
        str_strip_whitespace=True,   # 去除空格
        str_to_lower=False,           # 转小写
        str_to_upper=False,           # 转大写
        
        # 4. 序列化配置
        populate_by_name=True,        # 允许用字段名或别名访问
        
        # 5. 性能相关
        validate_assignment=True,     # 赋值时也验证
        extra="ignore",
    )
    
    name: str
    price: float

# 使用示例
try:
    # extra="forbid" 会禁止额外字段
    p = Product(name="电脑", price=5999, discount=0.1)
except Exception as e:
    print(e)  # Extra inputs are not permitted
```
- `Field`：为模型中的**单个字段**添加元数据、验证规则、默认值等
```
from pydantic import BaseModel, Field
from typing import List, Optional

class Product(BaseModel):
    # 1. 默认值
    name: str = Field(default="未命名产品")
    
    # 2. 数值约束
    price: float = Field(gt=0, le=99999.99, description="价格（必须大于0）")
    stock: int = Field(ge=0, le=9999)
    
    # 3. 字符串约束
    code: str = Field(min_length=6, max_length=20, pattern=r"^[A-Z0-9]+$")
    
    # 4. 列表长度约束
    tags: List[str] = Field(min_items=0, max_items=10)
    
    # 5. 必填（使用 ... 表示必填）
    product_id: str = Field(..., description="产品ID（必填）")
    
    # 6. 可选字段
    description: Optional[str] = Field(default=None, max_length=500)
    
    # 7. 别名（用于 JSON 字段名不同）
    category: str = Field(alias="category_name")
    
    # 8. 示例值（用于生成文档）
    discount: float = Field(default=0.0, examples=[0.1, 0.2, 0.5])

# 使用别名
product = Product(
    product_id="P001",
    name="手机",
    price=2999,
    stock=100,
    code="PHONE2026",
    category_name="电子产品"  # 用别名传入
)
print(product.category)  # 输出: 电子产品
```
- `SecretStr`：用于存储密码、API密钥、Token 等敏感信息，防止意外泄露。
```
from pydantic import BaseModel, SecretStr

class User(BaseModel):
    username: str
    password: SecretStr  # 敏感字段

user = User(username="admin", password="my_secret_password")

# 直接打印不会暴露真实值
print(user.password)  
# 输出: SecretStr('**********')

# 获取真实值（需要显式调用）
print(user.password.get_secret_value())  
# 输出: my_secret_password

# 转为字符串也不会泄露
print(str(user.password))   # **********
print(repr(user.password))  # SecretStr('**********')
```


# 基础语法
## 基本数据类型
Python3 中有 7 种标准数据类型，以及 bool 布尔类型（bool 是 int 的子类，有时单独列出）：

- Number（数字）
- String（字符串）
- bool（布尔类型）
- List（列表）
- Tuple（元组）
- Set（集合）
- Dictionary（字典）

**不可变数据**（4 个）：Number（数字）、String（字符串）、bool（布尔）、Tuple（元组）
**可变数据**（3 个）：List（列表）、Dictionary（字典）、Set（集合）

## 推导式
### 列表推导式
```
[表达式 for 变量 in 列表] 
[out_exp_res for out_exp in input_list]

或者 

[表达式 for 变量 in 列表 if 条件]
[out_exp_res for out_exp in input_list if condition]

out_exp_res：列表生成元素表达式，可以是有返回值的函数。
for out_exp in input_list：迭代 input_list 将 out_exp 传入到 out_exp_res 表达式中。
if condition：条件语句，可以过滤列表中不符合条件的值。
```

### 字典推导式
```
{ key_expr: value_expr for value in collection }

或

{ key_expr: value_expr for value in collection if condition }
```

### 集合推导式
```
{ expression for item in Sequence }
或
{ expression for item in Sequence if conditional }
```

### 元组推导式
```
(expression for item in Sequence )
或
(expression for item in Sequence if conditional )
```

## 迭代器和生成器
迭代是 `Python` 最强大的功能之一，是访问集合元素的一种方式。

**迭代器是一个可以记住遍历的位置的对象。**

迭代器对象从集合的第一个元素开始访问，直到所有的元素被访问完结束。迭代器只能往前不会后退。

迭代器有两个基本的方法：`iter()` 和 `next()`。

`__iter__()` 方法返回一个特殊的迭代器对象， 这个迭代器对象实现了 `__next__()` 方法并通过 StopIteration 异常标识迭代的完成。

`__next__()` 方法（Python 2 里是 next()）会返回下一个迭代器对象。  

## 函数
``` python
def functionname( parameters ):
   "函数_文档字符串"
   function_suite
   return [expression]

#可写函数说明
def printinfo( name, age = 35 ):
   "打印任何传入的字符串"
   print "Name: ", name
   print "Age ", age
   return

def functionname([formal_args,] *var_args_tuple ):
   "函数_文档字符串"
   function_suite
   return [expression]
```

python 使用 lambda 来创建匿名函数。

1. lambda只是一个表达式，函数体比def简单很多。
2. lambda的主体是一个表达式，而不是一个代码块。仅仅能在lambda表达式中封装有限的逻辑进去。
3. lambda函数拥有自己的命名空间，且不能访问自有参数列表之外或全局命名空间里的参数。
4. 虽然lambda函数看起来只能写一行，却不等同于C或C++的内联函数，后者的目的是调用小函数时不占用栈内存从而增加运行效率。


## 面向对象

```python
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

`self` 代表的是类的实例，代表当前对象的地址，而 `self.__class__` 则指向类。

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

- `issubclass()` ：布尔函数判断一个类是另一个类的子类或者子孙类，语法：`issubclass(sub,sup)`
- `isinstance(obj, Class) `：布尔函数如果`obj`是`Class`类的实例对象或者是一个`Class`子类的实例对象则返回`true`。

### 方法重写

```python
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

`__private_attrs`：**两个下划线**开头，声明该属性为私有，不能在类的外部被使用或直接访问。在类内部的方法中使用时 `self.__private_attrs`。

---
`python` 中各种变量的表现形式：
1. Public 变量（公有）：`name`
2. Protected 变量（受保护）：`_name`
3. Private 变量（私有）：`__name`

#### 类的方法

在类的内部，使用 `def` 关键字可以为类定义一个方法，与一般函数定义不同，类方法必须包含参数 `self`, 且为第一个参数

#### 类的私有方法

`__private_method`：两个下划线开头，声明该方法为私有方法，不能在类的外部调用。在类的内部调用 `self.__private_methods`



#### 类的专有方法

- `__init__`: 构造函数，在生成对象时调用
- `__del__ `: 析构函数，释放对象时使用
- `__repr__`: 打印，转换
- `__setitem__ `: 按照索引赋值
- `__getitem__`: 按照索引获取值
- `__len__`: 获得长度
- `__cmp__`: 比较运算
- `__call__`: 函数调用
- `__add__`: 加运算
- `__sub__`: 减运算
- `__mul__`: 乘运算
- `__truediv__`: 除运算
- `__mod__`: 求余运算
- `__pow__`: 乘方



Python不允许实例化的类访问私有数据，但你可以使用 **object._className__attrName**（ **对象名._类名__私有属性名** ）访问属性


**单下划线、双下划线、头尾双下划线说明：**

- `__foo__`: 定义的是特殊方法，一般是系统定义名字 ，类似 **__init__()** 之类的。
- `_foo`: 以单下划线开头的表示的是 **protected 类型**的变量，即**保护类型只能允许其本身与子类进行访问**，不能用于 **from module import **
- `__foo`: **双下划线的表示的是私有类型(private)的变量, 只能是允许这个类本身进行访问了**。


### `cls` 、`@classmethod`、`@staticmethod`
- **`cls`（参数）**：它是一个**占位符**，代表“当前调用该方法的类”。在 `@classmethod` 下，无论这个类是被哪个子类调用的，`cls` 都会精准地指向那个子类。代表这个类本身（类似 self 代表实例本身）。通过 cls 可以操作类属性（Class Attributes）或调用其他类方法。
    
- **`@classmethod`（装饰器）**：它是**灵活的工厂。它绑定的是类，而不是实例。它的使命是：处理类级别的逻辑，或者用不同的参数格式来创建该类的对象**（工厂模式）。

``` python
class Student:
    school = "北京大学"  # 类属性

    def __init__(self, name, age):
        self.name = name
        self.age = age

    # 类方法：接收 cls（类本身）
    @classmethod
    def from_string(cls, data_str):
        """从"姓名-年龄"的字符串中解析并创建对象"""
        name, age = data_str.split("-")
        # cls(name, age) 等价于 Student(name, age)，但在继承中更灵活
        return cls(name, int(age))

    @classmethod
    def change_school(cls, new_school):
        """修改类属性"""
        cls.school = new_school

# 调用方式1：通过类调用
s1 = Student.from_string("小明-18")
print(s1.name)  # 输出: 小明

# 调用方式2：通过实例调用（cls 依然指向类，而非实例）
s2 = Student("小红", 20)
s2.change_school("清华大学")
print(Student.school)  # 输出: 清华大学（类属性被改了）
```
    
- **`@staticmethod`（装饰器）**：它是**挂在类里的普通函数。它跟类唯一的关联就是写在类里面（便于代码组织），但实际上它既不依赖实例，也不依赖类，就像一个独立的小工具**。(静态方法)


## 装饰器

装饰器（`Decorator`）本质上是一个高阶函数，它接收一个函数或类作为参数，并返回一个增强后的新版本，整个过程不修改原对象的代码。
``` python
import functools

def log(func):
    @functools.wraps(func)  # 用于保留原函数的元信息（如__name__），这是最佳实践[reference:2]
    def wrapper(*args, **kwargs):
        print(f'调用函数: {func.__name__}')  # 增强功能：打印日志
        return func(*args, **kwargs)        # 调用原始函数
    return wrapper

# 使用 @ 语法糖
@log
def say_hello(name):
    print(f'Hello, {name}!')

say_hello("World")
# 输出:
# 调用函数: say_hello
# Hello, World!


import functools

def log_with_level(level):          # 外层：接收装饰器参数
    def decorator(func):            # 中层：接收被装饰函数
        @functools.wraps(func)
        def wrapper(*args, **kwargs): # 内层：包裹原函数
            print(f'[{level}] 调用函数: {func.__name__}')
            return func(*args, **kwargs)
        return wrapper
    return decorator

# 使用带参数的装饰器
@log_with_level(level="INFO")
def greet(name):
    print(f'Greetings, {name}!')

greet("Alice")
# 输出:
# [INFO] 调用函数: greet
# Greetings, Alice!
```

``` python
import functools

class CountCalls:
    def __init__(self, func):
        functools.wraps(func)(self)  # 将func的元信息复制给实例自身[reference:9]
        self.func = func
        self.count = 0               # 初始化状态：调用计数器

    def __call__(self, *args, **kwargs):
        self.count += 1              # 每次调用，计数器加1
        print(f'函数 "{self.func.__name__}" 被调用了 {self.count} 次')
        return self.func(*args, **kwargs)

@CountCalls
def test():
    print("执行测试函数")

test() # 输出: 函数 "test" 被调用了 1 次 \n 执行测试函数
test() # 输出: 函数 "test" 被调用了 2 次 \n 执行测试函数
print(f"总调用次数: {test.count}") # 输出: 总调用次数: 2
```


## 多线程

Python中使用线程有两种方式：**函数**或者**用类来包装线程对象**。

函数式：调用`thread`模块中的`start_new_thread()`函数来产生新线程。

```python
# 参数说明:
# function - 线程函数。
# args - 传递给线程函数的参数,他必须是个tuple类型。
# kwargs - 可选参数。
thread.start_new_thread ( function, args[, kwargs] )
```

```python
import _thread as thread
import time

# 为线程定义一个函数
def print_time(threadName, delay):
    count = 0
    while count < 5:
        time.sleep(delay)
        count += 1
        print("%s: %s" % (threadName, time.ctime(time.time())))

# 创建两个线程
try:
    thread.start_new_thread(print_time, ("Thread-1", 2))
    thread.start_new_thread(print_time, ("Thread-2", 4))
except:
    print("Error: unable to start thread")

while 1:
    pass
```

线程的结束一般依靠线程函数的自然结束；也可以在线程函数中调用`thread.exit()`，他抛出`SystemExit exception`，达到退出线程的目的。

### 线程模块

`Python`通过两个标准库`thread`和`threading`提供对线程的支持。`thread`提供了低级别的、原始的线程以及一个简单的锁。

`threading`模块提供的其他方法：

- `threading.currentThread()`: 返回当前的线程变量。
- `threading.enumerate()`: 返回一个包含正在运行的线程的`list`。正在运行指线程启动后、结束前，不包括启动前和终止后的线程。
- `threading.activeCount()`: 返回正在运行的线程数量，与`len(threading.enumerate())`有相同的结果。

除了使用方法外，线程模块同样提供了`Thread`类来处理线程，`Thread`类提供了以下方法:

- `run()`: 用以表示线程活动的方法。
- `start()`: 启动线程活动。
- `join([time])`: **等待至线程中止**。这阻塞调用线程直至线程的 `join()` 方法被调用中止-正常退出或者抛出未处理的异常-或者是可选的超时发生。
- `isAlive()`: 返回线程是否活动的。
- `getName()`: 返回线程名。
- `setName()`: 设置线程名。

使用`Threading`模块创建线程，**直接从`threading.Thread`继承，然后重写`init`方法和`run`方法**：

```python
import threading
import time

exitFlag = False

class myThread(threading.Thread):   # 继承父类threading.Thread
    def __init__(self, threadID, name, counter):
        super().__init__()
        self.threadID = threadID
        self.name = name
        self.counter = counter
    def run(self):                   # 把要执行的代码写到run函数里面 线程在创建后会直接运行run函数
        print("Starting " + self.name)
        print_time(self.name, self.counter, 5)
        print("Exiting " + self.name)

def print_time(threadName, delay, counter):
    while counter > 0 and not exitFlag:
        time.sleep(delay)
        print(f"{threadName}: {time.ctime(time.time())}")
        counter -= 1

# 创建新线程
thread1 = myThread(1, "Thread-1", 1)
thread2 = myThread(2, "Thread-2", 2)

# 开启线程
thread1.start()
thread2.start()

thread1.join()
thread2.join()

print("Exiting Main Thread")
```

### 线程同步

如果多个线程共同对某个数据修改，则可能出现不可预料的结果，为了保证数据的正确性，需要对多个线程进行同步。

使用 `Thread` 对象的 `Lock` 和 `Rlock` 可以实现简单的线程同步，这两个对象都有`acquire`方法和`release`方法，对于那些需要每次只允许一个线程操作的数据，可以将其操作放到 `acquire()` 和 `release()` 方法之间。

锁有两种状态——**锁定和未锁定**。**每当一个线程比如"set"要访问共享数据时，必须先获得锁定；如果已经有别的线程比如"print"获得锁定了，那么就让线程"set"暂停，也就是同步阻塞；等到线程"print"访问完毕，释放锁以后，再让线程"set"继续**。

```python
import threading
import time
 
class myThread (threading.Thread):
    def __init__(self, threadID, name, counter):
        threading.Thread.__init__(self)
        self.threadID = threadID
        self.name = name
        self.counter = counter
    def run(self):
        print("Starting " + self.name)
        # 获得锁，成功获得锁定后返回True
        # 可选的timeout参数不填时将一直阻塞直到获得锁定
        # 否则超时后将返回False
        threadLock.acquire()
        print_time(self.name, self.counter, 3)
        # 释放锁
        threadLock.release()
 
def print_time(threadName, delay, counter):
    while counter:
        time.sleep(delay)
        print("%s: %s" % (threadName, time.ctime(time.time())))
        counter -= 1
 
threadLock = threading.Lock()
threads = []
 
# 创建新线程
thread1 = myThread(1, "Thread-1", 1)
thread2 = myThread(2, "Thread-2", 2)
 
# 开启新线程
thread1.start()
thread2.start()
 
# 添加线程到线程列表
threads.append(thread1)
threads.append(thread2)
 
# 等待所有线程完成
for t in threads:
    t.join()
print("Exiting Main Thread")
```

### 线程优先级队列

`Python` 的 `Queue` 模块中提供了同步的、线程安全的队列类，包括 `FIFO（先入先出)` 队列 `Queue`，`LIFO（后入先出）` 队列  `LifoQueue`，和优先级队列 `PriorityQueue`。这些队列都实现了锁原语，能够在多线程中直接使用。可以使用队列来实现线程间的同步。

`Queue` 模块中的常用方法:

- `Queue.qsize() `返回队列的大小
- `Queue.empty()` 如果队列为空，返回True,反之False
- `Queue.full() `如果队列满了，返回True,反之False
- `Queue.full `与 `maxsize` 大小对应
- `Queue.get([block[, timeout]])`获取队列，timeout等待时间
- `Queue.get_nowait() `相当`Queue.get(False)`
- `Queue.put(item, block=True, timeout=None)` 写入队列，timeout等待时间
- `Queue.put_nowait(item) `相当 `Queue.put(item, False)`
- `Queue.task_done() `在完成一项工作之后，`Queue.task_done()`函数向任务已经完成的队列发送一个信号
- `Queue.join() `实际上意味着等到队列为空，再执行别的操作

```python
import Queue
import threading
import time
 
exitFlag = 0
 
class myThread (threading.Thread):
    def __init__(self, threadID, name, q):
        threading.Thread.__init__(self)
        self.threadID = threadID
        self.name = name
        self.q = q
    def run(self):
        print "Starting " + self.name
        process_data(self.name, self.q)
        print "Exiting " + self.name
 
def process_data(threadName, q):
    while not exitFlag:
        queueLock.acquire()
        if not workQueue.empty():
            data = q.get()
            queueLock.release()
            print "%s processing %s" % (threadName, data)
        else:
            queueLock.release()
        time.sleep(1)
 
threadList = ["Thread-1", "Thread-2", "Thread-3"]
nameList = ["One", "Two", "Three", "Four", "Five"]
queueLock = threading.Lock()
workQueue = Queue.Queue(10)
threads = []
threadID = 1
 
# 创建新线程
for tName in threadList:
    thread = myThread(threadID, tName, workQueue)
    thread.start()
    threads.append(thread)
    threadID += 1
 
# 填充队列
queueLock.acquire()
for word in nameList:
    workQueue.put(word)
queueLock.release()
 
# 等待队列清空
while not workQueue.empty():
    pass
 
# 通知线程是时候退出
exitFlag = 1
 
# 等待所有线程完成
for t in threads:
    t.join()
print "Exiting Main Thread"
```

## 协程

协程看上去也是子程序，但执行过程中，在子程序内部可中断，然后转而执行别的子程序，在适当的时候再返回来接着执行。

1. 就是协程极高的执行效率。因为**子程序切换不是线程切换，而是由程序自身控制，因此，没有线程切换的开销，和多线程比，线程数量越多，协程的性能优势就越明显**。

2. 不需要多线程的锁机制，因为只有一个线程，也不存在同时写变量冲突，在**协程中控制共享资源不加锁，只需要判断状态就好了，所以执行效率比多线程高很多**。

### asyncio

`asyncio`的编程模型就是一个消息循环。`asyncio`模块内部实现了`Event Loop`，把需要执行的协程扔到`Event Loop`中执行，就实现了异步IO。

1. 协程（Coroutine）: 一个特殊的函数，可以在执行过程中暂停，并在稍后恢复执行。协程通过 `async def` 关键字定义，并通过 `await` 关键字暂停执行，等待异步操作完成。
2. 事件循环（Event Loop）: 事件循环是 `asyncio` 的核心组件，负责调度和执行协程。它不断地检查是否有任务需要执行，并在任务完成后调用相应的回调函数。
3. 任务（Task）: 任务是对协程的封装，**表示一个正在执行或将要执行的协程**。你可以通过 `asyncio.create_task()` 函数创建任务，并将其添加到事件循环中。
4. Future：`Future` 是一个**表示异步操作结果的对象**。它通常用于底层 API，表示一个尚未完成的操作。你可以通过 `await` 关键字等待 `Future` 完成。

最常用的高级函数：

1. `asyncio.run(coro, *, debug=False)` : 运行一个顶层协程，管理事件循环的生命周期。是程序的主入口。
1. `asyncio.create_task(coro, *, name=None)` :  将协程包装成一个 Task 对象，并排入事件循环等待调度。这是实现并发的主要方式。

![img](asyncio-python-runoob12-scaled.jpg)

#### **1. 核心函数**

| 方法/函数                       | 说明                          | 示例                                                 |
| :------------------------------ | :---------------------------- | :--------------------------------------------------- |
| **`asyncio.run(coro)`**         | 运行异步主函数（Python 3.7+） | `asyncio.run(main())`                                |
| **`asyncio.create_task(coro)`** | 创建任务并加入事件循环        | `task = asyncio.create_task(fetch_data())`           |
| **`asyncio.gather(*coros)`**    | 并发运行多个协程              | `await asyncio.gather(task1, task2)`                 |
| **`asyncio.sleep(delay)`**      | 异步等待（非阻塞）            | `await asyncio.sleep(1)`                             |
| **`asyncio.wait(coros)`**       | 控制任务完成方式              | `done, pending = await asyncio.wait([task1, task2])` |

#### **2. 事件循环（Event Loop）**

| 方法                                   | 说明                 | 示例                              |
| :------------------------------------- | :------------------- | :-------------------------------- |
| **`loop.run_until_complete(future)`**  | 运行直到任务完成     | `loop.run_until_complete(main())` |
| **`loop.run_forever()`**               | 永久运行事件循环     | `loop.run_forever()`              |
| **`loop.stop()`**                      | 停止事件循环         | `loop.stop()`                     |
| **`loop.close()`**                     | 关闭事件循环         | `loop.close()`                    |
| **`loop.call_soon(callback)`**         | 安排回调函数立即执行 | `loop.call_soon(print, "Hello")`  |
| **`loop.call_later(delay, callback)`** | 延迟执行回调         | `loop.call_later(5, callback)`    |

#### **3. 协程（Coroutine）与任务（Task）**

| 方法/装饰器              | 说明                               | 示例                                   |
| :----------------------- | :--------------------------------- | :------------------------------------- |
| **`@asyncio.coroutine`** | 协程装饰器（旧版，Python 3.4-3.7） | `@asyncio.coroutine` `def old_coro():` |
| **`async def`**          | 定义协程（Python 3.5+）            | `async def fetch():`                   |
| **`task.cancel()`**      | 取消任务                           | `task.cancel()`                        |
| **`task.done()`**        | 检查任务是否完成                   | `if task.done():`                      |
| **`task.result()`**      | 获取任务结果（需任务完成）         | `data = task.result()`                 |

#### **4. 同步原语（类似`threading`）**

|            类             |    说明    |                       示例                        |
| :-----------------------: | :--------: | :-----------------------------------------------: |
|   **`asyncio.Lock()`**    | 异步互斥锁 |    `lock = asyncio.Lock()` `async with lock:`     |
|   **`asyncio.Event()`**   |  事件通知  |  `event = asyncio.Event()` `await event.wait()`   |
|   **`asyncio.Queue()`**   |  异步队列  | `queue = asyncio.Queue()` `await queue.put(item)` |
| **`asyncio.Semaphore()`** |   信号量   |  `sem = asyncio.Semaphore(5)` `async with sem:`   |

#### **5. 网络与子进程**

|                方法/类                 |     说明      |                             示例                             |
| :------------------------------------: | :-----------: | :----------------------------------------------------------: |
|    **`asyncio.open_connection()`**     |  建立TCP连接  | `reader, writer = await asyncio.open_connection('host', 80)` |
|      **`asyncio.start_server()`**      | 创建TCP服务器 | `server = await asyncio.start_server(handle, '0.0.0.0', 8888)` |
| **`asyncio.create_subprocess_exec()`** |  创建子进程   |     `proc = await asyncio.create_subprocess_exec('ls')`      |

#### **6. 实用工具**

|                 方法                  |       说明       |                  示例                  |
| :-----------------------------------: | :--------------: | :------------------------------------: |
|     **`asyncio.current_task()`**      |   获取当前任务   |    `task = asyncio.current_task()`     |
|       **`asyncio.all_tasks()`**       |   获取所有任务   |     `tasks = asyncio.all_tasks()`      |
|      **`asyncio.shield(coro)`**       | 保护任务不被取消 | `await asyncio.shield(critical_task)`  |
| **`asyncio.wait_for(coro, timeout)`** |   带超时的等待   | `try: await asyncio.wait_for(task, 5)` |