"use client";

import { redirect, useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Link from "next/link";
import { useUser } from "@/app/context/UserContext";
import { useEffect, useState, Suspense } from "react";
import { getAllPatients, addPatient, type MockPatient } from "@/data/mock-patients";
import { addSession } from "@/data/mock-sessions";
import { questionnaires } from "@/app/questionnairesData";
import { ArrowLeft, UserPlus, Send, Check } from "lucide-react";
import { toast } from "sonner";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type Step = "questionnaires" | "message" | "confirm";

function SendQuestionnaireContent() {
  const { user, isLoading } = useUser();
  const router = useRouter();
  const searchParams = useSearchParams();
  const preselectedPatientId = searchParams.get("patientId");

  const [step, setStep] = useState<Step>("questionnaires");
  const [selectedPatientId, setSelectedPatientId] = useState<string>(
    preselectedPatientId || ""
  );
  const [selectedQuestionnaireIds, setSelectedQuestionnaireIds] = useState<
    string[]
  >([]);
  const [personalMessage, setPersonalMessage] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [patients, setPatients] = useState<MockPatient[]>([]);

  useEffect(() => {
    if (!isLoading && !user) {
      redirect("/sign-in");
    }
  }, [user, isLoading]);

  useEffect(() => {
    setPatients(getAllPatients());
  }, []);

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
  const selectedQuestionnaires = questionnaires.filter((q) =>
    selectedQuestionnaireIds.includes(q.id)
  );

  const handleToggleQuestionnaire = (questionnaireId: string) => {
    setSelectedQuestionnaireIds((prev) =>
      prev.includes(questionnaireId)
        ? prev.filter((id) => id !== questionnaireId)
        : [...prev, questionnaireId]
    );
  };

  const handleCreatePatient = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const fullName = formData.get("fullName") as string;
    const email = formData.get("email") as string;
    const initials =
      (formData.get("initials") as string) ||
      fullName
        .split(" ")
        .map((n) => n[0])
        .join(".") + ".";

    const newPatient = addPatient({
      fullName,
      initials,
      email,
      age: 0, // Can be updated later
    });

    setPatients([...patients, newPatient]);
    setSelectedPatientId(newPatient.id);
    setIsDialogOpen(false);
    toast.success("Patient créé avec succès");
  };

  const handleSend = () => {
    if (!selectedPatient || selectedQuestionnaireIds.length === 0) {
      toast.error("Veuillez sélectionner un patient et au moins une échelle");
      return;
    }

    // Create a batch ID for multiple questionnaires
    const batchId =
      selectedQuestionnaireIds.length > 1
        ? `batch_${Date.now()}`
        : null;

    // Create sessions for each selected questionnaire
    selectedQuestionnaireIds.forEach((questionnaireId) => {
      addSession({
        patientId: selectedPatient.id,
        questionnaireId,
        status: "in_progress",
        score: null,
        interpretation: null,
        sentAt: new Date().toISOString(),
        completedAt: null,
        batchId,
      });
    });

    toast.success("Échelle(s) envoyée(s) avec succès", {
      description: `${selectedQuestionnaireIds.length} échelle(s) envoyée(s) à ${selectedPatient.fullName}`,
    });

    router.push(`/patients/${selectedPatient.id}`);
  };

  return (
    <div className="container mx-auto px-4 py-6 space-y-6 max-w-4xl">
      <div className="flex items-center gap-4">
        <Button asChild variant="ghost" size="icon">
          <Link href="/dashboard">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <div className="flex-1">
          <h1 className="font-bold text-3xl">Envoyer une échelle</h1>
          <p className="text-muted-foreground mt-1">
            {selectedPatient ? `Pour ${selectedPatient.fullName}` : "Sélectionnez un patient"}
          </p>
        </div>
      </div>

      {/* Progress Steps */}
      <div className="flex items-center gap-2">
        {[
          { key: "questionnaires", label: "Questionnaires" },
          { key: "message", label: "Message" },
          { key: "confirm", label: "Confirmation" },
        ].map((s, index) => (
          <div key={s.key} className="flex items-center gap-2 flex-1">
            <div
              className={`flex items-center justify-center w-8 h-8 rounded-full text-sm font-medium ${
                step === s.key
                  ? "bg-primary text-primary-foreground"
                  : index <
                    [
                      "questionnaires",
                      "message",
                      "confirm",
                    ].indexOf(step)
                  ? "bg-green-500 text-white"
                  : "bg-muted text-muted-foreground"
              }`}
            >
              {index <
              ["questionnaires", "message", "confirm"].indexOf(
                step
              ) ? (
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
            {step === "questionnaires" && "Choisir les questionnaires"}
            {step === "message" && "Personnaliser le message"}
            {step === "confirm" && "Confirmer l'envoi"}
          </CardTitle>
          <CardDescription>
            {step === "questionnaires" &&
              "Vous pouvez sélectionner plusieurs questionnaires à envoyer en même temps"}
            {step === "message" &&
              "Ajoutez un message personnalisé (optionnel)"}
            {step === "confirm" &&
              "Vérifiez les informations avant d'envoyer"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {/* Step 1: Questionnaire Selection */}
          {step === "questionnaires" && (
            <div className="space-y-4">
              <div className="bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-800 rounded-lg p-4 mb-4">
                <p className="text-sm text-blue-900 dark:text-blue-100">
                  <strong>Multi-sélection activée :</strong> Le patient recevra
                  toutes les échelles sélectionnées dans un seul email et pourra
                  les compléter dans l'ordre de son choix.
                </p>
              </div>

              <div className="flex items-center justify-between mb-4">
                <p className="text-sm font-medium">
                  {selectedQuestionnaireIds.length} échelle(s)
                  sélectionnée(s)
                </p>
              </div>

              <div className="grid grid-cols-1 gap-3">
                {[...questionnaires]
                  .sort((a, b) => {
                    const aIsFavorite = user?.profile?.favoriteQuestionnaires?.includes(a.id) || false;
                    const bIsFavorite = user?.profile?.favoriteQuestionnaires?.includes(b.id) || false;
                    if (aIsFavorite && !bIsFavorite) return -1;
                    if (!aIsFavorite && bIsFavorite) return 1;
                    return 0;
                  })
                  .map((questionnaire) => (
                  <div
                    key={questionnaire.id}
                    className={`border rounded-lg p-4 cursor-pointer transition-all ${
                      selectedQuestionnaireIds.includes(questionnaire.id)
                        ? "border-primary bg-primary/5"
                        : "hover:border-muted-foreground/50"
                    }`}
                    onClick={() => handleToggleQuestionnaire(questionnaire.id)}
                  >
                    <div className="flex items-start gap-3">
                      <Checkbox
                        checked={selectedQuestionnaireIds.includes(
                          questionnaire.id
                        )}
                        onCheckedChange={() =>
                          handleToggleQuestionnaire(questionnaire.id)
                        }
                        onClick={(e) => e.stopPropagation()}
                      />
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <p className="font-medium">{questionnaire.title}</p>
                          {user?.profile?.favoriteQuestionnaires?.includes(questionnaire.id) && (
                            <span className="text-yellow-500">⭐</span>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground mt-1">
                          {questionnaire.description}
                        </p>
                        <div className="flex items-center gap-4 mt-2">
                          <span className="text-xs text-muted-foreground">
                            {questionnaire.category}
                          </span>
                          <span className="text-xs text-muted-foreground">
                            ⏱️ {questionnaire.estimatedTime}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex justify-end gap-2 pt-4">
                <Button asChild variant="outline">
                  <Link href="/dashboard">
                    Annuler
                  </Link>
                </Button>
                <Button
                  onClick={() => setStep("message")}
                  disabled={selectedQuestionnaireIds.length === 0}
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
                <Label htmlFor="message">Message personnalisé (optionnel)</Label>
                <Textarea
                  id="message"
                  placeholder="Bonjour,&#10;&#10;Merci de compléter ce(s) questionnaire(s) avant notre prochaine séance.&#10;&#10;Cordialement"
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
                  onClick={() => setStep("questionnaires")}
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
                    {selectedPatient?.fullName} - {selectedPatient?.email}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">
                    Questionnaire(s) sélectionné(s)
                  </p>
                  <ul className="list-disc list-inside mt-1">
                    {selectedQuestionnaires.map((q) => (
                      <li key={q.id} className="text-sm">
                        {q.title}
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
                <Button onClick={handleSend}>
                  <Send className="mr-2 h-4 w-4" />
                  Envoyer maintenant
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

export default function SendQuestionnairePage() {
  return (
    <Suspense fallback={
      <div className="flex-1 w-full flex items-center justify-center">
        <p>Chargement...</p>
      </div>
    }>
      <SendQuestionnaireContent />
    </Suspense>
  );
}
