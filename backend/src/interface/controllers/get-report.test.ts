import { GenerateTicketReport } from '../../use-cases/generate-report'
import { GetReportController } from './get-report'
import { TicketMongoRepository } from '../../infra/repositories/ticket-mongo'
import { right } from '../../shared/either'

const makeSut = () => {
  const ticketsRepository = new TicketMongoRepository()
  const getTickets = new GenerateTicketReport(ticketsRepository)
  const sut = new GetReportController(getTickets)
  return { sut }
}

describe('Generate tickets controller', () => {
  test('should generated report file', async () => {
    const { sut } = makeSut()
    const fakeFile = { file: 'any_file' }
    jest.spyOn(GenerateTicketReport.prototype, 'execute').mockResolvedValueOnce(right(fakeFile).value)
    const httpResponse = await sut.handle()

    expect(httpResponse.body).toBe(fakeFile)
    expect(httpResponse.headers).not.toBe(null)
    expect(httpResponse.statusCode).toBe(200)
  })

  test('should return 500 if get tickets throws', async () => {
    const { sut } = makeSut()
    jest.spyOn(GenerateTicketReport.prototype, 'execute').mockImplementationOnce(() => {
      throw new Error()
    })
    const httpResponse = await sut.handle()

    expect(httpResponse.body).toBe('internal')
    expect(httpResponse.statusCode).toBe(500)
  })
})
