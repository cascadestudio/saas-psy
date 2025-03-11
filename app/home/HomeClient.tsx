"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Search, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";

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
  },
  {
    id: 2,
    title: "Hamilton Anxiety Rating Scale (HAM-A)",
    description:
      "A psychological questionnaire used to rate the severity of a patient's anxiety",
    category: "Anxiety",
    questions: 14,
    estimatedTime: "10-15 minutes",
  },
  {
    id: 3,
    title: "ADHD Rating Scale",
    description:
      "A questionnaire used to evaluate symptoms of attention-deficit/hyperactivity disorder",
    category: "ADHD",
    questions: 18,
    estimatedTime: "5-10 minutes",
  },
  {
    id: 4,
    title: "Pittsburgh Sleep Quality Index (PSQI)",
    description:
      "A self-report questionnaire that assesses sleep quality over a one-month interval",
    category: "Sleep",
    questions: 19,
    estimatedTime: "5-10 minutes",
  },
  {
    id: 5,
    title: "Generalized Anxiety Disorder 7 (GAD-7)",
    description:
      "A self-reported questionnaire for screening and severity measuring of generalized anxiety disorder",
    category: "Anxiety",
    questions: 7,
    estimatedTime: "2-5 minutes",
  },
  {
    id: 6,
    title: "Patient Health Questionnaire (PHQ-9)",
    description:
      "A multipurpose instrument for screening, diagnosing, monitoring and measuring the severity of depression",
    category: "Depression",
    questions: 9,
    estimatedTime: "2-5 minutes",
  },
];

// Get unique categories for filter
const categories = Array.from(new Set(questionnaires.map((q) => q.category)));

export default function Home() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [filteredQuestionnaires, setFilteredQuestionnaires] =
    useState(questionnaires);

  // Filter questionnaires when search term or selected categories change
  useEffect(() => {
    const filtered = questionnaires.filter((questionnaire) => {
      const matchesSearch =
        searchTerm === "" ||
        questionnaire.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        questionnaire.description
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        questionnaire.category.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesCategory =
        selectedCategories.length === 0 ||
        selectedCategories.includes(questionnaire.category);

      return matchesSearch && matchesCategory;
    });

    setFilteredQuestionnaires(filtered);
  }, [searchTerm, selectedCategories]);

  // Toggle category selection
  const toggleCategory = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };

  // Clear all filters
  const clearFilters = () => {
    setSearchTerm("");
    setSelectedCategories([]);
  };

  return (
    <div className="container mx-auto py-8 px-4 sm:px-6 md:px-8">
      <h1 className="text-3xl font-bold mb-8">Psychological Questionnaires</h1>

      <div className="flex flex-col sm:flex-row gap-4 mb-8">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search questionnaires..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          {searchTerm && (
            <button
              className="absolute right-2.5 top-2.5 h-4 w-4 text-muted-foreground hover:text-foreground"
              onClick={() => setSearchTerm("")}
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>
        <div className="flex gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">
                Filter by Category
                {selectedCategories.length > 0 && (
                  <Badge variant="secondary" className="ml-2">
                    {selectedCategories.length}
                  </Badge>
                )}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              {categories.map((category) => (
                <DropdownMenuCheckboxItem
                  key={category}
                  checked={selectedCategories.includes(category)}
                  onCheckedChange={() => toggleCategory(category)}
                >
                  {category}
                </DropdownMenuCheckboxItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          {(searchTerm || selectedCategories.length > 0) && (
            <Button variant="ghost" onClick={clearFilters}>
              Clear
            </Button>
          )}
        </div>
      </div>

      {filteredQuestionnaires.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-lg text-muted-foreground">
            No questionnaires found matching your criteria.
          </p>
          <Button variant="link" onClick={clearFilters}>
            Clear filters
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredQuestionnaires.map((questionnaire) => (
            <Card key={questionnaire.id} className="flex flex-col">
              <CardHeader>
                <div className="text-sm text-muted-foreground mb-1">
                  {questionnaire.category}
                </div>
                <CardTitle>{questionnaire.title}</CardTitle>
                <CardDescription className="line-clamp-2">
                  {questionnaire.description}
                </CardDescription>
              </CardHeader>
              <CardContent className="flex-grow">
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>{questionnaire.questions} questions</span>
                  <span>{questionnaire.estimatedTime}</span>
                </div>
              </CardContent>
              <CardFooter>
                <Link
                  href={`/questionnaire/${questionnaire.id}`}
                  className="w-full"
                >
                  <Button className="w-full">View Details</Button>
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
