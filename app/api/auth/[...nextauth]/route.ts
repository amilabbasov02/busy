import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { OAuth2Client } from "google-auth-library";

const googleClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    CredentialsProvider({
      name: 'Google One Tap',
      credentials: {
        credential: { type: 'text' },
      },
      async authorize(credentials) {
        if (!credentials?.credential) {
          return null;
        }
        const ticket = await googleClient.verifyIdToken({
          idToken: credentials.credential,
          audience: process.env.GOOGLE_CLIENT_ID,
        });
        const payload = ticket.getPayload();
        if (!payload) {
          return null;
        }
        // Burada istifadəçini öz DB-nizdə yoxlayıb/yaradıb qaytara bilərsiniz.
        // Bu nümunədə sadəcə payload-dan gələn məlumatları qaytarırıq.
        return {
          id: payload.sub,
          name: payload.name,
          email: payload.email,
          image: payload.picture,
        };
      },
    }),
  ],
});

export { handler as GET, handler as POST }