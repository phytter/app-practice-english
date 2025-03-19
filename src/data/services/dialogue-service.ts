import { HttpClient } from "@/data/protocols/http";
import { DialogueModel, DialoguePracticeResultModel } from "@/domain/models";

type DialogueSearchParamsType = {
  imdb_id: string;
  difficulty?: string;
  search?: string;
}

export class DialogueService {
  constructor (
    protected readonly url: string,
    protected readonly httpClient: HttpClient<DialogueModel[] & DialoguePracticeResultModel & DialogueModel>
  ) {}

  async show(dialogueId: string): Promise<DialogueModel> {
    const response = await this.httpClient.request({
      url: `${this.url}/${dialogueId}`,
      method: 'get',
    })

    return response.body;
  }

  async search(params: DialogueSearchParamsType): Promise<DialogueModel[]> {
    const response = await this.httpClient.request({
      url: `${this.url}`,
      method: 'get',
      params,
    })

    return response.body ?? [];
  }

  async practice(dialogueId: string, formData: FormData): Promise<DialoguePracticeResultModel> {
    const response = await this.httpClient.request({
      url: `${this.url}/${dialogueId}/practice`,
      body: formData,
      method: 'post',
    });

    return response.body;
  }

}
