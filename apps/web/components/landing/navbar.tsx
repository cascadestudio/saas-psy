"use client";

import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { WaitlistButton } from "./waitlist-button";
import Image from "next/image";

const navLinks = [
  { href: "#fonctionnalites", label: "Fonctionnalités" },
  { href: "#comment-ca-marche", label: "Comment ça marche" },
  { href: "#tarifs", label: "Tarifs" },
  { href: "#faq", label: "FAQ" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-background/90 backdrop-blur-md shadow-sm"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <a href="#" className="flex items-center gap-2">
            <Image
              src="/images/landing/logo.svg"
              alt="Melya"
              width={112}
              height={35}
              priority
            />
          </a>

          {/* Center links — desktop */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm font-medium font-body text-muted-foreground hover:text-foreground transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* CTA — desktop */}
          <div className="hidden md:flex items-center gap-3">
            <a
              href="/sign-in"
              className="text-sm !text-brand-orange font-medium font-body transition-colors rounded-full px-4 py-2 bg-brand-orange-light hover:bg-brand-orange-light/80"
            >
              Se connecter
            </a>
            <WaitlistButton
              size="sm"
              className="font-body font-medium text-sm rounded-full px-5 bg-brand-orange text-white hover:bg-brand-orange/90"
            >
              Rejoindre la liste d'attente
            </WaitlistButton>
          </div>

          {/* Hamburger — mobile */}
          <button
            className="md:hidden p-2 text-foreground"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Menu"
          >
            {mobileOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden bg-card/95 backdrop-blur-md border-t border-border">
          <div className="px-4 py-4 space-y-3">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="block text-sm font-medium font-body text-muted-foreground hover:text-foreground transition-colors py-2"
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </a>
            ))}
            <a
              href="/sign-in"
              className="block text-sm !text-brand-orange font-medium font-body rounded-full px-4 py-2 bg-brand-orange-light hover:bg-brand-orange-light/80 text-center"
              onClick={() => setMobileOpen(false)}
            >
              Se connecter
            </a>
            <div className="pt-2">
              <WaitlistButton
                className="w-full font-body font-medium text-sm rounded-full bg-brand-orange text-white hover:bg-brand-orange/90"
                size="sm"
              >
                Rejoindre la liste d'attente
              </WaitlistButton>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
