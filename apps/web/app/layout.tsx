import HeaderAuth from "@/components/header-auth";
import { ThemeSwitcher } from "@/components/theme-switcher";
import { ThemeProvider } from "next-themes";
import Link from "next/link";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import { UserProvider } from "@/app/context/UserContext";

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: "Melya",
  description: "Melya",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <body className="bg-background text-foreground font-lora">
        <UserProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            {children}
          </ThemeProvider>
        </UserProvider>
        <Toaster />
      </body>
    </html>
  );
}
