import { UserModel } from "@/domain/models";
import "next-auth";

declare module "next-auth" {
  interface Session {
    accessToken?: string;
    user: UserModel;
  }
}