import { UserModel } from "@/domain/models";
import { makeAuthServiceFactory } from "@/main/factories/services";
import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    async jwt({ token, account, profile }) {
      if (account?.id_token && profile) {
        try {
          const authService = makeAuthServiceFactory();
          const { access_token, user } = await authService.googleLogin(account.id_token);
          token.access_token = access_token;
          token.user = user;
        } catch (error) {
          console.error("Error during authentication:", error);
        }
      }
      return token;
    },
    async session({ session, token }) {
      session.access_token = token.access_token as string;
      session.user = token.user as UserModel;
      return session;
    },
  },
  pages: {
    signIn: "/auth/signin",
  },
  session: {
    strategy: "jwt",
  },
};