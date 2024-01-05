declare namespace NodeJS {
  interface ProcessEnv {
    DATABASE_DATABASE: string
    DATABASE_USERNAME: string
    DATABASE_PASSWORD: string
    DATABASE_HOST: string
    DATABASE_PORT: string
    DATABASE_URL: string

    FRONT_HOST: string
    FRONT_PORT: string
    FRONT_URL: string

    JWT_SECRET: string
    JWT_EXPIRES_IN: string
  }
}
