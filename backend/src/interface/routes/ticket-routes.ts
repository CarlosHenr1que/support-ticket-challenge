import { Router } from 'express'
import { GetTicketsController } from '../controllers/get-tickets'
import { AddTicketController } from '../controllers/add-ticket'
import { UpdateTicketController } from '../controllers/update-ticket'

import { GetTickets } from '../../use-cases/get-tickets'
import { AddTicket } from '../../use-cases/add-tickets'
import { TicketMongoRepository } from '../../infra/repositories/ticket-mongo'
import { UpdateTicket } from '../../use-cases/update-ticket'
import { adaptRoute } from '../adapters/express-route-adapter'
import { adaptRouteDownload } from '../adapters/express-donwload-route-adapter'
import { GetReportController } from '../controllers/get-report'
import { GenerateTicketReport } from '../../use-cases/generate-report'

const router = Router()

const ticketMongoRepository = new TicketMongoRepository()
const getTickets = new GetTickets(ticketMongoRepository)
const addTickets = new AddTicket(ticketMongoRepository)
const updateTicket = new UpdateTicket(ticketMongoRepository)
const generateTicketReport = new GenerateTicketReport(ticketMongoRepository)

const getTicketsController = new GetTicketsController(getTickets)
const addTicketController = new AddTicketController(addTickets)
const updateTicketController = new UpdateTicketController(updateTicket)
const getReportController = new GetReportController(generateTicketReport)

router.get('/tickets', adaptRoute(getTicketsController))
router.post('/tickets', adaptRoute(addTicketController))
router.put('/tickets/:id', adaptRoute(updateTicketController))
router.get('/report', adaptRouteDownload(getReportController))

export { router as ticketsRouter }
