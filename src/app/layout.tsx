import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import DynamicNavbar from "@/components/DynamicNavbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Deploynix | Modern Job Platform",
  description: "Find your dream job or the perfect candidate.",
};

export const dynamic = "force-dynamic";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning>
        <div className={`${inter.className} bg-black text-gray-100 antialiased min-h-screen flex flex-col`}>
          <DynamicNavbar />
          <main className="flex-1 pt-16">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
