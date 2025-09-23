// 代码生成时间: 2025-09-23 19:20:12
const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
# 改进用户体验

// 环境变量配置
const SECRET_KEY = process.env.SECRET_KEY;
const JWT_EXPIRATION = '2h';

// 用户数据模型（示例，实际项目中应替换为数据库模型）
const users = [
    {
        id: 1,
        username: 'testUser',
        password: bcrypt.hashSync('testPass', 8),
    },
];

// 创建Express应用
const app = express();
app.use(express.json());
# 增强安全性

// 用户身份验证中间件
const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (token == null) return res.sendStatus(401); // 如果没有token，返回401未授权状态码

    jwt.verify(token, SECRET_KEY, (err, user) => {
        if (err) return res.sendStatus(403); // 如果token验证失败，返回403禁止访问状态码
        req.user = user;
        next();
    });
};

// 注册新用户
app.post('/register', (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) return res.status(400).json({ message: 'Missing credentials' });

    const userExists = users.find(user => user.username === username);
    if (userExists) return res.status(400).json({ message: 'Username already taken' });

    const hashedPassword = bcrypt.hashSync(password, 8);
    const newUser = {
# 优化算法效率
        id: users.length + 1,
        username,
        password: hashedPassword,
# TODO: 优化性能
    };
    users.push(newUser);

    res.status(201).json(newUser);
});

// 用户登录
app.post('/login', (req, res) => {
    const { username, password } = req.body;
    const user = users.find(u => u.username === username && bcrypt.compareSync(password, u.password));

    if (!user) return res.status(400).json({ message: 'Invalid credentials' });

    const accessToken = jwt.sign({
        id: user.id,
        username: user.username,
    }, SECRET_KEY, {
        expiresIn: JWT_EXPIRATION,
    });

    res.json({ accessToken });
});

// 受保护的路由
app.get('/protected', authenticateToken, (req, res) => {
    res.status(200).send(`Hello, ${req.user.username}! This is a protected route.`);
});

// 服务器监听
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

// 使用文档
/*
* 用户身份认证程序
*
# 改进用户体验
* POST /register - 注册新用户，需要username和password字段
* POST /login - 用户登录，需要username和password字段
# 扩展功能模块
* GET /protected - 受保护的路由，需要有效的JWT token
*/
