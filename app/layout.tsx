import type { Metadata } from "next";
import { Baloo_2 } from "next/font/google";
import "./globals.css";
import Provider from "./provider";
import { Header } from "./_components/Header";
import { ClerkProvider } from "@clerk/nextjs";
import { shadesOfPurple } from '@clerk/themes'

const baloo = Baloo_2({ subsets: ["latin"] });

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
>
   <html lang="en">
      <body className={`${baloo.className}`}>
        <Provider>
          <Header />
          {children}
        </Provider>
      </body>
    </html>
    </ClerkProvider>

  );
}
