# 构建阶段
FROM node:16-alpine as build-stage
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# 生产阶段
FROM node:16-alpine as production-stage
WORKDIR /app

# 复制 package.json 并安装生产依赖 (express, etc.)
COPY package*.json ./
RUN npm install --production

# 复制前端构建结果和后端服务器代码
COPY --from=build-stage /app/dist ./dist
COPY server.js .

# 暴露端口并启动服务器
EXPOSE 5000
CMD ["node", "server.js"]