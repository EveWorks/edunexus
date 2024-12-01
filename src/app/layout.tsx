import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import StoreProvider from "@/store/provider";
import AuthProvider from "./api/auth/[...nextauth]/auth-provider";
import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/auth-options";
import { Toaster } from "react-hot-toast";

const grebaviRegular = localFont({
  src: "./fonts/grebavi-regular.otf",
  variable: "--font-grebavi-regular",
  weight: "400",
});
const grebaviMedium = localFont({
  src: "./fonts/grebavi-medium.otf",
  variable: "--font-grebavi-medium",
  weight: "500",
});
const grebaviBold = localFont({
  src: "./fonts/grebavi-bold.otf",
  variable: "--font-grebavi-bold",
  weight: "700",
});
const grebaviExtraBold = localFont({
  src: "./fonts/grebavi-extrabold.otf",
  variable: "--font-grebavi-extrabold",
  weight: "800",
});
const drukHeavy = localFont({
  src: "./fonts/druk-heavy.otf",
  variable: "--font-druk-heavy",
  weight: "700",
});
const drukSuper = localFont({
  src: "./fonts/druk-super.otf",
  variable: "--font-druk-super",
  weight: "800",
});
const borel = localFont({
  src: "./fonts/borel-regular.ttf",
  variable: "--font-borel",
  weight: "800",
});

export const metadata: Metadata = {
  title: "Alinda",
  description: "",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession(authOptions);
  return (
    <html lang="en">
      <body
        suppressHydrationWarning
        className={`${grebaviRegular.variable} ${grebaviMedium.variable} ${grebaviBold.variable} ${grebaviExtraBold.variable} ${drukHeavy.variable} ${drukSuper.variable} ${borel.variable} antialiased`}
      >
        <AuthProvider session={session}>
          <StoreProvider initialState={{}}>
            {children}
            <Toaster />
          </StoreProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
