"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import { useUser } from "@/app/context/UserContext";
import { useEffect, useState } from "react";
import { patientsApi, sessionsApi, type Patient } from "@/lib/api-client";
import { scales } from "@/app/scalesData";
import { Interfaces } from "doodle-icons";
import { toast } from "sonner";
import { CreatePatientSheet } from "@/components/CreatePatientSheet";
import { buildBatchEmailHtml } from "@melya/core";

type Step = "patient" | "scales" | "message" | "confirm";

const STEPS: { key: Step; label: string }[] = [
  { key: "patient", label: "Patient" },
  { key: "scales", label: "Échelles" },
  { key: "message", label: "Message" },
  { key: "confirm", label: "Confirmation" },
];

interface SendScaleSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  defaultPatientId?: string;
  defaultScaleIds?: string[];
  /** Called after successful send (e.g. to refresh data) */
  onSent?: () => void;
}

export function SendScaleSheet({
  open,
  onOpenChange,
  defaultPatientId,
  defaultScaleIds,
  onSent,
}: SendScaleSheetProps) {
  const { user } = useUser();
  const router = useRouter();

  const initialStep: Step = defaultPatientId ? "scales" : "patient";
  const [step, setStep] = useState<Step>(initialStep);
  const [selectedPatientId, setSelectedPatientId] = useState<string>(
    defaultPatientId || "",
  );
  const [selectedScaleIds, setSelectedScaleIds] = useState<string[]>(
    defaultScaleIds || [],
  );
  const [personalMessage, setPersonalMessage] = useState("");
  const [patients, setPatients] = useState<Patient[]>([]);
  const [patientsLoading, setPatientsLoading] = useState(true);
  const [isSending, setIsSending] = useState(false);
  const [patientSearch, setPatientSearch] = useState("");

  // Reset state when sheet opens with new defaults
  useEffect(() => {
    if (open) {
      setSelectedPatientId(defaultPatientId || "");
      setSelectedScaleIds(defaultScaleIds || []);
      setStep(defaultPatientId ? "scales" : "patient");
      setPersonalMessage("");
      setPatientSearch("");
    }
  }, [open, defaultPatientId, defaultScaleIds]);

  // Load patients
  useEffect(() => {
    if (!user || !open) {
      setPatientsLoading(false);
      return;
    }
    const loadPatients = async () => {
      setPatientsLoading(true);
      try {
        const { patients: data } = await patientsApi.getAll();
        setPatients(data);
      } catch (error) {
        console.error("Error loading patients:", error);
        setPatients([]);
      } finally {
        setPatientsLoading(false);
      }
    };
    loadPatients();
  }, [user, open]);

  const handlePatientCreated = async (patientId: string) => {
    try {
      const { patients: data } = await patientsApi.getAll();
      setPatients(data);
      setSelectedPatientId(patientId);
      setStep("scales");
    } catch (error) {
      console.error("Error refreshing patients:", error);
    }
  };

  const selectedPatient = patients.find((p) => p.id === selectedPatientId);
  const selectedScales = scales.filter((s) => selectedScaleIds.includes(s.id));

  const filteredPatients = patients.filter((patient) => {
    const query = patientSearch.toLowerCase();
    const fullName = `${patient.firstName} ${patient.lastName}`.toLowerCase();
    return (
      fullName.includes(query) || patient.email.toLowerCase().includes(query)
    );
  });

  const handleToggleScale = (scaleId: string) => {
    setSelectedScaleIds((prev) =>
      prev.includes(scaleId)
        ? prev.filter((id) => id !== scaleId)
        : [...prev, scaleId],
    );
  };

  const handleSend = async () => {
    if (!selectedPatient || selectedScaleIds.length === 0) {
      toast.error("Veuillez sélectionner un patient et au moins une échelle");
      return;
    }

    setIsSending(true);
    try {
      const result = await sessionsApi.create({
        patientId: selectedPatient.id,
        scaleIds: selectedScaleIds,
        message: personalMessage || undefined,
      });

      if (result.emailsFailed > 0) {
        toast.warning(
          "Échelle(s) créée(s) mais l'email n'a pas pu être envoyé",
          {
            description: `Vérifiez l'adresse email de ${selectedPatient.firstName} ${selectedPatient.lastName}`,
            duration: 8000,
          },
        );
      } else {
        toast.success("Échelle(s) envoyée(s) avec succès", {
          description: `${selectedScaleIds.length} échelle(s) envoyée(s) à ${selectedPatient.firstName} ${selectedPatient.lastName}`,
        });
      }

      onOpenChange(false);
      onSent?.();
      router.refresh();
    } catch (error) {
      console.error("Error sending scales:", error);
      toast.error("Erreur lors de l'envoi des échelles");
    } finally {
      setIsSending(false);
    }
  };

  const currentStepIndex = STEPS.findIndex((s) => s.key === step);

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="right"
        className="sm:max-w-[50vw] w-full flex flex-col p-0 rounded-l-2xl"
      >
        {/* Header */}
        <SheetHeader className="px-6 pt-6 pb-4 space-y-4 bg-brand-orange/10">
          <div>
            <SheetTitle className="text-xl">Envoyer une échelle</SheetTitle>
            <SheetDescription>
              {selectedPatient
                ? `Pour ${selectedPatient.firstName} ${selectedPatient.lastName}`
                : "Sélectionnez un patient"}
            </SheetDescription>
          </div>

          {/* Progress Steps */}
          <div className="flex items-center gap-2">
            {STEPS.map((s, index) => {
              const isCompleted = index < currentStepIndex;
              const isCurrent = step === s.key;
              const isClickable = isCompleted;

              return (
                <div key={s.key} className="flex items-center gap-1.5 flex-1">
                  <button
                    type="button"
                    disabled={!isClickable}
                    onClick={() => isClickable && setStep(s.key)}
                    className={`flex items-center justify-center w-7 h-7 rounded-full text-xs font-medium transition-colors ${
                      isCurrent
                        ? "bg-primary text-primary-foreground"
                        : isCompleted
                          ? "bg-green-500 text-white hover:bg-green-600 cursor-pointer"
                          : "bg-background border border-muted-foreground/30 text-muted-foreground"
                    } ${!isClickable ? "cursor-default" : ""}`}
                  >
                    {isCompleted ? (
                      <Interfaces.Tick className="h-3.5 w-3.5" />
                    ) : (
                      index + 1
                    )}
                  </button>
                  <span
                    className={`text-xs font-medium hidden sm:inline ${
                      isClickable ? "cursor-pointer hover:text-primary" : ""
                    }`}
                    onClick={() => isClickable && setStep(s.key)}
                  >
                    {s.label}
                  </span>
                  {index < STEPS.length - 1 && (
                    <div className="flex-1 h-px bg-border" />
                  )}
                </div>
              );
            })}
          </div>
        </SheetHeader>

        {/* Scrollable content */}
        <div className="flex-1 overflow-y-auto px-6 py-4">
          {/* Step 1: Patient Selection */}
          {step === "patient" && (
            <div className="space-y-4">
              {patientsLoading ? (
                <p className="text-sm text-muted-foreground text-center py-8">
                  Chargement des patients...
                </p>
              ) : patients.length === 0 ? (
                <div className="text-center py-8">
                  <Interfaces.User className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                  <p className="text-sm text-muted-foreground mb-4">
                    Aucun patient dans votre liste
                  </p>
                  <CreatePatientSheet
                    onPatientCreated={handlePatientCreated}
                    currentPatientCount={patients.length}
                  />
                </div>
              ) : (
                <>
                  <p className="text-sm text-muted-foreground">
                    Sélectionnez un patient dans la liste ou créez-en un nouveau.
                  </p>
                  <div className="flex items-center gap-2">
                    <div className="relative flex-1">
                      <Interfaces.Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        placeholder="Rechercher un patient..."
                        value={patientSearch}
                        onChange={(e) => setPatientSearch(e.target.value)}
                        className="pl-10 rounded-full"
                      />
                    </div>
                    <CreatePatientSheet
                      onPatientCreated={handlePatientCreated}
                      buttonVariant="default"
                      buttonClassName="bg-primary text-primary-foreground text-base shrink-0"
                      buttonText="Nouveau patient"
                      hideIcon
                      currentPatientCount={patients.length}
                    />
                  </div>
                  <div className="grid grid-cols-1 gap-2 max-h-[400px] overflow-y-auto">
                    {filteredPatients.length === 0 ? (
                      <p className="text-sm text-muted-foreground text-center py-8">
                        Aucun patient trouvé
                      </p>
                    ) : (
                      filteredPatients.map((patient) => (
                        <div
                          key={patient.id}
                          className={`border rounded-lg p-3 cursor-pointer transition-all ${
                            selectedPatientId === patient.id
                              ? "border-primary bg-primary/5"
                              : "hover:border-primary hover:bg-primary/5"
                          }`}
                          onClick={() => {
                            setSelectedPatientId(patient.id);
                            setStep("scales");
                          }}
                        >
                          <p className="font-medium">
                            {patient.firstName} {patient.lastName}
                          </p>
                        </div>
                      ))
                    )}
                  </div>
                </>
              )}
            </div>
          )}

          {/* Step 2: Scale Selection */}
          {step === "scales" && (
            <div className="space-y-4">
              <p className="text-sm font-medium">
                {selectedScaleIds.length} échelle(s) sélectionnée(s)
              </p>
              <div className="grid grid-cols-1 gap-3">
                {scales.map((scale) => {
                  const isSelected = selectedScaleIds.includes(scale.id);
                  return (
                    <div
                      key={scale.id}
                      className={`relative flex overflow-hidden cursor-pointer transition-all ${
                        isSelected ? "ring-2 ring-primary" : "hover:opacity-90"
                      }`}
                      style={{ borderRadius: 16, height: 88 }}
                      onClick={() => handleToggleScale(scale.id)}
                    >
                      <div
                        className="flex items-center justify-center flex-shrink-0"
                        style={{ backgroundColor: scale.color, aspectRatio: "1 / 1", height: "100%" }}
                      >
                        <Image
                          src={scale.icon}
                          alt={scale.acronym}
                          width={40}
                          height={40}
                          className="w-3/5 h-3/5 object-contain"
                        />
                      </div>
                      <div
                        className="flex flex-col justify-center px-4 flex-1 min-w-0"
                        style={{ backgroundColor: scale.colorLight }}
                      >
                        <p className="font-heading font-bold text-black leading-tight text-lg">{scale.acronym}</p>
                        <p className="font-body text-black/70 text-xs leading-snug mt-0.5 truncate">{scale.label}</p>
                      </div>
                      {isSelected && (
                        <div className="absolute top-2 right-2 w-5 h-5 rounded-full bg-primary flex items-center justify-center">
                          <Interfaces.Tick className="h-3 w-3 text-white" fill="white" />
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Step 3: Personal Message */}
          {step === "message" && (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="message" className="font-body">
                  Message personnalisé (optionnel)
                </Label>
                <Textarea
                  id="message"
                  placeholder={`Ex : ${selectedPatient?.firstName && selectedPatient.firstName !== selectedPatient.email?.split("@")[0] ? `${selectedPatient.firstName}, on` : "On"} avait parlé de faire un point sur ton anxiété sociale — ce questionnaire prend 10 minutes, ça nous donnera une bonne base pour notre prochaine séance.`}
                  rows={6}
                  value={personalMessage}
                  onChange={(e) => setPersonalMessage(e.target.value)}
                />
                <p className="text-xs text-muted-foreground">
                  Ce message sera inclus dans l'email envoyé au patient
                </p>
              </div>
            </div>
          )}

          {/* Step 4: Confirmation */}
          {step === "confirm" && (
            <div className="space-y-6">
              <div className="bg-foreground/5 border border-foreground/10 rounded-xl p-4">
                <p className="text-sm text-foreground">
                  <strong>1 email</strong> sera envoyé à{" "}
                  <strong>{selectedPatient?.firstName}</strong> avec un lien vers un portail
                  contenant{" "}
                  {selectedScales.length === 1
                    ? "le questionnaire"
                    : <strong>les {selectedScales.length} questionnaires</strong>}
                  .
                </p>
              </div>

              {/* Email Preview */}
              <div className="border rounded-xl overflow-hidden">
                <div className="bg-muted px-4 py-2 border-b flex items-center gap-2">
                  <Interfaces.Mail className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm font-medium">Aperçu de l'email</span>
                  <span className="text-xs text-muted-foreground ml-auto">
                    À : {selectedPatient?.email}
                  </span>
                </div>
                <iframe
                  srcDoc={buildBatchEmailHtml({
                    patientFirstName: selectedPatient?.firstName ?? "",
                    patientLastName: selectedPatient?.lastName ?? "",
                    scaleNames: selectedScales.map((s) => s.title),
                    practitionerName: `${user?.firstName ?? ""} ${user?.lastName ?? ""}`.trim(),
                    message: personalMessage || undefined,
                    portalUrl: "#",
                    logoUrl: "/images/logos/logo-melya.svg",
                  })}
                  className="w-full border-0"
                  style={{ height: "480px" }}
                  sandbox="allow-same-origin"
                  title="Aperçu de l'email"
                />
              </div>
            </div>
          )}
        </div>

        {/* Footer - fixed at bottom */}
        <div className="px-6 py-4 flex justify-between items-center">
          {step === "patient" ? null : step === "scales" ? (
            <>
              <Button onClick={() => setStep("patient")} variant="outline">
                Retour
              </Button>
              <Button
                onClick={() => setStep("message")}
                disabled={selectedScaleIds.length === 0}
              >
                Continuer
              </Button>
            </>
          ) : step === "message" ? (
            <>
              <Button onClick={() => setStep("scales")} variant="outline">Retour</Button>
              <Button onClick={() => setStep("confirm")}>Continuer</Button>
            </>
          ) : (
            <>
              <Button onClick={() => setStep("message")} variant="outline">Retour</Button>
              <Button onClick={handleSend} disabled={isSending}>
                {isSending ? "Envoi en cours..." : "Envoyer"}
              </Button>
            </>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}
