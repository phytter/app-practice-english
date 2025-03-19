import { DialogueService } from "@/data/services";
import { makeAuthorizeHttpClientDecorator } from "@/main/factories/decorators";
import { makeApiUrl } from "@/main/factories/http";

export const makeDialogueServiceFactory = () => {
  return new DialogueService(makeApiUrl('/dialogues'), makeAuthorizeHttpClientDecorator());
};
