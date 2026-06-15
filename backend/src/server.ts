import dotenv from "dotenv"
dotenv.config()
import './config/env'
import app from "./app"
import { logger } from "./utils"
import { env } from './config/env'

const PORT = env.PORT

app.listen(PORT, () => {
  logger.info(`Auth Service running on port ${PORT}`)
})
