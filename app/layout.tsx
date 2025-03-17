'use client';

import ApiSetup from "@/components/ApiSetup";
import Navbar from "@/components/Navbar";
import { MealProvider } from "@/context/MealContext";
import { getStoredCredentials } from "@/lib/diet/api";
import { Open_Sans } from "next/font/google";
import { useEffect, useState } from 'react';
import "./globals.css";

const openSans = Open_Sans({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-sans',
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [hasCredentials, setHasCredentials] = useState(false);

  useEffect(() => {
    const credentials = getStoredCredentials();
    setHasCredentials(!!credentials);
  }, []);

  if (!hasCredentials) {
    return <ApiSetup onCredentialsSet={() => setHasCredentials(true)} />;
  }

  return (
    <html lang="en">
      <body className={`${openSans.className} bg-white h-screen flex flex-col`}>
        <main className="flex-1 overflow-y-auto">
          <Navbar />
          <MealProvider>
            {children}
          </MealProvider>
        </main>
      </body>
    </html>
  );
}
