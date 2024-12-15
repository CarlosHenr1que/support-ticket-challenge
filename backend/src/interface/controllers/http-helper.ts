import { HttpResponse } from '../adapters/express-route-adapter'

export const badRequest = (error: Error): HttpResponse => ({
  statusCode: 400,
  body: error.message,
})

export const ok = (data: unknown, headers?: unknown): HttpResponse => ({
  statusCode: 200,
  body: data,
  headers,
})

export const created = (data: unknown): HttpResponse => ({
  statusCode: 201,
  body: data,
})

export const serverError = (reason: string): HttpResponse => ({
  statusCode: 500,
  body: reason,
})
