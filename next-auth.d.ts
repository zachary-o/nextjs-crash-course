import NextAuth, { DefaultSession, DefaultUser } from "next-auth";

declare module "next-auth" {
  interface Session extends DefaultSession {
    id: string;
  }

  interface User extends DefaultUser {
    id: string;
  }

  interface JWT {
    id: string;
  }
}
