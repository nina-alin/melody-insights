import NextAuth, { Account } from "next-auth";
import type { NextAuthOptions } from "next-auth";
import SpotifyProvider from "next-auth/providers/spotify";

export const authOptions: NextAuthOptions = {
  providers: [
    SpotifyProvider({
      clientId: process.env.SPOTIFY_CLIENT_ID as string,
      clientSecret: process.env.SPOTIFY_CLIENT_SECRET as string,
      authorization: {
        params: {
          scope: "user-top-read user-read-recently-played",
        },
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET as string,
  callbacks: {
    async jwt({ token, account }: { token: any; account: Account | null }) {
      if (account) {
        return {
          ...token,
          access_token: account.access_token,
          expires_at: Math.floor(Date.now() / 1000 + (account.expires_at ?? 0)),
          refresh_token: account.refresh_token,
        };
      } else if (Date.now() < token.expires_at * 1000) {
        return token;
      } else {
        try {
          const response = await fetch(
            "https://accounts.spotify.com/api/token",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/x-www-form-urlencoded",
                Authorization: `Basic ${Buffer.from(
                  `${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`
                ).toString("base64")}`,
              },
              body: `grant_type=refresh_token&refresh_token=${token.refresh_token}`,
              cache: "no-cache",
            }
          );

          const tokens = await response.json();

          if (!response.ok) {
            throw tokens;
          }

          return {
            ...token,
            access_token: tokens.access_token,
            expires_at: Math.floor(Date.now() / 1000 + tokens.expires_in),
            refresh_token: tokens.refresh_token ?? token.refresh_token,
          };
        } catch (error) {
          return { ...token, error: "RefreshAccessTokenError" };
        }
      }
    },
    async session({ session, token }) {
      session.error = token.error;
      session.accessToken = token.access_token;

      if (token.expires_at) {
        const tokenExpiresAt = token.expires_at as number;
        session.expires = new Date(tokenExpiresAt * 1000).toISOString();
      }

      return session;
    },
  },
};

export default NextAuth(authOptions);
