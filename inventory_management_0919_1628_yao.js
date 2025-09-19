// 代码生成时间: 2025-09-19 16:28:41
const EventEmitter = require('events');

// 定义一个库存管理类的构造函数
class InventoryManagement extends EventEmitter {
  // 构造函数初始化
  constructor() {
    super();
    this.inventory = {}; // 用于存储库存信息的对象
  }

  // 添加库存项
  addInventoryItem(itemName, quantity) {
    if (typeof itemName !== 'string' || typeof quantity !== 'number') {
      throw new Error('Invalid item name or quantity');
    }

    if (this.inventory[itemName]) {
      this.inventory[itemName] += quantity;
    } else {
      this.inventory[itemName] = quantity;
    }

    console.log(`Added ${quantity} of ${itemName} to inventory. Total: ${this.inventory[itemName]}`);

    this.emit('inventoryUpdated', { itemName, quantity, total: this.inventory[itemName] });
  }

  // 减少库存项
  removeInventoryItem(itemName, quantity) {
    if (typeof itemName !== 'string' || typeof quantity !== 'number') {
      throw new Error('Invalid item name or quantity');
    }

    if (!this.inventory[itemName] || this.inventory[itemName] < quantity) {
      throw new Error('Not enough inventory to remove');
    }

    this.inventory[itemName] -= quantity;

    console.log(`Removed ${quantity} of ${itemName} from inventory. Total: ${this.inventory[itemName]}`);

    if (this.inventory[itemName] <= 0) {
      delete this.inventory[itemName]; // 如果数量为0，则从库存中移除该项
    }

    this.emit('inventoryUpdated', { itemName, quantity, total: this.inventory[itemName] || 0 });
  }

  // 获取库存项
  getInventoryItem(itemName) {
    if (typeof itemName !== 'string') {
      throw new Error('Invalid item name');
    }

    return this.inventory[itemName] || 0;
  }

  // 获取整个库存
  getAllInventory() {
    return this.inventory;
  }
}

// 使用示例：
const inventoryManager = new InventoryManagement();

// 添加库存
inventoryManager.addInventoryItem('Apples', 50);
inventoryManager.addInventoryItem('Oranges', 30);

// 减少库存
inventoryManager.removeInventoryItem('Apples', 10);

// 获取单个库存项
console.log(inventoryManager.getInventoryItem('Apples'));

// 获取整个库存
console.log(inventoryManager.getAllInventory());

// 监听库存更新事件
inventoryManager.on('inventoryUpdated', (update) => {
  console.log(`Inventory updated for ${update.itemName}: ${update.total} remaining`);
});