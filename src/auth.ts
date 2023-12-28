import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
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
    Yandex({
      profile(profile) {
        const {
          client_id,
          default_email,
          emails,
          real_name,
          display_name,
          default_phone,
        } = profile;
        return {
          id: client_id,
          email: default_email || emails?.[0],
          name: real_name || display_name,
          phone: default_phone?.number,
          role: ROLE.STUDENT,
        };
      },
    }),
  ],
  callbacks: {
    authorized({ request, auth }) {
      const { pathname } = request.nextUrl;
      if (PROTECTED_ROUTES.includes(pathname)) return !!auth;
      return true;
    },
    session({ session, user }) {
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
