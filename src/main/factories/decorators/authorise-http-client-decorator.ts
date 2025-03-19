import { AuthorizeHttpClientDecorator } from "@/main/decorators";
import { makeAxiosHttpClient } from "@/main/factories/http";

export const makeAuthorizeHttpClientDecorator = () => {
  return new AuthorizeHttpClientDecorator(makeAxiosHttpClient());
}