文档地址：https://hellowac.github.io/uv-zh-cn/getting-started/installation/

uv: 类似有javaScript中的node.js或者maven，一般用于[[python]]语言的包的管理

## uv包管理器的使用

**创建一个新项目**：
```
uv init 项目名称 # 创建一个新项目
或
cd 新项目
uv init

// 创建成功后会得到以下内容
.
├── .venv # 文件夹包含项目的虚拟环境，这是一个与系统其他部分隔离的 Python 环境。在这里，uv 将安装项目的依赖项。
│   ├── bin
│   ├── lib
│   └── pyvenv.cfg
├── .python-version # 文件包含项目的默认 Python 版本。该文件告诉 uv 在创建项目虚拟环境时使用哪个 Python 版本。
├── hello.py
├── pyproject.toml # 此文件来指定依赖项，以及项目的描述、许可证等详细信息。
└── uv.lock # 是一个跨平台的锁文件，包含有关项目依赖项的精确信息。与用于指定项目广泛需求的pyproject.toml不同，锁文件包含已安装在项目环境中的确切解决版本。此文件应被提交到版本控制中，以便在不同机器之间实现一致和可复现的安装。
```

```pyproject.toml
[project]
name = "hello-world" # 项目名称
version = "0.1.0" # 版本
description = "Add your description here" # 描述
readme = "README.md" 
dependencies = [] # 依赖
```

**依赖项的管理**
```
uv add 依赖 # 添加依赖
uv add 'requests==2.31.0' # 指定版本约束
uv add git+https://github.com/psf/requests # 添加 git 依赖 

uv remove requests # 删除一个包

uv lock --upgrade-package requests # 要升级包，请运行uv lock并使用--upgrade-package标志
```

**运行命令**
```
uv run xx.py 

# 手动激活环境
uv sync # 同步项目依赖到环境
source .venv/bin/activate
flask run -p 3000
python example.py
```

**构建分发包**
```
uv build # uv build可用于为您的项目构建源分发包和二进制分发包
```

**创建虚拟环境**
```
uv venv # 创建虚拟环境
uv venv my-name
uv venv --python 3.11 # 指定 Python 版本
```
激活环境
```
.venv\Scripts\activate # windows
source .venv/bin/activate # macos 和 linux
```