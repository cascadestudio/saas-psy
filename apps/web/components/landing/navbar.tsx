"use client";

import { useState, useEffect } from "react";
import { Interfaces } from "doodle-icons";
import Image from "next/image";
import Link from "next/link";

const navLinks = [
  { href: "#fonctionnalites", label: "Fonctionnalités" },
  { href: "#comment-ca-marche", label: "Comment ça marche" },
  // { href: "#tarifs", label: "Tarifs" },
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
              src="/images/logos/logo-melya.svg"
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
                className="text-sm font-medium font-body transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* CTA — desktop */}
          <div className="hidden md:flex items-center gap-3">
            <Link
              href="/dashboard"
              className="font-body font-medium text-sm rounded-full px-5 py-2 bg-brand-orange text-white hover:bg-brand-orange/90 transition-colors"
            >
              Essayer Melya
            </Link>
          </div>

          {/* Hamburger — mobile */}
          <button
            className="md:hidden p-2 text-foreground"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Menu"
          >
            {mobileOpen ? (
              <Interfaces.Cross className="h-5 w-5" fill="currentColor" />
            ) : (
              <Interfaces.Menu className="h-5 w-5" fill="currentColor" />
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
            <div className="pt-2">
              <Link
                href="/dashboard"
                className="block w-full text-center font-body font-medium text-sm rounded-full px-5 py-2 bg-brand-orange text-white hover:bg-brand-orange/90 transition-colors"
                onClick={() => setMobileOpen(false)}
              >
                Essayer Melya
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
