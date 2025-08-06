// 代码生成时间: 2025-08-06 22:57:24
const validator = require('validator');

class FormValidator {
  // 构造函数，接受表单数据和验证规则
  constructor(data, rules) {
    this.data = data;
    this.rules = rules;
  }

  // 验证表单数据
  validate() {
    const errors = {};
    for (const [field, rule] of Object.entries(this.rules)) {
      const value = this.data[field];
      const ruleParts = rule.split(':');
      const ruleName = ruleParts[0];
      const params = ruleParts[1] ? ruleParts[1].split(',') : [];

      try {
        // 根据规则名称调用validator中的验证函数
        switch (ruleName) {
          case 'isEmail':
            if (!validator.isEmail(value)) {
              errors[field] = 'Invalid email';
            }
            break;
          case 'isLength':
            if (!validator.isLength(value, parseInt(params[0], 10))) {
              errors[field] = 'Invalid length';
            }
            break;
          case 'isInt':
            if (!validator.isInt(value)) {
              errors[field] = 'Not an integer';
            }
            break;
          case 'isFloat':
            if (!validator.isFloat(value)) {
              errors[field] = 'Not a float';
            }
            break;
          case 'isURL':
            if (!validator.isURL(value, { require_protocol: true })) {
              errors[field] = 'Invalid URL';
            }
            break;
          default:
            throw new Error('Invalid validation rule');
        }
      } catch (error) {
        errors[field] = error.message;
      }
    }

    return errors;
  }
}

// 使用示例
const formData = {
  email: 'example@example.com',
  age: '30',
  name: 'John Doe'
};

const validationRules = {
  email: 'isEmail',
  age: 'isInt',
  name: 'isLength,5'
};

const formValidator = new FormValidator(formData, validationRules);
const validationResult = formValidator.validate();

if (Object.keys(validationResult).length === 0) {
  console.log('Validation passed');
} else {
  console.log('Validation errors:', validationResult);
}
