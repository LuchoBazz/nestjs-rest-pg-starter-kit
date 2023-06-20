import { registerAs } from '@nestjs/config';

export default registerAs('jwt', () => ({
  secretKey: process.env.JWT_SECRET_KEY || 'c1e630b708c741e7875b0ffcd8e8c03a',
  expiresIn: process.env.JWT_EXPIRES_IN || '7d',
}));
