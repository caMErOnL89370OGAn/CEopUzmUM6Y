// 代码生成时间: 2025-09-16 00:48:28
const fs = require('fs');
const path = require('path');
const { Pool } = require('pg'); // 使用pg库与PostgreSQL数据库交互

/**
 * DatabaseMigrationTool类，用于处理数据库迁移
 * @class DatabaseMigrationTool
 */
class DatabaseMigrationTool {
  constructor({ connectionString }) {
    this.pool = new Pool({ connectionString });
  }

  /**
   * 执行数据库迁移
   * @param {string} migrationPath - 迁移脚本文件的路径
   * @returns {Promise<void>}
   */
  async migrate(migrationPath) {
    try {
      // 读取迁移脚本目录
      const files = await this.readMigrationFiles(migrationPath);

      // 连接数据库
      const client = await this.pool.connect();
      try {
        await client.query('BEGIN'); // 开始一个事务
        for (const file of files) {
          const sql = await this.readFile(file);
          await client.query(sql); // 执行迁移脚本
        }
        await client.query('COMMIT'); // 提交事务
      } catch (error) {
        await client.query('ROLLBACK'); // 如果出错，回滚事务
        throw error;
      } finally {
        client.release(); // 释放数据库连接
      }
    } catch (error) {
      console.error('Migration failed:', error);
      throw error;
    }
  }

  /**
   * 读取迁移文件
   * @param {string} directory - 目录路径
   * @returns {Promise<string[]>} - 文件列表
   */
  async readMigrationFiles(directory) {
    const files = await fs.promises.readdir(directory);
    return files.filter((file) => file.endsWith('.sql')); // 过滤出.sql文件
  }

  /**
   * 读取文件内容
   * @param {string} filePath - 文件路径
   * @returns {Promise<string>} - 文件内容
   */
  async readFile(filePath) {
    return await fs.promises.readFile(filePath, 'utf8');
  }
}

// 使用示例
(async () => {
  const migrationTool = new DatabaseMigrationTool({
    connectionString: 'postgresql://username:password@localhost:5432/databaseName',
  });

  try {
    await migrationTool.migrate(path.join(__dirname, 'migrations'));
    console.log('Migration successful');
  } catch (error) {
    console.error('Migration failed:', error);
  }
})();