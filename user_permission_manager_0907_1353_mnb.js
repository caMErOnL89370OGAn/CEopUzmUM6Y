// 代码生成时间: 2025-09-07 13:53:01
const users = new Map(); // 存储用户及其权限

/**
 * 添加用户
 * @param {string} username 用户名
 * @param {string[]} permissions 用户权限列表
 */
function addUser(username, permissions) {
  if (!username) {
    throw new Error('用户名不能为空');
  }
  if (!Array.isArray(permissions)) {
    throw new Error('权限必须是数组');
  }
  users.set(username, permissions);
  console.log(`用户 ${username} 添加成功，权限为: ${permissions.join(', ')}`);
}

/**
 * 删除用户
 * @param {string} username 用户名
 */
function removeUser(username) {
  if (!users.has(username)) {
    throw new Error('用户不存在');
  }
  users.delete(username);
  console.log(`用户 ${username} 已删除`);
}

/**
 * 更新用户权限
 * @param {string} username 用户名
 * @param {string[]} newPermissions 新的权限列表
 */
function updateUserPermissions(username, newPermissions) {
  if (!users.has(username)) {
    throw new Error('用户不存在');
  }
  if (!Array.isArray(newPermissions)) {
    throw new Error('权限必须是数组');
  }
  users.set(username, newPermissions);
  console.log(`用户 ${username} 的权限更新为: ${newPermissions.join(', ')}`);
}

/**
 * 检查用户是否有特定权限
 * @param {string} username 用户名
 * @param {string} permission 需要检查的权限
 * @returns {boolean} 是否有权限
 */
function checkPermission(username, permission) {
  if (!users.has(username)) {
    throw new Error('用户不存在');
  }
  const userPermissions = users.get(username);
  return userPermissions.includes(permission);
}

// 示例代码
try {
  addUser('alice', ['read', 'write']);
  addUser('bob', ['read']);
  console.log(`alice是否有写权限: ${checkPermission('alice', 'write')}`); // 输出: true
  console.log(`bob是否有写权限: ${checkPermission('bob', 'write')}`); // 输出: false
  updateUserPermissions('alice', ['read', 'write', 'delete']);
  console.log(`alice是否有删除权限: ${checkPermission('alice', 'delete')}`); // 输出: true
  removeUser('bob');
  console.log(`bob是否存在: ${users.has('bob')}`); // 输出: false
} catch (error) {
  console.error(error.message);
}