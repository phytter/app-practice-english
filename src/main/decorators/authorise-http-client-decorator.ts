import { HttpClient, HttpRequest, HttpResponse } from '@/data/protocols/http';
import { getSession } from 'next-auth/react';

export class AuthorizeHttpClientDecorator implements HttpClient {
  constructor (private readonly httpClient: HttpClient) {}

  async request (data: HttpRequest): Promise<HttpResponse> {
    const session = await getSession();
    if (session?.accessToken) {
      Object.assign(data, {
        headers: Object.assign(data.headers || {}, {
          authorization: `Bearer ${session?.accessToken}`
        })
      })
    }
    const httpResponse = await this.httpClient.request(data)
    return httpResponse
  }
}
