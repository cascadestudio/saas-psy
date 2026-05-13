import localFont from "next/font/local";

export const gelica = localFont({
  src: [
    {
      path: "./fonts/Gelica-Light.otf",
      weight: "300",
      style: "normal",
    },
    {
      path: "./fonts/Gelica-Regular.otf",
      weight: "400",
      style: "normal",
    },
    {
      path: "./fonts/Gelica-Bold.otf",
      weight: "700",
      style: "normal",
    },
    {
      path: "./fonts/Gelica-Black.otf",
      weight: "900",
      style: "normal",
    },
  ],
  variable: "--font-gelica",
  display: "swap",
});
