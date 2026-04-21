"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Interfaces, Files } from "doodle-icons";
import { useUser } from "@/app/context/UserContext";
import { useAuthGate } from "@/app/context/AuthGateContext";
import { FeedbackCTA } from "@/components/FeedbackModal";
import { cn } from "@/lib/utils";

const navigation = [
  { name: "Tableau de bord", href: "/dashboard", icon: Interfaces.Home },
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
      <aside className="sticky top-0 flex h-screen w-52 flex-col bg-brand-orange/10 text-brand-orange rounded-r-2xl">
        {/* Logo */}
        <div className="flex h-20 items-center justify-center px-4">
          <Link href="/dashboard" className="flex items-center">
            <Image
              src="/images/logos/logo-melya.svg"
              alt="Melya"
              width={96}
              height={30}
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
          {!user ? (
            <button
              onClick={() => openAuthGate()}
              className="relative flex items-center gap-3 px-2 py-2 text-sm font-medium transition-all duration-200 text-foreground hover:text-brand-orange hover:translate-x-1"
            >
              <Interfaces.Login className="h-4 w-4" fill="currentColor" />
              Se connecter
            </button>
          ) : (
            <button
              onClick={logout}
              className="relative flex items-center gap-3 px-2 py-2 text-sm font-medium transition-all duration-200 text-foreground hover:text-brand-orange hover:translate-x-1"
            >
              <Interfaces.Logout className="h-4 w-4" fill="currentColor" />
              Déconnexion
            </button>
          )}
        </nav>
      </aside>

      {/* Main content */}
      <main className="flex-1 min-w-0">{children}</main>

      {user && (
        <FeedbackCTA
          userId={user.id}
          email={user.email}
          firstName={user.firstName}
          lastName={user.lastName}
          hasSubmitted={!!user.feedbackSubmittedAt}
        />
      )}
    </div>
  );
}
