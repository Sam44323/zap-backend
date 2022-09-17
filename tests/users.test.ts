import express, { Express } from 'express'
import userRoutes from '../routes/users.routes'
import dotenv from 'dotenv'
import mongoose, { Connection } from 'mongoose'
import supertest from 'supertest'

dotenv.config()

let app: Express, connection: Connection
app = express()
app.use(express.json())

app.use('/api/users', userRoutes)

mongoose.connect(process.env.MONGO_URI, {
  // @ts-ignore
  useNewUrlParser: true,
  useUnifiedTopology: true
})

connection = mongoose.connection
// Once connection established
connection.once('open', () => {
  console.log('✅ MongoDB connection established successfully!')
})

// If error while connection
connection.on('error', (err: any) => {
  console.log('❌ Failed to connect to DB on startup ' + err.message)
})
// When the connection is disconnected
connection.on('disconnected', () => {
  console.log('🔌 Mongoose default connection to DB disconnected')
})

const demoData = {
  name: 'Test',
  email: 'test@email.com'
}

describe('Testing user_routes', () => {
  it('GET /test', async () => {
    const response = await supertest(app).get('/api/users/test')

    expect(response.status).toBe(200)
    expect(response.body.message).toBe('User-controller works!')
  })

  it('POST /signup', async () => {
    const response = await supertest(app)
      .post('/api/users/signup')
      .send(demoData)

    console.log(response)
    expect(response.status).toBe(200)
    expect(response.body.message).toBe('User created successfully!')
  })
})
