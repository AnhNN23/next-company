"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Check } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Mock data for products
const products = [
  {
    id: "product-1",
    name: "Ad Mod Management",
    tagline: "Seamless synchronization across all your devices",
    description:
      "Ad Mod Management ensures your data stays synchronized and secure across all platforms with real-time updates and end-to-end encryption.",
    features: [
      "Real-time data synchronization",
      "End-to-end encryption for security",
      "Offline access capability",
      "Comprehensive version history",
      "Cross-platform compatibility",
    ],
    image:
      "/product/admon.avif?height=400&width=600&query=cloud%20sync%20technology%20illustration",
    demoUrl: "#",
    caseStudyUrl: "#",
  },
  {
    id: "product-2",
    name: "Google Ads Management",
    tagline: "Turn complex data into powerful decisions",
    description:
      "Google Ads Management provides advanced data visualization tools to uncover trends, track performance, and make data-driven marketing decisions with ease.",
    features: [
      "Interactive and dynamic dashboards",
      "Customizable visualizations",
      "Seamless data integration",
      "Automated report generation",
      "AI-powered analytics and insights",
    ],
    image:
      "/product/googleads.jpg?height=400&width=600&query=data%20visualization%20dashboard",
    demoUrl: "#",
    caseStudyUrl: "#",
  },
];

// Mock data for case studies
const caseStudies = [
  {
    id: "case-1",
    title: "How TechCorp Improved Data Security with SecureAuth",
    company: "TechCorp Inc.",
    industry: "Technology",
    challenge:
      "TechCorp needed to strengthen their authentication system while maintaining a seamless user experience.",
    solution:
      "Implemented SecureAuth with SSO and adaptive MFA to balance security and usability.",
    results:
      "90% reduction in security incidents, 30% decrease in login-related support tickets.",
    image:
      "/product/test.jpeg?height=400&width=600&query=business meeting technology discussion",
  },
  {
    id: "case-2",
    title: "Global Retail Chain Transforms Data Analysis with DataViz Pro",
    company: "GlobalMart",
    industry: "Retail",
    challenge:
      "GlobalMart struggled to make sense of massive amounts of sales and inventory data across 500+ locations.",
    solution:
      "Deployed DataViz Pro to create unified dashboards and automated reporting workflows.",
    results:
      "Reduced reporting time by 75%, identified $2.3M in inventory optimization opportunities.",
    image:
      "/product/test2.png?height=400&width=600&query=retail data analysis dashboard",
  },
];

export default function ProductsPage() {
  const [activeProduct, setActiveProduct] = useState(products[0]);

  return (
    <div className="container py-12">
      <div className="space-y-4 text-center">
        <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl">
          Our Products
        </h1>
        <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
          Innovative solutions designed to solve real-world problems
        </p>
      </div>

      {/* Product Showcase */}
      <section className="mt-16">
        <Tabs
          defaultValue={products[0].id}
          onValueChange={(value) =>
            setActiveProduct(products.find((p) => p.id === value))
          }
          className="w-full"
        >
          <TabsList className="grid w-full grid-cols-2">
            {products.map((product) => (
              <TabsTrigger key={product.id} value={product.id}>
                {product.name}
              </TabsTrigger>
            ))}
          </TabsList>

          {products.map((product) => (
            <TabsContent key={product.id} value={product.id} className="mt-6">
              <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5 }}
                  className="space-y-4"
                >
                  <h2 className="text-3xl font-bold">{product.name}</h2>
                  <p className="text-xl text-muted-foreground">
                    {product.tagline}
                  </p>
                  <p className="text-muted-foreground">{product.description}</p>

                  <div className="space-y-2 mt-6">
                    <h3 className="font-medium">Key Features</h3>
                    <ul className="space-y-2">
                      {product.features.map((feature) => (
                        <li key={feature} className="flex items-start">
                          <Check className="mr-2 h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4 mt-6">
                    <Button asChild>
                      <Link href={product.demoUrl}>Request Demo</Link>
                    </Button>
                    <Button variant="outline" asChild>
                      <Link href={product.caseStudyUrl}>View Case Studies</Link>
                    </Button>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="relative h-[300px] sm:h-[400px] rounded-lg overflow-hidden"
                >
                  <Image
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
                    fill
                    className="object-cover"
                  />
                </motion.div>
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </section>

      {/* Case Studies */}
      <section className="mt-24">
        <div className="space-y-4 text-center mb-12">
          <h2 className="text-3xl font-bold">Case Studies</h2>
          <p className="mx-auto max-w-[700px] text-muted-foreground">
            See how our products have helped real businesses solve complex
            challenges
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {caseStudies.map((study) => (
            <Card key={study.id} className="overflow-hidden">
              <div className="relative h-48">
                <Image
                  src={study.image || "/placeholder.svg"}
                  alt={study.title}
                  fill
                  className="object-cover"
                />
              </div>
              <CardHeader>
                <CardTitle>{study.title}</CardTitle>
                <CardDescription>
                  {study.company} | {study.industry}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-medium">Challenge</h4>
                  <p className="text-sm text-muted-foreground">
                    {study.challenge}
                  </p>
                </div>
                <div>
                  <h4 className="font-medium">Solution</h4>
                  <p className="text-sm text-muted-foreground">
                    {study.solution}
                  </p>
                </div>
                <div>
                  <h4 className="font-medium">Results</h4>
                  <p className="text-sm text-muted-foreground">
                    {study.results}
                  </p>
                </div>
              </CardContent>
              <CardFooter></CardFooter>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}
