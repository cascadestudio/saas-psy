"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import Link from "next/link";
import { useUser } from "@/app/context/UserContext";
import { useEffect, useState, Suspense } from "react";
import { patientsApi, sessionsApi, type Patient } from "@/lib/api-client";
import { scales } from "@/app/scalesData";
import { Arrow, Interfaces } from "doodle-icons";
import { Check } from "lucide-react";
import { toast } from "sonner";
import { CreatePatientSheet } from "@/components/CreatePatientSheet";

type Step = "scales" | "message" | "confirm";

function SendQuestionnaireContent() {
  const { user, isLoading } = useUser();
  const router = useRouter();
  const searchParams = useSearchParams();
  const preselectedPatientId = searchParams.get("patientId");

  const [step, setStep] = useState<Step>("scales");
  const [selectedPatientId, setSelectedPatientId] = useState<string>(
    preselectedPatientId || ""
  );
  const [selectedScaleIds, setSelectedScaleIds] = useState<
    string[]
  >([]);
  const [personalMessage, setPersonalMessage] = useState("");
  const [patients, setPatients] = useState<Patient[]>([]);
  const [patientsLoading, setPatientsLoading] = useState(true);
  const [isSending, setIsSending] = useState(false);

  // Load patients from API
  useEffect(() => {
    const loadPatients = async () => {
      if (!user) return;
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

    if (user) {
      loadPatients();
    }
  }, [user]);

  const handlePatientCreated = async (patientId: string) => {
    // Refresh patient list and select the new patient
    try {
      const { patients: data } = await patientsApi.getAll();
      setPatients(data);
      setSelectedPatientId(patientId);
    } catch (error) {
      console.error("Error refreshing patients:", error);
    }
  };

  if (isLoading) {
    return (
      <div className="flex-1 w-full flex items-center justify-center">
        <p>Chargement...</p>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  const selectedPatient = patients.find((p) => p.id === selectedPatientId);
  const selectedScales = scales.filter((s) =>
    selectedScaleIds.includes(s.id)
  );

  const handleToggleScale = (scaleId: string) => {
    setSelectedScaleIds((prev) =>
      prev.includes(scaleId)
        ? prev.filter((id) => id !== scaleId)
        : [...prev, scaleId]
    );
  };

  const handleSend = async () => {
    if (!selectedPatient || selectedScaleIds.length === 0) {
      toast.error("Veuillez sélectionner un patient et au moins une échelle");
      return;
    }

    setIsSending(true);
    try {
      await sessionsApi.create({
        patientId: selectedPatient.id,
        scaleIds: selectedScaleIds,
        message: personalMessage || undefined,
      });

      toast.success("Échelle(s) envoyée(s) avec succès", {
        description: `${selectedScaleIds.length} échelle(s) envoyée(s) à ${selectedPatient.firstName} ${selectedPatient.lastName}`,
      });

      router.push(`/patients/${selectedPatient.id}`);
    } catch (error) {
      console.error("Error sending scales:", error);
      toast.error("Erreur lors de l'envoi des échelles");
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-6 space-y-6 max-w-4xl">
      <div className="flex items-center gap-4">
        <Button asChild variant="ghost" size="icon">
          <Link href="/dashboard">
            <Arrow.ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <div className="flex-1">
          <h1 className="font-bold text-3xl">Envoyer une échelle</h1>
          <p className="text-muted-foreground mt-1">
            {selectedPatient
              ? `Pour ${selectedPatient.firstName} ${selectedPatient.lastName}`
              : "Sélectionnez un patient"}
          </p>
        </div>
      </div>

      {/* Patient Selection */}
      {!selectedPatient && (
        <Card>
          <CardHeader>
            <CardTitle>Sélectionner un patient</CardTitle>
            <CardDescription>
              Choisissez le patient à qui envoyer les échelles
            </CardDescription>
          </CardHeader>
          <CardContent>
            {patientsLoading ? (
              <p className="text-sm text-muted-foreground text-center py-8">
                Chargement des patients...
              </p>
            ) : patients.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-sm text-muted-foreground mb-4">
                  Aucun patient dans votre liste
                </p>
                <CreatePatientSheet onPatientCreated={handlePatientCreated} currentPatientCount={patients.length} />
              </div>
            ) : (
              <div className="space-y-4">
                <div className="grid grid-cols-1 gap-2 max-h-[400px] overflow-y-auto">
                  {patients.map((patient) => (
                    <div
                      key={patient.id}
                      className={`border rounded-lg p-3 cursor-pointer transition-all ${
                        selectedPatientId === patient.id
                          ? "border-primary bg-primary/5"
                          : "hover:border-muted-foreground/50"
                      }`}
                      onClick={() => setSelectedPatientId(patient.id)}
                    >
                      <p className="font-medium">
                        {patient.firstName} {patient.lastName}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {patient.email}
                      </p>
                    </div>
                  ))}
                </div>
                <div className="flex items-center justify-between pt-4 border-t">
                  <CreatePatientSheet
                    onPatientCreated={handlePatientCreated}
                    buttonSize="sm"
                    buttonText="Nouveau patient"
                    currentPatientCount={patients.length}
                  />
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Progress Steps */}
      {selectedPatient && (
        <>
          <div className="flex items-center gap-2">
            {[
              { key: "scales", label: "Échelles" },
              { key: "message", label: "Message" },
              { key: "confirm", label: "Confirmation" },
            ].map((s, index) => (
              <div key={s.key} className="flex items-center gap-2 flex-1">
                <div
                  className={`flex items-center justify-center w-8 h-8 rounded-full text-sm font-medium ${
                    step === s.key
                      ? "bg-primary text-primary-foreground"
                      : index <
                        ["scales", "message", "confirm"].indexOf(step)
                      ? "bg-green-500 text-white"
                      : "bg-muted text-muted-foreground"
                  }`}
                >
                  {index <
                  ["scales", "message", "confirm"].indexOf(step) ? (
                    <Check className="h-4 w-4" />
                  ) : (
                    index + 1
                  )}
                </div>
                <span className="text-sm font-medium hidden md:inline">
                  {s.label}
                </span>
                {index < 2 && (
                  <div className="flex-1 h-0.5 bg-muted hidden md:block" />
                )}
              </div>
            ))}
          </div>

          <Card>
            <CardHeader>
              <CardTitle>
                {step === "scales" && "Choisir les échelles"}
                {step === "message" && "Personnaliser le message"}
                {step === "confirm" && "Confirmer l'envoi"}
              </CardTitle>
              <CardDescription>
                {step === "scales" &&
                  "Vous pouvez sélectionner plusieurs échelles à envoyer en même temps"}
                {step === "message" &&
                  "Ajoutez un message personnalisé (optionnel)"}
                {step === "confirm" &&
                  "Vérifiez les informations avant d'envoyer"}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {/* Step 1: Scale Selection */}
              {step === "scales" && (
                <div className="space-y-4">
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
                    <p className="text-sm text-blue-900">
                      <strong>Multi-sélection activée :</strong> Le patient
                      recevra toutes les échelles sélectionnées dans un seul
                      email et pourra les compléter dans l'ordre de son choix.
                    </p>
                  </div>

                  <div className="flex items-center justify-between mb-4">
                    <p className="text-sm font-medium">
                      {selectedScaleIds.length} échelle(s)
                      sélectionnée(s)
                    </p>
                  </div>

                  <div className="grid grid-cols-1 gap-3">
                    {scales.map((scale) => (
                      <div
                        key={scale.id}
                        className={`border rounded-lg p-4 cursor-pointer transition-all ${
                          selectedScaleIds.includes(scale.id)
                            ? "border-primary bg-primary/5"
                            : "hover:border-muted-foreground/50"
                        }`}
                        onClick={() =>
                          handleToggleScale(scale.id)
                        }
                      >
                        <div className="flex items-start gap-3">
                          <Checkbox
                            checked={selectedScaleIds.includes(
                              scale.id
                            )}
                            onCheckedChange={() =>
                              handleToggleScale(scale.id)
                            }
                            onClick={(e) => e.stopPropagation()}
                          />
                          <div className="flex-1">
                            <div className="flex items-center gap-2">
                              <p className="font-medium">{scale.title}</p>
                            </div>
                            <p className="text-sm text-muted-foreground mt-1">
                              {scale.description}
                            </p>
                            <div className="flex items-center gap-4 mt-2">
                              <span className="text-xs text-muted-foreground">
                                {scale.category}
                              </span>
                              <span className="text-xs text-muted-foreground">
                                <Interfaces.Clock className="inline h-3 w-3 mr-1" />
                                {scale.estimatedTime}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="flex justify-end gap-2 pt-4">
                    <Button asChild variant="outline">
                      <Link href="/dashboard">Annuler</Link>
                    </Button>
                    <Button
                      onClick={() => setStep("message")}
                      disabled={selectedScaleIds.length === 0}
                    >
                      Continuer
                    </Button>
                  </div>
                </div>
              )}

              {/* Step 2: Personal Message */}
              {step === "message" && (
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="message">
                      Message personnalisé (optionnel)
                    </Label>
                    <Textarea
                      id="message"
                      placeholder="Bonjour,&#10;&#10;Merci de compléter cette/ces échelle(s) avant notre prochaine séance.&#10;&#10;Cordialement"
                      rows={6}
                      value={personalMessage}
                      onChange={(e) => setPersonalMessage(e.target.value)}
                    />
                    <p className="text-xs text-muted-foreground">
                      Ce message sera inclus dans l'email envoyé au patient
                    </p>
                  </div>

                  <div className="flex justify-end gap-2 pt-4">
                    <Button
                      onClick={() => setStep("scales")}
                      variant="outline"
                    >
                      Retour
                    </Button>
                    <Button onClick={() => setStep("confirm")}>Continuer</Button>
                  </div>
                </div>
              )}

              {/* Step 3: Confirmation */}
              {step === "confirm" && (
                <div className="space-y-6">
                  <div className="space-y-4 p-4 bg-muted rounded-lg">
                    <div>
                      <p className="text-sm text-muted-foreground">Patient</p>
                      <p className="font-medium">
                        {selectedPatient?.firstName} {selectedPatient?.lastName}{" "}
                        - {selectedPatient?.email}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">
                        Échelle(s) sélectionnée(s)
                      </p>
                      <ul className="list-disc list-inside mt-1">
                        {selectedScales.map((s) => (
                          <li key={s.id} className="text-sm">
                            {s.title}
                          </li>
                        ))}
                      </ul>
                    </div>
                    {personalMessage && (
                      <div>
                        <p className="text-sm text-muted-foreground">
                          Message personnalisé
                        </p>
                        <p className="text-sm mt-1 whitespace-pre-wrap">
                          {personalMessage}
                        </p>
                      </div>
                    )}
                  </div>

                  <div className="flex justify-end gap-2">
                    <Button onClick={() => setStep("message")} variant="outline">
                      Retour
                    </Button>
                    <Button onClick={handleSend} disabled={isSending}>
                      <Interfaces.Send className="mr-2 h-4 w-4" />
                      {isSending ? "Envoi en cours..." : "Envoyer maintenant"}
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </>
      )}
    </div>
  );
}

export default function SendQuestionnairePage() {
  return (
    <Suspense
      fallback={
        <div className="flex-1 w-full flex items-center justify-center">
          <p>Chargement...</p>
        </div>
      }
    >
      <SendQuestionnaireContent />
    </Suspense>
  );
}
