/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from 'express'

export interface HttpResponse {
  statusCode: number
  body: any
}

export interface HttpRequest {
  body?: any
  params?: any
}

export interface Controller {
  handle(httpRequest: HttpRequest): Promise<HttpResponse>
}

export const adaptRoute = (controller: Controller) => {
  return async (request: Request, response: Response) => {
    const httpRequest = {
      body: request.body,
      params: request.params,
    }
    const httpResponse = await controller.handle(httpRequest)
    if (httpResponse.statusCode >= 200 && httpResponse.statusCode <= 299) {
      response.status(httpResponse.statusCode).json(httpResponse.body)
    } else {
      response.status(httpResponse.statusCode).json({
        error: httpResponse.body,
      })
    }
  }
}
