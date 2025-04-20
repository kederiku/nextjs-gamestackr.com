import z from "zod";

export const registerSchema = z.object({
  username: z.string()
    .min(3, { message: "Username must be at least 3 characters." })
    .max(50, { message: "Username cannot exceed 50 characters." }),
  email: z.string().email(),
  password: z.string()
    .min(8, { message: "Password must be at least 8 characters." })
    .max(100, { message: "Password cannot exceed 100 characters." })
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/, {
      message: "Password must contain at least one lowercase letter, one uppercase letter, and one digit.",
    }),
  confirmPassword: z.string().min(8, { message: "Confirm password must be at least 8 characters." })
}).refine((data) => data.password === data.confirmPassword, {
  path: ['confirmPassword'],
  message: 'Passwords does not match'
});

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});