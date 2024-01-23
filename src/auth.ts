import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import Yandex from "next-auth/providers/yandex";
import Credentials from "next-auth/providers/credentials";
import { type NextAuthConfig } from "next-auth";
import { db } from "./lib/db";
import { PrismaAdapter } from "@auth/prisma-adapter";
import CustomUser from "./lib/types/CustomUser";
import { ROLE } from "./lib/types/enums/Role";
import SignInSchema from "./lib/zod/schemas/SignIn";
import bcrypt from "bcrypt";

export const nextAuthConfig = {
  adapter: PrismaAdapter(db),
  pages: {
    signIn: "/sign-in",
  },
  session: {
    strategy: "jwt",
  },
  providers: [
    Credentials({
      authorize: async (credentials) => {
        const { email, password } = SignInSchema.parse(credentials);
        const user = await db.user.findUnique({ where: { email } });
        if (!user?.password) return null;

        const doPasswordHashesMatch = await bcrypt.compare(
          password,
          user.password,
        );
        if (!doPasswordHashesMatch) return null;
        return user;
      },
    }),
    Google({
      // the return value of this callback is used to create a user record in the database
      profile: (profile) => {
        const result: CustomUser = {
          id: profile.sub,
          role: profile.role ?? ROLE.STUDENT,
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
    session: ({ session, token }) => {
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
