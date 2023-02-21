import dotenv from 'dotenv'
dotenv.config()
import cors from 'cors'
import express from 'express'
import routes from './routes/index.js'
import { createServer } from 'http'

let application = express()
application.use(express.json())
application.use(cors())

routes(application)

let webServer = createServer(application)
webServer.listen(process.env.PORT || 8080, () => {
  console.log(`Resource Server Ready on port ${process.env.PORT || 8080}`)
})
