import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import Vk from "next-auth/providers/vk";
import Yandex from "next-auth/providers/yandex";
import { type NextAuthConfig } from "next-auth";
import { db } from "./lib/db";
import { PrismaAdapter } from "@auth/prisma-adapter";
import CustomUser from "./lib/types/CustomUser";
import { ROLE } from "./lib/types/enums/Role";

const PROTECTED_ROUTES = ["/protected"];

export const nextAuthConfig = {
  adapter: PrismaAdapter(db),
  trustHost: true,
  providers: [
    Google({
      // the return value of this callback is used to create a user record in the database
      profile: (profile) => {
        console.log("profile callback:");
        console.log(profile);
        const result: CustomUser = {
          role: profile.role ?? ROLE.STUDENT,
          id: profile.sub,
          name: profile.name,
          email: profile.email,
          image: profile.picture,
        };
        return result;
      },
    }),
    Vk,
    Yandex,
  ],
  callbacks: {
    authorized({ request, auth }) {
      const { pathname } = request.nextUrl;
      if (PROTECTED_ROUTES.includes(pathname)) return !!auth;
      return true;
    },
    session({ session, user }) {
      console.log(user);
      if (session.user) {
        (session.user as CustomUser).role = (user as any).role;
        session.user.id = user.id;
      }
      return session;
    },
  },
} satisfies NextAuthConfig;

export const {
  handlers: authHandlers,
  auth,
  signIn,
  signOut,
  update,
} = NextAuth(nextAuthConfig);
