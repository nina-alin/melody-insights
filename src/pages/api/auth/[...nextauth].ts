import NextAuth from "next-auth";
import SpotifyProvider from "next-auth/providers/spotify";
import type { NextAuthOptions } from "next-auth";
import { JWT } from "next-auth/jwt";

export const authOptions: NextAuthOptions = {
  providers: [
    SpotifyProvider({
      clientId: process.env.SPOTIFY_CLIENT_ID as string,
      clientSecret: process.env.SPOTIFY_CLIENT_SECRET as string,
      authorization: {
        params: {
          scope:
            "user-read-private user-read-email user-top-read user-read-recently-played",
        },
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET as string,
  callbacks: {
    async jwt({ token, account, profile }) {
      // Persist the OAuth access_token and or the user id to the token right after signin
      if (account) {
        token.accessToken = account.access_token;
        token.expiresIn = account.expires_at * 1000; // Convert expiresIn from seconds to milliseconds
      }
      return token;
    },
    async session({ session, token }: { session: any; token: JWT }) {
      // Send properties to the client, like an access_token and user id from a provider.
      session.accessToken = token.accessToken;

      if (token.expiresIn) {
        session.expires = new Date(Date.now() + token.expiresIn).toISOString();
      }

      return session;
    },
  },
};

export default NextAuth(authOptions);
