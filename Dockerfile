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
RUN npm install -g serve
COPY --from=build-stage /app/dist .
EXPOSE 5000
CMD ["serve", "-s", ".", "-l", "5000"]
