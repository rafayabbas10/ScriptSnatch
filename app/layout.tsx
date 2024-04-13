import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "./components/theme-provider";
import { Navbar } from "./components/Navbar";
import prisma from "./lib/db";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { unstable_noStore as noStore } from "next/cache";
import { Analytics } from '@vercel/analytics/react';

const inter = Inter({ subsets: ["latin"], display: 'swap', adjustFontFallback: false });

export const metadata: Metadata = {
  title: "ScriptSnatch",
  description: "Convert Youtube Videos into Articles",
  icons: {
    icon: [
      '/favicon.ico?v=4',
    ],
    apple: [
      'apple-touch-icon.png?v=4'
    ],
    shortcut: [
      '/apple-touch-icon.png'
    ],
  },
  manifest: '/site.webmanifest'
};

async function getData(userId: string) {
  noStore();
  if (userId) {
    const data = await prisma.user.findUnique({
      where: {
        id: userId
      },
      select: {
        colorScheme: true
      }
    })
    return data;
  }
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  const data = await getData(user?.id as string);
  return (
    <html lang="en">
      <body className={`${inter.className} ${data?.colorScheme ?? 'theme-red'}`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Navbar />
          {children}
          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  );
}
