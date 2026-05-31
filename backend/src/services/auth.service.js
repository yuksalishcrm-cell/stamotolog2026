import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { prisma } from '../db/prisma.js';
import { env } from '../config/env.js';

export async function registerDoctor({ name, phone, email, password }) {
  const exists = await prisma.doctor.findUnique({ where: { phone } });
  if (exists) {
    throw new Error('Bu telefon raqam bilan shifokor mavjud');
  }

  const passwordHash = await bcrypt.hash(password, 10);
  const doctor = await prisma.doctor.create({
    data: { name, phone, email, passwordHash }
  });

  return createAuthResponse(doctor);
}

export async function loginDoctor({ phone, password }) {
  const doctor = await prisma.doctor.findUnique({ where: { phone } });
  if (!doctor) {
    throw new Error('Telefon yoki parol noto‘g‘ri');
  }

  const ok = await bcrypt.compare(password, doctor.passwordHash);
  if (!ok) {
    throw new Error('Telefon yoki parol noto‘g‘ri');
  }

  return createAuthResponse(doctor);
}

function createAuthResponse(doctor) {
  const token = jwt.sign(
    { id: doctor.id, phone: doctor.phone, name: doctor.name },
    env.jwtSecret,
    { expiresIn: '30d' }
  );

  return {
    token,
    doctor: {
      id: doctor.id,
      name: doctor.name,
      phone: doctor.phone,
      email: doctor.email
    }
  };
}
