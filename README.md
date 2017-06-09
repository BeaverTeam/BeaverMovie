# 电影购票与影视服务网站

## 团队成员

陈昕彤、符宇晖、刘忍、梁晓婷、舒倩、钟正

## 如何调试

### 前端

1. 确保 Node 和 npm 的版本比较新（参考：Node v7.10.0，npm v4.6.1）；
2. 输入指令 ```npm install -g ionic cordova``` 安装 Ionic 3（可能需要 sudo）；
3. 进入 /app 文件夹 ```cd app```；
4. 安装依赖 ```npm install```；
5. 运行指令 ```ionic serve```，调试程序将运行在 8100 端口；

### 后端

1. 已在 [小灰灰](https://github.com/yuhui96) 的服务器上运行了，服务器 IP 地址请问他要（他不想在这里说）；
2. 想自己运行的话，要先安装 Java，Maven，MongoDB，MySQL 环境（看到这里你也不想运行了吧，所以运行命令就不写了）。

## 如何生成 APK

1. 确保本机安装有 Android Studio（参考 25.0.2）；
2. 确保前端程序在调试中可正常运行；
2. 保证存在文件 my-release-key.jks 在文件夹 app/prod 中；
3. 运行脚本 app/deploy.sh，输入 Android Studio 版本（如：25.0.2），再输入密钥库的密码短语即可打包 APK 文件到 app/prod 文件夹中。
