import { HttpClient } from "@/data/protocols/http";
import { UserModel } from "@/domain/models";

export class UserService {
  constructor (
    protected readonly url: string,
    protected readonly httpClient: HttpClient<UserModel>
  ) {}

  async showProfile(): Promise<UserModel> {
    const response = await this.httpClient.request({
      url: `${this.url}/profile`,
      method: 'get',
    })


    return response.body;
  }
}
