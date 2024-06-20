import { z } from "zod";


const bookingValidationSchema = z.object({
  body: z.object({
    room:z.string(),
    slots: z.array(z.string()) ,
    user: z.string(),
    date: z.string(),
    totalAmount: z.number().positive().optional(),
    isConfirmed: z.enum(["confirmed", "unconfirmed", "canceled"]).default('unconfirmed'),
    isBooked: z.boolean().default(false)
  })
})

const bookingValidationUpdateSchema = z.object({
  body: z.object({
    room:z.string().optional(),
    slots: z.array(z.string()).optional() ,
    user: z.string().optional(),
    date: z.string().optional(),
    totalAmount: z.number().positive().optional(),
    isConfirmed: z.enum(["confirmed", "unconfirmed", "canceled"]).default('unconfirmed'),
    isBooked: z.boolean().default(false)
  })
})

export const BookingValidation = {
  bookingValidationSchema, bookingValidationUpdateSchema
}