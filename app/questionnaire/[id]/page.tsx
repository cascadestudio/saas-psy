"use client";

import type React from "react";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Clock, FileText, Send } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
// Sample questionnaire data
const questionnaires = [
  {
    id: 1,
    title: "Beck Depression Inventory (BDI)",
    description:
      "A 21-question multiple-choice self-report inventory for measuring the severity of depression",
    category: "Depression",
    questions: 21,
    estimatedTime: "10-15 minutes",
    longDescription:
      "The Beck Depression Inventory (BDI) is a 21-question multiple-choice self-report inventory, one of the most widely used psychometric tests for measuring the severity of depression. Its development marked a shift among mental health professionals, who had until then, viewed depression from a psychodynamic perspective, instead of it being rooted in the patient's own thoughts. The BDI is widely used as an assessment tool by healthcare professionals and researchers in a variety of settings.",
    sampleQuestions: [
      "Sadness",
      "Pessimism",
      "Past Failure",
      "Loss of Pleasure",
      "Guilty Feelings",
    ],
  },
  {
    id: 2,
    title: "Hamilton Anxiety Rating Scale (HAM-A)",
    description:
      "A psychological questionnaire used to rate the severity of a patient's anxiety",
    category: "Anxiety",
    questions: 14,
    estimatedTime: "10-15 minutes",
    longDescription:
      "The Hamilton Anxiety Rating Scale (HAM-A) is a psychological questionnaire used by clinicians to rate the severity of a patient's anxiety. Anxiety can refer to things such as \"a mental state... a drive... a response to a particular situation... a personality trait... and a psychiatric disorder.\" The scale consists of 14 items designed to assess the severity of a patient's anxiety. Each item is scored on a 5-point scale, ranging from 0 (not present) to 4 (severe).",
    sampleQuestions: [
      "Anxious mood",
      "Tension",
      "Fears",
      "Insomnia",
      "Intellectual",
    ],
  },
  {
    id: 3,
    title: "ADHD Rating Scale",
    description:
      "A questionnaire used to evaluate symptoms of attention-deficit/hyperactivity disorder",
    category: "ADHD",
    questions: 18,
    estimatedTime: "5-10 minutes",
    longDescription:
      "The ADHD Rating Scale is a parent-report or teacher-report inventory created by George J. DuPaul, Thomas J. Power, Arthur D. Anastopoulos, and Robert Reid. It was first published in 1998 and is currently in its fifth edition, the ADHD Rating Scale-5. It is used to help diagnose attention deficit hyperactivity disorder (ADHD) in children aged 5–17. The questionnaire consists of 18 questions that are directly related to the DSM diagnostic criteria for ADHD.",
    sampleQuestions: [
      "Fails to give close attention to details or makes careless mistakes",
      "Fidgets with hands or feet or squirms in seat",
      "Has difficulty sustaining attention in tasks or play activities",
      "Leaves seat in classroom or in other situations in which remaining seated is expected",
      "Does not seem to listen when spoken to directly",
    ],
  },
  {
    id: 4,
    title: "Pittsburgh Sleep Quality Index (PSQI)",
    description:
      "A self-report questionnaire that assesses sleep quality over a one-month interval",
    category: "Sleep",
    questions: 19,
    estimatedTime: "5-10 minutes",
    longDescription:
      "The Pittsburgh Sleep Quality Index (PSQI) is a self-report questionnaire that assesses sleep quality over a 1-month time interval. The measure consists of 19 individual items, creating 7 components that produce one global score. The PSQI is intended to be a standardized measure of sleep quality to help clinicians easily identify good and poor sleepers. It has been translated into 56 languages and has been used in a wide range of population-based and clinical studies.",
    sampleQuestions: [
      "During the past month, when have you usually gone to bed?",
      "How long (in minutes) has it taken you to fall asleep each night?",
      "When have you usually gotten up in the morning?",
      "How many hours of actual sleep did you get at night?",
      "How would you rate your sleep quality overall?",
    ],
  },
  {
    id: 5,
    title: "Generalized Anxiety Disorder 7 (GAD-7)",
    description:
      "A self-reported questionnaire for screening and severity measuring of generalized anxiety disorder",
    category: "Anxiety",
    questions: 7,
    estimatedTime: "2-5 minutes",
    longDescription:
      "The Generalized Anxiety Disorder 7 (GAD-7) is a self-reported questionnaire for screening and severity measuring of generalized anxiety disorder (GAD). The GAD-7 has seven items, which measure severity of various signs of GAD according to reported response categories with assigned points. Assessment is indicated by the total score, which is made up by adding together the scores for the scale all seven items.",
    sampleQuestions: [
      "Feeling nervous, anxious, or on edge",
      "Not being able to stop or control worrying",
      "Worrying too much about different things",
      "Trouble relaxing",
      "Being so restless that it's hard to sit still",
    ],
  },
  {
    id: 6,
    title: "Patient Health Questionnaire (PHQ-9)",
    description:
      "A multipurpose instrument for screening, diagnosing, monitoring and measuring the severity of depression",
    category: "Depression",
    questions: 9,
    estimatedTime: "2-5 minutes",
    longDescription:
      "The Patient Health Questionnaire (PHQ-9) is a 9-question instrument given to patients in a primary care setting to screen for the presence and severity of depression. It is the 9-item depression scale from the Patient Health Questionnaire (PHQ). The results of the PHQ-9 may be used to make a depression diagnosis according to DSM-IV criteria and takes less than 3 minutes to complete.",
    sampleQuestions: [
      "Little interest or pleasure in doing things",
      "Feeling down, depressed, or hopeless",
      "Trouble falling or staying asleep, or sleeping too much",
      "Feeling tired or having little energy",
      "Poor appetite or overeating",
    ],
  },
];

interface PageProps {
  params: {
    id: string;
  };
  searchParams: { [key: string]: string | string[] | undefined };
}

export default function QuestionnairePage({ params }: PageProps) {
  const [isEmailSent, setIsEmailSent] = useState(false);

  const id = Number.parseInt(params.id);
  const questionnaire = questionnaires.find((q) => q.id === id);

  if (!questionnaire) {
    return (
      <div className="container mx-auto py-8 px-4 sm:px-6 md:px-8">
        Questionnaire not found
      </div>
    );
  }

  const handleSendEmail = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // In a real app, this would send the email
    setIsEmailSent(true);
    toast("The questionnaire has been sent to the patient successfully.");
  };

  return (
    <div className="container mx-auto py-8 px-4 sm:px-6 md:px-8">
      <Link href="/" className="flex items-center text-sm mb-6 hover:underline">
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to questionnaires
      </Link>

      <Card className="mb-8">
        <CardHeader>
          <div className="text-sm text-muted-foreground mb-1">
            {questionnaire.category}
          </div>
          <CardTitle className="text-2xl">{questionnaire.title}</CardTitle>
          <CardDescription>{questionnaire.description}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center gap-6">
            <div className="flex items-center">
              <FileText className="h-5 w-5 mr-2 text-muted-foreground" />
              <span>{questionnaire.questions} questions</span>
            </div>
            <div className="flex items-center">
              <Clock className="h-5 w-5 mr-2 text-muted-foreground" />
              <span>{questionnaire.estimatedTime}</span>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-medium mb-2">Description</h3>
            <p className="text-muted-foreground">
              {questionnaire.longDescription}
            </p>
          </div>

          <div>
            <h3 className="text-lg font-medium mb-2">Sample Questions</h3>
            <ul className="list-disc pl-5 text-muted-foreground">
              {questionnaire.sampleQuestions.map((question, index) => (
                <li key={index} className="mb-1">
                  {question}
                </li>
              ))}
            </ul>
          </div>
        </CardContent>
        <CardFooter>
          <Dialog>
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
                      placeholder="Enter patient name"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="patient-email">Patient Email</Label>
                    <Input
                      id="patient-email"
                      type="email"
                      placeholder="Enter patient email"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="message">
                      Additional Message (Optional)
                    </Label>
                    <Textarea
                      id="message"
                      placeholder="Add a personal message to the patient"
                      className="min-h-[100px]"
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button type="submit">Send Questionnaire</Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </CardFooter>
      </Card>
    </div>
  );
}
