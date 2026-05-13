"use client";

import { useEffect } from "react";

export function RadixPointerEventsFix() {
  useEffect(() => {
    const observer = new MutationObserver(() => {
      const hasOpenDialog = document.querySelector(
        '[data-state="open"][role="dialog"], [data-state="open"][role="alertdialog"]'
      );
      if (!hasOpenDialog && document.body.style.pointerEvents === "none") {
        document.body.style.pointerEvents = "";
      }
    });

    observer.observe(document.body, {
      attributes: true,
      attributeFilter: ["style"],
      childList: true,
      subtree: true,
    });

    return () => observer.disconnect();
  }, []);

  return null;
}
