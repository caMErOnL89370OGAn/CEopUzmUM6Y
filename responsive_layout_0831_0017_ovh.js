// 代码生成时间: 2025-08-31 00:17:41
const express = require('express');
const path = require('path');

// 创建一个Express应用
const app = express();
const PORT = 3000;

// 中间件，用于解析请求体
app.use(express.json());

// 静态文件服务，用于提供CSS和JS文件
app.use(express.static(path.join(__dirname, 'public')));

// 错误处理中间件
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// 路由：响应式布局页面
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

// 启动服务器
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

// 以下注释用于描述如何实现响应式布局

// 1. 使用CSS媒体查询来适配不同屏幕尺寸
// 2. 使用流体布局（百分比宽度）来使元素随屏幕尺寸变化
// 3. 使用弹性盒模型（Flexbox）或网格布局（Grid）来创建灵活的布局结构
// 4. 利用视口单位（vw/vh）来设置元素大小相对于视口的比例

// 示例CSS媒体查询
// @media (max-width: 600px) {
//   body {
//     background-color: lightblue;
//   }
// }

// @media (min-width: 601px) and (max-width: 1200px) {
//   body {
//     background-color: orange;
//   }
// }

// @media (min-width: 1201px) {
//   body {
//     background-color: green;
//   }
// }
