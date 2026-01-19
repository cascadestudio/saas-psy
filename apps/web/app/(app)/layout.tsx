"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Interfaces, Files } from "doodle-icons";
import { Button } from "@/components/ui/button";
import { ThemeSwitcher } from "@/components/theme-switcher";
import { useUser } from "@/app/context/UserContext";

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

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p>Chargement...</p>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 items-center">
          <div className="mr-4 hidden md:flex">
            <Link href="/dashboard" className="mr-6 flex items-center space-x-2">
              <span className="font-bold">Melya</span>
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
            <ThemeSwitcher />
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
              <Button asChild variant="default" size="sm">
                <Link href="/sign-in">Connexion</Link>
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
