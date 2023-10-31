"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginValidation = exports.registerValidation = void 0;
const joi_1 = __importDefault(require("joi"));
//Register Validation
const registerValidation = (data) => {
    const schema = joi_1.default.object({
        username: joi_1.default.string().required().min(5),
        password: joi_1.default.string().required().min(5),
        status: joi_1.default.string().required(),
        name: joi_1.default.string(),
        address: joi_1.default.string(),
        phone_number: joi_1.default.string(),
        gender: joi_1.default.string(),
    });
    return schema.validate(data);
};
exports.registerValidation = registerValidation;
//Login Validation
const loginValidation = (data) => {
    const schema = joi_1.default.object({
        username: joi_1.default.string().required(),
        password: joi_1.default.string().min(6),
    });
    return schema.validate(data);
};
exports.loginValidation = loginValidation;
//# sourceMappingURL=validation.js.map