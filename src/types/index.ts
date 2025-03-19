import { UserModel } from "@/domain/models";
import "next-auth";

declare module "next-auth" {
  interface Session {
    access_token?: string;
    user: UserModel;
  }
}