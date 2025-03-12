"use client";

import { useState } from "react";
import { Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { useParams } from "next/navigation";

interface EmailFormData {
  patientName: string;
  patientEmail: string;
  message: string;
}

export function EmailDialogForm() {
  const [isEmailSent, setIsEmailSent] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const params = useParams();
  const questionnaireId = params.id as string;

  const handleSendEmail = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    const formData = new FormData(e.currentTarget);
    const data: EmailFormData = {
      patientName: formData.get("patient-name") as string,
      patientEmail: formData.get("patient-email") as string,
      message: (formData.get("message") as string) || "",
    };

    try {
      const response = await fetch("/api/send-questionnaire", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...data,
          questionnaireId,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to send email");
      }

      setIsEmailSent(true);
      setOpen(false);
      toast.success(
        "The questionnaire has been sent to the patient successfully."
      );
    } catch (error) {
      console.error("Error sending email:", error);
      toast.error("Failed to send the questionnaire. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="w-full">
          <Send className="mr-2 h-4 w-4" />
          Send to Patient
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Send Questionnaire to Patient</DialogTitle>
          <DialogDescription>
            The questionnaire will be sent to the patient's email address.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSendEmail}>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="patient-name">Patient Name</Label>
              <Input
                id="patient-name"
                name="patient-name"
                placeholder="Enter patient name"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="patient-email">Patient Email</Label>
              <Input
                id="patient-email"
                name="patient-email"
                type="email"
                placeholder="Enter patient email"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="message">Additional Message (Optional)</Label>
              <Textarea
                id="message"
                name="message"
                placeholder="Add a personal message to the patient"
                className="min-h-[100px]"
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Sending..." : "Send Questionnaire"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
