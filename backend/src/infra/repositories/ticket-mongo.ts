import { Ticket, TicketProps } from '../../core/entities/ticket/ticket'
import TicketRepository from '../../core/repositories/ticket-repository'
import TicketModel from '../model/ticket'

export class TicketMongoRepository implements TicketRepository {
  async loadAll() {
    const result = await TicketModel.find().sort({ deadline: -1 })
    const tikets: TicketProps[] = result.map((i) => ({
      id: i.id,
      client: i.client,
      issue: i.issue,
      status: i.status,
      createdAt: i.createdAt?.toISOString(),
      updatedAt: i.updatedAt?.toISOString(),
      deadline: i.deadline.toISOString(),
    }))

    return tikets
  }

  async add(data: Ticket) {
    const result = await new TicketModel({
      client: data.client.value,
      issue: data.issue.value,
      status: data.status.value,
      deadline: data.deadline.value,
    }).save()

    const ticket: TicketProps = {
      id: result.id,
      client: result.client,
      issue: result.issue,
      status: result.status,
      createdAt: result.createdAt?.toISOString(),
      updatedAt: result.updatedAt?.toISOString(),
      deadline: result.deadline.toISOString(),
    }

    return ticket
  }

  async update(data: Ticket): Promise<TicketProps | null> {
    const result = await TicketModel.findByIdAndUpdate(
      data.id,
      {
        client: data.client.value,
        issue: data.issue.value,
        status: data.status.value,
        deadline: new Date(data.deadline.value),
      },
      {
        new: true,
      },
    )
    if (result != null) {
      const ticket = {
        id: result.id,
        client: result.client,
        issue: result.issue,
        status: result.status,
        createdAt: result.createdAt?.toISOString(),
        updatedAt: result.updatedAt?.toISOString(),
        deadline: result.deadline.toISOString(),
      }
      return ticket
    }

    return null
  }
}
