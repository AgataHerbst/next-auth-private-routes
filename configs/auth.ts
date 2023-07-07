import type { AuthOptions, User } from 'next-auth';
//import type { Adapter } from 'next-auth/adapters';

//import { PrismaAdapter } from "@auth/prisma-adapter";
//import { PrismaClient } from "@prisma/client";

import GoggleProvider from 'next-auth/providers/google';
import Credentials from 'next-auth/providers/credentials';
import { users } from '@/data/users';

//const prisma = new PrismaClient();

export const authConfig: AuthOptions = {
  //adapter: PrismaAdapter(prisma) as Adapter,
  providers: [
    GoggleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_SECRET!,
    }),
    Credentials({
      credentials: {
        email: { label: 'email', type: 'email', required: true },
        password: { label: 'password', type: 'password', required: true },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials.password) return null;

        const currentUser = users.find(user => user.email === credentials.email)

        if (currentUser && currentUser.password === credentials.password) {
          const { password, ...userWithoutPass } = currentUser;

          return userWithoutPass as User;
        }

        return null
      }
    })
  ],
  pages: {
    signIn: '/signin'
  }
}