import { HttpClient } from "@/data/protocols/http";
import { MovieModel } from "@/domain/models";

export class MovieService {
  constructor (
    protected readonly url: string,
    protected readonly httpClient: HttpClient<MovieModel[]>
  ) {}


  async loadProcessed(params: { search: string }): Promise<MovieModel[]> {
    const response = await this.httpClient.request({
      url: `${this.url}/processed`,
      method: 'get',
      params,
    })


    return response.body ?? [];
  }
}
