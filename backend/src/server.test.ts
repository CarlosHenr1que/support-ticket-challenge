import mongoose from 'mongoose'

import { start, app } from './server'
import request from 'supertest'
import { Ticket } from './core/entities/ticket/ticket'
import TicketModel from './infra/model/ticket'

import { AddTicketController } from './interface/controllers/add-ticket'
import { GetTicketsController } from './interface/controllers/get-tickets'
import { UpdateTicketController } from './interface/controllers/update-ticket'

beforeAll(async () => {
  await start()
})

afterAll(async () => {
  await mongoose.disconnect()
})

beforeEach(async () => {
  await TicketModel.deleteMany({})
})

const ticketParams = {
  client: 'John Doe',
  issue: 'Cannot access my account',
  status: 'open',
  deadline: '2024-12-15T15:19:14.980Z',
}

describe('Tickets router', () => {
  describe('Add ticket route', () => {
    test('should return 201 when valid params', async () => {
      const response = await request(app).post('/tickets').send(ticketParams)
      const body = response.body as Ticket

      expect(body.client).toBe(ticketParams.client)
      expect(response.statusCode).toBe(201)
    })

    test('should return 400 when invalid params', async () => {
      const response = await request(app)
        .post('/tickets')
        .send({ ...ticketParams, client: 'a' })

      expect(response.statusCode).toBe(400)
    })

    test('should return 500 if controller returns a server error', async () => {
      jest.spyOn(AddTicketController.prototype, 'handle').mockResolvedValueOnce({ statusCode: 500, body: {} })
      const response = await request(app).post('/tickets').send(ticketParams)

      expect(response.statusCode).toBe(500)
    })
  })

  describe('List tickets route', () => {
    test('should return list of tickets', async () => {
      const createdTicket = await TicketModel.create(ticketParams)

      const response = await request(app).get('/tickets').send()
      const body = (response.body as Ticket[])[0]

      expect(response.body).toHaveLength(1)
      expect(body.client).toBe(createdTicket.client)
    })

    test('should return 500 if controller returns a server error', async () => {
      jest.spyOn(GetTicketsController.prototype, 'handle').mockResolvedValueOnce({ statusCode: 500, body: {} })
      const response = await request(app).get('/tickets').send()

      expect(response.statusCode).toBe(500)
    })
  })

  describe('Update ticket route', () => {
    test('should return 200 when valid params', async () => {
      const { id } = await TicketModel.create(ticketParams)
      const updateClient = 'Carlos Henrique'
      const response = await request(app)
        .put(`/tickets/${id}`)
        .send({ ...ticketParams, client: updateClient })

      const body = response.body as Ticket
      expect(body.client).toBe(updateClient)
      expect(response.statusCode).toBe(200)
    })

    test('should return 400 when invalid params', async () => {
      const { id } = await TicketModel.create(ticketParams)
      const response = await request(app)
        .put(`/tickets/${id}`)
        .send({ ...ticketParams, client: 'a' })

      expect(response.statusCode).toBe(400)
    })

    test('should return 500 if controller returns a server error', async () => {
      const { id } = await TicketModel.create(ticketParams)
      jest.spyOn(UpdateTicketController.prototype, 'handle').mockResolvedValueOnce({ statusCode: 500, body: {} })
      const response = await request(app).put(`/tickets/${id}`).send(ticketParams)

      expect(response.statusCode).toBe(500)
    })
  })
})
