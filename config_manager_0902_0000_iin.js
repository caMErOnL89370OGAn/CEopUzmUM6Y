// 代码生成时间: 2025-09-02 00:00:36
const fs = require('fs');
const path = require('path');

// 配置文件管理器
class ConfigManager {
    // 构造函数，接收配置文件路径
    constructor(configPath) {
        this.configPath = configPath;
    }

    // 加载配置文件
    loadConfig() {
        try {
            // 读取JSON文件
            const rawData = fs.readFileSync(this.configPath);
            // 解析JSON数据
            this.config = JSON.parse(rawData);
            console.log('Configuration loaded successfully.');
        } catch (error) {
            // 错误处理
            console.error('Failed to load configuration:', error);
            throw error;
        }
    }

    // 获取配置项
    getConfig(key) {
        if (this.config) {
            return this.config[key];
        } else {
            throw new Error('Configuration is not loaded.');
        }
    }

    // 更新配置项
    updateConfig(key, value) {
        if (this.config) {
            this.config[key] = value;
            // 将更新写入文件
            fs.writeFileSync(this.configPath, JSON.stringify(this.config, null, 2), 'utf8');
            console.log('Configuration updated successfully.');
        } else {
            throw new Error('Configuration is not loaded.');
        }
    }
}

// 使用示例
const configPath = path.join(__dirname, 'config.json');
const configManager = new ConfigManager(configPath);

configManager.loadConfig()
    .then(() => {
        console.log('Current config:', configManager.getConfig('exampleKey'));
        configManager.updateConfig('exampleKey', 'exampleValue')
            .then(() => console.log('Config updated successfully.'));
    })
    .catch((error) => console.error('Error:', error));