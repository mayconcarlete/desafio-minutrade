import { THttpResponse } from '@presentation/models'

export const ok = (data: any): THttpResponse => {
  return {
    statusCode: 200,
    body: data
  }
}

export const created = (data: any): THttpResponse => {
  return {
    statusCode: 201,
    body: data
  }
}

export const badRequest = (error: Error): THttpResponse => {
  return {
    statusCode: 400,
    body: error.message
  }
}

export const notFound = (error: Error): THttpResponse => {
  return {
    statusCode: 404,
    body: error.message
  }
}

export const serverError = (error: Error): THttpResponse => {
  return {
    statusCode: 500,
    body: error.message
  }
}
