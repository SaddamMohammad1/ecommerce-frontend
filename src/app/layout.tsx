import type { Metadata } from "next";

import "./globals.css";

import ReduxProvider from "@/providers/redux-provider";

export const metadata: Metadata = {
  title: "E-Commerce",
  description: "Production Grade E-Commerce",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <ReduxProvider>
          {children}
        </ReduxProvider>
      </body>
    </html>
  );
}