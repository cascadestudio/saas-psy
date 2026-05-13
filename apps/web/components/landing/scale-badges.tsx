"use client";

import { useRef, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { useScrollAnimation } from "./use-scroll-animation";
import { scales as scalesData } from "@/app/scalesData";
import { Arrow } from "doodle-icons";

const badgeScales = scalesData.map((s) => ({
  id: s.id,
  acronym: s.acronym,
  label: s.label,
  icon: s.icon,
  color: s.color,
  colorLight: s.colorLight,
}));

type BadgeScale = (typeof badgeScales)[number];

function ScaleBadge({ scale }: { scale: BadgeScale }) {
  return (
    <Link
      href={`/echelles/${scale.id}`}
      className="flex-shrink-0 flex overflow-hidden text-left cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange"
      style={{
        borderRadius: 20,
        aspectRatio: "340 / 120",
        width: "clamp(280px, 22vw, 340px)",
      }}
    >
      <div
        className="flex items-center justify-center flex-shrink-0 p-5"
        style={{
          backgroundColor: scale.color,
          aspectRatio: "1 / 1",
          height: "100%",
        }}
      >
        <Image
          src={scale.icon}
          alt={scale.label}
          width={56}
          height={56}
          className="w-3/5 h-3/5 object-contain"
        />
      </div>
      <div
        className="flex flex-col justify-center px-4 flex-1 min-w-0"
        style={{ backgroundColor: scale.colorLight }}
      >
        <p className="font-heading font-bold text-black leading-tight text-[clamp(1.25rem,1.8vw,1.75rem)]">
          {scale.acronym}
        </p>
        <p className="font-body text-black/80 leading-snug mt-0.5 text-[clamp(0.65rem,0.85vw,0.8rem)]">
          {scale.label}
        </p>
      </div>
    </Link>
  );
}

export function ScaleBadges() {
  const { ref, isVisible } = useScrollAnimation();
  const scrollRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);
  const hasDragged = useRef(false);

  const onPointerDown = useCallback((e: React.PointerEvent) => {
    const el = scrollRef.current;
    if (!el) return;
    isDragging.current = true;
    hasDragged.current = false;
    startX.current = e.clientX;
    scrollLeft.current = el.scrollLeft;
  }, []);

  const onPointerMove = useCallback((e: React.PointerEvent) => {
    if (!isDragging.current || !scrollRef.current) return;
    const dx = e.clientX - startX.current;
    if (Math.abs(dx) > 5) hasDragged.current = true;
    scrollRef.current.scrollLeft = scrollLeft.current - dx;
  }, []);

  const onPointerUp = useCallback(() => {
    isDragging.current = false;
  }, []);

  const scroll = useCallback((direction: "left" | "right") => {
    const el = scrollRef.current;
    if (!el) return;
    const amount = 320;
    el.scrollBy({ left: direction === "left" ? -amount : amount, behavior: "smooth" });
  }, []);

  return (
    <section className="py-12 md:py-16">
      <div ref={ref} className={`scroll-animate ${isVisible ? "visible" : ""}`}>
        <div className="relative group">
          {/* Left arrow */}
          <button
            onClick={() => scroll("left")}
            className="absolute left-2 top-1/2 -translate-y-1/2 z-10 h-10 w-10 rounded-full bg-card/90 border border-border shadow-md flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
            aria-label="Défiler à gauche"
          >
            <Arrow.ArrowLeft className="h-5 w-5 text-foreground" fill="currentColor" />
          </button>

          {/* Scrollable container */}
          <div
            ref={scrollRef}
            className="overflow-x-auto flex gap-6 px-4 sm:px-6 cursor-grab active:cursor-grabbing scrollbar-hide"
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={onPointerUp}
            onPointerCancel={onPointerUp}
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {badgeScales.map((scale) => (
              <ScaleBadge
                key={scale.id}
                scale={scale}
              />
            ))}
          </div>

          {/* Right arrow */}
          <button
            onClick={() => scroll("right")}
            className="absolute right-2 top-1/2 -translate-y-1/2 z-10 h-10 w-10 rounded-full bg-card/90 border border-border shadow-md flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
            aria-label="Défiler à droite"
          >
            <Arrow.ArrowRight className="h-5 w-5 text-foreground" fill="currentColor" />
          </button>
        </div>

        <p className="text-center text-muted-foreground font-body mt-6 text-sm md:text-base px-4">
          Accédez aux échelles psychométriques les plus utilisées, validées
          scientifiquement
        </p>
      </div>
    </section>
  );
}
