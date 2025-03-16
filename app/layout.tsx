'use client';

import "./globals.css";
import { MealProvider } from "@/context/MealContext";
import { getStoredCredentials } from "@/lib/diet/api";
import { useState, useEffect} from 'react';
import ApiSetup from "@/components/ApiSetup";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
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
      <body>
        <MealProvider>
          {children}
        </MealProvider>
      </body>
    </html>
  );
}
