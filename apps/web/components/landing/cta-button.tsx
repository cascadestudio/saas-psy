import Link from "next/link";

import { cn } from "@/lib/utils";

export function CtaButton({
  href = "/app/dashboard",
  children,
  className,
}: {
  href?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <Link
      href={href}
      className={cn(
        "font-body font-medium text-sm rounded-full px-8 py-3 bg-brand-orange text-white hover:bg-brand-orange/90 transition-colors",
        className,
      )}
    >
      {children}
    </Link>
  );
}
