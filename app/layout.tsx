import { getSession } from "@/actions/getSession";
import Navbar from "@/components/Navbar/Navbar";
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "@/providers/theme-provider";
import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";
import ReduxProvider from "@/providers/redux-provider";
import Container from "@/components/Container";

const roboto = Roboto({
  weight: "400",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ReddDjango",
  description: "Reddit clone powered by Django",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getSession();

  return (
    <html lang="en">
      <body className={roboto.className}>
        <ReduxProvider>
          <ThemeProvider attribute="class" defaultTheme="system">
            <Navbar session={session} />
            <Container>{children}</Container>
            <Toaster />
          </ThemeProvider>
        </ReduxProvider>
      </body>
    </html>
  );
}
