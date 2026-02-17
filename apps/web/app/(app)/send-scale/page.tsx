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
import { Input } from "@/components/ui/input";
import { Arrow, Interfaces } from "doodle-icons";
import { Check } from "lucide-react";
import { toast } from "sonner";
import { CreatePatientSheet } from "@/components/CreatePatientSheet";

type Step = "patient" | "scales" | "message" | "confirm";

const STEPS: { key: Step; label: string }[] = [
  { key: "patient", label: "Patient" },
  { key: "scales", label: "Échelles" },
  { key: "message", label: "Message" },
  { key: "confirm", label: "Confirmation" },
];

function SendScaleContent() {
  const { user, isLoading } = useUser();
  const router = useRouter();
  const searchParams = useSearchParams();
  const preselectedPatientId = searchParams.get("patientId");

  // If patient is preselected, start at scales step
  const [step, setStep] = useState<Step>(
    preselectedPatientId ? "scales" : "patient"
  );
  const [selectedPatientId, setSelectedPatientId] = useState<string>(
    preselectedPatientId || ""
  );
  const [selectedScaleIds, setSelectedScaleIds] = useState<string[]>([]);
  const [personalMessage, setPersonalMessage] = useState("");
  const [patients, setPatients] = useState<Patient[]>([]);
  const [patientsLoading, setPatientsLoading] = useState(true);
  const [isSending, setIsSending] = useState(false);
  const [patientSearch, setPatientSearch] = useState("");

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

  const filteredPatients = patients.filter((patient) => {
    const query = patientSearch.toLowerCase();
    const fullName = `${patient.firstName} ${patient.lastName}`.toLowerCase();
    return fullName.includes(query) || patient.email.toLowerCase().includes(query);
  });

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
      const result = await sessionsApi.create({
        patientId: selectedPatient.id,
        scaleIds: selectedScaleIds,
        message: personalMessage || undefined,
      });

      if (result.emailsFailed > 0) {
        toast.warning("Échelle(s) créée(s) mais l'email n'a pas pu être envoyé", {
          description: `Vérifiez l'adresse email de ${selectedPatient.firstName} ${selectedPatient.lastName}`,
          duration: 8000,
        });
      } else {
        toast.success("Échelle(s) envoyée(s) avec succès", {
          description: `${selectedScaleIds.length} échelle(s) envoyée(s) à ${selectedPatient.firstName} ${selectedPatient.lastName}`,
        });
      }

      router.push(`/patients/${selectedPatient.id}`);
    } catch (error) {
      console.error("Error sending scales:", error);
      toast.error("Erreur lors de l'envoi des échelles");
    } finally {
      setIsSending(false);
    }
  };

  const currentStepIndex = STEPS.findIndex((s) => s.key === step);

  const getStepTitle = () => {
    switch (step) {
      case "patient":
        return "Choisir un patient";
      case "scales":
        return "Choisir les échelles";
      case "message":
        return "Personnaliser le message";
      case "confirm":
        return "Confirmer l'envoi";
    }
  };

  const getStepDescription = () => {
    switch (step) {
      case "patient":
        return "Sélectionnez le patient à qui envoyer les échelles";
      case "scales":
        return "Vous pouvez sélectionner plusieurs échelles à envoyer en même temps";
      case "message":
        return "Ajoutez un message personnalisé (optionnel)";
      case "confirm":
        return "Vérifiez les informations avant d'envoyer";
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

      {/* Progress Steps - Always visible */}
      <div className="flex items-center gap-2">
        {STEPS.map((s, index) => (
          <div key={s.key} className="flex items-center gap-2 flex-1">
            <div
              className={`flex items-center justify-center w-8 h-8 rounded-full text-sm font-medium ${
                step === s.key
                  ? "bg-primary text-primary-foreground"
                  : index < currentStepIndex
                  ? "bg-green-500 text-white"
                  : "bg-muted text-muted-foreground"
              }`}
            >
              {index < currentStepIndex ? (
                <Check className="h-4 w-4" />
              ) : (
                index + 1
              )}
            </div>
            <span className="text-sm font-medium hidden md:inline">
              {s.label}
            </span>
            {index < STEPS.length - 1 && (
              <div className="flex-1 h-0.5 bg-muted hidden md:block" />
            )}
          </div>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>{getStepTitle()}</CardTitle>
          <CardDescription>{getStepDescription()}</CardDescription>
        </CardHeader>
        <CardContent>
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
                  <div className="relative mb-4">
                    <Interfaces.Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Rechercher un patient..."
                      value={patientSearch}
                      onChange={(e) => setPatientSearch(e.target.value)}
                      className="pl-10"
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
                      ))
                    )}
                  </div>
                  <div className="flex items-center justify-between pt-4 border-t">
                    <CreatePatientSheet
                      onPatientCreated={handlePatientCreated}
                      buttonSize="sm"
                      buttonText="Nouveau patient"
                      currentPatientCount={patients.length}
                    />
                    <div className="flex gap-2">
                      <Button asChild variant="outline">
                        <Link href="/dashboard">Annuler</Link>
                      </Button>
                      <Button
                        onClick={() => setStep("scales")}
                        disabled={!selectedPatientId}
                      >
                        Continuer
                      </Button>
                    </div>
                  </div>
                </>
              )}
            </div>
          )}

          {/* Step 2: Scale Selection */}
          {step === "scales" && (
            <div className="space-y-4">
              <div className="flex items-center justify-between mb-4">
                <p className="text-sm font-medium">
                  {selectedScaleIds.length} échelle(s) sélectionnée(s)
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
                    onClick={() => handleToggleScale(scale.id)}
                  >
                    <div className="flex items-start gap-3">
                      <Checkbox
                        checked={selectedScaleIds.includes(scale.id)}
                        onCheckedChange={() => handleToggleScale(scale.id)}
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
                <Button
                  onClick={() => setStep("patient")}
                  variant="outline"
                >
                  Retour
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

          {/* Step 3: Personal Message */}
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
                <Button onClick={() => setStep("scales")} variant="outline">
                  Retour
                </Button>
                <Button onClick={() => setStep("confirm")}>Continuer</Button>
              </div>
            </div>
          )}

          {/* Step 4: Confirmation */}
          {step === "confirm" && (
            <div className="space-y-6">
              {/* Info about single email with portal */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <p className="text-sm text-blue-900">
                  <strong>1 email</strong> sera envoyé à {selectedPatient?.firstName} avec un lien vers un portail contenant {selectedScales.length === 1 ? "le questionnaire" : `les ${selectedScales.length} questionnaires`}.
                </p>
              </div>

              {/* Email Preview */}
              <div className="border rounded-lg overflow-hidden">
                <div className="bg-muted px-4 py-2 border-b flex items-center gap-2">
                  <Interfaces.Mail className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm font-medium">Aperçu de l'email</span>
                  <span className="text-xs text-muted-foreground ml-auto">
                    À : {selectedPatient?.email}
                  </span>
                </div>

                {/* Email content preview - matches the new batch template */}
                <div className="bg-[#f6f9fc] p-6">
                  <div className="max-w-[500px] mx-auto bg-white rounded-lg shadow-sm">
                    {/* Header */}
                    <div className="px-8 pt-8 pb-4 text-center">
                      <h2 className="text-xl font-semibold text-gray-900">
                        {selectedScales.length === 1
                          ? "Questionnaire de suivi"
                          : `${selectedScales.length} questionnaires à compléter`}
                      </h2>
                    </div>

                    <div className="px-8">
                      <hr className="border-gray-200" />
                    </div>

                    {/* Body */}
                    <div className="px-8 py-6 space-y-4">
                      <p className="text-gray-700">
                        Bonjour {selectedPatient?.firstName} {selectedPatient?.lastName},
                      </p>
                      <p className="text-gray-700">
                        {user?.firstName} {user?.lastName} vous a envoyé{" "}
                        {selectedScales.length === 1
                          ? "un questionnaire"
                          : `${selectedScales.length} questionnaires`}{" "}
                        à compléter :
                      </p>

                      {/* Scale list */}
                      <div className="bg-gray-50 rounded-lg p-4">
                        <ul className="space-y-2">
                          {selectedScales.map((scale) => (
                            <li key={scale.id} className="flex items-center gap-3">
                              <span className="w-2 h-2 bg-indigo-500 rounded-full flex-shrink-0" />
                              <span className="text-gray-700 text-sm">{scale.title}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {personalMessage && (
                        <div className="my-4 p-4 bg-gray-50 border-l-4 border-indigo-500 rounded">
                          <p className="text-gray-600 text-sm italic">
                            "{personalMessage}"
                          </p>
                        </div>
                      )}

                      <p className="text-gray-700">
                        Cliquez sur le bouton ci-dessous pour accéder à vos questionnaires :
                      </p>

                      <div className="text-center py-2">
                        <span className="inline-block px-6 py-3 bg-indigo-500 text-white font-semibold rounded-md text-sm">
                          Accéder aux questionnaires
                        </span>
                      </div>

                      <p className="text-gray-500 text-xs">
                        Ou copiez ce lien dans votre navigateur :<br />
                        <span className="text-indigo-500 break-all">
                          https://melya.fr/p/xxx-xxx-xxx
                        </span>
                      </p>
                    </div>

                    <div className="px-8">
                      <hr className="border-gray-200" />
                    </div>

                    {/* Footer */}
                    <div className="px-8 py-4 text-center">
                      <p className="text-gray-400 text-xs">
                        Melya - Plateforme de questionnaires psychométriques
                      </p>
                    </div>
                  </div>
                </div>
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
    </div>
  );
}

export default function SendScalePage() {
  return (
    <Suspense
      fallback={
        <div className="flex-1 w-full flex items-center justify-center">
          <p>Chargement...</p>
        </div>
      }
    >
      <SendScaleContent />
    </Suspense>
  );
}
