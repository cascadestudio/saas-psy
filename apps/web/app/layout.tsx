import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import { UserProvider } from "@/app/context/UserContext";
import { AuthGateProvider } from "@/app/context/AuthGateContext";
import { AuthGateModal } from "@/components/auth/AuthGateModal";
import { PremiumGateProvider } from "@/app/context/PremiumGateContext";
import { PremiumGateModal } from "@/components/PremiumGateModal";

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
    <html lang="fr">
      <body className="bg-background text-foreground font-lora">
        <UserProvider>
          <AuthGateProvider>
            <PremiumGateProvider>
              {children}
              <AuthGateModal />
              <PremiumGateModal />
            </PremiumGateProvider>
          </AuthGateProvider>
        </UserProvider>
        <Toaster />
      </body>
    </html>
  );
}
