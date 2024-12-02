import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { pagesOptions } from "./pages-option";
import axios from "@/axios";

export const authOptions: NextAuthOptions = {
  secret: process.env.NEXT_AUTH_SECRET_KEY,
  pages: {
    ...pagesOptions,
  },
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60,
  },
  callbacks: {
    async session({ session, token }: { session: any; token: any }) {
      return {
        ...session,
        user: {
          data: token && token.user,
          ...session.user,
          id: token.idToken as string,
        },
      };
    },
    async jwt({ token, user, trigger, session }: any) {
      if (user) {
        token.user = user;
      }
      if (trigger === "update" && session) {
        token.user = session;
      }
      return token;
    },
    async redirect({ url, baseUrl }) {
      const parsedUrl = new URL(url, baseUrl);
      if (parsedUrl.searchParams.has("callbackUrl")) {
        return Promise.resolve(
          `${baseUrl}${parsedUrl.searchParams.get("callbackUrl")}`
        );
      } else {
        return Promise.resolve(`${baseUrl}/dashboard`);
      }
    },
  },
  providers: [
    CredentialsProvider({
      id: "credentials",
      name: "Credentials",
      credentials: {
        email: {
          label: "email",
          type: "email",
          placeholder: "email@example.com",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials: any) {
        if (credentials == null) return null;
        try {
          console.log(credentials);
          const payload = {
            email: credentials.email,
            password: credentials.password,
            device_id: "erst",
            device_type: "rfhr",
            device_token: "swsw",
          };
          const response: any = await axios.post("/users/login", payload);
          console.log(response);
          if (response?.user) {
            return response;
          } else {
            throw new Error(
              response?.message || "Email or password is incorrect"
            );
          }
        } catch (err: any) {
          throw new Error(err);
        }
      },
    }),
  ],
};
