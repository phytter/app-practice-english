import { MovieService } from "@/data/services";
import { makeApiUrl, makeAxiosHttpClient } from "@/main/factories/http";

export const makeMovieServiceFactory = () => {
  return new MovieService(makeApiUrl('/movies'), makeAxiosHttpClient());
};
