import z from 'zod';

export const schema = z.object({
  INSTANCE_ID: z.string().min(1, 'INSTANCE_ID is required'),
  HOSTED_ZONE_ID: z.string().min(1, 'HOSTED_ZONE_ID is required'),
  RECORD_NAME: z.string().min(1, 'RECORD_NAME is required'),
});

export const env = schema.parse(process.env);
