import { HttpClient, HttpRequest, HttpResponse } from '@/data/protocols/http';
import axios, { AxiosResponse } from 'axios';

export class AxiosHttpClient implements HttpClient {
  async request (data: HttpRequest): Promise<HttpResponse> {
    let axiosResponse: AxiosResponse
    try {
      axiosResponse = await axios.request({
        url: data.url,
        method: data.method,
        data: data.body,
        headers: data.headers,
        params: data.params
      })
    } catch (error) {
      if (!axios.isAxiosError(error)) { throw error; }
      axiosResponse = error.response as AxiosResponse;
    }
    return {
      statusCode: axiosResponse?.status,
      body: axiosResponse?.data,
    }
  }
}
