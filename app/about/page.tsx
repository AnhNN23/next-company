"use client"

import { useRef } from "react"
import Image from "next/image"
import { motion, useInView } from "framer-motion"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Mock data for team members
const teamMembers = [
  {
    name: "Sarah Johnson",
    role: "CEO & Co-Founder",
    bio: "Sarah has over 15 years of experience in the tech industry and previously led product teams at major tech companies.",
    image: "/placeholder.svg?height=300&width=300&query=professional woman CEO portrait",
  },
  {
    name: "Michael Chen",
    role: "CTO & Co-Founder",
    bio: "Michael is a seasoned technologist with expertise in scalable architecture and emerging technologies.",
    image: "/placeholder.svg?height=300&width=300&query=professional man CTO portrait",
  },
  {
    name: "Emily Rodriguez",
    role: "VP of Engineering",
    bio: "Emily leads our engineering team with a focus on innovation, quality, and developer experience.",
    image: "/placeholder.svg?height=300&width=300&query=professional woman VP portrait",
  },
  {
    name: "David Kim",
    role: "VP of Product",
    bio: "David shapes our product vision and strategy, ensuring we build solutions that solve real customer problems.",
    image: "/placeholder.svg?height=300&width=300&query=professional man product leader portrait",
  },
]

// Company values
const values = [
  {
    title: "Innovation",
    description: "We constantly push boundaries and explore new technologies to create breakthrough solutions.",
  },
  {
    title: "Excellence",
    description: "We strive for excellence in everything we do, from code quality to customer experience.",
  },
  {
    title: "Collaboration",
    description: "We believe in the power of teamwork and diverse perspectives to solve complex problems.",
  },
  {
    title: "Integrity",
    description: "We act with honesty, transparency, and ethical responsibility in all our interactions.",
  },
  {
    title: "Impact",
    description: "We measure our success by the positive impact we create for our customers and society.",
  },
]

// Company milestones
const milestones = [
  { year: 2018, title: "Company Founded", description: "Our journey began with a small team and a big vision." },
  {
    year: 2019,
    title: "First Product Launch",
    description: "We launched our flagship product to an enthusiastic market response.",
  },
  {
    year: 2020,
    title: "Series A Funding",
    description: "Secured $5M in Series A funding to accelerate growth and innovation.",
  },
  {
    year: 2021,
    title: "Team Expansion",
    description: "Grew our team to 50 talented individuals across engineering, design, and operations.",
  },
  {
    year: 2022,
    title: "International Expansion",
    description: "Opened our first international office to serve customers globally.",
  },
  {
    year: 2023,
    title: "Series B Funding",
    description: "Raised $20M to fuel our next phase of product development and market expansion.",
  },
]

export default function AboutPage() {
  return (
    <div className="container py-12">
      {/* Hero Section */}
      <section className="mb-16">
        <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
          <div className="space-y-4">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl">Our Story</h1>
            <p className="text-muted-foreground md:text-xl">
              Founded in 2018, our company was born from a simple idea: technology should make people's lives better.
              What started as a small team working out of a co-working space has grown into a global company with a
              mission to build innovative solutions that solve real-world problems.
            </p>
            <p className="text-muted-foreground md:text-xl">
              Today, we're proud to serve customers around the world with products that combine cutting-edge technology
              with thoughtful design and a deep understanding of user needs.
            </p>
          </div>
          <div className="relative h-[300px] sm:h-[400px] lg:h-[500px] rounded-lg overflow-hidden">
            <Image
              src="/placeholder.svg?height=500&width=800&query=modern tech office with diverse team"
              alt="Our team at work"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="mb-16">
        <div className="grid gap-6 md:grid-cols-2 md:gap-12">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">Our Mission</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-lg">
                To empower businesses and individuals with innovative technology solutions that solve complex problems
                and create meaningful impact.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">Our Vision</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-lg">
                A world where technology enhances human potential, fosters connection, and enables sustainable progress
                for all.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Values */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold mb-8 text-center">Our Values</h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {values.map((value, index) => (
            <AnimatedCard key={value.title} index={index}>
              <CardHeader>
                <CardTitle>{value.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p>{value.description}</p>
              </CardContent>
            </AnimatedCard>
          ))}
        </div>
      </section>

      {/* Leadership */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold mb-8 text-center">Our Leadership</h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {teamMembers.map((member, index) => (
            <AnimatedCard key={member.name} index={index}>
              <div className="relative h-64 w-full overflow-hidden rounded-t-lg">
                <Image src={member.image || "/placeholder.svg"} alt={member.name} fill className="object-cover" />
              </div>
              <CardHeader>
                <CardTitle>{member.name}</CardTitle>
                <CardDescription>{member.role}</CardDescription>
              </CardHeader>
              <CardContent>
                <p>{member.bio}</p>
              </CardContent>
            </AnimatedCard>
          ))}
        </div>
      </section>

      {/* Company History */}
      <section>
        <h2 className="text-3xl font-bold mb-8 text-center">Our Journey</h2>
        <Tabs defaultValue="timeline">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="timeline">Timeline</TabsTrigger>
            <TabsTrigger value="story">Our Story</TabsTrigger>
          </TabsList>
          <TabsContent value="timeline" className="mt-6">
            <div className="relative border-l border-muted-foreground/20 pl-6 ml-4">
              {milestones.map((milestone, index) => (
                <div key={milestone.year} className="mb-10 relative">
                  <div className="absolute -left-10 flex items-center justify-center w-6 h-6 rounded-full bg-primary text-primary-foreground">
                    {index + 1}
                  </div>
                  <h3 className="text-xl font-bold">
                    {milestone.year}: {milestone.title}
                  </h3>
                  <p className="mt-2 text-muted-foreground">{milestone.description}</p>
                </div>
              ))}
            </div>
          </TabsContent>
          <TabsContent value="story" className="mt-6">
            <div className="prose dark:prose-invert max-w-none">
              <p className="text-lg">
                Our journey began in 2018 when our founders, Sarah Johnson and Michael Chen, recognized a gap in the
                market for intuitive, powerful technology solutions that could help businesses transform their
                operations.
              </p>
              <p className="text-lg mt-4">
                After months of research and development, we launched our first product in 2019, which quickly gained
                traction among early adopters. This initial success allowed us to secure Series A funding in 2020,
                enabling us to expand our team and accelerate product development.
              </p>
              <p className="text-lg mt-4">
                Despite the challenges of the global pandemic, we continued to grow, focusing on building a remote-first
                culture that prioritized collaboration, innovation, and work-life balance. By 2021, our team had grown
                to 50 talented individuals across engineering, design, and operations.
              </p>
              <p className="text-lg mt-4">
                In 2022, we opened our first international office to better serve our growing global customer base. And
                in 2023, we secured $20M in Series B funding to fuel our next phase of growth and innovation.
              </p>
              <p className="text-lg mt-4">
                Today, we're proud to be a leader in our industry, with a diverse team of over 100 employees working
                together to build technology that makes a difference.
              </p>
            </div>
          </TabsContent>
        </Tabs>
      </section>
    </div>
  )
}

function AnimatedCard({ children, index }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <Card className="h-full">{children}</Card>
    </motion.div>
  )
}
