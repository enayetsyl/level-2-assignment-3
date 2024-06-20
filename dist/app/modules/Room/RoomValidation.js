"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.roomValidation = void 0;
const zod_1 = require("zod");
const roomValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string().min(1).max(20),
        roomNo: zod_1.z.number().positive(),
        floorNo: zod_1.z.number().positive(),
        capacity: zod_1.z.number().positive(),
        pricePerSlot: zod_1.z.number().positive(),
        amenities: zod_1.z.array(zod_1.z.string()),
        isDeleted: zod_1.z.boolean().default(false)
    })
});
const roomUpdateValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string().min(1).max(20).optional(),
        roomNo: zod_1.z.number().positive().optional(),
        floorNo: zod_1.z.number().positive().optional(),
        capacity: zod_1.z.number().positive().optional(),
        pricePerSlot: zod_1.z.number().positive().optional(),
        amenities: zod_1.z.array(zod_1.z.string()).optional(),
        isDeleted: zod_1.z.boolean().optional()
    })
});
exports.roomValidation = {
    roomValidationSchema, roomUpdateValidationSchema
};
