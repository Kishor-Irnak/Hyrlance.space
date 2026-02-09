"use client";

import { useState } from "react";
import { AppSidebar } from "@/components/app-sidebar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Upload, X } from "lucide-react";

const ROLES = [
  "Designer",
  "Developer",
  "Writer",
  "Marketer",
  "Consultant",
  "Video Editor",
  "Photographer",
  "Product Manager",
];

const SKILLS = [
  "UI/UX Design",
  "Web Development",
  "Mobile Development",
  "Content Writing",
  "SEO",
  "Social Media",
  "Branding",
  "Illustration",
  "Video Editing",
  "Photography",
  "Copywriting",
  "Data Analysis",
  "Product Strategy",
  "Project Management",
];

const COUNTRIES = [
  "United States",
  "United Kingdom",
  "Canada",
  "Australia",
  "Germany",
  "France",
  "India",
  "Singapore",
  "Netherlands",
  "Spain",
  "Brazil",
  "Japan",
];

const CURRENCIES = ["USD", "EUR", "GBP", "CAD", "AUD", "INR"];

export default function ProfilePage() {
  // Public Profile State
  const [displayName, setDisplayName] = useState("Ronald Richards");
  const [role, setRole] = useState("designer");
  const [bio, setBio] = useState(
    "Hi 👋, I'm Ronald, a passionate UX designer with 10 years of experience in creating intuitive and user-centered digital experiences.",
  );

  // Professional Information State
  const [mainSkill, setMainSkill] = useState("UI/UX Design");
  const [selectedSkills, setSelectedSkills] = useState<string[]>([
    "Web Development",
    "Branding",
  ]);
  const [country, setCountry] = useState("United States");
  const [city, setCity] = useState("San Francisco");
  const [availability, setAvailability] = useState("available");

  // Pricing State
  const [pricingType, setPricingType] = useState("hourly");
  const [startingPrice, setStartingPrice] = useState("75");
  const [currency, setCurrency] = useState("USD");

  const handleSkillSelect = (skill: string) => {
    if (selectedSkills.includes(skill)) {
      setSelectedSkills(selectedSkills.filter((s) => s !== skill));
    } else if (selectedSkills.length < 3) {
      setSelectedSkills([...selectedSkills, skill]);
    }
  };

  const removeSkill = (skill: string) => {
    setSelectedSkills(selectedSkills.filter((s) => s !== skill));
  };

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const handleSavePublicProfile = () => {
    // Handle save logic
    console.log("Saving public profile...");
  };

  const handleSaveProfessionalInfo = () => {
    // Handle save logic
    console.log("Saving professional info...");
  };

  const handleSavePricing = () => {
    // Handle save logic
    console.log("Saving pricing...");
  };

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator
              orientation="vertical"
              className="mr-2 data-[orientation=vertical]:h-4"
            />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbLink href="#">Settings</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbItem>
                  <BreadcrumbPage>Profile</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>

        <div className="flex flex-1 flex-col gap-6 p-4 pt-0 md:p-8 max-w-[1100px] mx-auto w-full">
          {/* Page Header */}
          <div className="space-y-0.5">
            <h2 className="text-2xl font-bold tracking-tight">Profile</h2>
            <p className="text-muted-foreground">
              Manage your public profile and professional details.
            </p>
          </div>
          <Separator />

          {/* Main Content Grid */}
          <div className="grid gap-6 lg:grid-cols-2">
            {/* Left Column */}
            <div className="space-y-6">
              {/* Card 1: Public Profile */}
              <Card className="border shadow-none">
                <CardHeader>
                  <CardTitle>Public Profile</CardTitle>
                  <CardDescription>This is how clients see you</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Profile Photo */}
                  <div className="flex items-start gap-4">
                    <Avatar className="h-20 w-20 border-2 border-border">
                      <AvatarImage src="" alt={displayName} />
                      <AvatarFallback className="text-xl font-semibold bg-muted">
                        {getInitials(displayName)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 space-y-2">
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        className="w-full sm:w-auto"
                      >
                        <Upload className="mr-2 h-4 w-4" />
                        Upload Photo
                      </Button>
                      <p className="text-xs text-muted-foreground">
                        JPG, PNG or GIF. Max 2MB.
                      </p>
                    </div>
                  </div>

                  {/* Display Name */}
                  <div className="space-y-2">
                    <Label htmlFor="displayName">Display Name</Label>
                    <Input
                      id="displayName"
                      value={displayName}
                      onChange={(e) => setDisplayName(e.target.value)}
                      placeholder="Your display name"
                    />
                  </div>

                  {/* Role */}
                  <div className="space-y-2">
                    <Label htmlFor="role">Role</Label>
                    <Select value={role} onValueChange={setRole}>
                      <SelectTrigger id="role">
                        <SelectValue placeholder="Select your role" />
                      </SelectTrigger>
                      <SelectContent>
                        {ROLES.map((r) => (
                          <SelectItem key={r} value={r.toLowerCase()}>
                            {r}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Short Bio */}
                  <div className="space-y-2">
                    <Label htmlFor="bio">Short Bio</Label>
                    <Textarea
                      id="bio"
                      value={bio}
                      onChange={(e) => {
                        if (e.target.value.length <= 160) {
                          setBio(e.target.value);
                        }
                      }}
                      placeholder="Tell clients about yourself..."
                      className="min-h-[100px] resize-none"
                    />
                    <div className="flex justify-between items-center">
                      <p className="text-xs text-muted-foreground">
                        Maximum 160 characters
                      </p>
                      <span
                        className={`text-xs ${
                          bio.length > 140
                            ? "text-destructive"
                            : "text-muted-foreground"
                        }`}
                      >
                        {bio.length}/160
                      </span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="border-t px-6 py-4">
                  <Button onClick={handleSavePublicProfile} className="ml-auto">
                    Save Public Profile
                  </Button>
                </CardFooter>
              </Card>

              {/* Card 3: Pricing */}
              <Card className="border shadow-none">
                <CardHeader>
                  <CardTitle>Pricing</CardTitle>
                  <CardDescription>
                    Visible to clients on your profile
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Pricing Type */}
                  <div className="space-y-3">
                    <Label>Pricing Type</Label>
                    <RadioGroup
                      value={pricingType}
                      onValueChange={setPricingType}
                      className="grid grid-cols-2 gap-4"
                    >
                      <div>
                        <RadioGroupItem
                          value="hourly"
                          id="hourly"
                          className="peer sr-only"
                        />
                        <Label
                          htmlFor="hourly"
                          className="flex flex-col items-center justify-center rounded-lg border-2 border-muted bg-card p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary cursor-pointer transition-all"
                        >
                          <span className="text-sm font-medium">
                            Hourly Rate
                          </span>
                        </Label>
                      </div>
                      <div>
                        <RadioGroupItem
                          value="project"
                          id="project"
                          className="peer sr-only"
                        />
                        <Label
                          htmlFor="project"
                          className="flex flex-col items-center justify-center rounded-lg border-2 border-muted bg-card p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary cursor-pointer transition-all"
                        >
                          <span className="text-sm font-medium">
                            Per Project
                          </span>
                        </Label>
                      </div>
                    </RadioGroup>
                  </div>

                  {/* Starting Price & Currency */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="startingPrice">Starting Price</Label>
                      <Input
                        id="startingPrice"
                        type="number"
                        value={startingPrice}
                        onChange={(e) => setStartingPrice(e.target.value)}
                        placeholder="75"
                        min="1"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="currency">Currency</Label>
                      <Select value={currency} onValueChange={setCurrency}>
                        <SelectTrigger id="currency">
                          <SelectValue placeholder="Select currency" />
                        </SelectTrigger>
                        <SelectContent>
                          {CURRENCIES.map((curr) => (
                            <SelectItem key={curr} value={curr}>
                              {curr}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="border-t px-6 py-4">
                  <Button onClick={handleSavePricing} className="ml-auto">
                    Save Pricing
                  </Button>
                </CardFooter>
              </Card>
            </div>

            {/* Right Column */}
            <div className="space-y-6">
              {/* Card 2: Professional Information */}
              <Card className="border shadow-none">
                <CardHeader>
                  <CardTitle>Professional Information</CardTitle>
                  <CardDescription>
                    Helps clients find and contact you
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Main Skill */}
                  <div className="space-y-2">
                    <Label htmlFor="mainSkill">Main Skill</Label>
                    <Select value={mainSkill} onValueChange={setMainSkill}>
                      <SelectTrigger id="mainSkill">
                        <SelectValue placeholder="Select your main skill" />
                      </SelectTrigger>
                      <SelectContent>
                        {SKILLS.map((skill) => (
                          <SelectItem key={skill} value={skill}>
                            {skill}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Additional Skills */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <Label>Additional Skills</Label>
                      <span className="text-xs text-muted-foreground">
                        {selectedSkills.length}/3 selected
                      </span>
                    </div>

                    {/* Selected Skills as Badges */}
                    {selectedSkills.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {selectedSkills.map((skill) => (
                          <Badge
                            key={skill}
                            variant="secondary"
                            className="pl-3 pr-2 py-1.5 text-sm"
                          >
                            {skill}
                            <button
                              type="button"
                              onClick={() => removeSkill(skill)}
                              className="ml-2 hover:text-destructive transition-colors"
                            >
                              <X className="h-3 w-3" />
                            </button>
                          </Badge>
                        ))}
                      </div>
                    )}

                    {/* Skill Selection */}
                    <Select
                      value=""
                      onValueChange={handleSkillSelect}
                      disabled={selectedSkills.length >= 3}
                    >
                      <SelectTrigger>
                        <SelectValue
                          placeholder={
                            selectedSkills.length >= 3
                              ? "Maximum 3 skills selected"
                              : "Add a skill"
                          }
                        />
                      </SelectTrigger>
                      <SelectContent>
                        {SKILLS.filter(
                          (s) => s !== mainSkill && !selectedSkills.includes(s),
                        ).map((skill) => (
                          <SelectItem key={skill} value={skill}>
                            {skill}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Location */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="country">Country</Label>
                      <Select value={country} onValueChange={setCountry}>
                        <SelectTrigger id="country">
                          <SelectValue placeholder="Select country" />
                        </SelectTrigger>
                        <SelectContent>
                          {COUNTRIES.map((c) => (
                            <SelectItem key={c} value={c}>
                              {c}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="city">City</Label>
                      <Input
                        id="city"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        placeholder="Your city"
                      />
                    </div>
                  </div>

                  {/* Availability */}
                  <div className="space-y-3">
                    <Label>Availability</Label>
                    <RadioGroup
                      value={availability}
                      onValueChange={setAvailability}
                      className="grid grid-cols-2 gap-4"
                    >
                      <div>
                        <RadioGroupItem
                          value="available"
                          id="available"
                          className="peer sr-only"
                        />
                        <Label
                          htmlFor="available"
                          className="flex flex-col items-center justify-center rounded-lg border-2 border-muted bg-card p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary cursor-pointer transition-all"
                        >
                          <span className="text-sm font-medium">Available</span>
                        </Label>
                      </div>
                      <div>
                        <RadioGroupItem
                          value="busy"
                          id="busy"
                          className="peer sr-only"
                        />
                        <Label
                          htmlFor="busy"
                          className="flex flex-col items-center justify-center rounded-lg border-2 border-muted bg-card p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary cursor-pointer transition-all"
                        >
                          <span className="text-sm font-medium">Busy</span>
                        </Label>
                      </div>
                    </RadioGroup>
                  </div>
                </CardContent>
                <CardFooter className="border-t px-6 py-4">
                  <Button
                    onClick={handleSaveProfessionalInfo}
                    className="ml-auto"
                  >
                    Save Professional Info
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
