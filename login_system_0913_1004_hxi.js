// 代码生成时间: 2025-09-13 10:04:56
const express = require('express');
const bcrypt = require('bcrypt');
const bodyParser = require('body-parser');

// 创建一个Express app
const app = express();
app.use(bodyParser.json());

// 模拟用户数据库
const users = [];

// 哈希密码函数
function hashPassword(password) {
  return bcrypt.hash(password, 10);
}

// 验证密码函数
function verifyPassword(hashedPassword, password) {
  return bcrypt.compare(password, hashedPassword);
}

// 注册新用户
app.post('/register', async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).send('Username and password are required');
  }
  const hashedPassword = await hashPassword(password);
  const user = { username, password: hashedPassword };
  users.push(user);
  res.status(201).send('User registered successfully');
});

// 用户登录
app.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const user = users.find(u => u.username === username);
  if (!user) {
    return res.status(404).send('User not found');
  }
  if (await verifyPassword(user.password, password)) {
    res.send('Logged in successfully');
  } else {
    res.status(401).send('Invalid credentials');
  }
});

// 启动服务器
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});