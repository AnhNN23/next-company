"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  ArrowRight,
  MapPin,
  Search,
  Briefcase,
  Clock,
  Building,
  DollarSign,
  GraduationCap,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

// Mock data for job listings
const jobListings = {
  engineering: [
    {
      id: "eng-1",
      title: "Junior Node.js Developer",
      location: "Da Nang",
      department: "Engineering",
      type: "Full-time",
      experience: "Minimum 1 year of experience",
      salary: "Negotiable",
      postedDate: "2025-05-10",
      description:
        "Develop and maintain scalable and secure APIs and web services using Node.js. Collaborate with cross-functional teams to ensure high-quality backend solutions that support the company's operations. Focus on performance, security, and continuous integration to optimize server-side applications and databases.",
      skills: [
        "Node.js",
        "Express",
        "MongoDB",
        "RESTful APIs",
        "JavaScript",
        "TypeScript",
        "Git",
        "Linux",
        "Data Structures",
        "Algorithms",
      ],
      featured: false,
      image: "/jobs/nodejs.webp",
    },
    {
      id: "eng-2",
      title: "Fresher/Junior Android Developer",
      location: "Da Nang",
      department: "Engineering",
      type: "Full-time",
      experience: "6+ months",
      salary: "Negotiable",
      postedDate: "2025-05-15",
      description:
        "Develop and maintain high-quality Android applications using Kotlin. Work closely with product managers, designers, and fellow developers to deliver efficient, user-friendly apps. Ensure performance and reliability through debugging, testing, and optimization. Integrate backend services using RESTful APIs and contribute to continuous improvement of mobile products.",
      skills: [
        "Kotlin",
        "Java",
        "Coroutines",
        "Retrofit",
        "Room",
        "RESTful APIs",
        "Lifecycle",
        "OOP",
        "Git",
        "In-App Billing",
        "Admob",
        "Analytics",
      ],
      featured: false,
      image: "/jobs/kotlin.png",
    },

    {
      id: "eng-3",
      title: "Fresher/Junior iOS Developer",
      location: "Da Nang",
      department: "Engineering",
      type: "Full-time",
      experience: "6+ months",
      salary: "Negotiable",
      postedDate: "2025-05-01",
      description:
        "Develop and maintain high-quality iOS applications using Swift, ensuring performance and user experience. Collaborate with designers and product managers to deliver optimized and efficient mobile apps. Integrate backend services via RESTful APIs and contribute to app updates and debugging.",
      skills: [
        "Swift",
        "Objective-C",
        "Alamofire",
        "Realm",
        "RESTful APIs",
        "Git",
        "RxSwift",
        "Combine",
        "Mobile App Debugging",
        "OOP",
        "Data Structures",
      ],
      featured: false,
      image: "/jobs/ios.jpg",
    },
  ],
  design: [
    {
      id: "design-1",
      title: "Fresher/Junior UI/UX Designer",
      location: "Da Nang",
      department: "Design",
      type: "Full-time",
      experience: "1-2 years",
      salary: "Negotiable",
      postedDate: "2025-05-20",
      description:
        "Design and optimize UI/UX for mobile applications (iOS/Android), ensuring intuitive user experiences and visual consistency. Collaborate with Marketing and Development teams to align design with business objectives and enhance user engagement.",
      skills: [
        "Figma",
        "Photoshop",
        "Illustrator",
        "Mobile UI/UX",
        "Design Principles",
        "Flat Design",
        "Material Design",
        "Creativity",
      ],
      featured: false,
      image: "/jobs/design.jpg",
    },
  ],
  marketing: [
    {
      id: "marketing-1",
      title: "Fresher/Junior/Middle UA Marketing",
      location: "Da Nang",
      department: "Marketing",
      type: "Full-time",
      experience: "1-3 years",
      salary: "Negotiable",
      postedDate: "2025-21-05",
      description:
        "Manage, optimize, and execute UA campaigns across Google Ads, Facebook Ads, and other networks. Monitor campaign metrics, analyze user behavior, and provide strategic insights to ensure continuous product growth.",
      skills: [
        "Google Ads",
        "Facebook Ads",
        "User Acquisition",
        "Data Analysis",
        "Performance Marketing",
        "Strategic Thinking",
        "English Communication",
      ],
      featured: false,
      image: "/jobs/makerting.jpg",
    },
  ],
};

// Flatten all jobs for search and filtering
const allJobs = Object.values(jobListings).flat();

// Get all unique locations, types, and experience levels
const allLocations = Array.from(new Set(allJobs.map((job) => job.location)));
const allTypes = Array.from(new Set(allJobs.map((job) => job.type)));
const allExperience = Array.from(new Set(allJobs.map((job) => job.experience)));

export default function CareersPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const [selectedExperience, setSelectedExperience] = useState("");
  const [showRemote, setShowRemote] = useState(false);
  const [filteredJobs, setFilteredJobs] = useState(allJobs);
  const [activeCategory, setActiveCategory] = useState("all");
  const [isLoading, setIsLoading] = useState(true);

  // Simulate loading state
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  // Filter jobs based on search term and filters
  useEffect(() => {
    let filtered = allJobs;

    // Filter by category
    if (activeCategory !== "all") {
      filtered = filtered.filter(
        (job) => job.department.toLowerCase() === activeCategory
      );
    }

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(
        (job) =>
          job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          job.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
          job.skills.some((skill) =>
            skill.toLowerCase().includes(searchTerm.toLowerCase())
          )
      );
    }

    // Filter by location
    if (selectedLocation) {
      filtered = filtered.filter((job) => job.location === selectedLocation);
    }

    // Filter by job type
    if (selectedType) {
      filtered = filtered.filter((job) => job.type === selectedType);
    }

    // Filter by experience
    if (selectedExperience) {
      filtered = filtered.filter(
        (job) => job.experience === selectedExperience
      );
    }

    // Filter by remote
    if (showRemote) {
      filtered = filtered.filter((job) =>
        job.location.toLowerCase().includes("remote")
      );
    }

    setFilteredJobs(filtered);
  }, [
    searchTerm,
    selectedLocation,
    selectedType,
    selectedExperience,
    showRemote,
    activeCategory,
  ]);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <div className="container py-12">
      <motion.div
        className="space-y-4 text-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl bg-clip-text text-transparent bg-gradient-to-r from-[#130D68] to-[#2D2694]">
          Join Our Team
        </h1>
        <p className="mx-auto max-w-[700px] text-slate-700 md:text-xl">
          We're looking for passionate individuals to help us build the future
        </p>
      </motion.div>

      {/* Company Culture Section */}
      <motion.div
        className="grid gap-8 py-12 md:grid-cols-3"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div variants={itemVariants}>
          <Card className="h-full border-none shadow-lg hover:shadow-xl transition-shadow bg-gradient-to-br from-white to-[#130D68]/5">
            <CardHeader className="pb-2">
              <div className="w-12 h-12 rounded-full bg-[#130D68]/10 flex items-center justify-center mb-4">
                <Briefcase className="h-6 w-6 text-[#130D68]" />
              </div>
              <CardTitle className="text-xl text-[#130D68]">
                Innovative Work
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-slate-700">
                Work on cutting-edge technology that solves real-world problems
                and makes a difference. We push the boundaries of what's
                possible.
              </p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={itemVariants}>
          <Card className="h-full border-none shadow-lg hover:shadow-xl transition-shadow bg-gradient-to-br from-white to-[#130D68]/5">
            <CardHeader className="pb-2">
              <div className="w-12 h-12 rounded-full bg-[#130D68]/10 flex items-center justify-center mb-4">
                <GraduationCap className="h-6 w-6 text-[#130D68]" />
              </div>
              <CardTitle className="text-xl text-[#130D68]">
                Growth & Learning
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-slate-700">
                Continuous learning opportunities, mentorship, and career
                development paths. We invest in your growth and success.
              </p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={itemVariants}>
          <Card className="h-full border-none shadow-lg hover:shadow-xl transition-shadow bg-gradient-to-br from-white to-[#130D68]/5">
            <CardHeader className="pb-2">
              <div className="w-12 h-12 rounded-full bg-[#130D68]/10 flex items-center justify-center mb-4">
                <Building className="h-6 w-6 text-[#130D68]" />
              </div>
              <CardTitle className="text-xl text-[#130D68]">
                Inclusive Culture
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-slate-700">
                A diverse and inclusive environment where everyone's voice is
                heard and valued. We celebrate our differences.
              </p>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>

      <Separator className="my-8" />

      {/* Search and Filters */}
      <motion.div
        className="space-y-6 mb-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <h2 className="text-2xl font-bold text-[#130D68]">
          Find Your Perfect Role
        </h2>

        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search jobs by title, skill, or keyword..."
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex flex-col sm:flex-row gap-4">
            <Select
              value={selectedLocation}
              onValueChange={setSelectedLocation}
            >
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="Location" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Locations</SelectItem>
                {allLocations.map((location) => (
                  <SelectItem key={location} value={location}>
                    {location}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={selectedType} onValueChange={setSelectedType}>
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="Job Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                {allTypes.map((type) => (
                  <SelectItem key={type} value={type}>
                    {type}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-4">
          <div className="flex items-center space-x-2">
            <Checkbox
              id="remote"
              checked={showRemote}
              onCheckedChange={setShowRemote}
            />
            <Label
              htmlFor="remote"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Remote Only
            </Label>
          </div>

          <Select
            value={selectedExperience}
            onValueChange={setSelectedExperience}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Experience Level" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Experience Levels</SelectItem>
              {allExperience.map((exp) => (
                <SelectItem key={exp} value={exp}>
                  {exp}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Button
            variant="outline"
            onClick={() => {
              setSearchTerm("");
              setSelectedLocation("");
              setSelectedType("");
              setSelectedExperience("");
              setShowRemote(false);
            }}
            className="ml-auto"
          >
            Clear Filters
          </Button>
        </div>
      </motion.div>

      <div className="space-y-8">
        <Tabs defaultValue="all" onValueChange={setActiveCategory}>
          <TabsList className="mb-8">
            <TabsTrigger value="all">All Positions</TabsTrigger>
            <TabsTrigger value="engineering">Engineering</TabsTrigger>
            <TabsTrigger value="design">Design</TabsTrigger>
            <TabsTrigger value="marketing">Marketing</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="space-y-6">
            {filteredJobs.length === 0 ? (
              <div className="text-center py-12">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-muted mb-4">
                  <Search className="h-8 w-8 text-muted-foreground" />
                </div>
                <h3 className="text-xl font-bold mb-2">No jobs found</h3>
                <p className="text-muted-foreground">
                  We couldn't find any jobs matching your criteria. Try
                  adjusting your filters.
                </p>
              </div>
            ) : (
              <motion.div
                className="grid gap-6"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
              >
                {filteredJobs.map((job) => (
                  <motion.div key={job.id} variants={itemVariants}>
                    <JobCard job={job} />
                  </motion.div>
                ))}
              </motion.div>
            )}
          </TabsContent>

          <TabsContent value="engineering" className="space-y-6">
            {filteredJobs.length === 0 ? (
              <div className="text-center py-12">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-muted mb-4">
                  <Search className="h-8 w-8 text-muted-foreground" />
                </div>
                <h3 className="text-xl font-bold mb-2">
                  No engineering jobs found
                </h3>
                <p className="text-muted-foreground">
                  We couldn't find any engineering jobs matching your criteria.
                  Try adjusting your filters.
                </p>
              </div>
            ) : (
              <motion.div
                className="grid gap-6"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
              >
                {filteredJobs
                  .filter(
                    (job) => job.department.toLowerCase() === "engineering"
                  )
                  .map((job) => (
                    <motion.div key={job.id} variants={itemVariants}>
                      <JobCard job={job} />
                    </motion.div>
                  ))}
              </motion.div>
            )}
          </TabsContent>

          <TabsContent value="design" className="space-y-6">
            {filteredJobs.length === 0 ? (
              <div className="text-center py-12">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-muted mb-4">
                  <Search className="h-8 w-8 text-muted-foreground" />
                </div>
                <h3 className="text-xl font-bold mb-2">No design jobs found</h3>
                <p className="text-muted-foreground">
                  We couldn't find any design jobs matching your criteria. Try
                  adjusting your filters.
                </p>
              </div>
            ) : (
              <motion.div
                className="grid gap-6"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
              >
                {filteredJobs
                  .filter((job) => job.department.toLowerCase() === "design")
                  .map((job) => (
                    <motion.div key={job.id} variants={itemVariants}>
                      <JobCard job={job} />
                    </motion.div>
                  ))}
              </motion.div>
            )}
          </TabsContent>

          <TabsContent value="marketing" className="space-y-6">
            {filteredJobs.length === 0 ? (
              <div className="text-center py-12">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-muted mb-4">
                  <Search className="h-8 w-8 text-muted-foreground" />
                </div>
                <h3 className="text-xl font-bold mb-2">
                  No marketing jobs found
                </h3>
                <p className="text-muted-foreground">
                  We couldn't find any marketing jobs matching your criteria.
                  Try adjusting your filters.
                </p>
              </div>
            ) : (
              <motion.div
                className="grid gap-6"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
              >
                {filteredJobs
                  .filter((job) => job.department.toLowerCase() === "marketing")
                  .map((job) => (
                    <motion.div key={job.id} variants={itemVariants}>
                      <JobCard job={job} />
                    </motion.div>
                  ))}
              </motion.div>
            )}
          </TabsContent>
        </Tabs>
      </div>

      {/* Recruitment Process Section */}
      <motion.div
        className="mt-20 bg-gradient-to-r from-[#130D68]/10 to-transparent rounded-lg p-8"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <h2 className="text-2xl font-bold mb-6 text-[#130D68]">
          Our Recruitment Process
        </h2>
        <div className="grid gap-8 md:grid-cols-3">
          <div className="flex flex-col items-center text-center">
            <div className="w-12 h-12 rounded-full bg-[#130D68] text-white flex items-center justify-center mb-4">
              1
            </div>
            <h3 className="font-bold mb-2">Scan CV</h3>
            <p className="text-sm text-slate-700">
              We carefully review your CV to evaluate your qualifications and
              fit.
            </p>
          </div>
          <div className="flex flex-col items-center text-center">
            <div className="w-12 h-12 rounded-full bg-[#130D68] text-white flex items-center justify-center mb-4">
              2
            </div>
            <h3 className="font-bold mb-2">Technical Interview</h3>
            <p className="text-sm text-slate-700">
              A deep dive into your technical skills and problem-solving
              abilities.
            </p>
          </div>
          <div className="flex flex-col items-center text-center">
            <div className="w-12 h-12 rounded-full bg-[#130D68] text-white flex items-center justify-center mb-4">
              3
            </div>
            <h3 className="font-bold mb-2">Cultural Interview with CEO</h3>
            <p className="text-sm text-slate-700">
              Meet with our CEO to discuss company culture and ensure mutual
              alignment.
            </p>
          </div>
        </div>
      </motion.div>

      {/* FAQ Section */}
      <motion.div
        className="mt-20"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <h2 className="text-2xl font-bold mb-6 text-[#130D68]">
          Frequently Asked Questions
        </h2>
        <div className="grid gap-6 md:grid-cols-2">
          <Card className="border-none shadow-lg">
            <CardHeader>
              <CardTitle className="text-lg text-[#130D68]">
                What is the interview process like?
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-slate-700">
                Our interview process typically consists of an initial screening
                call, a technical assessment, and final interviews with team
                members and leadership. The entire process usually takes 2-3
                weeks.
              </p>
            </CardContent>
          </Card>
          <Card className="border-none shadow-lg">
            <CardHeader>
              <CardTitle className="text-lg text-[#130D68]">
                Do you sponsor work visas?
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-slate-700">
                Yes, we do sponsor work visas for exceptional candidates. Please
                indicate in your application if you require visa sponsorship.
              </p>
            </CardContent>
          </Card>
          <Card className="border-none shadow-lg">
            <CardHeader>
              <CardTitle className="text-lg text-[#130D68]">
                What is your remote work policy?
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-slate-700">
                We offer flexible work arrangements, including fully remote,
                hybrid, or in-office options depending on the role and team. We
                have team members across multiple time zones and support
                asynchronous work.
              </p>
            </CardContent>
          </Card>
          <Card className="border-none shadow-lg">
            <CardHeader>
              <CardTitle className="text-lg text-[#130D68]">
                What benefits do you offer?
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-slate-700">
                We offer competitive compensation, health insurance, retirement
                plans, generous PTO, professional development budget, and more.
                We believe in taking care of our team members.
              </p>
            </CardContent>
          </Card>
        </div>
      </motion.div>

      {/* CTA Section */}
      <motion.div
        className="mt-20 text-center"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <h2 className="text-2xl font-bold mb-4 text-[#130D68]">
          Don't See the Right Fit?
        </h2>
        <p className="text-slate-700 mb-6 max-w-2xl mx-auto">
          We're always looking for talented individuals to join our team. Send
          us your resume and we'll keep you in mind for future opportunities.
        </p>
        <Button className="rounded-full" size="lg">
          Submit Your Resume
        </Button>
      </motion.div>
    </div>
  );
}

function JobCard({ job }) {
  // Determine badge variant based on department
  const getDepartmentBadge = (department) => {
    switch (department.toLowerCase()) {
      case "engineering":
        return "engineering";
      case "design":
        return "design";
      case "marketing":
        return "marketing";
      default:
        return "default";
    }
  };

  // Determine badge variant based on job type
  const getTypeBadge = (type) => {
    if (type.toLowerCase().includes("remote")) {
      return "remote";
    } else if (type.toLowerCase().includes("hybrid")) {
      return "hybrid";
    } else {
      return "fulltime";
    }
  };

  // Format date
  const formattedDate = new Date(job.postedDate).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  return (
    <Card className="overflow-hidden border-none shadow-lg hover:shadow-xl transition-all duration-300 bg-white">
      <div className="flex flex-col md:flex-row">
        <div className="md:w-2/3 p-6">
          <div className="flex flex-wrap items-center gap-2 mb-2">
            <Badge
              variant={getDepartmentBadge(job.department)}
              animation="glow"
            >
              {job.department}
            </Badge>
            <Badge variant={getTypeBadge(job.type)} animation="glow">
              {job.type}
            </Badge>
            {job.featured && (
              <Badge className="bg-yellow-500 text-white">Featured</Badge>
            )}
          </div>

          <h3 className="text-xl font-bold text-[#130D68] mb-2">{job.title}</h3>

          <div className="flex items-center text-muted-foreground mb-4">
            <MapPin className="mr-1 h-4 w-4" />
            <span className="text-sm">{job.location}</span>
          </div>

          <p className="text-slate-700 mb-4">{job.description}</p>

          <div className="flex flex-wrap gap-1 mb-4">
            {job.skills.map((skill) => (
              <span
                key={skill}
                className="inline-flex items-center rounded-full border border-[#130D68]/20 px-2.5 py-0.5 text-xs font-medium text-[#130D68] bg-[#130D68]/5"
              >
                {skill}
              </span>
            ))}
          </div>

          <div className="flex items-center justify-between mt-4">
            <div className="flex items-center gap-4">
              <div className="flex items-center text-muted-foreground">
                <Clock className="mr-1 h-4 w-4" />
                <span className="text-xs">Posted {formattedDate}</span>
              </div>
              <div className="flex items-center text-muted-foreground">
                <DollarSign className="mr-1 h-4 w-4" />
                <span className="text-xs">{job.salary}</span>
              </div>
            </div>

            <Button asChild size="sm" className="rounded-full">
              <Link href={`/careers/${job.id}`}>
                View Details <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>

        <div className="md:w-1/3 relative h-32 md:h-auto overflow-hidden">
          <Image
            src={job.image || "/placeholder.svg"}
            alt={job.title}
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-l from-transparent to-[#130D68]/20" />
        </div>
      </div>
    </Card>
  );
}

function FeaturedJobCard({ job }) {
  // Determine badge variant based on department
  const getDepartmentBadge = (department) => {
    switch (department.toLowerCase()) {
      case "engineering":
        return "engineering";
      case "design":
        return "design";
      case "marketing":
        return "marketing";
      default:
        return "default";
    }
  };

  return (
    <Card className="overflow-hidden border-none shadow-lg hover:shadow-xl transition-all duration-300 h-full bg-gradient-to-br from-white to-[#130D68]/5">
      <div className="relative h-40">
        <Image
          src={job.image || "/placeholder.svg"}
          alt={job.title}
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#130D68]/80 to-transparent" />
        <div className="absolute bottom-4 left-4">
          <Badge variant={getDepartmentBadge(job.department)} animation="glow">
            {job.department}
          </Badge>
        </div>
      </div>
      <CardHeader>
        <CardTitle className="text-xl text-[#130D68]">{job.title}</CardTitle>
        <CardDescription className="flex items-center">
          <MapPin className="mr-1 h-4 w-4" />
          {job.location}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-slate-700 mb-4 line-clamp-2">{job.description}</p>
        <div className="flex flex-wrap gap-1 mb-4">
          {job.skills.slice(0, 3).map((skill) => (
            <span
              key={skill}
              className="inline-flex items-center rounded-full border border-[#130D68]/20 px-2.5 py-0.5 text-xs font-medium text-[#130D68] bg-[#130D68]/5"
            >
              {skill}
            </span>
          ))}
          {job.skills.length > 3 && (
            <span className="inline-flex items-center rounded-full border border-[#130D68]/20 px-2.5 py-0.5 text-xs font-medium text-[#130D68] bg-[#130D68]/5">
              +{job.skills.length - 3} more
            </span>
          )}
        </div>
      </CardContent>
      <CardFooter>
        <Button asChild className="w-full rounded-full">
          <Link href={`/careers/${job.id}`}>
            View Details <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
