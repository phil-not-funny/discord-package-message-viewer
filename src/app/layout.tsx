import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { AppProvider } from "@/components/AppProvider";
import Loading from "@/components/Loading";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Discord Package Message Viewer",
  description: "View your Discord's package messages",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`font-discord antialiased relative bg-cyan-950 text-white min-h-screen`}
      >
        <AppProvider>
          <Loading />
          <div className="px-8">{children}</div>
        </AppProvider>
      </body>
    </html>
  );
}
