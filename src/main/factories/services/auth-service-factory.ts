import { makeApiUrl, makeAxiosHttpClient } from "@/main/factories/http";
import { AuthService } from "@/services/auth-service";

export const makeAuthServiceFactory = () => {
  return new AuthService(makeApiUrl('/auth'), makeAxiosHttpClient());
};
