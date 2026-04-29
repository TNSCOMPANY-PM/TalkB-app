import NextAuth from "next-auth";
import KakaoProvider from "next-auth/providers/kakao";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { prisma } from "@/lib/prisma";

const handler = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    KakaoProvider({
      clientId: process.env.KAKAO_CLIENT_ID!,
      clientSecret: process.env.KAKAO_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    async session({ session, user }) {
      if (session.user) {
        session.user.id = user.id;
      }
      return session;
    },
    async signIn({ user, account }) {
      // 신규 유저 진단권 1개 자동 지급
      if (account?.provider === "kakao") {
        const existing = await prisma.ticket.findUnique({
          where: { userId: user.id },
        });
        if (!existing) {
          await prisma.ticket.create({
            data: {
              userId: user.id,
              balance: 1,
              nextRefillAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
            },
          });
        }
      }
      return true;
    },
  },
  pages: {
    signIn: "/diagnosis/login",
  },
});

export { handler as GET, handler as POST };
