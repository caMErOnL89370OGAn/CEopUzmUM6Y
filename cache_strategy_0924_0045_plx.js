// 代码生成时间: 2025-09-24 00:45:36
const NodeCache = require('node-cache');

// 创建一个缓存对象
const cache = new NodeCache({
  stdTTL: 100, // 缓存时间，默认100秒
  checkperiod: 120 // 每120秒检查缓存中的数据是否过期
});

// 缓存策略实现
class CacheStrategy {
  // 存储数据
  static set(key, value, ttl = 100) {
    try {
      // 设置缓存项，并指定过期时间（ttl）
      cache.set(key, value, ttl);
      console.log(`Cache set for key: ${key}, ttl: ${ttl} seconds`);
    } catch (error) {
      console.error("Error setting cache: ", error);
    }
  }

  // 获取数据
  static get(key) {
    try {
      // 获取缓存项
      const value = cache.get(key);
      if (value) {
        console.log(`Cache hit for key: ${key}`);
        return value;
      } else {
        console.log(`Cache miss for key: ${key}`);
        return null;
      }
    } catch (error) {
      console.error("Error getting cache: ", error);
      return null;
    }
  }

  // 删除数据
  static delete(key) {
    try {
      // 删除缓存项
      cache.del(key);
      console.log(`Cache deleted for key: ${key}`);
    } catch (error) {
      console.error("Error deleting cache: ", error);
    }
  }

  // 清除所有缓存
  static flushAll() {
    try {
      // 清空缓存
      cache.flushAll();
      console.log("All cache has been flushed");
    } catch (error) {
      console.error("Error flushing cache: ", error);
    }
  }
}

// Example usage
CacheStrategy.set('user:1', 'John Doe', 300);
const user = CacheStrategy.get('user:1');
console.log(user);
CacheStrategy.delete('user:1');
CacheStrategy.flushAll();