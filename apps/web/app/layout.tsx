import { ThemeProvider } from "next-themes";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import { UserProvider } from "@/app/context/UserContext";
import { AuthGateProvider } from "@/app/context/AuthGateContext";
import { AuthGateModal } from "@/components/auth/AuthGateModal";

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
          <AuthGateProvider>
            <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
            >
              {children}
              <AuthGateModal />
            </ThemeProvider>
          </AuthGateProvider>
        </UserProvider>
        <Toaster />
      </body>
    </html>
  );
}
