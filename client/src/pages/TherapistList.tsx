import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { Link } from "wouter";
import { Star, Search, Filter } from "lucide-react";
import { useState, useEffect } from "react";
import { therapists, filterTherapistsBySpecialty, filterTherapistsByAgeGroup } from "@/data/therapists";

export default function TherapistList() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredTherapists, setFilteredTherapists] = useState(therapists);
  const [activeSpecialty, setActiveSpecialty] = useState<string>("");
  const [activeAgeGroup, setActiveAgeGroup] = useState<string>("");
  const [filtersOpen, setFiltersOpen] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const specialty = params.get("specialty");
    const ageGroup = params.get("ageGroup");
    
    let filtered = therapists;
    
    if (specialty) {
      setActiveSpecialty(specialty);
      filtered = filterTherapistsBySpecialty(specialty);
    }
    
    if (ageGroup && (ageGroup === "children" || ageGroup === "teenagers" || ageGroup === "adults")) {
      setActiveAgeGroup(ageGroup);
      filtered = filtered.filter(t => t.ageGroups?.includes(ageGroup as "children" | "teenagers" | "adults"));
    }
    
    setFilteredTherapists(filtered);
  }, []);

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    let baseList = therapists;
    
    if (activeSpecialty) {
      baseList = filterTherapistsBySpecialty(activeSpecialty);
    }
    
    if (activeAgeGroup && (activeAgeGroup === "children" || activeAgeGroup === "teenagers" || activeAgeGroup === "adults")) {
      baseList = baseList.filter(t => t.ageGroups?.includes(activeAgeGroup as "children" | "teenagers" | "adults"));
    }
    
    const filtered = baseList.filter(
      (therapist) =>
        therapist.name.toLowerCase().includes(term.toLowerCase()) ||
        therapist.title.toLowerCase().includes(term.toLowerCase()) ||
        therapist.specializations.some((spec) =>
          spec.toLowerCase().includes(term.toLowerCase())
        )
    );
    setFilteredTherapists(filtered);
  };

  const applyFilter = (specialty?: string, ageGroup?: string) => {
    let filtered = therapists;

    if (specialty) {
      setActiveSpecialty(specialty);
      filtered = filterTherapistsBySpecialty(specialty);
    }

    if (ageGroup) {
      setActiveAgeGroup(ageGroup);
      filtered = filtered.filter((t) =>
        t.ageGroups?.includes(ageGroup as "children" | "teenagers" | "adults")
      );
    }

    setFilteredTherapists(filtered);
  };

  const clearFilters = () => {
    setActiveSpecialty("");
    setActiveAgeGroup("");
    setSearchTerm("");
    setFilteredTherapists(therapists);
    window.history.pushState({}, '', '/counselors/all');
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <div className="container mx-auto px-4 py-12 pt-24">
        <div className="mb-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
          <h1 className="text-4xl font-bold mb-4">Our Certified Therapists</h1>
          <p className="text-lg text-muted-foreground">
            Browse our network of licensed mental health professionals
          </p>
          {(activeSpecialty || activeAgeGroup) && (
            <div className="mt-4 flex flex-wrap gap-2 items-center">
              <span className="text-sm text-muted-foreground">Active filters:</span>
              {activeSpecialty && (
                <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded-full text-sm">
                  {activeSpecialty === "child-youth"
                    ? "Child & Youth Expert"
                    : activeSpecialty.charAt(0).toUpperCase() + activeSpecialty.slice(1)}
                </span>
              )}
              {activeAgeGroup && (
                <span className="px-3 py-1 bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 rounded-full text-sm">
                  {activeAgeGroup.charAt(0).toUpperCase() + activeAgeGroup.slice(1)}
                </span>
              )}
              <Button variant="ghost" size="sm" onClick={clearFilters}>
                Clear all
              </Button>
            </div>
          )}
        </div>

        {/* 🔽 Filter Controls Section */}
        <div className="flex flex-col md:flex-row gap-4 mb-6 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-150">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
            <Input
              placeholder="Search by name, specialty, or condition..."
              value={searchTerm}
              onChange={(e) => handleSearch(e.target.value)}
              className="pl-10"
            />
          </div>

          <div className="flex gap-2 items-center">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="flex items-center gap-2">
                  <Filter className="w-4 h-4" />
                  Specialty
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-48">
                <DropdownMenuItem onClick={() => applyFilter("therapist")}>
                  Therapist
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => applyFilter("psychiatrist")}>
                  Psychiatrist
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => applyFilter("child-youth")}>
                  Child & Youth
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => applyFilter("couples")}>
                  Couples & Family
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="flex items-center gap-2">
                  <Filter className="w-4 h-4" />
                  Age Group
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-48">
                <DropdownMenuItem onClick={() => applyFilter(activeSpecialty, "children")}>
                  Children
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => applyFilter(activeSpecialty, "teenagers")}>
                  Teenagers
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => applyFilter(activeSpecialty, "adults")}>
                  Adults
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        {/* 🧠 Therapist Cards */}
        <div className="grid gap-6 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-300">
          {filteredTherapists.map((therapist, index) => (
            <Card
              key={therapist.id}
              className="p-6 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 border border-border/50 backdrop-blur-sm"
              style={{ animationDelay: `${index * 80}ms` }}
            >
              <div className="flex flex-col md:flex-row gap-6">
                <img
                  src={therapist.image}
                  alt={therapist.name}
                  className="w-32 h-32 rounded-lg object-cover transition-transform duration-300 hover:scale-105 shadow-sm"
                />
                <div className="flex-1">
                  <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-3">
                    <div>
                      <h2 className="text-2xl font-bold">{therapist.name}</h2>
                      <p className="text-muted-foreground">{therapist.title}</p>
                      <p className="text-sm text-muted-foreground mt-1">
                        {therapist.experience} experience •{" "}
                        {therapist.language.join(", ")}
                      </p>
                    </div>
                    <div className="text-right mt-2 md:mt-0">
                      <div className="flex items-center gap-1 justify-end mb-1">
                        <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                        <span className="font-semibold text-lg">
                          {therapist.rating}
                        </span>
                        <span className="text-sm text-muted-foreground">
                          ({therapist.reviews} reviews)
                        </span>
                      </div>
                      <p className="text-2xl font-bold text-primary">
                        ${therapist.price}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        per session
                      </p>
                    </div>
                  </div>

                  <p className="text-muted-foreground mb-4">
                    {therapist.description}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {therapist.specializations.map((spec) => (
                      <span
                        key={spec}
                        className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded-full text-sm transition-transform hover:scale-105"
                      >
                        {spec}
                      </span>
                    ))}
                    <span
                      className={`px-3 py-1 rounded-full text-sm ${
                        therapist.available === "online"
                          ? "bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300"
                          : therapist.available === "physical"
                          ? "bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300"
                          : "bg-orange-100 dark:bg-orange-900 text-orange-700 dark:text-orange-300"
                      }`}
                    >
                      {therapist.available === "online"
                        ? "Online"
                        : therapist.available === "physical"
                        ? "In-Person"
                        : "Online & In-Person"}
                    </span>
                  </div>

                  <div className="flex gap-3">
                    <Link href={`/counselors/profile/${therapist.id}`}>
                      <Button variant="outline" className="hover:scale-105 transition-transform">
                        View Profile
                      </Button>
                    </Link>
                    <Link href={`/booking?therapist=${therapist.id}`}>
                      <Button className="hover:scale-105 transition-transform">
                        Book Now
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
}

