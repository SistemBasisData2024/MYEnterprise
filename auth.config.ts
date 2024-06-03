import type { NextAuthConfig } from "next-auth";

export const authConfig = {
  pages: {
    signIn: "/login",
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isOnDashboard = nextUrl.pathname.startsWith("/dashboard");
      const isOnRoot = nextUrl.pathname === "/";

      if (isOnRoot) {
        return true; // Allow all users to access the root path
      } else if (isOnDashboard) {
        if (isLoggedIn) return true;
        return false; // Redirect unauthenticated users trying to access the dashboard to the login page
      } else if (isLoggedIn) {
        return Response.redirect(new URL("/dashboard", nextUrl));
      }
      return false; // Redirect all other unauthenticated users to the login page
    },
  },
  providers: [], //Add providers with an empty array for now
} satisfies NextAuthConfig;
