import { UserModel } from "@/domain/models";
import { makeAuthServiceFactory } from "@/main/factories/services";
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";

type Provider = NextAuthOptions["providers"][number];

const providers: Provider[] = [
  GoogleProvider({
    clientId: process.env.GOOGLE_CLIENT_ID!,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
  }),
];

if (process.env.NODE_ENV === "development") {
  providers.push(
    CredentialsProvider({
      id: "dev-login",
      name: "Dev Login",
      credentials: {
        email: { label: "Email", type: "email" },
        name: { label: "Name", type: "text" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.name) return null;
        try {
          const authService = makeAuthServiceFactory();
          const { access_token, user } = await authService.devLogin(
            credentials.email,
            credentials.name,
          );
          return {
            id: user.id,
            email: user.email,
            name: user.name,
            access_token,
            user,
          };
        } catch (error) {
          console.error("Dev login failed:", error);
          return null;
        }
      },
    }),
  );
}

export const authOptions: NextAuthOptions = {
  providers,
  callbacks: {
    async jwt({ token, account, profile, user }) {
      if (account?.provider === "google" && account.id_token && profile) {
        try {
          const authService = makeAuthServiceFactory();
          const { access_token, user: backendUser } = await authService.googleLogin(account.id_token);
          token.access_token = access_token;
          token.user = backendUser;
        } catch (error) {
          console.error("Error during authentication:", error);
        }
      }
      if (account?.provider === "dev-login" && user) {
        const devUser = user as unknown as { access_token: string; user: UserModel };
        token.access_token = devUser.access_token;
        token.user = devUser.user;
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