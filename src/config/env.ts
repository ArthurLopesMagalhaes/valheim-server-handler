import z from 'zod';

export const schema = z.object({
  HOSTED_ZONE_ID: z.string().min(1, 'HOSTED_ZONE_ID is required'),
  RECORD_NAME: z.string().min(1, 'RECORD_NAME is required'),
});

export const env = schema.parse(process.env);
