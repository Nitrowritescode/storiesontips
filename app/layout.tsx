import type { Metadata } from "next";
import { Comic_Neue } from "next/font/google";
import "./globals.css";
import Provider from "./provider";
import { Header } from "./_components/Header";
import { ClerkProvider } from "@clerk/nextjs";
import { shadesOfPurple } from '@clerk/themes'
// import { Background } from "./_components/background";

const comic = Comic_Neue({
  subsets: ["latin"],
  weight: "400"
});

export const metadata: Metadata = {
  title: "StoriesOnTips",
  description: "AI generated kids story generator app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider
  appearance={{
    baseTheme: shadesOfPurple,
  }}
  afterSignOutUrl="/"
>
   <html lang="en">
      <body className={`${comic.className}`}>
      
        <Provider>
          <Header />
          {children}
        </Provider>
      </body>
    </html>
    </ClerkProvider>

  );
}
