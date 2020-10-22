import express from 'express'
import productsRoute from '../route/product'

const app = express()
app.use(express.json())

productsRoute(app)

export default app
