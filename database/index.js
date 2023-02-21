import dotenv from 'dotenv'
dotenv.config()
import Sequelize from 'sequelize'

let connection
try {
  connection = new Sequelize(
    process.env.DB_DATABASE,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
      host: process.env.DB_HOST,
      dialect: 'postgres',
      logging: false
    }
  )
} catch (err) {
  console.log(`@Exception on DB connection: ${err.message}`)
}

export default connection
