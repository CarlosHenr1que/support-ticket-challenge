import mongoose, { Schema, Document } from 'mongoose'

interface ITicket extends Document {
  client: string
  issue: string
  status: 'open' | 'closed'
  deadline: Date
  createdAt?: Date
  updatedAt?: Date
}

const TicketSchema: Schema = new Schema(
  {
    client: { type: String, required: true },
    issue: { type: String, required: true },
    status: { type: String, enum: ['open', 'closed'], required: true },
    deadline: { type: Date, required: true },
  },
  {
    timestamps: true,
  },
)

const TicketModel = mongoose.model<ITicket>('Ticket', TicketSchema)

export default TicketModel
