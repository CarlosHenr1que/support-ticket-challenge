import mongoose from 'mongoose'
import { MongoMemoryServer } from 'mongodb-memory-server'
import app from './interface/http/express'

const start = async () => {
  try {
    const mongoServer = await MongoMemoryServer.create()
    await mongoose.connect(mongoServer.getUri(), { dbName: 'notificationsDB' })
    app.listen(3000, () => {
      console.log(`Server started at http://localhost:3000`)
    })
  } catch (error: unknown) {
    console.log(error)
  }
}
export { start, app }
