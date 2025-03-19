import { withAuth } from "next-auth/middleware";

export default withAuth({
  callbacks: {
    authorized: ({ token }) => !!token?.email,
  },
  pages: {
    signIn: "/auth/signin",
  },
});

export const config = {
  matcher: ["/panel/:path*"],
};
