import { z } from 'zod';

const userValidationSchema = z.object({
  body: z.object({
    
      name: z.string().min(1).max(20),
      email: z.string().email(),
      password: z.string().max(20),
      phone: z.string(),
      role: z.enum(['user', 'admin']),
      address: z.string(),
  }),
});

export const UserValidation = {
  userValidationSchema,
};