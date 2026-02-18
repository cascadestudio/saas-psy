import localFont from "next/font/local";

export const gelica = localFont({
  src: [
    {
      path: "./fonts/fonnts.com-Gelica-Extra-Light.otf",
      weight: "200",
      style: "normal",
    },
    {
      path: "./fonts/fonnts.com-Gelica-Light.otf",
      weight: "300",
      style: "normal",
    },
    {
      path: "./fonts/fonnts.com-Gelica-Regular.otf",
      weight: "400",
      style: "normal",
    },
    {
      path: "./fonts/fonnts.com-Gelica-Italic.otf",
      weight: "400",
      style: "italic",
    },
    {
      path: "./fonts/fonnts.com-Gelica-Medium.otf",
      weight: "500",
      style: "normal",
    },
    {
      path: "./fonts/fonnts.com-Gelica-Semi-Bold.otf",
      weight: "600",
      style: "normal",
    },
    {
      path: "./fonts/fonnts.com-Gelica-Bold.otf",
      weight: "700",
      style: "normal",
    },
    {
      path: "./fonts/fonnts.com-Gelica-Black.otf",
      weight: "900",
      style: "normal",
    },
  ],
  variable: "--font-gelica",
  display: "swap",
});
