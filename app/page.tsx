"use client";

import { useRef, useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  Code,
  Lightbulb,
  Users,
  CheckCircle,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import {
  motion,
  AnimatePresence,
  useInView,
  useScroll,
  useTransform,
} from "framer-motion";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Technology Card Component
function TechCard({ name, image, description }) {
  return (
    <div className="flex flex-col items-center text-center">
      <div className="relative h-20 w-20 mb-4">
        <Image
          src={image || "/placeholder.svg?height=80&width=80"}
          alt={name}
          fill
          className="object-contain"
        />
      </div>
      <h4 className="font-bold mb-1">{name}</h4>
      <p className="text-sm text-muted-foreground">{description}</p>
    </div>
  );
}

export default function HomePage() {
  // Hero carousel state
  const [currentSlide, setCurrentSlide] = useState(0);
  const heroSlides = [
    {
      title: "Innovating for a Better Tomorrow",
      subtitle: "Technology with Purpose",
      description:
        "We build cutting-edge solutions that transform industries and improve lives from our headquarters in Da Nang, Vietnam.",
      image: "/workshop/test34.jpg",
      gradient: "from-[#130D68]/10 via-[#2D2694]/5 to-transparent",
      cta: {
        primary: { text: "Explore Our Products", link: "/products" },
        secondary: { text: "Join Our Team", link: "/careers" },
      },
    },
    {
      title: "Transforming Ideas Into Reality",
      subtitle: "Creative Solutions",
      description:
        "Our team of experts combines creativity and technical excellence to deliver innovative solutions for complex challenges.",
      image: "/workshop/ws2/ws3.jpg",
      gradient: "from-[#130D68]/10 via-purple-500/5 to-transparent",
      cta: {
        primary: { text: "View Our Work", link: "/products" },
        secondary: { text: "Contact Us", link: "/contact" },
      },
    },
    {
      title: "Building Technology That Matters",
      subtitle: "Impact-Driven Development",
      description:
        "We're passionate about creating software that makes a real difference in people's lives and businesses.",
      image: "/workshop/ws2/ws5.jpg",
      gradient: "from-[#130D68]/10 via-blue-500/5 to-transparent",
      cta: {
        primary: { text: "Our Technology", link: "/products" },
        secondary: { text: "About Us", link: "/about" },
      },
    },
  ];

  // Auto-rotate carousel
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) =>
        prev === heroSlides.length - 1 ? 0 : prev + 1
      );
    }, 6000); // Change slide every 6 seconds

    return () => clearInterval(interval);
  }, [heroSlides.length]);

  // Manual navigation
  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === heroSlides.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? heroSlides.length - 1 : prev - 1));
  };

  const timelineRef = useRef(null);
  const reachingRef = useRef(null);
  const isTimelineInView = useInView(timelineRef, {
    once: true,
    margin: "-100px",
  });
  const isReachingInView = useInView(reachingRef, {
    once: true,
    margin: "-100px",
  });

  const { scrollYProgress } = useScroll();
  const heroOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.2], [1, 0.95]);

  // Counter animation for statistics
  const [counters, setCounters] = useState({
    years: 0,
    people: 0,
    projects: 0,
    clients: 0,
  });

  useEffect(() => {
    if (isReachingInView) {
      const duration = 2000; // 2 seconds
      const frameDuration = 1000 / 60; // 60fps
      const totalFrames = Math.round(duration / frameDuration);

      let frame = 0;
      const timer = setInterval(() => {
        frame++;
        const progress = frame / totalFrames;

        setCounters({
          years: Math.floor(progress * 11),
          people: Math.floor(progress * 230),
          projects: Math.floor(progress * 150),
          clients: Math.floor(progress * 80),
        });

        if (frame === totalFrames) {
          clearInterval(timer);
          setCounters({
            years: 11,
            people: 230,
            projects: 150,
            clients: 80,
          });
        }
      }, frameDuration);

      return () => clearInterval(timer);
    }
  }, [isReachingInView]);

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section Carousel */}
      <section className="relative w-full overflow-hidden">
        <AnimatePresence mode="wait">
          {heroSlides.map(
            (slide, index) =>
              index === currentSlide && (
                <motion.div
                  key={index}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.8 }}
                  className={`w-full py-16 md:py-24 lg:py-32 xl:py-40 bg-gradient-to-r ${slide.gradient}`}
                >
                  <div className="container px-4 md:px-6">
                    <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
                      <motion.div
                        className="flex flex-col justify-center space-y-4"
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                      >
                        <div className="space-y-2">
                          <h3 className="text-lg md:text-xl font-medium text-[#130D68] tracking-wide uppercase">
                            {slide.subtitle}
                          </h3>
                          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl xl:text-6xl/none bg-clip-text text-transparent bg-gradient-to-r from-[#130D68] to-[#2D2694]">
                            {slide.title}
                          </h1>
                          <p className="max-w-[600px] text-slate-700 md:text-xl font-light leading-relaxed">
                            {slide.description}
                          </p>
                        </div>
                        <motion.div
                          className="flex flex-col gap-2 min-[400px]:flex-row pt-4"
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.8, delay: 0.4 }}
                        >
                          <Button
                            asChild
                            className="text-base px-6 py-6 rounded-full"
                          >
                            <Link href={slide.cta.primary.link}>
                              {slide.cta.primary.text}
                            </Link>
                          </Button>
                          <Button
                            variant="outline"
                            asChild
                            className="text-base px-6 py-6 rounded-full"
                          >
                            <Link href={slide.cta.secondary.link}>
                              {slide.cta.secondary.text}
                            </Link>
                          </Button>
                        </motion.div>
                      </motion.div>
                      <motion.div
                        className="flex items-center justify-center"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                      >
                        <div className="relative h-[350px] w-[350px] sm:h-[400px] sm:w-[400px] lg:h-[500px] lg:w-[500px] rounded-2xl overflow-hidden shadow-2xl">
                          <Image
                            src={slide.image || "/placeholder.svg"}
                            alt={slide.title}
                            fill
                            className="object-cover"
                            priority
                          />
                        </div>
                      </motion.div>
                    </div>
                  </div>
                </motion.div>
              )
          )}
        </AnimatePresence>

        {/* Carousel Navigation */}
        <div className="absolute bottom-8 left-0 right-0 flex justify-center space-x-2 z-10">
          {heroSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`h-2 transition-all ${
                currentSlide === index ? "w-8 bg-[#130D68]" : "w-2 bg-gray-300"
              } rounded-full`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>

        {/* Arrow Navigation */}
        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white text-[#130D68] p-2 rounded-full shadow-lg z-10 hidden md:block"
          aria-label="Previous slide"
        >
          <ChevronLeft className="h-6 w-6" />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white text-[#130D68] p-2 rounded-full shadow-lg z-10 hidden md:block"
          aria-label="Next slide"
        >
          <ChevronRight className="h-6 w-6" />
        </button>
      </section>

      {/* Our Technology Section */}
      <section className="w-full py-16 md:py-24 bg-muted/20">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl bg-clip-text text-transparent bg-gradient-to-r from-[#130D68] to-[#2D2694]">
                Our Technology
              </h2>
              <p className="max-w-[900px] text-slate-700 md:text-xl">
                We leverage cutting-edge technologies to build innovative
                solutions
              </p>
            </div>
          </div>

          <Tabs defaultValue="frontend" className="w-full">
            <TabsList className="grid w-full grid-cols-4 mb-8">
              <TabsTrigger value="frontend">Frontend</TabsTrigger>
              <TabsTrigger value="backend">Backend</TabsTrigger>
              <TabsTrigger value="mobile">Mobile</TabsTrigger>
              <TabsTrigger value="cloud">Cloud & DevOps</TabsTrigger>
            </TabsList>

            <TabsContent value="frontend" className="space-y-4">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                <TechCard
                  name="React"
                  image="/tech-logos/react-logo.png"
                  description="Building interactive user interfaces with React and Next.js"
                />
                <TechCard
                  name="Vue.js"
                  image="/tech-logos/vuejs-logo.png"
                  description="Creating dynamic single-page applications"
                />
                <TechCard
                  name="TypeScript"
                  image="/tech-logos/typescript-logo.png"
                  description="Type-safe JavaScript for robust applications"
                />
                <TechCard
                  name="Tailwind CSS"
                  image="/tech-logos/tailwind-css-logo.png"
                  description="Utility-first CSS framework for rapid UI development"
                />
              </div>
              <div className="mt-8 space-y-4">
                <h3 className="text-xl font-bold text-[#130D68]">
                  Our Frontend Expertise
                </h3>
                <p className="text-slate-700">
                  Our frontend development team specializes in building
                  responsive, accessible, and performant user interfaces. We
                  follow modern best practices and leverage the latest
                  frameworks and tools to create exceptional user experiences.
                </p>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-4">
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-[#130D68] mr-2" />
                    <span>Single Page Applications (SPAs)</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-[#130D68] mr-2" />
                    <span>Server-Side Rendering (SSR)</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-[#130D68] mr-2" />
                    <span>Progressive Web Apps (PWAs)</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-[#130D68] mr-2" />
                    <span>Responsive & Mobile-First Design</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-[#130D68] mr-2" />
                    <span>Accessibility (WCAG) Compliance</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-[#130D68] mr-2" />
                    <span>Performance Optimization</span>
                  </li>
                </ul>
              </div>
            </TabsContent>

            <TabsContent value="backend" className="space-y-4">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                <TechCard
                  name="Node.js"
                  image="/tech-logos/nodejs.png"
                  description="Scalable server-side JavaScript runtime"
                />
                <TechCard
                  name="Python"
                  image="/python-logo.png"
                  description="Versatile language for web and data applications"
                />
                <TechCard
                  name="Java"
                  image="/tech-logos/java.png"
                  description="Enterprise-grade applications and microservices"
                />
                <TechCard
                  name="GraphQL"
                  image="/tech-logos/graphql.png"
                  description="Efficient API queries and data fetching"
                />
              </div>
              <div className="mt-8 space-y-4">
                <h3 className="text-xl font-bold text-[#130D68]">
                  Our Backend Expertise
                </h3>
                <p className="text-slate-700">
                  Our backend team builds robust, scalable, and secure
                  server-side applications that power modern digital
                  experiences. We design efficient APIs, optimize database
                  performance, and implement reliable authentication systems.
                </p>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-4">
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-[#130D68] mr-2" />
                    <span>RESTful API Development</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-[#130D68] mr-2" />
                    <span>Microservices Architecture</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-[#130D68] mr-2" />
                    <span>Database Design & Optimization</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-[#130D68] mr-2" />
                    <span>Authentication & Authorization</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-[#130D68] mr-2" />
                    <span>Real-time Data Processing</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-[#130D68] mr-2" />
                    <span>Serverless Functions</span>
                  </li>
                </ul>
              </div>
            </TabsContent>

            <TabsContent value="mobile" className="space-y-4">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                <TechCard
                  name="React Native"
                  image="/react-native-logo.png"
                  description="Cross-platform mobile app development"
                />
                <TechCard
                  name="Flutter"
                  image="/tech-logos/flutter.png"
                  description="Beautiful native apps from a single codebase"
                />
                <TechCard
                  name="Swift"
                  image="/swift-logo.png"
                  description="Native iOS app development"
                />
                <TechCard
                  name="Kotlin"
                  image="/tech-logos/kotlin.png"
                  description="Modern Android app development"
                />
              </div>
              <div className="mt-8 space-y-4">
                <h3 className="text-xl font-bold text-[#130D68]">
                  Our Mobile Expertise
                </h3>
                <p className="text-slate-700">
                  Our mobile development team creates engaging, high-performance
                  applications for iOS and Android platforms. We focus on
                  intuitive user experiences, offline capabilities, and seamless
                  integration with device features.
                </p>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-4">
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-[#130D68] mr-2" />
                    <span>Native App Development</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-[#130D68] mr-2" />
                    <span>Cross-platform Solutions</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-[#130D68] mr-2" />
                    <span>Responsive UI/UX Design</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-[#130D68] mr-2" />
                    <span>Push Notifications</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-[#130D68] mr-2" />
                    <span>Offline-first Architecture</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-[#130D68] mr-2" />
                    <span>App Store Optimization</span>
                  </li>
                </ul>
              </div>
            </TabsContent>

            <TabsContent value="cloud" className="space-y-4">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                <TechCard
                  name="AWS"
                  image="/tech-logos/aws.png"
                  description="Comprehensive cloud computing services"
                />
                <TechCard
                  name="Docker"
                  image="/tech-logos/docker.png"
                  description="Containerization for consistent deployments"
                />
                <TechCard
                  name="Kubernetes"
                  image="/tech-logos/kubernetes.png"
                  description="Container orchestration at scale"
                />
                <TechCard
                  name="CI/CD"
                  image="/tech-logos/cicd.png"
                  description="Automated testing and deployment pipelines"
                />
              </div>
              <div className="mt-8 space-y-4">
                <h3 className="text-xl font-bold text-[#130D68]">
                  Our Cloud & DevOps Expertise
                </h3>
                <p className="text-slate-700">
                  Our cloud and DevOps team ensures reliable, scalable, and
                  secure infrastructure for all applications. We implement best
                  practices for continuous integration, deployment, and
                  monitoring to deliver exceptional uptime and performance.
                </p>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-4">
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-[#130D68] mr-2" />
                    <span>Cloud Infrastructure Design</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-[#130D68] mr-2" />
                    <span>Infrastructure as Code (IaC)</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-[#130D68] mr-2" />
                    <span>Containerization & Orchestration</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-[#130D68] mr-2" />
                    <span>CI/CD Pipeline Implementation</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-[#130D68] mr-2" />
                    <span>Monitoring & Logging</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-[#130D68] mr-2" />
                    <span>Security & Compliance</span>
                  </li>
                </ul>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Reaching Statistics Section */}
      <section ref={reachingRef} className="w-full py-16 md:py-24 bg-white">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/6 mb-8 md:mb-0">
              <h2 className="text-[#130D68] font-bold text-5xl md:text-6xl tracking-tighter vertical-text">
                REACHING
              </h2>
            </div>
            <div className="md:w-5/6 grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4">
              <div className="text-center">
                <h3 className="text-[#130D68] text-5xl md:text-6xl font-light number-outline">
                  {counters.years}+
                </h3>
                <p className="mt-2 text-sm md:text-base font-medium">
                  YEARS ON MARKET
                </p>
              </div>
              <div className="text-center">
                <h3 className="text-[#130D68] text-5xl md:text-6xl font-light number-outline">
                  {counters.people}+
                </h3>
                <p className="mt-2 text-sm md:text-base font-medium">
                  PEOPLE ON BOARD
                </p>
              </div>
              <div className="text-center">
                <h3 className="text-[#130D68] text-5xl md:text-6xl font-light number-outline">
                  {counters.projects}+
                </h3>
                <p className="mt-2 text-sm md:text-base font-medium">
                  DELIVERED PROJECTS
                </p>
              </div>
              <div className="text-center">
                <h3 className="text-[#130D68] text-5xl md:text-6xl font-light number-outline">
                  {counters.clients}+
                </h3>
                <p className="mt-2 text-sm md:text-base font-medium">CLIENTS</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl bg-clip-text text-transparent bg-gradient-to-r from-[#130D68] to-[#2D2694]">
                What We Offer
              </h2>
              <p className="max-w-[900px] text-slate-700 md:text-xl">
                Discover our innovative solutions and company culture
              </p>
            </div>
          </div>
          <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 py-12 md:grid-cols-3">
            <Card className="bg-white hover:shadow-xl transition-shadow border-none">
              <CardHeader className="flex flex-row items-center gap-4 pb-2">
                <div className="rounded-full bg-[#130D68]/10 p-2">
                  <Code className="h-8 w-8 text-[#130D68]" />
                </div>
                <CardTitle className="text-xl text-[#130D68]">
                  Technology
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base text-slate-700">
                  Cutting-edge products and solutions that solve real-world
                  problems.
                </CardDescription>
                <Link
                  href="/products"
                  className="mt-4 inline-flex items-center text-sm font-medium text-[#130D68] hover:text-[#2D2694] transition-colors"
                >
                  View Products <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </CardContent>
            </Card>
            <Card className="bg-white hover:shadow-xl transition-shadow border-none">
              <CardHeader className="flex flex-row items-center gap-4 pb-2">
                <div className="rounded-full bg-[#130D68]/10 p-2">
                  <Lightbulb className="h-8 w-8 text-[#130D68]" />
                </div>
                <CardTitle className="text-xl text-[#130D68]">
                  Insights
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base text-slate-700">
                  Thought leadership and technical articles from our expert
                  team.
                </CardDescription>
                <Link
                  href="/blog"
                  className="mt-4 inline-flex items-center text-sm font-medium text-[#130D68] hover:text-[#2D2694] transition-colors"
                >
                  Read Blog <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </CardContent>
            </Card>
            <Card className="bg-white hover:shadow-xl transition-shadow border-none">
              <CardHeader className="flex flex-row items-center gap-4 pb-2">
                <div className="rounded-full bg-[#130D68]/10 p-2">
                  <Users className="h-8 w-8 text-[#130D68]" />
                </div>
                <CardTitle className="text-xl text-[#130D68]">
                  Culture
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base text-slate-700">
                  A vibrant workplace with events, hackathons, and community
                  involvement.
                </CardDescription>
                <Link
                  href="/activities"
                  className="mt-4 inline-flex items-center text-sm font-medium text-[#130D68] hover:text-[#2D2694] transition-colors"
                >
                  See Activities <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-r from-[#130D68] to-[#2D2694]">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl text-white">
                Join Our Team
              </h2>
              <p className="max-w-[900px] text-white/80 md:text-xl">
                We're looking for talented individuals to help us build the
                future
              </p>
            </div>
            <Button
              asChild
              className="mt-6 bg-white text-[#130D68] hover:bg-white/90 hover:text-[#130D68] text-base px-8 py-6 rounded-full"
            >
              <Link href="/careers">View Open Positions</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
