
const express = require('express');
const fs = require('fs').promises;
const path = require('path');
const yaml = require('js-yaml');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

// --- 中间件 ---
app.use(cors());
app.use(express.json()); // 用于解析 application/json

// --- 认证中间件 ---
const authMiddleware = (req, res, next) => {
  const env = req.body.env;
  let apiToken;

  if (env === 'qa') {
    // Use QA token, with a fallback for development
    apiToken = process.env.API_TOKEN_QA || 'qa-secret-token';
  } else {
    // Default to dev token, with a fallback for development
    apiToken = process.env.API_TOKEN_DEV || 'dev-secret-token';
  }

  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Authorization token is missing or invalid.' });
  }

  const providedToken = authHeader.split(' ')[1];
  if (providedToken === apiToken) {
    next(); // Token is valid, proceed to the route handler
  } else {
    res.status(403).json({ message: 'Forbidden: Invalid token.' });
  }
};

// --- API 路由 ---

// 获取配置文件的 API
app.get('/api/config', async (req, res) => {
  const env = req.query.env === 'qa' ? 'qa' : 'dev';
  const configFile = `config.${env}.yml`;
  const filePath = path.join(__dirname, 'public', configFile);

  try {
    const fileContent = await fs.readFile(filePath, 'utf8');
    const data = yaml.load(fileContent);
    res.json(data);
  } catch (error) {
    console.error(`Error reading config file ${filePath}:`, error);
    res.status(500).json({ message: 'Failed to load configuration.' });
  }
});

// 更新配置文件的 API
app.post('/api/config', authMiddleware, async (req, res) => {
  console.log('Received request body:', req.body); // 添加这行日志
  const { env, categoryName, link } = req.body;

  if (!env || !categoryName || !link) {
    return res.status(400).json({ message: 'Missing required fields: env, categoryName, link' });
  }

  const validEnv = env === 'qa' ? 'qa' : 'dev';
  const configFile = `config.${validEnv}.yml`;
  const filePath = path.join(__dirname, 'public', configFile);

  try {
    // 读取现有文件
    const fileContent = await fs.readFile(filePath, 'utf8');
    const data = yaml.load(fileContent);

    // 找到对应的分类并添加新链接
    const category = data.categories.find(c => c.name === categoryName);
    if (category) {
      category.links.push(link);
    } else {
      // 如果分类不存在，也可以选择创建一个新分类
      return res.status(404).json({ message: `Category '${categoryName}' not found.` });
    }

    // 将修改后的数据转回 YAML 格式并写入文件
    const newYamlContent = yaml.dump(data);
    await fs.writeFile(filePath, newYamlContent, 'utf8');

    res.json({ message: 'Configuration updated successfully.' });

  } catch (error) {
    console.error(`Error writing config file ${filePath}:`, error);
    res.status(500).json({ message: 'Failed to update configuration.' });
  }
});

app.delete('/api/config', authMiddleware, async (req, res) => {
  const { env, categoryName, link } = req.body;

  if (!env || !categoryName || !link || !link.name || !link.url) {
    return res.status(400).json({ message: 'Missing required fields: env, categoryName, link with name and url' });
  }

  const validEnv = env === 'qa' ? 'qa' : 'dev';
  const configFile = `config.${validEnv}.yml`;
  const filePath = path.join(__dirname, 'public', configFile);

  try {
    const fileContent = await fs.readFile(filePath, 'utf8');
    const data = yaml.load(fileContent);

    const category = data.categories.find(c => c.name === categoryName);
    if (!category) {
      return res.status(404).json({ message: `Category '${categoryName}' not found.` });
    }

    const linkIndex = category.links.findIndex(l => l.name === link.name && l.url === link.url);
    if (linkIndex > -1) {
      category.links.splice(linkIndex, 1);
    } else {
      return res.status(404).json({ message: 'Link not found.' });
    }

    const newYamlContent = yaml.dump(data);
    await fs.writeFile(filePath, newYamlContent, 'utf8');

    res.json({ message: 'Link deleted successfully.' });
  } catch (error) {
    console.error(`Error processing config file ${filePath}:`, error);
    res.status(500).json({ message: 'Failed to delete link.' });
  }
});

app.put('/api/config', authMiddleware, async (req, res) => {
  const { env, categoryName, oldLink, newLink } = req.body;

  if (!env || !categoryName || !oldLink || !newLink) {
    return res.status(400).json({ message: 'Missing required fields: env, categoryName, oldLink, newLink' });
  }

  const validEnv = env === 'qa' ? 'qa' : 'dev';
  const configFile = `config.${validEnv}.yml`;
  const filePath = path.join(__dirname, 'public', configFile);

  try {
    const fileContent = await fs.readFile(filePath, 'utf8');
    const data = yaml.load(fileContent);

    const category = data.categories.find(c => c.name === categoryName);
    if (!category) {
      return res.status(404).json({ message: `Category '${categoryName}' not found.` });
    }

    const linkIndex = category.links.findIndex(l => l.name === oldLink.name && l.url === oldLink.url);
    if (linkIndex > -1) {
      category.links[linkIndex] = newLink;
    } else {
      return res.status(404).json({ message: 'Link to update not found.' });
    }

    const newYamlContent = yaml.dump(data);
    await fs.writeFile(filePath, newYamlContent, 'utf8');

    res.json({ message: 'Link updated successfully.' });
  } catch (error) {
    console.error(`Error processing config file ${filePath}:`, error);
    res.status(500).json({ message: 'Failed to update link.' });
  }
});

app.use(express.static(path.join(__dirname, 'dist'))); // 托管前端文件

// --- SPA 回退 ---
// 对于所有未匹配到的请求，都返回前端的 index.html
// 这必须放在所有 API 路由和静态文件托管之后
app.use((req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});


// --- 启动服务器 ---
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
