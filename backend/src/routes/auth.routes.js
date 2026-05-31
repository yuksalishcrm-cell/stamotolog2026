import express from 'express';
import { z } from 'zod';
import { loginDoctor, registerDoctor } from '../services/auth.service.js';

export const authRouter = express.Router();

const registerSchema = z.object({
  name: z.string().min(2),
  phone: z.string().min(5),
  email: z.string().email().optional().or(z.literal('')),
  password: z.string().min(4)
});

const loginSchema = z.object({
  phone: z.string().min(5),
  password: z.string().min(4)
});

authRouter.post('/register', async (req, res) => {
  try {
    const data = registerSchema.parse(req.body);
    const result = await registerDoctor(data);
    res.json(result);
  } catch (error) {
    res.status(400).json({ message: error.message || 'Ro‘yxatdan o‘tishda xatolik' });
  }
});

authRouter.post('/login', async (req, res) => {
  try {
    const data = loginSchema.parse(req.body);
    const result = await loginDoctor(data);
    res.json(result);
  } catch (error) {
    res.status(400).json({ message: error.message || 'Kirishda xatolik' });
  }
});
