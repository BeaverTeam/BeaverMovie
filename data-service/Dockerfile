# 使用docker hub上的node镜像作为基础镜像
FROM node:4-onbuild

# 添加代码文件
ADD . /src
# 安装依赖
RUN cd /src; npm install

EXPOSE 3000
# 运行代码
CMD [ "npm", "start" ]