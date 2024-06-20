"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserValidation = void 0;
const zod_1 = require("zod");
const userValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string().min(1).max(20),
        email: zod_1.z.string().email(),
        password: zod_1.z.string().max(20),
        phone: zod_1.z.string(),
        role: zod_1.z.enum(['user', 'admin']),
        address: zod_1.z.string(),
    }),
});
const loginValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        email: zod_1.z.string({ required_error: "Email is required" }).email(),
        password: zod_1.z.string({ required_error: "Password is required" })
    })
});
exports.UserValidation = {
    userValidationSchema, loginValidationSchema
};
