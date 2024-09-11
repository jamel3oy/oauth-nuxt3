// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  modules: [
    '@sidebase/nuxt-auth'
  ],
  auth: {
    // globalAppMiddleware: true,
    
    origin: process.env.AUTH_ORIGIN,
    enableSessionRefreshOnWindowFocus: true,

    provider: {
      type: 'authjs',
      customOAuth: {
        id: 'custom-oauth',
        name: 'Custom OAuth',
        type: 'oauth',
        authorization: {
          url: 'https://erp.msu.ac.th/authen/oauth/_authorize',
          params: {
            client_id: '9cf7868f-e16b-42e4-ac16-3239e9afe746',
            response_type: 'code',
            redirect_uri: 'http://localhost:3000/api/auth/callback/custom-oauth',
            scope: 'email profile',
          },
        },
        token: {
          url: 'https://erp.msu.ac.th/authen/oauth/token',
        },
        userInfo: {
          url: 'https://erp.msu.ac.th/authen/api/authuser?progcode=budget01',
        },
        clientId: '9cf7868f-e16b-42e4-ac16-3239e9afe746',
        clientSecret: 'TcYXZ2OzFSuQGELh6TyaJtf1De7TR2UCIVXCSuDM',
      },
    },
  }
})
