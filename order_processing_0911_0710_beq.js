// 代码生成时间: 2025-09-11 07:10:18
const { EventEmitter } = require('events');

// 定义订单状态枚举
const OrderStatus = {
    PENDING: 'PENDING',
    CONFIRMED: 'CONFIRMED',
    SHIPPED: 'SHIPPED',
    DELIVERED: 'DELIVERED',
    CANCELLED: 'CANCELLED'
};

// 创建一个事件发射器用于订单处理
class OrderProcessing extends EventEmitter {
    constructor() {
        super();
        this.status = OrderStatus.PENDING;
    }

    // 确认订单
    confirmOrder() {
        try {
            if (this.status !== OrderStatus.PENDING) {
                throw new Error('Order can only be confirmed if it is in PENDING status.');
            }

            this.status = OrderStatus.CONFIRMED;
            this.emit('orderStatusUpdated', this.status);
            console.log('Order confirmed.');
        } catch (error) {
            this.emit('error', error.message);
            console.error(error.message);
        }
    }

    // 订单发货
    shipOrder() {
        try {
            if (this.status !== OrderStatus.CONFIRMED) {
                throw new Error('Order can only be shipped if it is in CONFIRMED status.');
            }

            this.status = OrderStatus.SHIPPED;
            this.emit('orderStatusUpdated', this.status);
            console.log('Order shipped.');
        } catch (error) {
            this.emit('error', error.message);
            console.error(error.message);
        }
    }

    // 订单交付
    deliverOrder() {
        try {
            if (this.status !== OrderStatus.SHIPPED) {
                throw new Error('Order can only be delivered if it is in SHIPPED status.');
            }

            this.status = OrderStatus.DELIVERED;
            this.emit('orderStatusUpdated', this.status);
            console.log('Order delivered.');
        } catch (error) {
            this.emit('error', error.message);
            console.error(error.message);
        }
    }

    // 取消订单
    cancelOrder() {
        try {
            if (this.status === OrderStatus.DELIVERED || this.status === OrderStatus.CANCELLED) {
                throw new Error('Order cannot be cancelled if it is already DELIVERED or CANCELLED.');
            }

            this.status = OrderStatus.CANCELLED;
            this.emit('orderStatusUpdated', this.status);
            console.log('Order cancelled.');
        } catch (error) {
            this.emit('error', error.message);
            console.error(error.message);
        }
    }
}

// 使用示例
const order = new OrderProcessing();

// 监听订单状态更新事件
order.on('orderStatusUpdated', (status) => {
    console.log(`Order status updated to: ${status}`);
});

// 监听错误事件
order.on('error', (errorMessage) => {
    console.error(errorMessage);
});

// 尝试处理订单流程
order.confirmOrder();
order.shipOrder();
order.deliverOrder();
order.cancelOrder(); // 这将触发错误，因为订单已经交付
