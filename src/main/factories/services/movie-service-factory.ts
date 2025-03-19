import { MovieService } from "@/data/services";
import { makeAuthorizeHttpClientDecorator } from "@/main/factories/decorators";
import { makeApiUrl } from "@/main/factories/http";

export const makeMovieServiceFactory = () => {
  return new MovieService(makeApiUrl('/movies'), makeAuthorizeHttpClientDecorator());
};
