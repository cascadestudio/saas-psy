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
import { questionnaires } from "@/app/data";

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
      <div className="flex flex-col sm:flex-row gap-4 mb-8">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Rechercher des questionnaires..."
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
                Filtrer par Catégorie
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
              Effacer
            </Button>
          )}
        </div>
      </div>

      {filteredQuestionnaires.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-lg text-muted-foreground">
            Aucun questionnaire ne correspond à vos critères.
          </p>
          <Button variant="link" onClick={clearFilters}>
            Effacer les filtres
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
                  href={`/questionnaire/description/${questionnaire.id}`}
                  className="w-full"
                >
                  <Button className="w-full">Voir les détails</Button>
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
