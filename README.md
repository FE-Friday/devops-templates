# 分支
本仓库使用 `--orphan` 创建独立分支，目的在于使用一个 `Git仓库` 管理多个项目，现有分支都是采用此种模式。如果需要开发关分支功能，请单独检出目标分支到本地作为独立项目进行开发。

如：需要开发 `devops-cli` 分支下的脚手架项目，则如下检查分支：

```bash
$ git clone -b devops-cli https://github.com/FE-Friday/devops-templates.git devops-cli

```

# 开发

```bash
# 检出对应前端项目模板到本地进行开发
$ git clone -b 模版名称 https://github.com/FE-Friday/devops-templates.git 重命名
```
