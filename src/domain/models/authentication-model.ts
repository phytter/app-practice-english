import { UserModel } from "./user-model"

export type AuthenticationModel = {
  access_token: string
  user: UserModel
}
