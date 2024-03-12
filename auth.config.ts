// configuration options for NextAuth.js
import type { NextAuthConfig } from 'next-auth';

export const authConfig = {
    // pages option to specify the route for custom sign-in, sign-out, and error pages.
    // user will be redirected to our custom login page, rather than the NextAuth.js default page.
    pages: {
        signIn: '/login',
    },
    callbacks: {
        // authorized: used to verify if the request is authorized to access a page via Next.js Middleware
        // auth: contains user's session
        // request: contains incomming request
        authorized({ auth, request: { nextUrl } }) {
          const isLoggedIn = !!auth?.user;
          const isOnDashboard = nextUrl.pathname.startsWith('/dashboard');
          if (isOnDashboard) {
            if (isLoggedIn) return true;
            return false; // Redirect unauthenticated users to login page
          } else if (isLoggedIn) {
            return Response.redirect(new URL('/dashboard', nextUrl));
          }
          return true;
        },
      },
      providers: [], // Add providers with an empty array for now
} satisfies NextAuthConfig;
