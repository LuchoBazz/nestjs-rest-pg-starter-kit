import { registerAs } from '@nestjs/config';

export default registerAs('cache', () => {
  console.log({ ttl: process.env.CACHE_TTL });
  return {
    ttl: parseInt(process.env.CACHE_TTL) || 60 * 15,
  };
});
