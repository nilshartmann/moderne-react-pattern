import type { Metadata } from "next";
import "./globals.css";
import { GlobalPageLayout } from "@/app/components/layout/GlobalPageLayout";

export const metadata: Metadata = {
  title: "Recipify Next.js demo",
  description: "Recipes for hungry frontend devs",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link href="/fonts/google-fonts.css" rel="stylesheet" />
        <link href="/fontawesome/css/fontawesome.css" rel="stylesheet" />
        <link href="/fontawesome/css/brands.css" rel="stylesheet" />
        <link href="/fontawesome/css/regular.css" rel="stylesheet" />
        <link href="/fontawesome/css/solid.css" rel="stylesheet" />
        <title>Recipify Next.js Demo</title>
      </head>
      <body suppressHydrationWarning>
        <GlobalPageLayout>{children}</GlobalPageLayout>
      </body>
    </html>
  );
}
