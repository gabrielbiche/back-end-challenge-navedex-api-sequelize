import dotenv from 'dotenv'
import path from 'path'

dotenv.config({
  path: path.resolve(__dirname, '../.env')
})

export const PORT = process.env.PORT || 3000
export const ACCESS_SECRET = process.env.ACCESS_SECRET || 'mysupersecret'
export const ACCESS_EXPIRES = process.env.ACCESS_EXPIRES || 1200
export const DB_USER = process.env.DB_USER || 'root'
export const DB_PASSWORD = process.env.DB_PASSWORD || 'root'
export const DB_HOST = process.env.DB_HOST || 'localhost'
export const DB_PORT = process.env.DB_PORT || 3306
export const DB_DATABASE = process.env.DB_DATABASE || 'database_test'
