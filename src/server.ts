import express from 'express'
import { routes } from './routes'

const app:express.Application = express()
const port = process.env.PORT || 8000

routes(app)

app.listen(port)