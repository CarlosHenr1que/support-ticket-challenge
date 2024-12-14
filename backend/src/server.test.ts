import mongoose from 'mongoose'
import express from 'express'

import { start } from './server'

let app: express.Express

beforeAll(async () => {
  await start()
  app = express()
  app.use(express.json())
})

afterAll(async () => {
  await mongoose.disconnect()
})

it('server starts and responds to requests', () => {
  console.error('You need to add test cases here.')
})
