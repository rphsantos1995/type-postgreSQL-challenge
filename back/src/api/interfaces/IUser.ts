import { number, z } from 'zod';
import { Users } from '@prisma/client';

export const userSchema = z.object({
  newusername: z.string().min(6),
  password: z.string().min(8).regex(/(?:[A-Z].*[0-9])|(?:[0-9].*[A-Z])/),
});

export interface IAllUser {
  code: number,
  data: Users[]
}

export interface IUser {
  code: number,
  data?: Users | {} | unknown,
  message?: string | {}
}


