// 代码生成时间: 2025-08-25 18:29:15
const DEFAULT_CACHE_TTL = 60000; // Default cache TTL in milliseconds
const cacheStore = {}; // In-memory cache store

/**
 * Cache data for a given key with a specified TTL (time to live).
 *
 * @param {string} key - The unique key for the cache item.
 * @param {any} data - The data to cache.
 * @param {number} [ttl=DEFAULT_CACHE_TTL] - Time to live for the cache item.
 */
function cacheData(key, data, ttl = DEFAULT_CACHE_TTL) {
  const now = Date.now();
  cacheStore[key] = {
    data: data,
    expires: now + ttl,
  };
}

/**
 * Retrieve data from the cache for a given key.
 *
 * @param {string} key - The unique key for the cache item.
 * @returns {any|null} - The cached data or null if not found or expired.
 */
function getDataFromCache(key) {
  const item = cacheStore[key];
  if (!item) {
    return null;
  }

  if (Date.now() > item.expires) {
    console.log('Cache item expired');
    delete cacheStore[key];
    return null;
  }

  return item.data;
}

/**
 * Clear the cache for a specific key or clear all the cache if no key is provided.
 *
 * @param {string} [key] - The unique key for the cache item to clear. If not provided, clears all cache.
 */
function clearCache(key) {
  if (key) {
    if (cacheStore[key]) {
      delete cacheStore[key];
    } else {
      console.warn(`No cache item found for key: ${key}`);
    }
  } else {
    cacheStore = {};
    console.log('Cache cleared');
  }
}

// Example usage:
try {
  // Cache some data with a TTL of 30 seconds
  cacheData('user:123', { name: 'John Doe' }, 30000);

  // Retrieve data from cache
  const userData = getDataFromCache('user:123');
  if (userData) {
    console.log('Cached data:', userData);
  } else {
    console.log('Data not found in cache');
  }

  // Clear cache for a specific key
  clearCache('user:123');
} catch (error) {
  console.error('An error occurred:', error.message);
}
