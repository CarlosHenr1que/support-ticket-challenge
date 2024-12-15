import { Controller } from '../adapters/express-route-adapter'
import { ok, serverError } from './http-helper'
import { GenerateTicketReport } from '../../use-cases/generate-report'

export class GetReportController implements Controller {
  constructor(private generateReport: GenerateTicketReport) {
    this.generateReport = generateReport
  }

  async handle() {
    try {
      const buffer = await this.generateReport.execute()
      const headers = {
        'Content-Disposition': 'attachment; filename=tickets_report.xlsx',
        'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      }
      return ok(buffer, headers)
    } catch (error) {
      console.log(error)
      return serverError('internal')
    }
  }
}
