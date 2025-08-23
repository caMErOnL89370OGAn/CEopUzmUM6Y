// 代码生成时间: 2025-08-23 17:40:28
// Function to create a new shopping cart
function ShoppingCart() {
    this.items = []; // Array to store cart items
}

// Adds an item to the cart
ShoppingCart.prototype.addItem = function(item) {
    // Check if item exists and is of valid type
    if (!item || typeof item !== 'object' || !('id' in item) || !('name' in item) || !('quantity' in item) || !('price' in item)) {
        throw new Error('Invalid item format');
    }
    
    // Check for existing item and update quantity if found
    const existingItemIndex = this.items.findIndex(cartItem => cartItem.id === item.id);
    if (existingItemIndex !== -1) {
        this.items[existingItemIndex].quantity += item.quantity;
    } else {
        // Add new item to the cart
        this.items.push(item);
    }
};

// Removes an item from the cart by ID
ShoppingCart.prototype.removeItem = function(itemId) {
    // Find the item index in the cart
    const itemIndex = this.items.findIndex(item => item.id === itemId);
    
    // If item found, remove it from the cart
    if (itemIndex !== -1) {
        this.items.splice(itemIndex, 1);
    } else {
        throw new Error('Item not found in cart');
    }
};

// Gets the current state of the cart
ShoppingCart.prototype.getCart = function() {
    return this.items; // Returns a copy of the items array to avoid external modifications
};

// Example usage
const cart = new ShoppingCart();
try {
    cart.addItem({ id: 1, name: 'Apple', quantity: 2, price: 0.99 });
    cart.addItem({ id: 2, name: 'Banana', quantity: 5, price: 0.50 });
    console.log('Cart:', cart.getCart());

    cart.removeItem(1);
    console.log('Cart after removing Apple:', cart.getCart());
} catch (error) {
    console.error('Error:', error.message);
}