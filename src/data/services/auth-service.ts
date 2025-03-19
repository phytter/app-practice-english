import { HttpClient } from "@/data/protocols/http";
import { AuthenticationModel } from "@/domain/models";

export class AuthService {
  constructor (
    protected readonly url: string,
    protected readonly httpClient: HttpClient<AuthenticationModel>
  ) {}


  async googleLogin(token: string): Promise<AuthenticationModel> {
    const response = await this.httpClient.request({
      url: `${this.url}/google-login`,
      method: 'post',
      body: { token }
    })


    return response.body;
  }
}
