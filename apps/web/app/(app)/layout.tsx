"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { Interfaces, Files } from "doodle-icons";
import { useUser } from "@/app/context/UserContext";
import { useAuthGate } from "@/app/context/AuthGateContext";

import { GlobalSearchBar } from "@/components/GlobalSearchBar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { cn } from "@/lib/utils";

const navigation = [
  { name: "Tableau de bord", href: "/dashboard", icon: Interfaces.Home },
  { name: "Mes patients", href: "/patients", icon: Interfaces.User },
  { name: "Échelles", href: "/echelles", icon: Files.FileText },
];

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { user } = useUser();
  const { openAuthGate } = useAuthGate();

  const isSettingsActive =
    pathname === "/settings" || pathname.startsWith("/settings/");

  return (
    <div className="flex min-h-screen">
      {/* Sidebar (desktop) */}
      <aside className="sticky top-0 hidden h-screen w-52 flex-col bg-surface-brand-bg text-brand-orange rounded-r-2xl md:flex print:hidden">
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
                    : "text-muted-foreground hover:text-brand-orange hover:translate-x-1",
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
            <Link
              href="/settings"
              className={cn(
                "flex items-center gap-3 px-2 py-2 text-sm font-medium transition-all duration-200",
                pathname === "/settings" || pathname.startsWith("/settings/")
                  ? "text-brand-orange translate-x-1"
                  : "text-muted-foreground hover:text-brand-orange hover:translate-x-1",
              )}
            >
              <Interfaces.Setting className="h-4 w-4" fill="currentColor" />
              Paramètres
            </Link>
            <a
              href="mailto:clement@melya.app"
              className="flex items-center gap-3 px-2 py-2 text-sm font-medium text-muted-foreground transition-all duration-200 hover:text-brand-orange hover:translate-x-1"
            >
              <Interfaces.Message className="h-4 w-4" fill="currentColor" />
              Nous contacter
            </a>
            {!user && (
              <button
                onClick={() => openAuthGate()}
                className="flex items-center gap-3 px-2 py-2 text-sm font-medium text-muted-foreground transition-all duration-200 hover:text-brand-orange hover:translate-x-1"
              >
                <Interfaces.Login className="h-4 w-4" fill="currentColor" />
                Se connecter
              </button>
            )}
          </div>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 min-w-0 pb-16 md:pb-0">
        {/* Beta banner */}
        <div className="bg-brand-orange text-white text-[12px] px-4 py-1 text-center print:hidden">
          Vous utilisez Melya en avant-première, n’hésitez pas à{" "}
          <a
            href="mailto:clement@melya.app?subject=Feedback%20beta%20Melya"
            className="underline underline-offset-2 hover:opacity-90"
          >
            nous donner vos retours
          </a>
          , ils sont précieux
        </div>

        {/* Mobile header */}
        <div className="flex h-14 items-center justify-between border-b border-border bg-surface-brand-bg px-4 md:hidden print:hidden">
          <Link href="/dashboard" className="flex items-center">
            <Image
              src="/images/logos/logo-melya.svg"
              alt="Melya"
              width={110}
              height={32}
              priority
            />
          </Link>
          <DropdownMenu>
            <DropdownMenuTrigger
              aria-label="Menu"
              className="rounded-md p-2 text-brand-orange hover:bg-brand-orange/10"
            >
              <Interfaces.Menu className="h-5 w-5" fill="currentColor" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuItem asChild>
                <Link href="/settings" className="flex items-center gap-2">
                  <Interfaces.Setting className="h-4 w-4" fill="currentColor" />
                  Paramètres
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <a
                  href="mailto:clement@melya.app"
                  className="flex items-center gap-2"
                >
                  <Interfaces.Message className="h-4 w-4" fill="currentColor" />
                  Nous contacter
                </a>
              </DropdownMenuItem>
              {!user && (
                <DropdownMenuItem
                  onSelect={() => openAuthGate()}
                  className="flex items-center gap-2"
                >
                  <Interfaces.Login className="h-4 w-4" fill="currentColor" />
                  Se connecter
                </DropdownMenuItem>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {user && !pathname.startsWith("/settings") && (
          <div className="container mx-auto px-4 pt-6 print:hidden">
            <GlobalSearchBar />
          </div>
        )}
        {children}
      </main>

      {/* Bottom tab bar (mobile) */}
      <nav className="fixed bottom-0 left-0 right-0 z-40 flex h-16 items-center justify-around border-t border-border bg-[#FBEEE9] md:hidden print:hidden">
        {navigation.map((item) => {
          const Icon = item.icon;
          const isActive =
            pathname === item.href || pathname.startsWith(item.href + "/");
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex flex-1 flex-col items-center justify-center gap-1 px-2 py-2 text-xs font-medium transition-colors",
                isActive
                  ? "text-brand-orange"
                  : "text-muted-foreground hover:text-brand-orange",
              )}
            >
              <Icon className="h-5 w-5" fill="currentColor" />
              <span>{item.name}</span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
