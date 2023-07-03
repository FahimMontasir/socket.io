import { z } from 'zod';

const registerZodSchema = z.object({
  body: z.object({
    username: z.string({ required_error: 'username is required' }).min(2).max(15),
    password: z.string({ required_error: 'password is required' }).min(6).max(18),
    mail: z.string({ required_error: 'email is required' }).email(),
  }),
});

const loginZodSchema = z.object({
  body: z.object({
    password: z.string({ required_error: 'password is required' }).min(6).max(18),
    mail: z.string({ required_error: 'email is required' }).email(),
  }),
});

export const UserValidation = {
  registerZodSchema,
  loginZodSchema,
};
