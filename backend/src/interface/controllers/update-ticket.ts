import { UpdateTicket } from '../../use-cases/update-ticket'
import { badRequest, ok, serverError } from './http-helper'
import { Controller, HttpRequest } from '../adapters/express-route-adapter'

export class UpdateTicketController implements Controller {
  constructor(private updateTicket: UpdateTicket) {
    this.updateTicket = updateTicket
  }

  private validateParam(id: string) {
    return String(id).length !== 24
  }

  async handle(httpRequest: HttpRequest) {
    try {
      const { id } = httpRequest.params

      if (this.validateParam(id)) {
        return badRequest(new Error('invalid id must be a 24 character hex string'))
      }

      const validationError = this.validateFields(httpRequest.body)
      if (validationError) {
        return badRequest(new Error(validationError))
      }

      const ticketOrError = await this.updateTicket.execute({ ...httpRequest.body, id })
      if (ticketOrError.isLeft()) {
        return badRequest(ticketOrError.value)
      }

      const ticket = ticketOrError.value
      return ok(ticket)
    } catch (error) {
      console.log(error)
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
