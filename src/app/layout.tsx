import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import StoreProvider from "@/store/provider";

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

export const metadata: Metadata = {
  title: "Alinda",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${grebaviRegular.variable} ${grebaviMedium.variable} ${grebaviBold.variable} ${grebaviExtraBold.variable} ${drukHeavy.variable} ${drukSuper.variable} antialiased`}
      >
        <StoreProvider initialState={{}}>{children}</StoreProvider>
      </body>
    </html>
  );
}
