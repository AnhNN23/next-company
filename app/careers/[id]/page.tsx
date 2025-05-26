"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Briefcase,
  CalendarClock,
  MapPin,
  DollarSign,
  GraduationCap,
  Clock,
  Building,
  Users,
  CheckCircle,
  Share2,
  Bookmark,
  Heart,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { JobApplicationForm } from "@/components/job-application-form";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

// Mock data for job listings (in a real app, this would come from a database)
const jobListings = {
  "eng-1": {
    id: "eng-1",
    title: "Junior Node.js Developer",
    location: "Danang, Vietnam (Remote Available)",
    department: "Engineering",
    type: "Full-time",
    experience: "Minimum 1 year of experience",
    salary: "Negotiable",
    postedDate: "2025-05-10",
    description:
      "The organization needs this position to develop and maintain APIs and web applications that support the company's operations. This role is crucial in ensuring the backend services are scalable, efficient, and secure.",
    overview:
      "Our development team works collaboratively with product managers, designers, and other engineers to build high-quality APIs and web services. We focus on continuous integration, optimization, and deployment to ensure seamless application functionality.",
    responsibilities: [
      "Develop and maintain APIs for mobile and web applications using Node.js",
      "Deploy APIs to the company's servers and ensure seamless integration",
      "Build and maintain websites and backend services",
      "Design APIs following RESTful principles and best practices",
      "Optimize MongoDB databases for efficient data handling",
      "Work closely with frontend developers to ensure system compatibility",
      "Maintain high-quality coding standards and documentation",
    ],
    requirements: [
      "Minimum 1 year of experience in Node.js and Express framework development",
      "Strong understanding of MongoDB database management and optimization",
      "Experience in designing RESTful APIs",
      "Proficiency in JavaScript and TypeScript",
      "Good knowledge of data structures and algorithms",
      "Familiarity with Git version control and Linux environments",
      "Strong problem-solving and analytical skills",
      "Ability to write clean and maintainable code",
    ],
    preferred: [],
    benefits: [
      "Negotiable salary and performance-based bonuses",
      "Flexible working hours and remote options",
      "Professional development opportunities",
      "Team-building activities and retreats",
      "Supportive and inclusive team culture",
    ],
    skills: [
      "Node.js",
      "Express",
      "JavaScript",
      "TypeScript",
      "MongoDB",
      "REST API",
      "Git",
      "Linux",
    ],
    teamInfo: {
      name: "Backend Engineering",
      description:
        "Our development team works collaboratively with product managers, designers, and other engineers to build high-quality APIs and web services. We focus on continuous integration, optimization, and deployment to ensure seamless application functionality.",
      manager: "John Nguyen",
      managerTitle: "Engineering Lead",
      managerAvatar: "/manager-john.png",
      size: "10 engineers",
      projects: [
        "User Management API",
        "E-commerce Backend",
        "Internal Tools API",
      ],
    },
    companyValues: [
      "Innovation: We embrace modern technologies and efficient solutions.",
      "Teamwork: Collaboration and communication are at our core.",
      "Growth: We support learning and career development.",
      "Accountability: We take responsibility and deliver quality.",
      "Efficiency: We value scalable and maintainable code.",
    ],
    image: "/jobs/nodejs.webp",
    relatedJobs: ["eng-2", "eng-3"],
  },

  "eng-2": {
    id: "eng-2",
    title: "Android Developer",
    location: "Da Nang, Vietnam",
    department: "Engineering",
    type: "Full-time",
    experience: "6+ months",
    salary: "Negotiable",
    postedDate: "2023-06-15",
    description:
      "We're looking for a Fresher/Junior Android Developer to develop and maintain high-quality Android applications using Kotlin. This role is key to delivering efficient, optimized, and user-friendly mobile experiences.",
    overview:
      "As an Android Developer at InfinityGrowth, you will be responsible for building and optimizing Android applications that support the company's operations. You'll collaborate closely with designers, product managers, and other engineers to ensure the best mobile experience for our users.",
    responsibilities: [
      "Develop and optimize Android applications using Kotlin (Java is a plus)",
      "Collaborate with designers and product managers to define app functionalities",
      "Ensure application performance and quality through rigorous testing and debugging",
      "Identify and resolve potential app issues and bottlenecks",
      "Design and implement updates for existing applications",
      "Work with RESTful APIs to integrate backend services",
      "Maintain clean and structured code following best practices",
    ],
    requirements: [
      "Minimum 6 months of experience in Android development (Kotlin required, Java is a plus)",
      "Strong understanding of Coroutines, Retrofit, Room, Lifecycle, and RESTful API integration",
      "Experience with using third-party libraries in mobile app development",
      "Solid knowledge of data structures, algorithms, and object-oriented programming",
      "Proficiency in Git for version control",
      "Experience with testing, debugging, and performance optimization",
      "Strong problem-solving and analytical skills",
      "Good communication, teamwork, and problem-solving skills",
    ],
    preferred: [
      "Knowledge of In-App Billing, AdMob, and Analytics",
      "iOS development experience is an advantage",
    ],
    benefits: [
      "Working hours: Monday to Friday, 8:00 AM - 5:30 PM (lunch break from 12:00 PM - 1:30 PM)",
      "Competitive salary (negotiable based on experience)",
      "Company-provided laptop and work equipment",
      "Young, dynamic working environment",
      "Full social insurance and leave policies as per company regulations",
    ],
    skills: [
      "Kotlin",
      "Java",
      "Retrofit",
      "Room",
      "Coroutines",
      "Android Lifecycle",
      "RESTful APIs",
      "Git",
      "OOP",
    ],
    teamInfo: {
      name: "Mobile Development",
      description:
        "Our mobile development team collaborates with designers, product managers, and engineers to build and maintain high-quality Android applications. We emphasize clean code, smooth performance, and continuous improvement.",
      manager: "Trang Nguyen",
      managerTitle: "Mobile Team Lead",
      managerAvatar: "/android-lead-avatar.png",
      size: "7 engineers",
      projects: [
        "Customer Mobile App",
        "Internal Staff App",
        "Delivery Companion App",
      ],
    },
    companyValues: [
      "Innovation: We constantly push boundaries and explore new technologies.",
      "Excellence: We strive for excellence in everything we do.",
      "Collaboration: We believe in the power of teamwork and diverse perspectives.",
      "Integrity: We act with honesty, transparency, and ethical responsibility.",
      "Impact: We measure our success by the positive impact we create.",
    ],
    image: "/jobs/kotlin.png",
    relatedJobs: ["eng-1", "eng-3"],
  },

  "eng-3": {
    id: "eng-3",
    title: "iOS Developer",
    location: "Da Nang, Vietnam",
    department: "Engineering",
    type: "Full-time",
    experience: "6+ months",
    salary: "Negotiable",
    postedDate: "2025-05-23",
    description:
      "Join our mobile team to develop and maintain high-quality iOS applications using Swift.",
    overview:
      "As an iOS Developer, you'll work closely with designers, product managers, and other engineers to build user-friendly and efficient iOS applications that support our operations. You'll be responsible for developing new features, optimizing performance, and ensuring high-quality app experiences for our users.",
    responsibilities: [
      "Develop and optimize iOS applications using Swift (Objective-C is a plus)",
      "Collaborate with designers and product managers to define app functionalities",
      "Ensure application performance and quality through testing and debugging",
      "Identify and resolve issues, bugs, and performance bottlenecks",
      "Design and implement updates and new features for existing apps",
      "Integrate backend services using RESTful APIs",
      "Maintain clean, modular, and well-documented code",
    ],
    requirements: [
      "Minimum 6 months of experience in iOS development",
      "Proficiency in Swift (Objective-C is a plus)",
      "Experience with Alamofire, Realm, Lifecycle, and RESTful APIs",
      "Familiarity with using third-party libraries",
      "Strong understanding of data structures, algorithms, and OOP",
      "Proficiency with Git for version control",
      "Experience with debugging, testing, and performance tuning",
      "Good teamwork and communication skills",
    ],
    preferred: [
      "Experience with RxSwift or Combine",
      "Understanding of the iOS Human Interface Guidelines",
      "Basic knowledge of Android development",
    ],
    benefits: [
      "Competitive salary (negotiable based on experience)",
      "Working hours: Monday to Friday, 8:00 AM - 5:30 PM (lunch break 12:00 PM - 1:30 PM)",
      "Company-provided laptop and work equipment",
      "Young, dynamic working environment",
      "Full social insurance and leave policies as per regulations",
    ],
    skills: [
      "Swift",
      "Objective-C",
      "Alamofire",
      "Realm",
      "REST APIs",
      "RxSwift",
      "Combine",
      "Git",
    ],
    teamInfo: {
      name: "Mobile Development",
      description:
        "Our Mobile Development team builds and maintains high-performance mobile applications to support business operations. We work closely with cross-functional teams to deliver robust and scalable mobile solutions.",
      manager: "Linh Tran",
      managerTitle: "Mobile Team Lead",
      managerAvatar: "/ios-team-lead.png",
      size: "6 engineers",
      projects: [
        "Customer Mobile App",
        "Internal Operation Tools",
        "Mobile SDK Integration",
      ],
    },
    companyValues: [
      "Innovation: We embrace creativity and cutting-edge technologies.",
      "Excellence: We aim for the highest standards in every product we build.",
      "Teamwork: We achieve more through collaboration and support.",
      "Transparency: We communicate openly and honestly.",
      "Growth: We focus on continuous learning and improvement.",
    ],
    image: "/jobs/ios.jpg",
    relatedJobs: ["eng-1", "eng-2"],
  },

  "design-1": {
    id: "design-1",
    title: "UI/UX Designer",
    location: "Da Nang",
    department: "Design",
    type: "Full-time",
    experience: "Fresher/Junior",
    salary: "Negotiable",
    postedDate: "2025-05-23",
    description:
      "Design and optimize UI/UX for mobile applications, ensuring an intuitive and visually appealing user experience.",
    overview:
      "As a UI/UX Designer, you will be responsible for designing user interfaces and improving user experiences for our mobile applications. You’ll collaborate with cross-functional teams to ensure designs are consistent with brand and product goals. This role plays a key part in enhancing engagement and usability across our products.",
    responsibilities: [
      "Design UI/UX for mobile applications (iOS/Android) with a focus on usability and aesthetics",
      "Create icons, banners, and promotional visuals for mobile apps",
      "Collaborate with Marketing and Development teams to ensure design alignment with product objectives",
      "Conduct UI/UX research and analyze user behavior to inform design decisions",
      "Ensure design consistency and quality across different platforms",
      "Contribute to improving the overall design system and user experience strategy",
      "Execute additional design tasks as assigned by team leaders",
    ],
    requirements: [
      "1-2 years of experience in UI/UX design (or strong portfolio for fresher)",
      "Proficiency in Figma, Photoshop, and Illustrator",
      "Strong design fundamentals: color theory, typography, layout, and visual hierarchy",
      "Experience designing for mobile platforms (iOS and Android)",
      "Basic understanding of Flat Design and Material Design guidelines",
      "Creativity, fast learning ability, and attention to detail",
      "Ability to work independently and under pressure",
      "Strong communication and teamwork skills",
    ],
    preferred: [
      "Experience in mobile application publishing process",
      "Knowledge of HTML/CSS or interaction with developers is a plus",
      "Understanding of usability testing or design validation processes",
    ],
    benefits: [
      "Competitive salary (negotiable based on experience)",
      "Working hours: Monday to Friday, 8:00 AM - 5:30 PM (lunch break from 12:00 PM - 1:30 PM)",
      "Company-provided laptop and design tools",
      "Young, dynamic, and creative working environment",
      "Full social insurance and annual leave as per company regulations",
    ],
    skills: [
      "Figma",
      "Photoshop",
      "Illustrator",
      "Mobile UI/UX",
      "Design Thinking",
      "Wireframing",
      "Typography",
      "Material Design",
      "Flat Design",
    ],
    teamInfo: {
      name: "Product Design",
      description:
        "Our design team works closely with marketing and development to deliver seamless and visually pleasing experiences. We focus on innovation, usability, and consistency to craft compelling mobile user interfaces.",
      manager: "Minh Tran",
      managerTitle: "Lead Product Designer",
      managerAvatar:
        "/placeholder.svg?height=200&width=200&query=vietnamese man designer headshot",
      size: "5 designers",
      projects: ["Mobile App UI", "Marketing Assets", "User Flow Redesign"],
    },
    companyValues: [
      "Innovation: We embrace creativity and design with curiosity.",
      "Collaboration: Great design comes from shared ideas and feedback.",
      "Growth: We support continuous learning and experimentation.",
      "User-Centric: Every pixel we design is for our users.",
      "Quality: We believe in building experiences that are both functional and delightful.",
    ],
    image: "/jobs/design.jpg",
    relatedJobs: ["design-1", "design-2"],
  },
  "marketing-1": {
    id: "marketing-1",
    title: "UA Marketing Specialist",
    location: "Da Nang",
    department: "Marketing",
    type: "Full-time",
    experience: "1-3 years",
    salary: "Negotiable",
    postedDate: "2025-05-23",
    description:
      "Manage, optimize, and execute UA campaigns across Google Ads, Facebook Ads, and other networks to drive continuous growth.",
    overview:
      "As a UA Marketing Specialist, you will be responsible for developing, executing, and optimizing user acquisition campaigns on multiple digital advertising platforms. Working with a data-driven marketing team, you'll analyze campaign performance, collaborate with external partners, and contribute creative ideas to fuel product growth in a dynamic environment.",
    responsibilities: [
      "Develop, execute, and optimize UA campaigns on Google Ads, Facebook Ads, and other networks",
      "Monitor and analyze campaign performance metrics, user behavior, and engagement levels",
      "Provide strategic insights and recommendations to improve advertising effectiveness",
      "Collaborate with team leads and external partners (Google, Facebook, Unity) to refine strategies",
      "Contribute creative ideas to enhance the product",
      "Maintain a proactive mindset in solving digital marketing challenges",
    ],
    requirements: [
      "1-3 years of experience in digital marketing, especially in UA campaign management",
      "Proficiency in English for global campaign execution",
      "Data-driven mindset with excellent analytical skills",
      "Ability to work independently and collaborate effectively with the team",
      "Self-motivated and eager to learn",
      "Growth-oriented mindset and willingness to take on challenges",
    ],
    preferred: ["Experience with Facebook Ads and Google Ads platforms"],
    benefits: [
      "Working hours: Monday to Friday, 8:00 AM - 5:30 PM (lunch break from 12:00 PM - 1:30 PM)",
      "Competitive salary (negotiable based on experience)",
      "Company-provided laptop and work equipment",
      "Young, dynamic working environment",
      "Full social insurance and leave policies as per company regulations",
    ],
    skills: [
      "User Acquisition",
      "Google Ads",
      "Facebook Ads",
      "Performance Marketing",
      "Data Analysis",
      "Campaign Optimization",
    ],
    teamInfo: {
      name: "Marketing",
      description:
        "Our team is dynamic and data-driven, focused on performance marketing and user acquisition. We collaborate closely with partners like Google, Facebook, and Unity to drive successful marketing campaigns. We value innovation, teamwork, and data-backed decision-making to enhance product growth.",
      manager: "To Be Assigned",
      managerTitle: "Marketing Manager",
      managerAvatar:
        "/placeholder.svg?height=200&width=200&query=marketing professional headshot",
      size: "8 marketers",
      projects: [
        "User Acquisition",
        "Campaign Optimization",
        "Performance Marketing",
      ],
    },
    companyValues: [
      "Innovation: We constantly push boundaries and explore new technologies.",
      "Excellence: We strive for excellence in everything we do.",
      "Collaboration: We believe in the power of teamwork and diverse perspectives.",
      "Integrity: We act with honesty, transparency, and ethical responsibility.",
      "Impact: We measure our success by the positive impact we create.",
    ],
    image: "/jobs/makerting.jpg",
    relatedJobs: ["marketing-1", "marketing-2"],
  },
};

export default function JobDetailPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [showApplicationForm, setShowApplicationForm] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("overview");
  const [bookmarked, setBookmarked] = useState(false);
  const [liked, setLiked] = useState(false);

  // Simulate loading state
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  // Get job details based on ID
  const job = jobListings[params.id];

  // Handle case where job is not found
  if (!job) {
    return (
      <div className="container py-12 text-center">
        <h1 className="text-2xl font-bold mb-4">Job Not Found</h1>
        <p className="mb-6">
          The job posting you're looking for doesn't exist or has been removed.
        </p>
        <Button asChild>
          <Link href="/careers">View All Jobs</Link>
        </Button>
      </div>
    );
  }

  // Format date
  const formattedDate = new Date(job.postedDate).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  // Get related jobs
  const relatedJobsData = job.relatedJobs
    ? job.relatedJobs.map((id) => jobListings[id]).filter(Boolean)
    : [];

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

  return (
    <div className="container py-12">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Button variant="ghost" asChild className="mb-6 group">
          <Link href="/careers" className="flex items-center">
            <ArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
            Back to All Jobs
          </Link>
        </Button>
      </motion.div>

      {/* Hero Section */}
      <motion.div
        className="relative rounded-xl overflow-hidden mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <div className="relative h-[300px]">
          <Image
            src={job.image || "/placeholder.svg"}
            alt={job.title}
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#130D68]/90 via-[#130D68]/50 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
            <div className="flex flex-wrap items-center gap-2 mb-4">
              <Badge
                variant={getDepartmentBadge(job.department)}
                animation="glow"
                className="text-white border-white/20"
              >
                {job.department}
              </Badge>
              <Badge
                variant={getTypeBadge(job.type)}
                animation="glow"
                className="text-white border-white/20"
              >
                {job.type}
              </Badge>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold mb-2">{job.title}</h1>
            <div className="flex flex-wrap items-center gap-4 text-white/80">
              <div className="flex items-center">
                <MapPin className="mr-2 h-4 w-4" />
                {job.location}
              </div>
              <div className="flex items-center">
                <DollarSign className="mr-2 h-4 w-4" />
                {job.salary}
              </div>
              <div className="flex items-center">
                <GraduationCap className="mr-2 h-4 w-4" />
                {job.experience}
              </div>
              <div className="flex items-center">
                <CalendarClock className="mr-2 h-4 w-4" />
                Posted on {formattedDate}
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      <div className="grid gap-8 lg:grid-cols-3">
        {/* Main Content */}
        <motion.div
          className="lg:col-span-2 space-y-8"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Quick Actions */}
          <motion.div
            variants={itemVariants}
            className="flex items-center justify-between p-4 bg-muted/30 rounded-lg"
          >
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="sm"
                className={`flex items-center gap-2 ${
                  liked ? "text-red-500" : ""
                }`}
                onClick={() => setLiked(!liked)}
              >
                <Heart className="h-4 w-4" />
                <span>Save</span>
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className={`flex items-center gap-2 ${
                  bookmarked ? "text-[#130D68]" : ""
                }`}
                onClick={() => setBookmarked(!bookmarked)}
              >
                <Bookmark className="h-4 w-4" />
                <span>Bookmark</span>
              </Button>
            </div>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="flex items-center gap-2"
                  >
                    <Share2 className="h-4 w-4" />
                    <span>Share</span>
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Share this job posting</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </motion.div>

          {/* Job Overview */}
          <motion.div variants={itemVariants}>
            <Card className="border-none shadow-lg">
              <CardHeader>
                <CardTitle className="text-2xl text-[#130D68]">
                  Job Overview
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-700 leading-relaxed">{job.overview}</p>
              </CardContent>
            </Card>
          </motion.div>

          {/* Required Skills */}
          <motion.div variants={itemVariants}>
            <Card className="border-none shadow-lg">
              <CardHeader>
                <CardTitle className="text-xl text-[#130D68]">
                  Required Skills
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {job.skills.map((skill) => (
                    <div
                      key={skill}
                      className="px-3 py-1 rounded-full bg-[#130D68]/10 text-[#130D68] text-sm font-medium"
                    >
                      {skill}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Key Highlights */}
          <motion.div variants={itemVariants}>
            <Card className="border-none shadow-lg">
              <CardHeader>
                <CardTitle className="text-xl text-[#130D68]">
                  Key Highlights
                </CardTitle>
              </CardHeader>
              <CardContent className="grid gap-4 sm:grid-cols-2">
                <div className="flex items-start">
                  <div className="mr-2 mt-0.5">
                    <Building className="h-5 w-5 text-[#130D68]" />
                  </div>
                  <div>
                    <h3 className="font-medium">Department</h3>
                    <p className="text-sm text-slate-700">{job.department}</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="mr-2 mt-0.5">
                    <Briefcase className="h-5 w-5 text-[#130D68]" />
                  </div>
                  <div>
                    <h3 className="font-medium">Employment Type</h3>
                    <p className="text-sm text-slate-700">{job.type}</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="mr-2 mt-0.5">
                    <MapPin className="h-5 w-5 text-[#130D68]" />
                  </div>
                  <div>
                    <h3 className="font-medium">Location</h3>
                    <p className="text-sm text-slate-700">{job.location}</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="mr-2 mt-0.5">
                    <GraduationCap className="h-5 w-5 text-[#130D68]" />
                  </div>
                  <div>
                    <h3 className="font-medium">Experience</h3>
                    <p className="text-sm text-slate-700">{job.experience}</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="mr-2 mt-0.5">
                    <DollarSign className="h-5 w-5 text-[#130D68]" />
                  </div>
                  <div>
                    <h3 className="font-medium">Salary Range</h3>
                    <p className="text-sm text-slate-700">{job.salary}</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="mr-2 mt-0.5">
                    <Clock className="h-5 w-5 text-[#130D68]" />
                  </div>
                  <div>
                    <h3 className="font-medium">Posted Date</h3>
                    <p className="text-sm text-slate-700">{formattedDate}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Key Responsibilities */}
          <motion.div variants={itemVariants}>
            <Card className="border-none shadow-lg">
              <CardHeader>
                <CardTitle className="text-2xl text-[#130D68]">
                  Key Responsibilities
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-4">
                  {job.responsibilities.map((item, index) => (
                    <li key={index} className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-[#130D68] mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-slate-700">{item}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </motion.div>

          {/* Requirements */}
          <motion.div variants={itemVariants}>
            <Card className="border-none shadow-lg">
              <CardHeader>
                <CardTitle className="text-2xl text-[#130D68]">
                  Requirements
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-4">
                  {job.requirements.map((item, index) => (
                    <li key={index} className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-[#130D68] mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-slate-700">{item}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </motion.div>

          {/* Preferred Qualifications */}
          {job.preferred && (
            <motion.div variants={itemVariants}>
              <Card className="border-none shadow-lg">
                <CardHeader>
                  <CardTitle className="text-xl text-[#130D68]">
                    Preferred Qualifications
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-4">
                    {job.preferred.map((item, index) => (
                      <li key={index} className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-[#130D68]/70 mr-3 mt-0.5 flex-shrink-0" />
                        <span className="text-slate-700">{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {/* Benefits & Perks */}
          <motion.div variants={itemVariants}>
            <Card className="border-none shadow-lg">
              <CardHeader>
                <CardTitle className="text-2xl text-[#130D68]">
                  Benefits & Perks
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 sm:grid-cols-2">
                  {job.benefits.map((benefit, index) => (
                    <div key={index} className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-[#130D68] mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-slate-700">{benefit}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Company Values */}
          <motion.div variants={itemVariants}>
            <Card className="border-none shadow-lg">
              <CardHeader>
                <CardTitle className="text-xl text-[#130D68]">
                  Our Company Values
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-4">
                  {job.companyValues.map((value, index) => (
                    <li key={index} className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-[#130D68] mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-slate-700">{value}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>

        {/* Sidebar */}
        <div className="space-y-6">
          <Card className="border-none shadow-lg sticky top-24">
            <CardHeader>
              <CardTitle className="text-xl text-[#130D68]">
                Apply for this Position
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="w-full">
                <a
                  href="mailto:hr.limgrow@gmail.com"
                  className="w-full block mb-2"
                >
                  <Button className="w-full">Apply Now</Button>
                </a>
                <p className="text-sm text-gray-600">
                  Send your application to our HR department via email:{" "}
                  <a
                    href="mailto:hr.limgrow@gmail.com"
                    className="text-blue-600 font-medium hover:underline"
                  >
                    hr.limgrow@gmail.com
                  </a>
                </p>
              </div>
              <Separator />
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="mr-2 mt-0.5">
                    <Building className="h-5 w-5 text-[#130D68]" />
                  </div>
                  <div>
                    <h3 className="font-medium">Department</h3>
                    <p className="text-sm text-slate-700">{job.department}</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="mr-2 mt-0.5">
                    <Briefcase className="h-5 w-5 text-[#130D68]" />
                  </div>
                  <div>
                    <h3 className="font-medium">Employment Type</h3>
                    <p className="text-sm text-slate-700">{job.type}</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="mr-2 mt-0.5">
                    <MapPin className="h-5 w-5 text-[#130D68]" />
                  </div>
                  <div>
                    <h3 className="font-medium">Location</h3>
                    <p className="text-sm text-slate-700">{job.location}</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="mr-2 mt-0.5">
                    <GraduationCap className="h-5 w-5 text-[#130D68]" />
                  </div>
                  <div>
                    <h3 className="font-medium">Experience</h3>
                    <p className="text-sm text-slate-700">{job.experience}</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="mr-2 mt-0.5">
                    <DollarSign className="h-5 w-5 text-[#130D68]" />
                  </div>
                  <div>
                    <h3 className="font-medium">Salary Range</h3>
                    <p className="text-sm text-slate-700">{job.salary}</p>
                  </div>
                </div>
              </div>
              <Separator />
             
            </CardContent>
          </Card>

          {/* Related Jobs */}
          {relatedJobsData.length > 0 && (
            <Card className="border-none shadow-lg">
              <CardHeader>
                <CardTitle className="text-xl text-[#130D68]">
                  Similar Positions
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {relatedJobsData.map((relatedJob) => (
                  <Link
                    key={relatedJob.id}
                    href={`/careers/${relatedJob.id}`}
                    className="block p-4 rounded-lg hover:bg-muted/50 transition-colors"
                  >
                    <h3 className="font-medium text-[#130D68]">
                      {relatedJob.title}
                    </h3>
                    <div className="flex items-center text-muted-foreground text-sm mt-1">
                      <MapPin className="mr-1 h-3 w-3" />
                      <span>{relatedJob.location}</span>
                      <span className="mx-2">•</span>
                      <span>{relatedJob.type}</span>
                    </div>
                  </Link>
                ))}
              </CardContent>
            </Card>
          )}
        </div>
      </div>

      {/* Application Form Modal */}
      {showApplicationForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-card border rounded-lg shadow-lg max-w-3xl w-full max-h-[90vh] overflow-auto"
          >
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-[#130D68]">
                  Apply for {job.title}
                </h2>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowApplicationForm(false)}
                >
                  Close
                </Button>
              </div>
              <JobApplicationForm
                jobId={job.id}
                jobTitle={job.title}
                onClose={() => setShowApplicationForm(false)}
              />
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
