// 代码生成时间: 2025-08-09 19:03:22
const { Pool } = require('pg'); // 引入 PostgreSQL 连接池模块

// 数据库配置信息
const config = {
  user: 'your_database_user', // 数据库用户名
  host: 'your_database_host',   // 数据库主机地址
  database: 'your_database_name', // 数据库名
  password: 'your_database_password', // 数据库密码
  port: 5432, // 数据库端口
  max: 20, // 连接池最大连接数
  idleTimeoutMillis: 30000, // 连接池中的连接在闲置多久后会被销毁（30秒）
  connectionTimeoutMillis: 2000 // 连接池请求连接时超时时间（2秒）
};

// 创建数据库连接池实例
const pool = new Pool(config);

// 异步函数，从连接池中获取连接并执行SQL语句
async function query(text, params) {
  try {
    // 从连接池中获取连接
    const client = await pool.connect();
    try {
      // 使用获取的连接执行SQL语句
      const result = await client.query(text, params);
      return result; // 返回查询结果
    } catch (err) {
      console.error('Database query error:', err);
      throw err; // 抛出错误
    } finally {
      // 释放连接，归还到连接池
      client.release();
    }
  } catch (err) {
    console.error('Connection error:', err);
    throw err; // 抛出错误
  }
}

// 异步函数，关闭数据库连接池
async function end() {
  try {
    // 断开所有连接并关闭连接池
    await pool.end();
  } catch (err) {
    console.error('Error ending pool:', err);
    throw err; // 抛出错误
  }
}

// 导出模块
module.exports = {
  query,
  end
};