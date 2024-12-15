import mongoose from 'mongoose'
import { MongoMemoryServer } from 'mongodb-memory-server'
import app from './interface/http/express'

const start = async () => {
  try {
    const mongoServer = await MongoMemoryServer.create()
    await mongoose.connect(mongoServer.getUri(), { dbName: 'notificationsDB' })
    await new Promise<void>((resolve, reject) => {
      app.listen(3000, resolve).on('error', reject)
    })

    console.log(`Server started at http://localhost:3000`)
  } catch (error: unknown) {
    console.log(error)
    process.exit(1)
  }
}

process.on('beforeExit', async () => {
  await mongoose.disconnect()
  console.log('mongoose disconnected')
})

if (require.main === module) {
  start()
}

export { start, app }
