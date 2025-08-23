// 代码生成时间: 2025-08-24 04:44:22
const express = require('express');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');

// 用户模型（示例，实际应用中应连接数据库）
const users = [
  { id: 1, username: 'john', password: '$2a$12$EXAMplE123password' }
];

// 检查用户是否存在
const findUserByCredentials = (username, password, done) => {
  const user = users.find(u => u.username === username);
  if (!user || !bcrypt.compareSync(password, user.password)) {
    return done(null, false, { message: 'Incorrect username or password.' });
  }
  return done(null, user);
};

// Passport 配置
passport.use(new LocalStrategy(
  (username, password, done) => {
    findUserByCredentials(username, password, done);
  }
));
passport.serializeUser((user, done) => {
  done(null, user.id);
});
passport.deserializeUser((id, done) => {
  const user = users.find(u => u.id === id);
  done(null, user);
});

// 创建 Express 应用
const app = express();
app.use(passport.initialize());
app.use(passport.session());

// 登录路由
app.post('/login', passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/login',
  failureFlash: true,
}), (req, res) => {
  res.redirect('/');
});

// 注册路由
app.post('/register', (req, res) => {
  const { username, password } = req.body;
  const hashedPassword = bcrypt.hashSync(password, 12);
  const newUser = { username, password: hashedPassword };
  users.push(newUser);
  res.send('User registered successfully');
});

// 登录失败页面
app.get('/login', (req, res) => {
  res.send('Please login');
});

// 首页
app.get('/', (req, res) => {
  if (req.isAuthenticated()) {
    res.send('Welcome! You are logged in.');
  } else {
    res.send('Please login.');
  }
});

// 启动服务器
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// 注意：本示例中使用的是硬编码的用户数据和内存存储，
// 在实际应用中应该使用数据库来存储用户信息。