"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookingValidation = void 0;
const zod_1 = require("zod");
const bookingValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        room: zod_1.z.string(),
        slots: zod_1.z.array(zod_1.z.string()),
        user: zod_1.z.string(),
        date: zod_1.z.string(),
        totalAmount: zod_1.z.number().positive().optional(),
        isConfirmed: zod_1.z.enum(["confirmed", "unconfirmed", "canceled"]).default('unconfirmed'),
        isBooked: zod_1.z.boolean().default(false)
    })
});
const bookingValidationUpdateSchema = zod_1.z.object({
    body: zod_1.z.object({
        room: zod_1.z.string().optional(),
        slots: zod_1.z.array(zod_1.z.string()).optional(),
        user: zod_1.z.string().optional(),
        date: zod_1.z.string().optional(),
        totalAmount: zod_1.z.number().positive().optional(),
        isConfirmed: zod_1.z.enum(["confirmed", "unconfirmed", "canceled"]).default('unconfirmed'),
        isBooked: zod_1.z.boolean().default(false)
    })
});
exports.BookingValidation = {
    bookingValidationSchema, bookingValidationUpdateSchema
};
