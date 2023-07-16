import NextAuth, { AuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import EmailProvider from 'next-auth/providers/email';
import { env } from '@/env';
import { sendVerificationRequest } from '@/lib/custom-email';
import { prisma } from '@/lib/db';
import { PrismaAdapter } from '@auth/prisma-adapter';
import type { Adapter } from 'next-auth/adapters';

export const authOptions: AuthOptions = {
  adapter: PrismaAdapter(prisma) as Adapter,

  providers: [
    GoogleProvider({
      clientId: env.GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET
    }),
    EmailProvider({
      server: {
        host: env.EMAIL_SERVER_HOST,
        port: parseFloat(env.EMAIL_SERVER_PORT),
        auth: {
          user: env.EMAIL_SERVER_USER,
          pass: env.EMAIL_SERVER_PASSWORD
        }
      },
      from: env.EMAIL_FROM,
      sendVerificationRequest: sendVerificationRequest
    })
  ],
  pages: {
    signIn: '/signIn'
  }
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
