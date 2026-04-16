import { HttpClient, HttpStatusCode } from "@/data/protocols/http";
import { AuthenticationModel } from "@/domain/models";

export class DevLoginError extends Error {
  constructor(public readonly statusCode: number, message?: string) {
    super(message ?? `dev-login failed with status ${statusCode}`);
    this.name = "DevLoginError";
  }
}

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

  async devLogin(email: string, name: string): Promise<AuthenticationModel> {
    const response = await this.httpClient.request({
      url: `${this.url}/dev-login`,
      method: 'post',
      body: { email, name }
    })

    if (response.statusCode !== HttpStatusCode.ok) {
      throw new DevLoginError(response.statusCode);
    }

    return response.body;
  }
}
