// 代码生成时间: 2025-08-02 04:54:20
// Import necessary modules
const mongoose = require('mongoose');

// Define a base data model class
class BaseModel {
    constructor(model) {
        this.model = model;
    }

    // Create a new document
    async create(data) {
        try {
            const doc = new this.model(data);
            return await doc.save();
        } catch (error) {
            throw new Error(`Failed to create document: ${error.message}`);
        }
    }

    // Find all documents
    async findAll() {
        try {
            return await this.model.find();
        } catch (error) {
            throw new Error(`Failed to find all documents: ${error.message}`);
        }
    }

    // Find a single document by ID
    async findById(id) {
        try {
            return await this.model.findById(id);
        } catch (error) {
            throw new Error(`Failed to find document by ID: ${error.message}`);
        }
    }

    // Update a document by ID
    async updateById(id, data) {
        try {
            return await this.model.findByIdAndUpdate(id, data, { new: true });
        } catch (error) {
            throw new Error(`Failed to update document by ID: ${error.message}`);
        }
    }

    // Delete a document by ID
    async deleteById(id) {
        try {
            return await this.model.findByIdAndDelete(id);
        } catch (error) {
            throw new Error(`Failed to delete document by ID: ${error.message}`);
        }
    }
}

// Export the base model class
module.exports = BaseModel;
