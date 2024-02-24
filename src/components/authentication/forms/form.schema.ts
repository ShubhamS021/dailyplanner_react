import { z } from 'zod';

const loginSchema = {
    email: z.string().email({
        message: 'Email must be at least 2 characters and a valid email.',
    }),
    password: z.string().min(8, {
        message: 'Password must be at least 8 characters.',
    }),
};

const registerSchema = {
    username: z.string().min(2, {
        message: 'Username must be at least 2 characters.',
    }),
};

export const loginFormSchema = z.object({
    ...loginSchema,
});
export const registerFormSchema = z.object({
    ...loginSchema,
    ...registerSchema,
});
