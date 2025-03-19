import { AuthService } from "@/data/services/auth-service";
import { makeApiUrl, makeAxiosHttpClient } from "@/main/factories/http";

export const makeAuthServiceFactory = () => {
  return new AuthService(makeApiUrl('/auth'), makeAxiosHttpClient());
};
