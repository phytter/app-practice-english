import { UserService } from "@/data/services";
import { makeAuthorizeHttpClientDecorator } from "@/main/factories/decorators";
import { makeApiUrl } from "@/main/factories/http";

export const makeUserServiceFactory = () => {
  return new UserService(makeApiUrl('/users'), makeAuthorizeHttpClientDecorator());
};
