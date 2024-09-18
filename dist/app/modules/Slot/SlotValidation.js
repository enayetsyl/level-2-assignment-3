"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SlotValidation = void 0;
const zod_1 = require("zod");
const timeStringSchema = zod_1.z.string().refine((time) => {
    const regex = /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/; // 00-09 10-19 20-23
    return regex.test(time);
}, {
    message: 'Invalid time format , expected "HH:MM" in 24 hours format',
});
const slotValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        room: zod_1.z.string(),
        date: zod_1.z.string(),
        startTime: timeStringSchema,
        endTime: timeStringSchema,
        isBooked: zod_1.z.boolean().default(false)
    })
});
const slotUpdateValidationSchema = zod_1.z.object({
    room: zod_1.z.string().optional(),
    date: zod_1.z.string().optional(),
    startTime: timeStringSchema.optional(),
    endTime: timeStringSchema.optional(),
    isBooked: zod_1.z.boolean().optional()
});
exports.SlotValidation = {
    slotValidationSchema, slotUpdateValidationSchema
};
