import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import Vk from "next-auth/providers/vk";
import Yandex from "next-auth/providers/yandex";
import { type NextAuthConfig } from "next-auth";
import { db } from "./lib/db";

const PROTECTED_ROUTES = ["/protected"];

export const nextAuthConfig = {
  theme: {
    logo: "https://next-auth.js.org/img/logo/logo-sm.png",
    buttonText: "In Sign",
  },
  providers: [Google, Vk, Yandex],
  callbacks: {
    authorized({ request, auth }) {
      const { pathname } = request.nextUrl;
      if (PROTECTED_ROUTES.includes(pathname)) return !!auth;
      return true;
    },
    async signIn({ user: { id, email, image, name } }) {
      if (!email || !image || !name) return false;

      await db.user.create({
        data: { email, id, name, image },
      });
      return true;
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
