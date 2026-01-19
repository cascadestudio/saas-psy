import Link from "next/link";
import { Button } from "@/components/ui/button";

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center justify-between">
        <Link href="/" className="flex items-center space-x-2">
          <span className="font-bold text-lg">Melya</span>
        </Link>
        <div className="flex items-center gap-2">
          <Button asChild size="sm">
            <Link href="/dashboard">Accéder à l&apos;app</Link>
          </Button>
        </div>
      </div>
    </header>
  );
}
