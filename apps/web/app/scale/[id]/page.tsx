import { notFound } from "next/navigation";
import { scales } from "@/app/scalesData";
import ScaleFactory from "./components/ScaleFactory";

export default async function ScalePage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  let { id } = await params;
  const {
    psychologistEmail = process.env.NODE_ENV === "development"
      ? process.env.NEXT_PUBLIC_DEV_PSYCHOLOGIST_EMAIL
      : undefined,
    patientFirstname = process.env.NODE_ENV === "development"
      ? "John"
      : undefined,
    patientLastname = process.env.NODE_ENV === "development"
      ? "Doe"
      : undefined,
  } = await searchParams;

  if (
    !psychologistEmail ||
    !patientFirstname ||
    !patientLastname ||
    typeof psychologistEmail !== "string" ||
    typeof patientFirstname !== "string" ||
    typeof patientLastname !== "string"
  ) {
    return notFound();
  }

  const scale = scales.find((s) => s.id === id) || null;

  if (!scale) {
    return notFound();
  }

  return (
    <ScaleFactory
      scale={scale}
      psychologistEmail={psychologistEmail}
      patientFirstname={patientFirstname}
      patientLastname={patientLastname}
    />
  );
}
