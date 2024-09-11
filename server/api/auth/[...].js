import { NuxtAuthHandler } from '#auth'
import GoogleProvider from 'next-auth/providers/google'
import { randomBytes } from "crypto" 

function generateState() {
  return randomBytes(16).toString("hex");  // Generates a random 16-byte string
}

export default NuxtAuthHandler({
  secret: process.env.AUTH_SECRET || 'R31FG8G33cBnW7PrmEGj4SHeDV3cBs0rXTIDQDLdT3s=',
  // pages: {
  //   signIn: '/signin'
  // },
  providers: [
    GoogleProvider.default({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET
    }),
    {
      id: 'custom-oauth',  
      name: 'Custom OAuth', 
      type: 'oauth',

      // OAuth 2.0 flow endpoints
      authorization: {
        url: 'https://erp.msu.ac.th/authen/oauth/_authorize',
        params: {
          state: generateState(),
          client_id: '9cf7868f-e16b-42e4-ac16-3239e9afe746',
          response_type: 'code',
          redirect_uri: 'http://localhost:3000/api/auth/callback/custom-oauth',
          scope: 'budget01',
        }
      },
      token: 'https://erp.msu.ac.th/authen/oauth/token',  // Token endpoint
      userinfo: 'https://erp.msu.ac.th/authen/api/authuser?progcode=budget01',  // User info endpoint

      // Client ID and secret for the custom provider, from environment variables
      clientId: '9cf7868f-e16b-42e4-ac16-3239e9afe746',
      clientSecret: 'TcYXZ2OzFSuQGELh6TyaJtf1De7TR2UCIVXCSuDM',

      // Function to extract the profile information from the userinfo response
      profile(profile) {
        console.log(profile.STAFFID);
        
        return {
          id: profile.STAFFID,           // Unique identifier
          name: `${profile.PREFIXFULLNAME}${profile.STAFFNAME} ${profile.STAFFSURNAME}`,        // User's name
          email: (profile.STAFFEMAIL1??profile.STAFFEMAIL2)??'',      // User's email
          image: profile.STAFFID     // User's profile picture (if available)
        }
      }
    }
  ],
  session: {
    strategy: 'jwt'
  },
  callbacks: {
    jwt: async ({ token, user, account, profile }) => {
      if (user?.email) {
        token.providerInfo = {
          provider: account?.provider,
          access_token: account?.access_token,
          expire_at: account?.expires_at,
          refresh_token: account?.refresh_token,
          ...user
        }
      }

      return Promise.resolve(token);
    },
    session: async ({session, token, user}) => {
      session.providerInfo = token?.providerInfo;

      return Promise.resolve({ ...session});
    }
  }
})