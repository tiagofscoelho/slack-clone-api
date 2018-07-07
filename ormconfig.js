module.exports = {
  "type": "postgres",
  "host": process.env.DATABASE_HOST,
  "port": process.env.DATABASE_PORT,
  "username": process.env.DATABASE_USERNAME,
  "password": process.env.DATABABE_PASSWORD,
  "database": process.env.DATABASE_NAME,
  "entities": ["./src/**/*.entity{.ts,.js}"],
  "synchronize": true
}