import { number, z } from 'zod';


export const userSchema = z.object({
  newusername: z.string().min(6),
  password: z.string().min(8).regex(/(?:[A-Z].*[0-9])|(?:[0-9].*[A-Z])/),
});


