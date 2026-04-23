# Git的使用

![img](https://cdn.nlark.com/yuque/0/2025/jpeg/43189118/1744687779638-b57c9eaf-5031-413c-acb5-7602890d30a3.jpeg)

## 配置

配置本地仓库用户信息

```javascript
git config --global user.name 'username' //配置commit操作的用户名
git config --global user.email 'email'  //配置commit操作的邮箱地址
git config --global color.ui quto //启用彩色命令行输出
```

## 分支

任何提交都会发生在当前`checked out`到的分支上。

```javascript
git status  //查看那个分支
git checkout -b [branch-name] // 创建并切换一个分支
git branch // 查看所有本地分支
git checkout [branch-name] // 切换分支
git merge [branch] // 将指定分支的历史合并到当前分支。
git branch -d [branch-name] // 删除指定分支
```

## 仓库

```javascript
git init //初始化一个git仓库
git remote add origin [url] // 本地仓库与gitgyb上的空仓库连接起来
git clone [url] // 获取已经存在的仓库
```

## .gitignore

有时一些文件最好不要用 Git 跟踪。这通常在名为 `.gitignore` 的特殊文件中完成。你可以在 [github.com/github/gitignore](https://github.com/github/gitignore) 找到有用的 `.gitignore` 文件模板。

## 同步更改

```javascript
git fetch //下载远端分支的所有历史
git merge //将远端跟踪分支合并到当前的本地分支
git push //将所有本地分支上交到github
git pull //使用来自 GitHub 的对应远端分支的所有新提交更新你当前的本地工作分支。git fetch + git merge
```

## 进行更改

```javascript
git log //理出当前分支的版本历史
git log --follow [file] // 列出文件的版本历史，包括重命名
git diff [first-branch]...[second-branch] //展示两个分支之间的内容差异
git show [commit] //输出指定commit的元数据和内容变化
git add [file] //将文件进行快照处理用于版本控制
git commit -m "[descriptive message]" //将文件快照永久地记录在版本历史中
git commit -a //提交所有修改的文件
```

## 重做提交

```javascript
git reset [commit] //撤销所有 [commit] 后的的提交，在本地保存更改
git reset --hard [commit] // 放弃所有历史，改回指定提交。
```

## 代码冲突

出现的原因：分支代码与远程仓库代码不一致导致的问题。

比如：拉下分支代码后，主分支代码进行了修改，但是本地代码没有更新(先pull后commit,push)避免代码冲突

注意提交方式：

- 若多人开发在同一个分支上，提交前尽可能先pull, 手动解决冲突后，再commit提交
- （推荐方式）多人多分支开发，即：开发时从稳定主分支（已部署版本）中切分支出来开发，开发完远程提交后merge。需要专门人员对代码进行审核
- （若无人审核代码）采用本地分支合并的方式进行代码合并，即本地保持一个分支与远程稳定版本分支一致，在自己开发的代码在本地合并后，再push到远程稳定分支上

解决代码冲突的方式：手动合并冲突的代码

## Git提交规范

**git commit 规范**
整体格式: type(scope):subject

```
docs(Git): 提交git commit规范
```

type:

- feat: 新增功能
- fix: 修复bug
- docs: 只修改文档，比如Readme等
- style: 只修改空格、缩进、逗号等等
- refactor: 代码重构，没有重加新功能或者修改bug
- perf: 优化相关，比如提升性能、体验
- test: 测试用例，包括单元测试、集成测试等
- chore: 改变构建流程、或者增加依赖库、工具等
- revert: 回滚到上一个版本

## 工程化分支管理

```
master/main          # 主分支，永远代表生产环境代码，这个分支只能从其他分支合并，不能在这个分支直接修改。
develop              # 开发主分支，所有功能合并到此分支，这个主要合
并与其他分支，比如 Feature 分支。
release/x.y.z        # 发布分支，用于准备版本发布
hotfix/x.y.z+1       # 紧急修复分支，直接从master派生
feature/*            # 功能分支，开发新功能
```

### 功能开发阶段

1. 从develop分支创建feature分支
2. 开发结束后合并到develop分支

### 版本发布阶段

1. 从develop分支中创建release分支
2. release分支进行测试
3. 若测试通过就合并到master分支，打标签部署到生产环境，合并master分支到develop分支（保持develop分支与master分支一致），删除release分支
4. 若测试没通过，则在release分支上进行修复

### 紧急修复分支

触发条件：生产环境出现问题，需要立即修复

操作：

1. 直接从master对应标签创建hotfix分支
2. 修复后同时更新master和develop
3. 版本号遵循语义化版本规则（如从1.2.0到1.2.1）
