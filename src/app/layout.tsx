import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import ContextProvider from "@/context/ContextProvider";

export const metadata: Metadata = {
  title: "Hall of Fame | Stacks",
  description: "A decentralized leaderboard on Stacks",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <ContextProvider>
          {/* Background Gradients */}
          <div className="bg-gradients">
            <div className="gradient-blob gradient-blob-1" />
            <div className="gradient-blob gradient-blob-2" />
          </div>

          <Navbar />
          <main className="main-content">
            {children}
          </main>
        </ContextProvider>
      </body>
    </html>
  );
}
