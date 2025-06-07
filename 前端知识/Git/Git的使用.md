# Git的使用

![img](https://camo.githubusercontent.com/2601e87762cbc282fd0f2761742b3eada2a0086a93cf02f387f1cbe513a95455/68747470733a2f2f70362d6a75656a696e2e62797465696d672e636f6d2f746f732d636e2d692d6b3375316662706663702f31343562306364666139386134613963623732346437343561313436366334377e74706c762d6b3375316662706663702d7a6f6f6d2d312e696d616765)

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
git branch [branch-name] //创建一个分支
git switch -c [branch-name] //切换指定分支并更新工作目录
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
