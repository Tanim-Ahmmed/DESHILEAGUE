import { createEnv } from '@t3-oss/env-core'
import { z } from 'zod'

export const env = createEnv({
  server: {
    DATABASE_URL: z.string().url(),
    REDIS_URL: z.string().url(),
    NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
    PORT: z.coerce.number(),
  },

  clientPrefix: 'PUBLIC_',
  client: {},
  runtimeEnv: process.env,

  emptyStringAsUndefined: true,
})
