import { HttpClient } from "@/data/protocols/http";
import { MovieModel } from "@/domain/models";

type ProcessReturnType = {
  dialogues_count: number;
}

export class MovieService {
  constructor (
    protected readonly url: string,
    protected readonly httpClient: HttpClient<MovieModel[] & ProcessReturnType>
  ) {}


  async loadProcessed(params: { search: string }): Promise<MovieModel[]> {
    const response = await this.httpClient.request({
      url: `${this.url}/processed`,
      method: 'get',
      params,
    })


    return response.body ?? [];
  }

  async search(params: { search: string }): Promise<MovieModel[]> {
    const response = await this.httpClient.request({
      url: `${this.url}/search`,
      method: 'get',
      params,
    })


    return response.body ?? [];
  }

  async processDialogues(imdbId: string, language?: string): Promise<ProcessReturnType> {
    const response = await this.httpClient.request({
      url: `${this.url}/${imdbId}/process`,
      method: 'post',
      params: { language },
    })


    return response.body;
  }
}
