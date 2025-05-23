"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  CalendarIcon,
  Clock,
  Tag,
  Search,
  Code,
  ArrowRight,
  Filter,
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
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

// Update the mock data for blog posts to have appropriate content for each category
// Replace the entire blogPosts array with this updated version:

const blogPosts = [
  {
    id: 1,
    title: "Building Scalable Applications with Next.js",
    excerpt:
      "Learn how to build scalable and performant applications using Next.js and modern web technologies.",
    date: "2023-05-15",
    readTime: "8 min read",
    author: "Nhat Anh",
    authorRole: "Nodejs Developer",
    authorAvatar: "/blogs/nodedev.jpg",
    tags: ["Next.js", "React", "Performance"],
    image: "/blogs/nextjs.webp",
    category: "engineering",
    featured: true,
    codeSnippet: `
// Example of a Next.js API route
export default async function handler(req, res) {
  const { method } = req;

  switch (method) {
    case 'GET':
      try {
        const data = await fetchData();
        res.status(200).json({ success: true, data });
      } catch (error) {
        res.status(500).json({ success: false, error });
      }
      break;
    default:
      res.setHeader('Allow', ['GET']);
      res.status(405).end(\`Method \${method} Not Allowed\`);
  }
}`,
  },
  {
    id: 5,
    title: "Designing Intuitive User Interfaces: Principles and Best Practices",
    excerpt:
      "Key principles and techniques for creating user interfaces that are both beautiful and functional.",
    date: "2023-07-18",
    readTime: "9 min read",
    author: "Dat David",
    authorRole: "UI/UX Designer",
    authorAvatar:
      "/blogs/david.JPG?height=200&width=200&query=latina woman designer headshot",
    tags: ["Design", "UI/UX", "User Experience"],
    image:
      "/blogs/des11.jpg?height=400&width=600&query=colorful UI design wireframes",
    category: "design",
    featured: false,
    designContent: {
      type: "ui_mockup",
      description:
        "Modern dashboard interface with clean layout and intuitive navigation",
      imageUrl:
        "/blogs/des12.jpg?height=400&width=600&query=UI dashboard mockup with color palette",
    },
  },
  {
    id: 8,
    title: "Building a Successful Content Marketing Strategy",
    excerpt:
      "A step-by-step guide to developing and implementing an effective content marketing strategy.",
    date: "2023-06-30",
    readTime: "10 min read",
    author: "Quyen Tran",
    authorRole: "Content Marketing Manager",
    authorAvatar:
      "/blogs/mktem.jpg?height=200&width=200&query=man marketing professional headshot",
    tags: ["Marketing", "Content Strategy", "Digital Marketing"],
    image:
      "/blogs/mkt4.jpg?height=400&width=600&query=content marketing strategy diagram",
    category: "marketing",
    featured: false,
    marketingContent: {
      type: "strategy_chart",
      description:
        "Content marketing funnel showing stages from awareness to conversion",
      chartUrl:
        "/blogs/mkt5.png?height=400&width=600&query=marketing funnel diagram with metrics",
    },
  },
];

// Get all unique tags
const allTags = Array.from(new Set(blogPosts.flatMap((post) => post.tags)));

export default function BlogPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTags, setSelectedTags] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState(blogPosts.slice(1));
  const [featuredPost, setFeaturedPost] = useState(blogPosts[0]);
  const [isLoading, setIsLoading] = useState(true);

  // Simulate loading state
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  // Filter posts based on search term and selected tags
  useEffect(() => {
    const filtered = blogPosts
      .filter((post) => !post.featured)
      .filter((post) => {
        const matchesSearch =
          post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
          post.tags.some((tag) =>
            tag.toLowerCase().includes(searchTerm.toLowerCase())
          );

        const matchesTags =
          selectedTags.length === 0 ||
          selectedTags.some((tag) => post.tags.includes(tag));

        return matchesSearch && matchesTags;
      });

    setFilteredPosts(filtered);
  }, [searchTerm, selectedTags]);

  // Toggle tag selection
  const toggleTag = (tag) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

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
      {/* Header */}
      <motion.div
        className="space-y-4 text-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl bg-clip-text text-transparent bg-gradient-to-r from-[#130D68] to-[#2D2694]">
          Technology Blog
        </h1>
        <p className="mx-auto max-w-[700px] text-slate-700 md:text-xl">
          Insights, tutorials, and thought leadership from our team of experts
        </p>
      </motion.div>

      <Separator className="my-8" />

      {/* Featured Post */}
      <motion.div
        className="mb-12"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3 }}
      >
        <Card className="overflow-hidden border-none shadow-xl">
          <div className="md:grid md:grid-cols-2">
            <div className="relative h-64 md:h-full">
              <Image
                src={featuredPost.image || "/placeholder.svg"}
                alt={featuredPost.title}
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-[#130D68]/80 to-transparent md:bg-gradient-to-t md:from-[#130D68]/80 md:to-transparent" />
              <div className="absolute bottom-4 left-4 md:bottom-8 md:left-8">
                <Badge className="bg-white text-[#130D68] hover:bg-white/90">
                  Featured
                </Badge>
              </div>
            </div>
            <div className="p-6 md:p-8 bg-white">
              <CardHeader className="p-0 pb-4">
                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                  <CalendarIcon className="h-4 w-4" />
                  <span>{featuredPost.date}</span>
                  <span>•</span>
                  <Clock className="h-4 w-4" />
                  <span>{featuredPost.readTime}</span>
                </div>
                <CardTitle className="text-2xl md:text-3xl text-[#130D68]">
                  {featuredPost.title}
                </CardTitle>
                <CardDescription className="text-base mt-2 flex items-center gap-2">
                  <div className="relative h-8 w-8 rounded-full overflow-hidden">
                    <Image
                      src={featuredPost.authorAvatar || "/placeholder.svg"}
                      alt={featuredPost.author}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <span>
                    By{" "}
                    <span className="font-medium">{featuredPost.author}</span>,{" "}
                    {featuredPost.authorRole}
                  </span>
                </CardDescription>
              </CardHeader>
              <CardContent className="p-0 py-4">
                <p className="text-slate-700">{featuredPost.excerpt}</p>
                <div className="flex flex-wrap gap-2 mt-4">
                  {featuredPost.tags.map((tag) => (
                    <div
                      key={tag}
                      className="flex items-center rounded-full bg-muted px-3 py-1 text-sm"
                    >
                      <Tag className="mr-1 h-3 w-3" />
                      {tag}
                    </div>
                  ))}
                </div>

                {/* Code Snippet Preview */}
                <div className="mt-6 bg-slate-900 text-slate-50 rounded-lg p-4 text-xs overflow-hidden relative">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <Code className="h-4 w-4" />
                      <span>Code Snippet</span>
                    </div>
                    <div className="flex space-x-1">
                      <div className="h-2 w-2 rounded-full bg-red-500"></div>
                      <div className="h-2 w-2 rounded-full bg-yellow-500"></div>
                      <div className="h-2 w-2 rounded-full bg-green-500"></div>
                    </div>
                  </div>
                  <pre className="line-clamp-3">
                    <code>{featuredPost.codeSnippet}</code>
                  </pre>
                  <div className="absolute inset-x-0 bottom-0 h-8 bg-gradient-to-t from-slate-900 to-transparent"></div>
                </div>
              </CardContent>
              <CardFooter className="p-0 pt-4">
                <Button asChild className="rounded-full">
                  <Link href={`/blog/${featuredPost.id}`}>
                    Read Article <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardFooter>
            </div>
          </div>
        </Card>
      </motion.div>

      {/* Blog Categories */}
      <div className="space-y-8">
        <Tabs defaultValue="all" className="w-full">
          <TabsList className="mb-8">
            <TabsTrigger value="all">All Posts</TabsTrigger>
            <TabsTrigger value="engineering">Engineering</TabsTrigger>
            <TabsTrigger value="design">Design</TabsTrigger>
            <TabsTrigger value="marketing">Marketing</TabsTrigger>
          </TabsList>

          <TabsContent value="all">
            <h2 className="text-2xl font-bold mb-6 text-[#130D68]">
              All Articles
            </h2>
            <motion.div
              className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {filteredPosts.map((post) => (
                <motion.div key={post.id} variants={itemVariants}>
                  <BlogPostCard post={post} />
                </motion.div>
              ))}
            </motion.div>
          </TabsContent>

          <TabsContent value="engineering">
            <h2 className="text-2xl font-bold mb-6 text-[#130D68]">
              Engineering Articles
            </h2>
            <motion.div
              className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {filteredPosts
                .filter((post) => post.category === "engineering")
                .map((post) => (
                  <motion.div key={post.id} variants={itemVariants}>
                    <BlogPostCard post={post} />
                  </motion.div>
                ))}
            </motion.div>
          </TabsContent>

          <TabsContent value="design">
            <h2 className="text-2xl font-bold mb-6 text-[#130D68]">
              Design Articles
            </h2>
            <motion.div
              className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {filteredPosts
                .filter((post) => post.category === "design")
                .map((post) => (
                  <motion.div key={post.id} variants={itemVariants}>
                    <BlogPostCard post={post} />
                  </motion.div>
                ))}
            </motion.div>
          </TabsContent>

          <TabsContent value="marketing">
            <h2 className="text-2xl font-bold mb-6 text-[#130D68]">
              Marketing Articles
            </h2>
            <motion.div
              className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {filteredPosts
                .filter((post) => post.category === "marketing")
                .map((post) => (
                  <motion.div key={post.id} variants={itemVariants}>
                    <BlogPostCard post={post} />
                  </motion.div>
                ))}
            </motion.div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Newsletter Signup */}
      <motion.div
        className="mt-16 bg-gradient-to-r from-[#130D68]/10 to-transparent rounded-lg p-8 text-center"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <h2 className="text-2xl font-bold mb-4 text-[#130D68]">
          Subscribe to Our Newsletter
        </h2>
        <p className="text-slate-700 mb-6 max-w-2xl mx-auto">
          Stay updated with our latest articles, industry insights, and company
          news. We'll never spam your inbox!
        </p>
        <div className="flex max-w-md mx-auto gap-2">
          <Input
            type="email"
            placeholder="Enter your email"
            className="rounded-full"
          />
          <Button className="rounded-full">Subscribe</Button>
        </div>
      </motion.div>
    </div>
  );
}

function BlogPostCard({ post }) {
  return (
    <Card
      key={post.id}
      className="overflow-hidden flex flex-col h-full border-none shadow-lg hover:shadow-xl transition-shadow"
    >
      <div className="relative h-48 group">
        <Image
          src={post.image || "/placeholder.svg"}
          alt={post.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#130D68]/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <div className="absolute bottom-4 left-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <Badge className="bg-white text-[#130D68] hover:bg-white/90">
            {post.category}
          </Badge>
        </div>
      </div>
      <CardHeader>
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
          <CalendarIcon className="h-4 w-4" />
          <span>{post.date}</span>
          <span>•</span>
          <Clock className="h-4 w-4" />
          <span>{post.readTime}</span>
        </div>
        <CardTitle className="text-[#130D68]">{post.title}</CardTitle>
        <CardDescription className="flex items-center gap-2 mt-2">
          <div className="relative h-6 w-6 rounded-full overflow-hidden">
            <Image
              src={post.authorAvatar || "/placeholder.svg"}
              alt={post.author}
              fill
              className="object-cover"
            />
          </div>
          <span>By {post.author}</span>
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-grow">
        <p className="text-slate-700">{post.excerpt}</p>

        {/* Category-specific content preview */}
        {post.category === "engineering" && post.codeSnippet && (
          <div className="mt-4 bg-slate-900 text-slate-50 rounded-lg p-3 text-xs overflow-hidden relative h-24">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <Code className="h-3 w-3" />
                <span className="text-xs">Code Snippet</span>
              </div>
              <div className="flex space-x-1">
                <div className="h-1.5 w-1.5 rounded-full bg-red-500"></div>
                <div className="h-1.5 w-1.5 rounded-full bg-yellow-500"></div>
                <div className="h-1.5 w-1.5 rounded-full bg-green-500"></div>
              </div>
            </div>
            <pre className="line-clamp-2">
              <code>{post.codeSnippet}</code>
            </pre>
            <div className="absolute inset-x-0 bottom-0 h-8 bg-gradient-to-t from-slate-900 to-transparent"></div>
          </div>
        )}

        {post.category === "design" && post.designContent && (
          <div className="mt-4 border border-slate-200 rounded-lg p-3 text-xs overflow-hidden relative h-24">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="12"
                  height="12"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-palette"
                >
                  <circle cx="13.5" cy="6.5" r=".5" />
                  <circle cx="17.5" cy="10.5" r=".5" />
                  <circle cx="8.5" cy="7.5" r=".5" />
                  <circle cx="6.5" cy="12.5" r=".5" />
                  <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z" />
                </svg>
                <span className="text-xs">Design Preview</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="relative h-16 w-16 rounded overflow-hidden">
                <Image
                  src={post.designContent.imageUrl || "/placeholder.svg"}
                  alt={post.designContent.description}
                  fill
                  className="object-cover"
                />
              </div>
              <p className="text-xs line-clamp-3">
                {post.designContent.description}
              </p>
            </div>
          </div>
        )}

        {post.category === "marketing" && post.marketingContent && (
          <div className="mt-4 border border-slate-200 rounded-lg p-3 text-xs overflow-hidden relative h-24">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="12"
                  height="12"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-bar-chart"
                >
                  <line x1="12" x2="12" y1="20" y2="10" />
                  <line x1="18" x2="18" y1="20" y2="4" />
                  <line x1="6" x2="6" y1="20" y2="16" />
                </svg>
                <span className="text-xs">Marketing Insights</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="relative h-16 w-16 rounded overflow-hidden">
                <Image
                  src={post.marketingContent.chartUrl || "/placeholder.svg"}
                  alt={post.marketingContent.description}
                  fill
                  className="object-cover"
                />
              </div>
              <p className="text-xs line-clamp-3">
                {post.marketingContent.description}
              </p>
            </div>
          </div>
        )}

        <div className="flex flex-wrap gap-1.5 mt-4">
          {post.tags.slice(0, 2).map((tag) => (
            <div
              key={tag}
              className="flex items-center rounded-full bg-muted px-2 py-0.5 text-xs"
            >
              <Tag className="mr-1 h-2.5 w-2.5" />
              {tag}
            </div>
          ))}
          {post.tags.length > 2 && (
            <div className="flex items-center rounded-full bg-muted px-2 py-0.5 text-xs">
              +{post.tags.length - 2} more
            </div>
          )}
        </div>
      </CardContent>
      <CardFooter>
        <Button
          variant="outline"
          asChild
          className="w-full rounded-full hover:bg-[#130D68] hover:text-white transition-colors"
        >
          <Link href={`/blog/${post.id}`}>
            Read Article <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
