/* eslint-disable @typescript-eslint/no-explicit-any */

export type HttpRequest = {
  url: string
  method: HttpMethod
  body?: any
  params?: any
  headers?: any
}

export interface HttpClient<R = any> {
  request: (data: HttpRequest) => Promise<HttpResponse<R>>
}

export type HttpMethod = 'post' | 'get' | 'put' | 'delete' | 'patch'

export enum HttpStatusCode {
  ok = 200,
  successCreated = 201,
  noContent = 204,
  validationError = 422,
  badRequest = 400,
  unauthorized = 401,
  forbidden = 403,
  notFound = 404,
  serverError = 500
}

export type Headers = {
  'pagination-total'?: number | string
}

export type HttpResponse<T = any> = {
  statusCode: HttpStatusCode
  body: T
  headers?: Headers
}

export type ParamsToFilterList = {
  page?: number
  per_page?: number
  sort?: string
  search?: string
}
