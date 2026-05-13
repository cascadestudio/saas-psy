"use client"

import { useTheme } from "next-themes"
import { Toaster as Sonner } from "sonner"
import { Interfaces } from "doodle-icons"

type ToasterProps = React.ComponentProps<typeof Sonner>

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme()

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      position="bottom-center"
      icons={{
        success: <Interfaces.Tick2 className="h-4 w-4" fill="currentColor" />,
        error: <Interfaces.Cross className="h-4 w-4" fill="currentColor" />,
        info: <Interfaces.Info className="h-4 w-4" fill="currentColor" />,
        warning: <Interfaces.Info className="h-4 w-4" fill="currentColor" />,
        loading: <Interfaces.Sync className="h-4 w-4 animate-spin" fill="currentColor" />,
      }}
      className="toaster group"
      {...props}
    />
  )
}

export { Toaster }
