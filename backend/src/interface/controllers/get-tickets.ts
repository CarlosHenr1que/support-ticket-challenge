import { GetTickets } from '../../use-cases/get-tickets'
import { ok, serverError } from './http-helper'
import { Controller } from '../adapters/express-route-adapter'

export class GetTicketsController implements Controller {
  constructor(private getTickets: GetTickets) {
    this.getTickets = getTickets
  }
  async handle() {
    try {
      const tickets = await this.getTickets.execute()
      return ok(tickets)
    } catch (error) {
      console.log(error)
      return serverError('internal')
    }
  }
}
