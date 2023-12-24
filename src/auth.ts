import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import Vk from "next-auth/providers/vk";
import Yandex from "next-auth/providers/yandex";
import { type NextAuthConfig } from "next-auth";

const PROTECTED_ROUTES = ["/protected"];

export const nextAuthConfig = {
  theme: {
    logo: "https://next-auth.js.org/img/logo/logo-sm.png",
    buttonText: "In Sign",
  },
  providers: [Google, Vk, Yandex],
  callbacks: {
    authorized({ request, auth }) {
      let isAuthorized = true;
      const { pathname } = request.nextUrl;
      console.log(`pathname: ${pathname}`);
      console.log(auth);

      if (PROTECTED_ROUTES.includes(pathname)) {
        console.log("protected route");
        isAuthorized = !!auth;
      }
      console.log(`isAuthorized: ${isAuthorized}`);
      return isAuthorized;
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
