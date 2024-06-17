import { z } from "zod";

const roomValidationSchema = z.object({
  body: z.object({
    name: z.string().min(1).max(20),
    roomNo: z.number().positive(),
    floorNo: z.number().positive(),
    capacity: z.number().positive(),
    pricePerSlot: z.number().positive(),
    amenities: z.array(z.string()),
    isDeleted: z.boolean().default(false)

  })
})
const roomUpdateValidationSchema = z.object({
  body: z.object({
    name: z.string().min(1).max(20).optional(),
    roomNo: z.number().positive().optional(),
    floorNo: z.number().positive().optional(),
    capacity: z.number().positive().optional(),
    pricePerSlot: z.number().positive().optional(),
    amenities: z.array(z.string()).optional(),
    isDeleted: z.boolean().optional()

  })
})

export const roomValidation = {
  roomValidationSchema, roomUpdateValidationSchema
}