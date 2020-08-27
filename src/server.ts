import dotenv from 'dotenv'
dotenv.config()

import express, {Application} from 'express'
import { routes } from './routes'

const app:Application = express()
const port = process.env.PORT || 8000

routes(app)
app.listen(port)