import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import { type NextAuthConfig } from "next-auth";

const PROTECTED_ROUTES = ["/protected"];

export const nextAuthConfig = {
  theme: {
    logo: "https://next-auth.js.org/img/logo/logo-sm.png",
    buttonText: "In Sign",
  },
  providers: [Google],
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

export const { handlers, auth, signIn, signOut, update } =
  NextAuth(nextAuthConfig);
