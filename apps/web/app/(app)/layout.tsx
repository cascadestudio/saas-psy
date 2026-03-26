"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { Arrow, Interfaces, Files } from "doodle-icons";
import { WaitlistButton } from "@/components/landing/waitlist-button";
import { Button } from "@/components/ui/button";
import { useUser } from "@/app/context/UserContext";
import { useAuthGate } from "@/app/context/AuthGateContext";

const navigation = [
  { name: "Tableau de bord", href: "/dashboard", icon: Interfaces.Home },
  { name: "Échelles", href: "/echelles", icon: Files.FileText },
  { name: "Patients", href: "/patients", icon: Interfaces.User },
];

export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const { user, isLoading, logout } = useUser();
  const { openAuthGate } = useAuthGate();

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p>Chargement...</p>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col">
      {/* Demo banner for unauthenticated visitors */}
      {!user && !isLoading && (
        <div className="w-full border-b bg-primary/5">
          <div className="container flex h-10 items-center justify-between text-sm">
            <Link
              href="/"
              className="flex items-center gap-1 text-muted-foreground hover:text-foreground transition-colors"
            >
              <Arrow.ArrowLeft className="h-3.5 w-3.5" />
              <span className="font-body hidden sm:inline">Retour au site</span>
            </Link>
            <div className="flex items-center gap-3">
              <span className="font-body text-muted-foreground hidden sm:inline">
                Vous explorez Melya en mode d&eacute;couverte
              </span>
              <WaitlistButton
                size="sm"
                className="h-7 font-body font-medium text-xs rounded-full px-4 bg-brand-orange text-brand-white hover:bg-brand-orange/90"
              >
                Rejoindre la b&ecirc;ta
              </WaitlistButton>
            </div>
          </div>
        </div>
      )}

      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 items-center">
          <div className="mr-4 hidden md:flex">
            <Link href="/dashboard" className="mr-6 flex items-center">
              <Image
                src="/images/landing/logo.svg"
                alt="Melya"
                width={90}
                height={28}
              />
            </Link>
            <nav className="flex items-center space-x-6 text-sm font-medium">
              {navigation.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`transition-colors hover:text-foreground/80 ${
                    pathname === item.href
                      ? "text-foreground"
                      : "text-foreground/60"
                  }`}
                >
                  {item.name}
                </Link>
              ))}
            </nav>
          </div>
          {/* Mobile menu button */}
          <button className="mr-2 px-0 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 md:hidden">
            <Link href="/dashboard" className="flex items-center space-x-2">
              <span className="font-bold">Melya</span>
            </Link>
          </button>
          <div className="flex flex-1 items-center justify-end space-x-2">
            {user ? (
              <Button
                variant="ghost"
                size="icon"
                onClick={logout}
                title="Déconnexion"
              >
                <Interfaces.Logout className="h-4 w-4" />
              </Button>
            ) : (
              <Button
                onClick={() => openAuthGate()}
                size="sm"
                variant="default"
              >
                Se connecter / S&apos;inscrire
              </Button>
            )}
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="flex-1">{children}</main>
    </div>
  );
}
