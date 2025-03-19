import { HttpClient } from "@/data/protocols/http";
import { DialogueModel } from "@/domain/models";

type DialogueSearchParamsType = {
  imdb_id: string;
  difficulty?: string;
  search?: string;
}

export class DialogueService {
  constructor (
    protected readonly url: string,
    protected readonly httpClient: HttpClient<DialogueModel[]>
  ) {}

  async search(params: DialogueSearchParamsType): Promise<DialogueModel[]> {
    const response = await this.httpClient.request({
      url: `${this.url}`,
      method: 'get',
      params,
    })


    return response.body ?? [];
  }

}
