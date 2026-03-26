import { Logos } from "doodle-icons";
import Image from "next/image";

export function Footer() {
  return (
    <footer className="border-t border-border py-10 md:py-12">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Image
              src="/images/landing/logo.svg"
              alt="Melya"
              width={100}
              height={31}
            />
          </div>

          {/* Links */}
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm font-body text-muted-foreground">
            <a href="mailto:contact@cascadestudio.fr" className="hover:text-foreground transition-colors">
              Contact
            </a>
            <span className="hidden sm:inline text-border">·</span>
            <a href="#" className="hover:text-foreground transition-colors">
              Sécurité
            </a>
            <span className="hidden sm:inline text-border">·</span>
            <a href="#" className="hover:text-foreground transition-colors">
              Politique de confidentialité
            </a>
            <span className="hidden sm:inline text-border">·</span>
            <a href="#" className="hover:text-foreground transition-colors">
              Mentions légales
            </a>
            <span className="hidden sm:inline text-border">·</span>
            <a href="#fonctionnalites" className="hover:text-foreground transition-colors">
              Échelles disponibles
            </a>
          </div>

          {/* Social */}
          <div className="flex items-center gap-4">
            <a
              href="#"
              className="text-muted-foreground hover:text-foreground transition-colors"
              aria-label="LinkedIn"
            >
              <Logos.Linkedin className="h-5 w-5" fill="currentColor" />
            </a>
            <a
              href="#"
              className="text-muted-foreground hover:text-foreground transition-colors"
              aria-label="Instagram"
            >
              <Logos.Instagram className="h-5 w-5" fill="currentColor" />
            </a>
          </div>
        </div>

        <div className="mt-8 text-center text-xs text-muted-foreground font-body">
          © 2026 Melya — Hébergé en France sur serveur certifié HDS
        </div>
      </div>
    </footer>
  );
}
