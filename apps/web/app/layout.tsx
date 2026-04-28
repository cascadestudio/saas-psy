import { ThemeProvider } from "next-themes";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import { UserProvider } from "@/app/context/UserContext";
import { AuthGateProvider } from "@/app/context/AuthGateContext";
import { PremiumGateProvider } from "@/app/context/PremiumGateContext";
import { AuthGateModal } from "@/components/auth/AuthGateModal";
import { PremiumGateModal } from "@/components/PremiumGateModal";
import { RadixPointerEventsFix } from "@/components/RadixPointerEventsFix";
import { Rethink_Sans } from "next/font/google";
import { gelica } from "./fonts";

const rethinkSans = Rethink_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-rethink",
  display: "swap",
});

const defaultUrl = process.env.VERCEL_URL
  ? "https://www.melya.app"
  : "http://localhost:3000";

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: "Melya",
  description:
    "Plateforme d'échelles psychométriques pour psychologues. Envoi, passation en ligne, scoring automatique et suivi longitudinal.",
  openGraph: {
    title: "Melya",
    description:
      "Plateforme d'échelles psychométriques pour psychologues. Envoi, passation en ligne, scoring automatique et suivi longitudinal.",
    url: "https://www.melya.app",
    siteName: "Melya",
    locale: "fr_FR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Melya",
    description:
      "Plateforme d'échelles psychométriques pour psychologues. Envoi, passation en ligne, scoring automatique et suivi longitudinal.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" suppressHydrationWarning className={`${rethinkSans.variable} ${gelica.variable}`}>
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
                <AuthGateModal />
                <PremiumGateModal />
              </ThemeProvider>
            </PremiumGateProvider>
          </AuthGateProvider>
        </UserProvider>
        <Toaster />
        <RadixPointerEventsFix />
      </body>
    </html>
  );
}
