require('dotenv').config()

module.exports = {
  development: {
    username: process.env.POSTGRES_USERNAME_DEV,
    password: process.env.POSTGRES_PASSWORD_DEV,
    database: process.env.POSTGRES_DATABASE_DEV,
    host: process.env.POSTGRES_HOST_DEV,
    dialect: 'postgres'
  },
  test: {
    username: process.env.POSTGRES_USERNAME_TEST,
    password: process.env.POSTGRES_PASSWORD_TEST,
    database: process.env.POSTGRES_DATABASE_TEST,
    host: process.env.POSTGRES_HOST_TEST,
    dialect: 'postgres'
  },
  production: {
    username: process.env.POSTGRES_USERNAME_PROD,
    password: process.env.POSTGRES_PASSWORD_PROD,
    database: process.env.POSTGRES_DATABASE_PROD,
    host: process.env.POSTGRES_HOST_PROD,
    dialect: 'postgres'
  }
}
