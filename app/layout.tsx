import type { Metadata } from "next";
import { Lobster, Inter } from "next/font/google";
import "./globals.css";
import Provider from "./provider";
import { Header } from "./_components/Header";
import { ClerkProvider } from "@clerk/nextjs";
import { shadesOfPurple } from "@clerk/themes";
// import { Background } from "./_components/background";

const inter = Inter({
  subsets: ["latin"],
  weight: "400",
});

const lobster = Lobster({
  subsets: ["latin"],
  weight: "400", 
  variable: "--font-lobster",
});

export const metadata: Metadata = {
  title: {
    template: "%s | StoriesOnTips",
    default: "StoriesOnTips",
  },
  description:
    "Create AI-generated stories, customize narratives, educate kids in writing, reading and speaking english language with good pronunciation of stories, difficult words and their meanings,learn life lessons by moral of the stories and unleash your creativity with AI storytelling! ",
  keywords: [
    "AI Story Creator",
    "AI Story Generator",
    "Story Creator",
    "Story Generator",
    "Language Learning",
    "Moral Stories",
    "AI Stories",
    "AI Storytelling",
    "AI Storyteller",
    "AI Storytelling App",
    "AI Storytelling Platform",
    "AI Storytelling Software",
    "AI Storytelling Tool",
    "Education",
    "Kids",
    "Children",
    "Parents",
    "Teachers",
    "Students",
    "Schools",
    "English Learning App",
  ],
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
        <body className={`${inter.className} ${lobster.variable}`}>
          <Provider>
            <div>{children}</div>
          </Provider>
        </body>
      </html>
    </ClerkProvider>
  );
}
