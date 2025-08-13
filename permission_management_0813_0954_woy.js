// 代码生成时间: 2025-08-13 09:54:34
const fs = require('fs');
const path = require('path');

// 用户权限管理系统
class PermissionManager {
  // 构造函数，初始化权限数据存储路径
  constructor(dataPath) {
    this.dataPath = dataPath;
    this.loadData();
  }

  // 从文件系统加载权限数据
  loadData() {
    try {
      const data = fs.readFileSync(this.dataPath, 'utf8');
      this.permissions = JSON.parse(data);
    } catch (error) {
      console.error('Error loading permissions data:', error);
      this.permissions = {};
    }
  }

  // 保存权限数据到文件系统
  saveData() {
    try {
      fs.writeFileSync(this.dataPath, JSON.stringify(this.permissions, null, 2), 'utf8');
    } catch (error) {
      console.error('Error saving permissions data:', error);
    }
  }

  // 添加或更新用户的权限
  addOrUpdateUserPermission(userId, permission) {
    if (!this.permissions[userId]) {
      this.permissions[userId] = [];
    }
    this.permissions[userId].push(permission);
    this.saveData();
  }

  // 删除用户的权限
  removeUserPermission(userId, permission) {
    if (this.permissions[userId]) {
      const index = this.permissions[userId].indexOf(permission);
      if (index > -1) {
        this.permissions[userId].splice(index, 1);
        this.saveData();
      }
    }
  }

  // 获取用户的权限
  getUserPermissions(userId) {
    return this.permissions[userId] || [];
  }
}

// 使用示例
const permissionsPath = path.join(__dirname, 'permissions.json');
const manager = new PermissionManager(permissionsPath);

// 添加权限
manager.addOrUpdateUserPermission('user1', 'read');
manager.addOrUpdateUserPermission('user1', 'write');

// 获取权限
const permissions = manager.getUserPermissions('user1');
console.log(permissions); // ['read', 'write']

// 删除权限
manager.removeUserPermission('user1', 'write');

// 获取更新后的权限
const updatedPermissions = manager.getUserPermissions('user1');
console.log(updatedPermissions); // ['read']
