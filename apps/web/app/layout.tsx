import { ThemeProvider } from "next-themes";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import { UserProvider } from "@/app/context/UserContext";
import { AuthGateProvider } from "@/app/context/AuthGateContext";
import { PremiumGateProvider } from "@/app/context/PremiumGateContext";
import { PremiumGateModal } from "@/components/PremiumGateModal";
import { Rethink_Sans } from "next/font/google";

const rethinkSans = Rethink_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-rethink",
  display: "swap",
});

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
    <html lang="fr" suppressHydrationWarning className={rethinkSans.variable}>
      <body className="text-foreground font-sans">
        <UserProvider>
          <AuthGateProvider>
            <PremiumGateProvider>
              <ThemeProvider
                attribute="class"
                defaultTheme="light"
                enableSystem={false}
                disableTransitionOnChange
              >
                {children}
              </ThemeProvider>
              <PremiumGateModal />
            </PremiumGateProvider>
          </AuthGateProvider>
        </UserProvider>
        <Toaster />
      </body>
    </html>
  );
}
