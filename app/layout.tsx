"use client";

import Auth from "@/components/Auth";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { MealProvider } from "@/context/MealContext";
import { getStoredCredentials } from "@/lib/diet/api";
import { Open_Sans } from "next/font/google";
import { useEffect, useState } from "react";
import "./globals.css";

const openSans = Open_Sans({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-sans",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [hasCredentials, setHasCredentials] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const credentials = getStoredCredentials();
    setHasCredentials(!!credentials);
    setIsLoading(false);
  }, []);

  const loadingSpinner = (
    <div className="flex justify-center items-center h-full">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
    </div>
  );

  const mainContent = isLoading ? loadingSpinner : (
    hasCredentials ? (
      <MealProvider>{children}</MealProvider>
    ) : (
      <Auth onCredentialsSet={() => setHasCredentials(true)} />
    )
  );

  return (
    <html lang="en">
      <head>
        <title>Simple Diet Planner</title>
      </head>
      <body className={`${openSans.className} bg-white h-screen flex flex-col`}>
        <Navbar />
        <main className="flex-1 overflow-y-auto mb-16">
          {mainContent}
        </main>
        <Footer />
      </body>
    </html>
  );
}
