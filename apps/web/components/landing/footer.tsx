import Link from "next/link";

export function Footer() {
  return (
    <footer className="py-8 border-t">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="font-bold">Melya</span>
            <span className="text-muted-foreground text-sm">
              © {new Date().getFullYear()}
            </span>
          </div>
          <nav className="flex gap-6 text-sm text-muted-foreground">
            <Link href="/echelles" className="hover:text-foreground transition-colors">
              Échelles
            </Link>
            <Link href="/dashboard" className="hover:text-foreground transition-colors">
              Tableau de bord
            </Link>
          </nav>
        </div>
      </div>
    </footer>
  );
}
