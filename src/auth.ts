import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { type NextAuthConfig } from "next-auth";
import { db } from "./lib/db";
import { PrismaAdapter } from "@auth/prisma-adapter";
import SignInSchema from "./lib/zod/schemas/SignIn";

export const nextAuthConfig = {
  adapter: PrismaAdapter(db),
  trustHost: true,
  pages: {
    signIn: "/sign-in",
    error: "/auth-error",
  },
  session: {
    strategy: "jwt",
    maxAge: 365 * 24 * 60 * 60
  },
  providers: [
    Credentials({
      authorize: async (credentials) => {
        const { email, password } = SignInSchema.parse(credentials);
        const user = await db.user.findUnique({ where: { email } });
        if (!user?.password) return null;

        const doPasswordsMatch = password === user.password;
        if (!doPasswordsMatch) return null;
        return user;
      },
    }),
    // Google({
    //   // the return value of this callback is used to create a user record in the database
    //   profile: (profile) => {
    //     const result: CustomUser = {
    //       id: profile.sub,
    //       role: profile.role ?? ROLE.STUDENT,
    //       name: profile.name,
    //       email: profile.email,
    //       image: profile.picture,
    //     };
    //     return result;
    //   },
    // }),
    // Yandex({
    //   profile(profile) {
    //     const {
    //       client_id,
    //       default_email,
    //       emails,
    //       real_name,
    //       display_name,
    //       default_phone,
    //     } = profile;
    //     return {
    //       id: client_id,
    //       email: default_email || emails?.[0],
    //       name: real_name || display_name,
    //       phone: default_phone?.number,
    //       role: ROLE.STUDENT,
    //     };
    //   },
    // }),
  ],
  callbacks: {
    session: (params) => {
      const { session } = params;
      const token = (params as any).token;
      // Apparently setting the id like this is needed for sign in.
      // It breaks if I just return the token. Same for the `jwt` callback
      return {
        ...session,
        user: {
          ...session.user,
          id: token.id,
        },
      };
    },
    jwt: ({ token, user }) => {
      if (!user) return token;
      return {
        ...token,
        id: user.id,
      };
    },
  },
} satisfies NextAuthConfig;

export const {
  handlers: authHandlers,
  auth,
  signIn,
  signOut,
  unstable_update,
} = NextAuth(nextAuthConfig);
