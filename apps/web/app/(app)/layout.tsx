"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { Interfaces, Files } from "doodle-icons";
import { useUser } from "@/app/context/UserContext";
import { useAuthGate } from "@/app/context/AuthGateContext";

import { GlobalSearchBar } from "@/components/GlobalSearchBar";

import { cn } from "@/lib/utils";

const navigation = [
  { name: "Tableau de bord", href: "/dashboard", icon: Interfaces.Home },
  { name: "Patients", href: "/patients", icon: Interfaces.User },
  { name: "Échelles", href: "/echelles", icon: Files.FileText },
];

export default function AppLayout({ children }: { children: React.ReactNode }) {
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
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="sticky top-0 flex h-screen w-52 flex-col bg-surface-brand-bg text-brand-orange rounded-r-2xl">
        {/* Logo */}
        <div className="flex h-20 items-center justify-center px-4 mt-4">
          <Link href="/dashboard" className="flex items-center">
            <Image
              src="/images/logos/logo-melya.svg"
              alt="Melya"
              width={130}
              height={40}
              priority
            />
          </Link>
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-1 px-4 py-4">

          {navigation.map((item) => {
            const Icon = item.icon;
            const isActive =
              pathname === item.href || pathname.startsWith(item.href + "/");
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "relative flex items-center gap-3 px-2 py-2 text-sm font-medium transition-all duration-200",
                  isActive
                    ? "text-brand-orange translate-x-1"
                    : "text-foreground hover:text-brand-orange hover:translate-x-1",
                )}
              >
                {isActive && (
                  <span className="absolute left-0 top-1/2 -translate-y-1/2 h-5 w-px rounded-full bg-brand-orange" />
                )}
                <Icon className="h-4 w-4" fill="currentColor" />
                {item.name}
              </Link>
            );
          })}
        </nav>

        {/* Bottom actions */}
        <div className="px-4 pb-6">
          <div className="border-t border-brand-orange/20 pt-4 flex flex-col gap-1">
            <a
              href="mailto:clement@melya.app"
              className="flex items-center gap-3 px-2 py-2 text-sm font-medium text-foreground transition-all duration-200 hover:text-brand-orange hover:translate-x-1"
            >
              <Interfaces.Message className="h-4 w-4" fill="currentColor" />
              Nous contacter
            </a>
            {!user ? (
              <button
                onClick={() => openAuthGate()}
                className="flex items-center gap-3 px-2 py-2 text-sm font-medium text-foreground transition-all duration-200 hover:text-brand-orange hover:translate-x-1"
              >
                <Interfaces.Login className="h-4 w-4" fill="currentColor" />
                Se connecter
              </button>
            ) : (
              <button
                onClick={logout}
                className="flex items-center gap-3 px-2 py-2 text-sm font-medium text-foreground transition-all duration-200 hover:text-brand-orange hover:translate-x-1"
              >
                <Interfaces.Logout className="h-4 w-4" fill="currentColor" />
                Déconnexion
              </button>
            )}
          </div>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 min-w-0">
        {user && (
          <div className="container mx-auto px-4 pt-6">
            <GlobalSearchBar />
          </div>
        )}
        {children}
      </main>

    </div>
  );
}
