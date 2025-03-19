import { makeUserServiceFactory } from "@/main/factories/services";

export async function loadUserProfile () {
  const userService = makeUserServiceFactory();
  return userService.showProfile();
}