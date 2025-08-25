// 代码生成时间: 2025-08-26 00:07:42
const http = require('http');
const sanitizeHtml = require('sanitize-html');

// 配置sanitize-html的选项，可根据需要自定义规则
const sanitizeOptions = {
  allowedTags: [], // 白名单标签，不在列表中的标签将被移除
  allowedAttributes: [], // 白名单属性，不在列表中的属性将被移除
  allowedSchemes: ['http', 'https'], // 允许的协议
  allowedSchemesByTag: {}, // 根据标签允许的协议
  allowProtocolRelative: false, // 是否允许协议相对URL
  selfClosing: [], // 允许自闭合的标签
  exclusiveFilter: function(frame) {
    return frame.tag === 'img' && (!frame.attrs.src || frame.attrs.src.startsWith('data:'));
  }, // 排除特定标签和属性
};

// XSS防护中间件
function xssProtectionMiddleware(request, response, next) {
  try {
    // 检查请求方法是否为POST
    if (request.method === 'POST') {
      // 获取请求正文
      let body = '';
      request.on('data', chunk => {
        body += chunk.toString(); // 转换为字符串
      });
      request.on('end', () => {
        // 使用sanitize-html进行XSS防护
        const cleanBody = sanitizeHtml(body, sanitizeOptions);
        // 将清理后的正文重新赋值给request.body
        request.body = JSON.parse(cleanBody);
        next();
      });
    } else {
      next();
    }
  } catch (error) {
    console.error('XSS protection middleware error:', error);
    response.statusCode = 500;
    response.end('Internal Server Error');
  }
}

// 创建HTTP服务器
const server = http.createServer((request, response) => {
  // 应用XSS防护中间件
  xssProtectionMiddleware(request, response, () => {
    // 处理请求
    if (request.url === '/' && request.method.toLowerCase() === 'post') {
      response.writeHead(200, {'Content-Type': 'application/json'});
      response.end(JSON.stringify({ message: 'Request processed successfully', body: request.body }));
    } else {
      response.writeHead(404, {'Content-Type': 'text/plain'});
      response.end('Not Found');
    }
  });
});

// 监听端口
server.listen(3000, () => {
  console.log('Server is running on http://localhost:3000/');
});