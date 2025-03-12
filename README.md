# 导航中心

一个基于Vue.js的静态导航网页，用于显示和管理常用工具和资源链接。

## 功能特点

- 分类展示导航链接
- 美观的卡片式布局
- 使用YAML配置文件管理导航数据
- 响应式设计，适配各种屏幕尺寸
- 内置SVG图标，无需额外图标库

## 项目设置

### 安装依赖
```
npm install
```

### 开发模式运行
```
npm run serve
```

### 构建生产版本
```
npm run build
```

### 自定义配置
编辑 `public/config.yml` 文件来添加或修改导航链接。

配置文件结构：
```yaml
categories:
  - name: 分类名称
    icon: 图标名称
    links:
      - name: 链接名称
        url: 链接地址
        description: 链接描述
        icon: 链接图标
```

## 许可证
MIT
