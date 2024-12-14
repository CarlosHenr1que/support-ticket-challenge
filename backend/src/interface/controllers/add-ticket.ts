import { AddTicket } from '../../use-cases/add-tickets'
import { badRequest, created, serverError } from './http-helper'
import { Controller, HttpRequest } from '../adapters/express-route-adapter'

export class AddTicketController implements Controller {
  constructor(private addTicket: AddTicket) {
    this.addTicket = addTicket
  }

  async handle(httpRequest: HttpRequest) {
    try {
      const validationError = this.validateFields(httpRequest.body)
      if (validationError) {
        return badRequest(new Error(validationError))
      }
      const ticketOrError = await this.addTicket.execute(httpRequest.body)

      if (ticketOrError.isLeft()) {
        return badRequest(ticketOrError.value)
      }

      const ticket = ticketOrError.value
      return created(ticket)
    } catch (error) {
      console.log('Server error', error)
      return serverError('internal')
    }
  }

  private validateFields(requestBody: {
    client: string
    issue: string
    status: string
    deadline: string
  }): string | null {
    if (!requestBody.client) {
      return 'Client is required.'
    }

    if (!requestBody.issue) {
      return 'Issue is required.'
    }

    if (!requestBody.status) {
      return 'Status is required.'
    }

    if (!requestBody.deadline) {
      return 'Deadline is required.'
    }

    return null
  }
}
