"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Interfaces, Weather } from "doodle-icons";
import { Laptop } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

const ThemeSwitcher = () => {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  // useEffect only runs on the client, so now we can safely show the UI
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size={"sm"} className="hover:bg-secondary">
          {theme === "light" ? (
            <Interfaces.Sun
              key="light"
              className={"text-primary h-4 w-4"}
            />
          ) : theme === "dark" ? (
            <Weather.Night
              key="dark"
              className={"text-primary h-4 w-4"}
            />
          ) : (
            <Laptop
              key="system"
              className={"text-muted-foreground h-4 w-4"}
            />
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-content" align="start">
        <DropdownMenuRadioGroup
          value={theme}
          onValueChange={(e) => setTheme(e)}
        >
          <DropdownMenuRadioItem className="flex gap-2 cursor-pointer" value="light">
            <Interfaces.Sun className="text-primary h-4 w-4" />{" "}
            <span>Clair</span>
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem className="flex gap-2 cursor-pointer" value="dark">
            <Weather.Night className="text-accent h-4 w-4" />{" "}
            <span>Sombre</span>
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem className="flex gap-2 cursor-pointer" value="system">
            <Laptop className="text-muted-foreground h-4 w-4" />{" "}
            <span>Systeme</span>
          </DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export { ThemeSwitcher };
