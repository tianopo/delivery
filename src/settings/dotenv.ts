import * as dotenv from 'dotenv'

dotenv.config({ path: '.env' })

export const Dotenv = {
  databaseDatabase: process.env.DATABASE_DATABASE,
  databaseUsername: process.env.DATABASE_USERNAME,
  databasePassword: process.env.DATABASE_PASSWORD,
  databaseHost: process.env.DATABASE_HOST,
  databasePort: process.env.DATABASE_PORT,
  databaseUrl: process.env.DATABASE_URL
  ,
  frontHost: process.env.FRONT_HOST,
  frontPort: process.env.FRONT_PORT,
  frontUrl: process.env.FRONT_URL
  ,
  jwtSecret: process.env.JWT_SECRET,
  jwtExpiresIn: process.env.JWT_EXPIRES_IN
}
