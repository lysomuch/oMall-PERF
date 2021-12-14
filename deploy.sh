#!/usr/bin/env sh

# abort on errors
echo '开始执行命令'
set -e

# build
echo '执行命令：vuepress build .'
npm run build

# navigate into the build output directory
cd docs/.vuepress/dist

# if you are deploying to a custom domain
echo 'perf.shadowmon.com' > CNAME

echo "执行命令：git init\n"
git init

git config user.name "bule-sky"
git config user.email "sky-wyx@qq.com"

echo "执行命令：git add -A"
git add -A

echo "执行命令：commit -m 'Update docs'"
git commit -m 'Update docs'

echo "推送分支到gh-pages"
# if you are deploying to https://<USERNAME>.github.io
git push --force --quiet "https://github.com/bule-sky/oMall-PERF.git" master:gh-pages
# git push -f git@github.com:<USERNAME>/<USERNAME>.github.io.git master

# if you are deploying to https://<USERNAME>.github.io/<REPO>
# git push -f git@github.com:<USERNAME>/<REPO>.git master:gh-pages

# 返回到上一次的工作目录
echo "回到刚才工作目录"
cd -