"use client"
import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { ArrowLeft, Calendar, Clock, Tag, User, ThumbsUp, Bookmark, Copy, Check, Code, FileText } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

// Mock data for blog posts
const blogPosts = {
  "1": {
    id: 1,
    title: "Building Scalable Applications with Next.js",
    excerpt: "Learn how to build scalable and performant applications using Next.js and modern web technologies.",
    content: `
      <div class="blog-content">
        <p class="lead">Next.js has become one of the most popular frameworks for building React applications, and for good reason. It provides a powerful set of features that make it ideal for building scalable, performant web applications.</p>
        
        <h2 class="blog-heading">Why Next.js?</h2>
        
        <p>Next.js offers several key advantages that make it an excellent choice for modern web development:</p>
        
        <ul class="feature-list">
          <li><strong>Server-Side Rendering (SSR)</strong>: Next.js allows you to render your React components on the server before sending them to the client. This improves performance and SEO.</li>
          <li><strong>Static Site Generation (SSG)</strong>: You can pre-render pages at build time, resulting in fast page loads and better user experience.</li>
          <li><strong>Incremental Static Regeneration (ISR)</strong>: This feature allows you to update static content after you've built your site, combining the benefits of static generation with dynamic data.</li>
          <li><strong>API Routes</strong>: Next.js makes it easy to create API endpoints as part of your application, simplifying your backend needs.</li>
          <li><strong>File-based Routing</strong>: The framework uses a file-system based router, making it intuitive to create new routes and pages.</li>
        </ul>
        
        <div class="info-box">
          <h3>Did you know?</h3>
          <p>Next.js was created by Vercel (formerly Zeit) and was first released in October 2016. Since then, it has become one of the most popular React frameworks with over 100,000 stars on GitHub.</p>
        </div>
        
        <h2 class="blog-heading">Building for Scale</h2>
        
        <p>When building applications that need to scale, there are several best practices to keep in mind:</p>
        
        <h3 class="blog-subheading">1. Optimize Your Data Fetching</h3>
        <p>Choose the right data fetching strategy for each page and component in your application. Next.js provides several methods:</p>
        <ul>
          <li><strong>getStaticProps</strong>: Fetch data at build time</li>
          <li><strong>getStaticPaths</strong>: Specify dynamic routes to pre-render based on data</li>
          <li><strong>getServerSideProps</strong>: Fetch data on each request</li>
          <li><strong>Incremental Static Regeneration</strong>: Update static pages after they've been built</li>
        </ul>
        
        <div class="code-reference">
          <p>Example of using getStaticProps:</p>
          <pre><code>
export async function getStaticProps() {
  const res = await fetch('https://api.example.com/data')
  const data = await res.json()
  
  return {
    props: { data },
    revalidate: 60 // Regenerate page every 60 seconds
  }
}
          </code></pre>
        </div>
        
        <h3 class="blog-subheading">2. Implement Caching Strategies</h3>
        <p>Effective caching can significantly improve performance and reduce server load:</p>
        <ul>
          <li>Use CDN caching for static assets</li>
          <li>Implement browser caching with appropriate cache headers</li>
          <li>Consider using a caching layer like Redis for database queries</li>
          <li>Utilize SWR or React Query for client-side data fetching with built-in caching</li>
        </ul>
        
        <div class="tip-box">
          <h4>Pro Tip</h4>
          <p>When using SWR for data fetching, you can combine it with ISR to create a hybrid approach that gives users the most up-to-date data while still benefiting from static generation.</p>
        </div>
        
        <h3 class="blog-subheading">3. Code Splitting and Lazy Loading</h3>
        <p>Next.js automatically splits your code by pages, but you can further optimize by:</p>
        <ul>
          <li>Using dynamic imports for components that aren't immediately needed</li>
          <li>Implementing lazy loading for images and other heavy assets</li>
          <li>Splitting your application into smaller, more manageable chunks</li>
        </ul>
        
        <div class="code-reference">
          <p>Example of dynamic imports:</p>
          <pre><code>
import dynamic from 'next/dynamic'

const DynamicComponent = dynamic(() => import('../components/heavy-component'), {
  loading: () => <p>Loading...</p>,
  ssr: false // Disable server-side rendering
})
          </code></pre>
        </div>
        
        <h2 class="blog-heading">Conclusion</h2>
        
        <p>Building scalable applications with Next.js involves leveraging its built-in features while following best practices for performance optimization. By choosing the right data fetching methods, implementing effective caching strategies, and utilizing code splitting, you can create applications that perform well even as they grow in complexity and user base.</p>
        
        <div class="author-note">
          <p>This article is part of our series on modern web development. Check out our other articles on React, TypeScript, and web performance optimization.</p>
        </div>
      </div>
    `,
    date: "2023-05-15",
    readTime: "8 min read",
    author: "Nhat Anh",
    authorRole: "Node.js Developer",
    authorBio:
      "Nhat Anh is a junior engineer with over 2 years of experience in frontend development. She specializes in React, Next.js, and performance optimization.",
    authorAvatar: "/blogs/nodedev.jpg",
    tags: ["Next.js", "React", "Performance"],
    image: "/blogs/nextjs.webp",
    relatedPosts: [2, 3],
    category: "engineering",
    codeSnippets: [
      {
        title: "Next.js API Route Example",
        language: "javascript",
        code: `// pages/api/data.js
export default async function handler(req, res) {
  const { method } = req;

  switch (method) {
    case 'GET':
      try {
        const data = await fetchData();
        res.status(200).json({ success: true, data });
      } catch (error) {
        res.status(500).json({ success: false, error: error.message });
      }
      break;
    default:
      res.setHeader('Allow', ['GET']);
      res.status(405).end(\`Method \${method} Not Allowed\`);
  }
}`,
      },
      {
        title: "Implementing getStaticProps",
        language: "javascript",
        code: `// pages/blog/[slug].js
export async function getStaticProps({ params }) {
  const post = await getPostBySlug(params.slug);
  
  return {
    props: {
      post,
    },
    // Re-generate the post at most once per 10 seconds
    // if a request comes in
    revalidate: 10,
  };
}

export async function getStaticPaths() {
  const posts = await getAllPosts();
  
  return {
    paths: posts.map((post) => ({
      params: { slug: post.slug },
    })),
    fallback: 'blocking',
  };
}`,
      },
      {
        title: "Optimizing Images with next/image",
        language: "jsx",
        code: `import Image from 'next/image';

function BlogHeader() {
  return (
    <div className="relative h-96 w-full">
      <Image
        src="/blog-header.jpg"
        alt="Blog Header"
        fill
        priority
        className="object-cover"
        sizes="(max-width: 768px) 100vw, 1200px"
      />
    </div>
  );
}`,
      },
    ],
  },
  "5": {
    id: 5,
    title: "Designing Intuitive User Interfaces: Principles and Best Practices",
    excerpt: "Key principles and techniques for creating user interfaces that are both beautiful and functional.",
    content: `
      <div class="blog-content">
        <p class="lead">Creating intuitive user interfaces is both an art and a science. It requires a deep understanding of user behavior, design principles, and technical constraints. In this article, we'll explore key principles and best practices for designing interfaces that are both beautiful and functional.</p>
        
        <h2 class="blog-heading">Core Principles of Intuitive UI Design</h2>
        
        <div class="principle-grid">
          <div class="principle-card">
            <div class="principle-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" class="lucide lucide-lightbulb"><path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5"/><path d="M9 18h6"/><path d="M10 22h4"/></svg>
            </div>
            <h3>Clarity</h3>
            <p>The interface should be clear and self-explanatory. Users should understand what elements are interactive and what will happen when they interact with them.</p>
          </div>
          
          <div class="principle-card">
            <div class="principle-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" class="lucide lucide-repeat"><path d="m17 2 4 4-4 4"/><path d="M3 11v-1a4 4 0 0 1 4-4h14"/><path d="m7 22-4-4 4-4"/><path d="M21 13v1a4 4 0 0 1-4 4H3"/></svg>
            </div>
            <h3>Consistency</h3>
            <p>Use consistent patterns, elements, and behaviors throughout your interface to reduce the learning curve.</p>
          </div>
          
          <div class="principle-card">
            <div class="principle-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" class="lucide lucide-message-square"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
            </div>
            <h3>Feedback</h3>
            <p>Provide immediate and clear feedback for user actions to confirm that the system has recognized their input.</p>
          </div>
          
          <div class="principle-card">
            <div class="principle-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" class="lucide lucide-zap"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>
            </div>
            <h3>Efficiency</h3>
            <p>Design for efficiency by minimizing the steps required to complete common tasks.</p>
          </div>
          
          <div class="principle-card">
            <div class="principle-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" class="lucide lucide-undo-2"><path d="M9 14 4 9l5-5"/><path d="M4 9h10.5a5.5 5.5 0 0 1 5.5 5.5v0a5.5 5.5 0 0 1-5.5 5.5H11"/></svg>
            </div>
            <h3>Forgiveness</h3>
            <p>Allow users to undo actions and recover from mistakes easily.</p>
          </div>
        </div>
        
        <div class="color-palette">
          <h3>Example Color Palette</h3>
          <div class="color-swatches">
            <div class="color-swatch" style="background-color: #130D68;">
              <span class="color-name">Primary</span>
              <span class="color-hex">#130D68</span>
            </div>
            <div class="color-swatch" style="background-color: #2D2694;">
              <span class="color-name">Secondary</span>
              <span class="color-hex">#2D2694</span>
            </div>
            <div class="color-swatch" style="background-color: #F8F9FA;">
              <span class="color-name">Background</span>
              <span class="color-hex">#F8F9FA</span>
            </div>
            <div class="color-swatch" style="background-color: #E9ECEF;">
              <span class="color-name">Surface</span>
              <span class="color-hex">#E9ECEF</span>
            </div>
            <div class="color-swatch" style="background-color: #212529;">
              <span class="color-name">Text</span>
              <span class="color-hex">#212529</span>
            </div>
          </div>
        </div>
        
        <h2 class="blog-heading">Visual Hierarchy and Layout</h2>
        
        <p>A strong visual hierarchy guides users through the interface and helps them understand what's most important:</p>
        
        <div class="visual-hierarchy-example">
          <div class="hierarchy-item primary">
            <h3>Primary Element</h3>
            <p>The most important element on the page, like a main heading or call to action.</p>
          </div>
          <div class="hierarchy-item secondary">
            <h4>Secondary Element</h4>
            <p>Supporting elements that provide context or additional options.</p>
          </div>
          <div class="hierarchy-item tertiary">
            <h5>Tertiary Element</h5>
            <p>Less important elements that provide supplementary information.</p>
          </div>
        </div>
        
        <ul class="feature-list">
          <li><strong>Size and Weight</strong>: Larger and bolder elements draw more attention and signify importance.</li>
          <li><strong>Color and Contrast</strong>: Use color strategically to highlight key elements and create visual interest.</li>
          <li><strong>Spacing</strong>: Proper spacing between elements creates breathing room and improves readability.</li>
          <li><strong>Alignment</strong>: Consistent alignment creates order and makes the interface easier to scan.</li>
          <li><strong>Proximity</strong>: Related elements should be grouped together to show their relationship.</li>
        </ul>
        
        <div class="design-example">
          <h3>Example Button States</h3>
          <div class="button-states">
            <div class="button-state">
              <button class="example-button default">Default</button>
              <span class="state-label">Default</span>
            </div>
            <div class="button-state">
              <button class="example-button hover">Hover</button>
              <span class="state-label">Hover</span>
            </div>
            <div class="button-state">
              <button class="example-button active">Active</button>
              <span class="state-label">Active</span>
            </div>
            <div class="button-state">
              <button class="example-button disabled">Disabled</button>
              <span class="state-label">Disabled</span>
            </div>
          </div>
        </div>
        
        <h2 class="blog-heading">Designing for Different Devices</h2>
        
        <div class="responsive-diagram">
          <div class="device device-desktop">
            <div class="device-screen">
              <div class="device-content">
                <div class="device-header"></div>
                <div class="device-main">
                  <div class="device-sidebar"></div>
                  <div class="device-body">
                    <div class="device-block"></div>
                    <div class="device-block"></div>
                  </div>
                </div>
              </div>
            </div>
            <div class="device-label">Desktop</div>
          </div>
          
          <div class="device device-tablet">
            <div class="device-screen">
              <div class="device-content">
                <div class="device-header"></div>
                <div class="device-main">
                  <div class="device-body">
                    <div class="device-block"></div>
                    <div class="device-block"></div>
                  </div>
                </div>
              </div>
            </div>
            <div class="device-label">Tablet</div>
          </div>
          
          <div class="device device-mobile">
            <div class="device-screen">
              <div class="device-content">
                <div class="device-header"></div>
                <div class="device-main">
                  <div class="device-body">
                    <div class="device-block"></div>
                    <div class="device-block"></div>
                  </div>
                </div>
              </div>
            </div>
            <div class="device-label">Mobile</div>
          </div>
        </div>
        
        <p>Modern interfaces need to work across a variety of devices and screen sizes:</p>
        
        <ul>
          <li><strong>Responsive Design</strong>: Design interfaces that adapt to different screen sizes and orientations.</li>
          <li><strong>Touch-Friendly</strong>: Ensure interactive elements are large enough for touch input on mobile devices.</li>
          <li><strong>Progressive Enhancement</strong>: Start with a basic experience that works for everyone, then enhance for more capable devices.</li>
          <li><strong>Performance</strong>: Optimize for performance to ensure a smooth experience on all devices.</li>
        </ul>
        
        <h2 class="blog-heading">User Testing and Iteration</h2>
        
        <div class="process-diagram">
          <div class="process-step">
            <div class="step-number">1</div>
            <div class="step-content">
              <h3>Research</h3>
              <p>Understand user needs and behaviors</p>
            </div>
          </div>
          <div class="process-arrow">→</div>
          <div class="process-step">
            <div class="step-number">2</div>
            <div class="step-content">
              <h3>Design</h3>
              <p>Create prototypes and mockups</p>
            </div>
          </div>
          <div class="process-arrow">→</div>
          <div class="process-step">
            <div class="step-number">3</div>
            <div class="step-content">
              <h3>Test</h3>
              <p>Validate with real users</p>
            </div>
          </div>
          <div class="process-arrow">→</div>
          <div class="process-step">
            <div class="step-number">4</div>
            <div class="step-content">
              <h3>Iterate</h3>
              <p>Refine based on feedback</p>
            </div>
          </div>
        </div>
        
        <p>No matter how experienced you are, user testing is essential for creating truly intuitive interfaces:</p>
        
        <ul>
          <li><strong>Early Testing</strong>: Test with real users early in the design process, even with low-fidelity prototypes.</li>
          <li><strong>Observation</strong>: Watch how users interact with your interface and note where they struggle.</li>
          <li><strong>Feedback Collection</strong>: Gather both quantitative and qualitative feedback from users.</li>
          <li><strong>Iteration</strong>: Use the insights from testing to refine and improve your designs.</li>
        </ul>
        
        <div class="tip-box">
          <h4>Pro Tip</h4>
          <p>When conducting user testing, focus on observing what users do rather than what they say. Actions often reveal more about usability issues than verbal feedback.</p>
        </div>
        
        <h2 class="blog-heading">Conclusion</h2>
        
        <p>Designing intuitive user interfaces is an ongoing process of learning, testing, and refinement. By following these principles and best practices, you can create interfaces that not only look beautiful but also provide a seamless and enjoyable experience for your users.</p>
        
        <div class="author-note">
          <p>This article is part of our series on UI/UX design. Check out our other articles on typography, color theory, and interaction design.</p>
        </div>
      </div>
    `,
    date: "2024-07-18",
    readTime: "9 min read",
    author: "Christ David",
    authorRole: "UI/UX Designer",
    authorBio:
      "Christ David is a senior UI/UX designer with a passion for creating beautiful, intuitive interfaces. She has worked with startups and enterprise companies to improve their digital products.",
    authorAvatar: "/blogs/david.JPG?height=200&width=200&query=latina woman designer headshot",
    tags: ["Design", "UI/UX", "User Experience"],
    image: "/blogs/des11.jpg?height=400&width=600&query=colorful UI design wireframes",
    relatedPosts: [6, 7],
    category: "design",
    designImages: [
      {
        title: "Visual Hierarchy Example",
        description: "Illustration of visual hierarchy principles in UI design",
        image: "/blogs/des111.jpg?height=400&width=600&query=visual hierarchy UI design example",
      },
      {
        title: "Color System",
        description: "Example of a comprehensive color system for digital products",
        image: "/blogs/des15.jpg?height=400&width=600&query=UI design color system with primary and secondary colors",
      },
      {
        title: "Responsive Design Patterns",
        description: "Common patterns for responsive design across different devices",
        image: "/blogs/des09.webp?height=400&width=600&query=responsive design patterns across devices",
      },
    ],
  },
  "8": {
    id: 8,
    title: "Building a Successful Content Marketing Strategy",
    excerpt: "A step-by-step guide to developing and implementing an effective content marketing strategy.",
    content: `
      <div class="blog-content">
        <p class="lead">Content marketing has become an essential component of modern marketing strategies. It allows businesses to attract, engage, and retain customers by creating and sharing valuable, relevant content. This article provides a step-by-step guide to developing and implementing an effective content marketing strategy.</p>
        
        <h2 class="blog-heading">Understanding Content Marketing</h2>
        
        <div class="definition-box">
          <h3>What is Content Marketing?</h3>
          <p>Content marketing is a strategic approach focused on creating and distributing valuable, relevant, and consistent content to attract and retain a clearly defined audience — and, ultimately, to drive profitable customer action.</p>
        </div>
        
        <p>Unlike traditional marketing, which often interrupts consumers with promotional messages, content marketing provides information that makes the consumer more intelligent or entertains them.</p>
        
        <div class="benefits-chart">
          <h3>Key Benefits of Content Marketing</h3>
          <div class="chart-bars">
            <div class="chart-bar" style="height: 90%;">
              <span class="bar-label">Brand Awareness</span>
              <span class="bar-value">90%</span>
            </div>
            <div class="chart-bar" style="height: 85%;">
              <span class="bar-label">Thought Leadership</span>
              <span class="bar-value">85%</span>
            </div>
            <div class="chart-bar" style="height: 80%;">
              <span class="bar-label">Trust Building</span>
              <span class="bar-value">80%</span>
            </div>
            <div class="chart-bar" style="height: 75%;">
              <span class="bar-label">Lead Generation</span>
              <span class="bar-value">75%</span>
            </div>
            <div class="chart-bar" style="height: 70%;">
              <span class="bar-label">SEO Improvement</span>
              <span class="bar-value">70%</span>
            </div>
          </div>
        </div>
        
        <h2 class="blog-heading">Developing Your Content Marketing Strategy</h2>
        
        <div class="strategy-roadmap">
          <div class="roadmap-step">
            <div class="step-number">1</div>
            <div class="step-content">
              <h3 class="blog-subheading">Define Your Goals and Objectives</h3>
              <p>Start by clearly defining what you want to achieve with your content marketing efforts. Common goals include:</p>
              <ul>
                <li>Increasing website traffic</li>
                <li>Generating leads</li>
                <li>Improving brand awareness</li>
                <li>Establishing thought leadership</li>
                <li>Driving sales and conversions</li>
              </ul>
              <p>Ensure your goals are specific, measurable, achievable, relevant, and time-bound (SMART).</p>
            </div>
          </div>
          
          <div class="roadmap-step">
            <div class="step-number">2</div>
            <div class="step-content">
              <h3 class="blog-subheading">Understand Your Audience</h3>
              <div class="persona-card">
                <div class="persona-header">
                  <div class="persona-info">
                    <h4>Marketing Manager Mary</h4>
                    <p>Age: 35-45 | B2B Software Industry</p>
                  </div>
                </div>
                <div class="persona-details">
                  <div class="persona-section">
                    <h5>Goals</h5>
                    <ul>
                      <li>Increase marketing ROI</li>
                      <li>Generate quality leads</li>
                      <li>Demonstrate marketing value</li>
                    </ul>
                  </div>
                  <div class="persona-section">
                    <h5>Pain Points</h5>
                    <ul>
                      <li>Limited budget</li>
                      <li>Proving marketing impact</li>
                      <li>Keeping up with trends</li>
                    </ul>
                  </div>
                </div>
              </div>
              <p>Develop detailed buyer personas to understand who you're creating content for. Consider demographics, psychographics, pain points, challenges, and information needs.</p>
            </div>
          </div>
          
          <div class="roadmap-step">
            <div class="step-number">3</div>
            <div class="step-content">
              <h3 class="blog-subheading">Conduct a Content Audit</h3>
              <div class="audit-table">
                <div class="table-header">
                  <div class="header-cell">Content Type</div>
                  <div class="header-cell">Performance</div>
                  <div class="header-cell">Action</div>
                </div>
                <div class="table-row">
                  <div class="row-cell">Blog Posts</div>
                  <div class="row-cell">
                    <div class="performance-indicator high"></div>
                    High
                  </div>
                  <div class="row-cell">Optimize & Create More</div>
                </div>
                <div class="table-row">
                  <div class="row-cell">Case Studies</div>
                  <div class="row-cell">
                    <div class="performance-indicator medium"></div>
                    Medium
                  </div>
                  <div class="row-cell">Improve & Promote</div>
                </div>
                <div class="table-row">
                  <div class="row-cell">Whitepapers</div>
                  <div class="row-cell">
                    <div class="performance-indicator low"></div>
                    Low
                  </div>
                  <div class="row-cell">Revise or Discontinue</div>
                </div>
              </div>
              <p>If you already have content, assess what's working and what's not. Identify gaps in your content and opportunities for improvement.</p>
            </div>
          </div>
          
          <div class="roadmap-step">
            <div class="step-number">4</div>
            <div class="step-content">
              <h3 class="blog-subheading">Choose Content Types and Channels</h3>
              <div class="content-matrix">
                <div class="matrix-quadrant">
                  <h4>Awareness Stage</h4>
                  <ul>
                    <li>Blog posts</li>
                    <li>Infographics</li>
                    <li>Social media</li>
                  </ul>
                </div>
                <div class="matrix-quadrant">
                  <h4>Consideration Stage</h4>
                  <ul>
                    <li>Webinars</li>
                    <li>Case studies</li>
                    <li>Email newsletters</li>
                  </ul>
                </div>
                <div class="matrix-quadrant">
                  <h4>Decision Stage</h4>
                  <ul>
                    <li>Product demos</li>
                    <li>Customer testimonials</li>
                    <li>Free trials</li>
                  </ul>
                </div>
                <div class="matrix-quadrant">
                  <h4>Retention Stage</h4>
                  <ul>
                    <li>Knowledge base</li>
                    <li>User guides</li>
                    <li>Customer success stories</li>
                  </ul>
                </div>
              </div>
              <p>Based on your goals and audience, determine what types of content will be most effective and which channels to use for distribution.</p>
            </div>
          </div>
          
          <div class="roadmap-step">
            <div class="step-number">5</div>
            <div class="step-content">
              <h3 class="blog-subheading">Develop a Content Calendar</h3>
              <div class="calendar-preview">
                <div class="calendar-header">
                  <div class="month-nav">◀</div>
                  <div class="current-month">July 2023</div>
                  <div class="month-nav">▶</div>
                </div>
                <div class="calendar-grid">
                  <div class="calendar-day">
                    <div class="day-number">1</div>
                    <div class="day-content blog">Blog Post</div>
                  </div>
                  <div class="calendar-day">
                    <div class="day-number">5</div>
                    <div class="day-content social">Social Campaign</div>
                  </div>
                  <div class="calendar-day">
                    <div class="day-number">12</div>
                    <div class="day-content email">Email Newsletter</div>
                  </div>
                  <div class="calendar-day">
                    <div class="day-number">15</div>
                    <div class="day-content video">Video Tutorial</div>
                  </div>
                  <div class="calendar-day">
                    <div class="day-number">22</div>
                    <div class="day-content webinar">Webinar</div>
                  </div>
                  <div class="calendar-day">
                    <div class="day-number">28</div>
                    <div class="day-content case">Case Study</div>
                  </div>
                </div>
              </div>
              <p>Create a detailed content calendar that outlines what content you'll create, when you'll publish it, and who's responsible for each piece.</p>
            </div>
          </div>
        </div>
        
        <h2 class="blog-heading">Implementing Your Strategy</h2>
        
        <div class="implementation-grid">
          <div class="implementation-card">
            <div class="card-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" class="lucide lucide-file-text"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/><line x1="16" x2="8" y1="13" y2="13"/><line x1="16" x2="8" y1="17" y2="17"/><line x1="10" x2="8" y1="9" y2="9"/></svg>
            </div>
            <h3>Create High-Quality Content</h3>
            <p>Focus on creating valuable, relevant, and engaging content that addresses your audience's needs and interests.</p>
            <div class="quality-checklist">
              <div class="checklist-item">
                <input type="checkbox" checked disabled>
                <label>Well-researched</label>
              </div>
              <div class="checklist-item">
                <input type="checkbox" checked disabled>
                <label>Well-written</label>
              </div>
              <div class="checklist-item">
                <input type="checkbox" checked disabled>
                <label>Visually appealing</label>
              </div>
              <div class="checklist-item">
                <input type="checkbox" checked disabled>
                <label>Actionable</label>
              </div>
            </div>
          </div>
          
          <div class="implementation-card">
            <div class="card-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" class="lucide lucide-search"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
            </div>
            <h3>Optimize for Search Engines</h3>
            <p>Incorporate SEO best practices into your content creation process to improve visibility in search results.</p>
            <div class="seo-elements">
              <div class="seo-element">
                <div class="element-name">Keywords</div>
                <div class="element-bar" style="width: 90%;"></div>
              </div>
              <div class="seo-element">
                <div class="element-name">Meta Tags</div>
                <div class="element-bar" style="width: 85%;"></div>
              </div>
              <div class="seo-element">
                <div class="element-name">Internal Links</div>
                <div class="element-bar" style="width: 80%;"></div>
              </div>
              <div class="seo-element">
                <div class="element-name">Page Speed</div>
                <div class="element-bar" style="width: 75%;"></div>
              </div>
            </div>
          </div>
          
          <div class="implementation-card">
            <div class="card-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" class="lucide lucide-megaphone"><path d="m3 11 18-5v12L3 13v-2z"/><path d="M11.6 16.8a3 3 0 1 1-5.8-1.6"/></svg>
            </div>
            <h3>Promote Your Content</h3>
            <p>Develop a promotion strategy to ensure your content reaches your target audience.</p>
            <div class="promotion-channels">
              <div class="channel">
                <div class="channel-icon social"></div>
                <div class="channel-name">Social Media</div>
              </div>
              <div class="channel">
                <div class="channel-icon email"></div>
                <div class="channel-name">Email</div>
              </div>
              <div class="channel">
                <div class="channel-icon paid"></div>
                <div class="channel-name">Paid Ads</div>
              </div>
              <div class="channel">
                <div class="channel-icon influencer"></div>
                <div class="channel-name">Influencers</div>
              </div>
            </div>
          </div>
          
          <div class="implementation-card">
            <div class="card-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" class="lucide lucide-bar-chart-2"><line x1="18" x2="18" y1="20" y2="10"/><line x1="12" x2="12" y1="20" y2="4"/><line x1="6" x2="6" y1="20" y2="14"/></svg>
            </div>
            <h3>Measure and Analyze Results</h3>
            <p>Regularly track and analyze key metrics to assess the performance of your content marketing efforts.</p>
            <div class="metrics-dashboard">
              <div class="metric">
                <div class="metric-value">10,243</div>
                <div class="metric-name">Page Views</div>
                <div class="metric-trend up">+12%</div>
              </div>
              <div class="metric">
                <div class="metric-value">3:42</div>
                <div class="metric-name">Avg. Time on Page</div>
                <div class="metric-trend up">+8%</div>
              </div>
              <div class="metric">
                <div class="metric-value">342</div>
                <div class="metric-name">Conversions</div>
                <div class="metric-trend up">+15%</div>
              </div>
              <div class="metric">
                <div class="metric-value">4.8%</div>
                <div class="metric-name">Conversion Rate</div>
                <div class="metric-trend up">+2%</div>
              </div>
            </div>
          </div>
        </div>
        
        <h2 class="blog-heading">Conclusion</h2>
        
        <p>Building a successful content marketing strategy requires careful planning, consistent execution, and ongoing optimization. By following the steps outlined in this guide, you can develop a strategy that helps you achieve your marketing goals and connect with your target audience in meaningful ways.</p>
        
        <div class="cta-box">
          <h3>Ready to Start Your Content Marketing Journey?</h3>
          <p>Download our free Content Marketing Strategy Template to get started.</p>
          <button class="cta-button">Download Template</button>
        </div>
        
        <div class="author-note">
          <p>This article is part of our series on digital marketing strategies. Check out our other articles on social media marketing, email marketing, and SEO.</p>
        </div>
      </div>
    `,
    date: "2023-06-30",
    readTime: "10 min read",
    author: "Quyen Phan",
    authorRole: "Content Marketing Manager",
    authorBio:
      "Quyen Phan is a content marketing manager with over 3 years of experience in developing and implementing content strategies for B2B and B2C companies.",
    authorAvatar: "/blogs/mktem.jpg?height=200&width=200&query=man marketing professional headshot",
    tags: ["Marketing", "Content Strategy", "Digital Marketing"],
    image: "/blogs/mkt4.jpg?height=400&width=600&query=content marketing strategy diagram",
    relatedPosts: [9, 10],
    category: "marketing",
    marketingCharts: [
      {
        title: "Content Marketing Funnel",
        description: "Visualization of the content marketing funnel from awareness to conversion",
        chartImage: "/blogs/mkt1.png?height=400&width=600&query=content marketing funnel diagram",
      },
      {
        title: "Content Performance Metrics",
        description: "Key metrics for measuring content marketing success",
        chartImage: "/blogs/mkt2.jpg?height=400&width=600&query=content marketing performance metrics dashboard",
      },
      {
        title: "Content Types by Funnel Stage",
        description: "Effective content types for each stage of the marketing funnel",
        chartImage: "/blogs/mkt3.png?height=400&width=600&query=content types by marketing funnel stage chart",
      },
    ],
  },
  // Additional blog posts would be defined here...
}

export default function BlogPostPage({ params }: { params: { id: string } }) {
  const postId = params.id
  const post = blogPosts[postId]
  const [copied, setCopied] = useState(false)
  const [activeCodeTab, setActiveCodeTab] = useState(0)
  const [isLoading, setIsLoading] = useState(true)
  const [liked, setLiked] = useState(false)
  const [bookmarked, setBookmarked] = useState(false)
  const [likeCount, setLikeCount] = useState(Math.floor(Math.random() * 50) + 10)

  // Simulate loading state
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1000)
    return () => clearTimeout(timer)
  }, [])

  // Handle copy code function
  const copyCode = (code) => {
    navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  // Handle like function
  const handleLike = () => {
    if (liked) {
      setLikeCount((prev) => prev - 1)
    } else {
      setLikeCount((prev) => prev + 1)
    }
    setLiked(!liked)
  }

  if (!post) {
    return (
      <div className="container py-12 text-center">
        <h1 className="text-2xl font-bold mb-4">Blog Post Not Found</h1>
        <p className="mb-6">The blog post you're looking for doesn't exist or has been removed.</p>
        <Button asChild>
          <Link href="/blog">Back to Blog</Link>
        </Button>
      </div>
    )
  }

  // Format date
  const formattedDate = new Date(post.date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })

  // Get related posts
  const relatedPostsData = post.relatedPosts ? post.relatedPosts.map((id) => blogPosts[id]).filter(Boolean) : []

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
  }

  return (
    <>
      <style jsx global>{`
        /* Base blog content styles */
        .blog-content {
          font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
          line-height: 1.6;
          color: #333;
        }
        
        .blog-content .lead {
          font-size: 1.2rem;
          color: #555;
          margin-bottom: 2rem;
          font-weight: 400;
        }
        
        .blog-content p {
          margin-bottom: 1.5rem;
        }
        
        .blog-heading {
          font-size: 1.8rem;
          color: #130D68;
          margin-top: 2.5rem;
          margin-bottom: 1.5rem;
          font-weight: 700;
          position: relative;
          padding-bottom: 0.5rem;
        }
        
        .blog-heading::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          width: 60px;
          height: 3px;
          background: linear-gradient(to right, #130D68, #2D2694);
          border-radius: 3px;
        }
        
        .blog-subheading {
          font-size: 1.4rem;
          color: #130D68;
          margin-top: 2rem;
          margin-bottom: 1rem;
          font-weight: 600;
        }
        
        .blog-content ul, .blog-content ol {
          margin-bottom: 1.5rem;
          padding-left: 1.5rem;
        }
        
        .blog-content li {
          margin-bottom: 0.5rem;
        }
        
        .blog-content strong {
          font-weight: 600;
          color: #130D68;
        }
        
        /* Feature list styling */
        .feature-list {
          list-style: none;
          padding-left: 0;
        }
        
        .feature-list li {
          position: relative;
          padding-left: 1.8rem;
          margin-bottom: 1rem;
        }
        
        .feature-list li::before {
          content: '✓';
          position: absolute;
          left: 0;
          color: #130D68;
          font-weight: bold;
        }
        
        /* Info and tip boxes */
        .info-box, .tip-box {
          background-color: rgba(19, 13, 104, 0.05);
          border-left: 4px solid #130D68;
          padding: 1.5rem;
          margin: 2rem 0;
          border-radius: 0 4px 4px 0;
        }
        
        .info-box h3, .tip-box h4 {
          margin-top: 0;
          color: #130D68;
          font-weight: 600;
        }
        
        .tip-box {
          background-color: rgba(45, 38, 148, 0.05);
          border-left-color: #2D2694;
        }
        
        /* Code reference styling */
        .code-reference {
          background-color: #f8f9fa;
          border-radius: 6px;
          padding: 1.5rem;
          margin: 2rem 0;
          overflow-x: auto;
        }
        
        .code-reference p {
          margin-top: 0;
          margin-bottom: 0.5rem;
          font-weight: 600;
        }
        
        .code-reference pre {
          margin: 0;
          background-color: #282c34;
          padding: 1rem;
          border-radius: 4px;
          color: #abb2bf;
          font-family: 'Fira Code', 'Courier New', monospace;
          font-size: 0.9rem;
          overflow-x: auto;
        }
        
        /* Author note styling */
        .author-note {
          background-color: #f8f9fa;
          border-radius: 6px;
          padding: 1.5rem;
          margin-top: 3rem;
          font-style: italic;
          color: #666;
        }
        
        /* Design-specific styles */
        .principle-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
          gap: 1.5rem;
          margin: 2rem 0;
        }
        
        .principle-card {
          background-color: #fff;
          border-radius: 8px;
          padding: 1.5rem;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        
        .principle-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 8px 15px rgba(0, 0, 0, 0.1);
        }
        
        .principle-icon {
          color: #130D68;
          margin-bottom: 1rem;
        }
        
        .principle-card h3 {
          color: #130D68;
          margin-bottom: 0.5rem;
          font-weight: 600;
        }
        
        .color-palette {
          background-color: #fff;
          border-radius: 8px;
          padding: 1.5rem;
          margin: 2rem 0;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
        }
        
        .color-palette h3 {
          margin-top: 0;
          margin-bottom: 1rem;
          color: #130D68;
        }
        
        .color-swatches {
          display: flex;
          flex-wrap: wrap;
          gap: 1rem;
        }
        
        .color-swatch {
          width: 100px;
          height: 100px;
          border-radius: 8px;
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
          padding: 0.5rem;
          color: white;
          position: relative;
          overflow: hidden;
        }
        
        .color-swatch:nth-child(3), .color-swatch:nth-child(4) {
          color: #333;
        }
        
        .color-name {
          font-weight: 600;
          font-size: 0.9rem;
        }
        
        .color-hex {
          font-size: 0.8rem;
          opacity: 0.8;
        }
        
        .visual-hierarchy-example {
          margin: 2rem 0;
        }
        
        .hierarchy-item {
          padding: 1.5rem;
          margin-bottom: 1rem;
          border-radius: 8px;
        }
        
        .hierarchy-item.primary {
          background-color: rgba(19, 13, 104, 0.1);
          border-left: 4px solid #130D68;
        }
        
        .hierarchy-item.secondary {
          background-color: rgba(19, 13, 104, 0.05);
          border-left: 4px solid rgba(19, 13, 104, 0.5);
          margin-left: 1.5rem;
        }
        
        .hierarchy-item.tertiary {
          background-color: rgba(19, 13, 104, 0.02);
          border-left: 4px solid rgba(19, 13, 104, 0.2);
          margin-left: 3rem;
        }
        
        .hierarchy-item h3, .hierarchy-item h4, .hierarchy-item h5 {
          margin-top: 0;
          color: #130D68;
        }
        
        .design-example {
          background-color: #fff;
          border-radius: 8px;
          padding: 1.5rem;
          margin: 2rem 0;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
        }
        
        .design-example h3 {
          margin-top: 0;
          margin-bottom: 1rem;
          color: #130D68;
        }
        
        .button-states {
          display: flex;
          flex-wrap: wrap;
          gap: 1.5rem;
        }
        
        .button-state {
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        
        .example-button {
          padding: 0.5rem 1rem;
          border-radius: 4px;
          font-weight: 500;
          cursor: pointer;
          border: none;
          transition: all 0.3s ease;
        }
        
        .example-button.default {
          background-color: #130D68;
          color: white;
        }
        
        .example-button.hover {
          background-color: #2D2694;
          color: white;
          transform: translateY(-2px);
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }
        
        .example-button.active {
          background-color: #0c0840;
          color: white;
          transform: translateY(1px);
        }
        
        .example-button.disabled {
          background-color: #e9ecef;
          color: #6c757d;
          cursor: not-allowed;
        }
        
        .state-label {
          margin-top: 0.5rem;
          font-size: 0.8rem;
          color: #6c757d;
        }
        
        .responsive-diagram {
          display: flex;
          justify-content: space-around;
          flex-wrap: wrap;
          gap: 2rem;
          margin: 2rem 0;
        }
        
        .device {
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        
        .device-screen {
          background-color: #f8f9fa;
          border: 2px solid #dee2e6;
          border-radius: 8px;
          overflow: hidden;
        }
        
        .device-desktop .device-screen {
          width: 240px;
          height: 160px;
        }
        
        .device-tablet .device-screen {
          width: 160px;
          height: 120px;
        }
        
        .device-mobile .device-screen {
          width: 80px;
          height: 140px;
        }
        
        .device-content {
          padding: 0.5rem;
          height: 100%;
          display: flex;
          flex-direction: column;
        }
        
        .device-header {
          height: 10%;
          background-color: #130D68;
          margin-bottom: 0.5rem;
          border-radius: 2px;
        }
        
        .device-main {
          flex: 1;
          display: flex;
          gap: 0.5rem;
        }
        
        .device-sidebar {
          width: 20%;
          background-color: #dee2e6;
          border-radius: 2px;
        }
        
        .device-body {
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }
        
        .device-block {
          height: 30px;
          background-color: #adb5bd;
          border-radius: 2px;
        }
        
        .device-label {
          margin-top: 0.5rem;
          font-size: 0.9rem;
          color: #495057;
          font-weight: 500;
        }
        
        .process-diagram {
          display: flex;
          flex-wrap: wrap;
          justify-content: space-between;
          align-items: center;
          margin: 2rem 0;
          gap: 1rem;
        }
        
        .process-step {
          display: flex;
          align-items: center;
          gap: 1rem;
          flex: 1;
          min-width: 200px;
        }
        
        .step-number {
          width: 40px;
          height: 40px;
          background-color: #130D68;
          color: white;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 600;
          flex-shrink: 0;
        }
        
        .step-content h3 {
          margin: 0;
          color: #130D68;
          font-weight: 600;
        }
        
        .step-content p {
          margin: 0.25rem 0 0;
          font-size: 0.9rem;
          color: #6c757d;
        }
        
        .process-arrow {
          color: #adb5bd;
          font-size: 1.5rem;
          font-weight: 300;
          display: none;
        }
        
        @media (min-width: 768px) {
          .process-arrow {
            display: block;
          }
        }
        
        /* Marketing-specific styles */
        .definition-box {
          background-color: #f8f9fa;
          border-radius: 8px;
          padding: 1.5rem;
          margin: 2rem 0;
          border: 1px solid #dee2e6;
        }
        
        .definition-box h3 {
          margin-top: 0;
          color: #130D68;
          font-weight: 600;
        }
        
        .definition-box p {
          margin-bottom: 0;
        }
        
        .benefits-chart {
          background-color: #fff;
          border-radius: 8px;
          padding: 1.5rem;
          margin: 2rem 0;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
        }
        
        .benefits-chart h3 {
          margin-top: 0;
          margin-bottom: 1.5rem;
          color: #130D68;
          text-align: center;
        }
        
        .chart-bars {
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
          height: 200px;
          gap: 1rem;
        }
        
        .chart-bar {
          flex: 1;
          background: linear-gradient(to top, #130D68, #2D2694);
          border-radius: 4px 4px 0 0;
          position: relative;
          min-width: 40px;
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
          align-items: center;
          padding-bottom: 0.5rem;
        }
        
        .bar-value {
          color: white;
          font-weight: 600;
          font-size: 0.9rem;
        }
        
        .bar-label {
          position: absolute;
          bottom: -2rem;
          left: 50%;
          transform: translateX(-50%);
          white-space: nowrap;
          font-size: 0.8rem;
          color: #495057;
          text-align: center;
        }
        
        .strategy-roadmap {
          margin: 2rem 0;
        }
        
        .roadmap-step {
          display: flex;
          gap: 1.5rem;
          margin-bottom: 2.5rem;
          position: relative;
        }
        
        .roadmap-step:not(:last-child)::after {
          content: '';
          position: absolute;
          top: 40px;
          left: 20px;
          height: calc(100% + 2.5rem);
          width: 2px;
          background-color: #dee2e6;
          z-index: -1;
        }
        
        .persona-card {
          background-color: #fff;
          border-radius: 8px;
          overflow: hidden;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
          margin: 1.5rem 0;
        }
        
        .persona-header {
          display: flex;
          align-items: center;
          gap: 1rem;
          padding: 1rem;
          background-color: rgba(19, 13, 104, 0.05);
        }
        
        .persona-avatar {
          width: 50px;
          height: 50px;
          border-radius: 50%;
          background-color: #adb5bd;
          flex-shrink: 0;
        }
        
        .persona-info h4 {
          margin: 0;
          color: #130D68;
          font-weight: 600;
        }
        
        .persona-info p {
          margin: 0.25rem 0 0;
          font-size: 0.8rem;
          color: #6c757d;
        }
        
        .persona-details {
          padding: 1rem;
          display: flex;
          flex-wrap: wrap;
          gap: 1.5rem;
        }
        
        .persona-section {
          flex: 1;
          min-width: 150px;
        }
        
        .persona-section h5 {
          margin-top: 0;
          margin-bottom: 0.5rem;
          color: #130D68;
          font-weight: 600;
          font-size: 0.9rem;
        }
        
        .persona-section ul {
          margin: 0;
          padding-left: 1.2rem;
          font-size: 0.9rem;
        }
        
        .audit-table {
          margin: 1.5rem 0;
          border-radius: 8px;
          overflow: hidden;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
        }
        
        .table-header {
          display: flex;
          background-color: #130D68;
          color: white;
          font-weight: 600;
        }
        
        .header-cell {
          flex: 1;
          padding: 0.75rem 1rem;
          text-align: left;
        }
        
        .table-row {
          display: flex;
          border-bottom: 1px solid #dee2e6;
          background-color: white;
        }
        
        .table-row:last-child {
          border-bottom: none;
        }
        
        .row-cell {
          flex: 1;
          padding: 0.75rem 1rem;
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }
        
        .performance-indicator {
          width: 12px;
          height: 12px;
          border-radius: 50%;
        }
        
        .performance-indicator.high {
          background-color: #28a745;
        }
        
        .performance-indicator.medium {
          background-color: #ffc107;
        }
        
        .performance-indicator.low {
          background-color: #dc3545;
        }
        
        .content-matrix {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 1rem;
          margin: 1.5rem 0;
        }
        
        .matrix-quadrant {
          background-color: white;
          border-radius: 8px;
          padding: 1rem;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
        }
        
        .matrix-quadrant h4 {
          margin-top: 0;
          margin-bottom: 0.75rem;
          color: #130D68;
          font-weight: 600;
          font-size: 1rem;
        }
        
        .matrix-quadrant ul {
          margin: 0;
          padding-left: 1.2rem;
          font-size: 0.9rem;
        }
        
        .calendar-preview {
          background-color: white;
          border-radius: 8px;
          overflow: hidden;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
          margin: 1.5rem 0;
        }
        
        .calendar-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 1rem;
          background-color: #130D68;
          color: white;
        }
        
        .month-nav {
          cursor: pointer;
          font-size: 1.2rem;
        }
        
        .current-month {
          font-weight: 600;
        }
        
        .calendar-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
          gap: 0.5rem;
          padding: 1rem;
        }
        
        .calendar-day {
          background-color: #f8f9fa;
          border-radius: 4px;
          padding: 0.5rem;
          min-height: 80px;
          position: relative;
        }
        
        .day-number {
          position: absolute;
          top: 0.25rem;
          right: 0.25rem;
          font-size: 0.8rem;
          color: #6c757d;
        }
        
        .day-content {
          margin-top: 1.5rem;
          padding: 0.25rem 0.5rem;
          border-radius: 4px;
          font-size: 0.8rem;
          color: white;
          text-align: center;
        }
        
        .day-content.blog {
          background-color: #130D68;
        }
        
        .day-content.social {
          background-color: #2D2694;
        }
        
        .day-content.email {
          background-color: #3949AB;
        }
        
        .day-content.video {
          background-color: #5E35B1;
        }
        
        .day-content.webinar {
          background-color: #8E24AA;
        }
        
        .day-content.case {
          background-color: #D81B60;
        }
        
        .implementation-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 1.5rem;
          margin: 2rem 0;
        }
        
        .implementation-card {
          background-color: white;
          border-radius: 8px;
          padding: 1.5rem;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        
        .implementation-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 8px 15px rgba(0, 0, 0, 0.1);
        }
        
        .card-icon {
          color: #130D68;
          margin-bottom: 1rem;
        }
        
        .implementation-card h3 {
          color: #130D68;
          margin-top: 0;
          margin-bottom: 0.75rem;
          font-weight: 600;
        }
        
        .quality-checklist {
          margin-top: 1rem;
        }
        
        .checklist-item {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          margin-bottom: 0.5rem;
        }
        
        .checklist-item input[type="checkbox"] {
          accent-color: #130D68;
        }
        
        .seo-elements {
          margin-top: 1rem;
        }
        
        .seo-element {
          margin-bottom: 0.75rem;
        }
        
        .element-name {
          font-size: 0.9rem;
          margin-bottom: 0.25rem;
        }
        
        .element-bar {
          height: 8px;
          background-color: #130D68;
          border-radius: 4px;
        }
        
        .promotion-channels {
          display: flex;
          flex-wrap: wrap;
          gap: 1rem;
          margin-top: 1rem;
        }
        
        .channel {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.5rem;
        }
        
        .channel-icon {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
        }
        
        .channel-icon.social {
          background-color: #1DA1F2;
        }
        
        .channel-icon.email {
          background-color: #D44638;
        }
        
        .channel-icon.paid {
          background-color: #4267B2;
        }
        
        .channel-icon.influencer {
          background-color: #E1306C;
        }
        
        .channel-name {
          font-size: 0.8rem;
        }
        
        .metrics-dashboard {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
          gap: 1rem;
          margin-top: 1rem;
        }
        
        .metric {
          background-color: #f8f9fa;
          border-radius: 8px;
          padding: 1rem;
          text-align: center;
        }
        
        .metric-value {
          font-size: 1.5rem;
          font-weight: 700;
          color: #130D68;
        }
        
        .metric-name {
          font-size: 0.8rem;
          color: #6c757d;
          margin: 0.25rem 0;
        }
        
        .metric-trend {
          font-size: 0.8rem;
          font-weight: 600;
        }
        
        .metric-trend.up {
          color: #28a745;
        }
        
        .metric-trend.down {
          color: #dc3545;
        }
        
        .cta-box {
          background: linear-gradient(to right, rgba(19, 13, 104, 0.05), rgba(45, 38, 148, 0.05));
          border-radius: 8px;
          padding: 2rem;
          text-align: center;
          margin: 3rem 0;
        }
        
        .cta-box h3 {
          margin-top: 0;
          color: #130D68;
          font-weight: 600;
        }
        
        .cta-button {
          background-color: #130D68;
          color: white;
          border: none;
          border-radius: 4px;
          padding: 0.75rem 1.5rem;
          font-weight: 600;
          cursor: pointer;
          transition: background-color 0.3s ease;
          margin-top: 1rem;
        }
        
        .cta-button:hover {
          background-color: #2D2694;
        }
        
        /* Responsive adjustments */
        @media (max-width: 768px) {
          .principle-grid, .implementation-grid {
            grid-template-columns: 1fr;
          }
          
          .color-swatches, .button-states, .chart-bars {
            justify-content: center;
          }
          
          .process-diagram {
            flex-direction: column;
          }
          
          .roadmap-step {
            flex-direction: column;
            align-items: flex-start;
            padding-left: 2rem;
          }
          
          .roadmap-step:not(:last-child)::after {
            left: 1rem;
          }
          
          .step-number {
            position: absolute;
            left: 0;
            top: 0;
          }
          
          .step-content {
            margin-top: 0.5rem;
          }
        }
      `}</style>

      <div className="container py-12">
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <Button variant="ghost" asChild className="mb-6 group">
            <Link href="/blog" className="flex items-center">
              <ArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
              Back to All Posts
            </Link>
          </Button>
        </motion.div>

        <div className="grid gap-10 lg:grid-cols-3">
          {/* Main Content */}
          <motion.div className="lg:col-span-2" variants={containerVariants} initial="hidden" animate="visible">
            <motion.div
              variants={itemVariants}
              className="relative h-[300px] md:h-[400px] rounded-xl overflow-hidden mb-8 shadow-xl"
            >
              <Image src={post.image || "/placeholder.svg"} alt={post.title} fill className="object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#130D68]/80 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6">
                <Badge className="bg-white text-[#130D68] hover:bg-white/90">{post.category}</Badge>
              </div>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="flex flex-wrap items-center gap-4 mb-6 text-sm text-slate-600"
            >
              <div className="flex items-center">
                <Calendar className="mr-2 h-4 w-4" />
                {formattedDate}
              </div>
              <div className="flex items-center">
                <Clock className="mr-2 h-4 w-4" />
                {post.readTime}
              </div>
              <div className="flex items-center">
                <User className="mr-2 h-4 w-4" />
                {post.author}
              </div>
            </motion.div>

            <motion.h1
              variants={itemVariants}
              className="text-3xl font-bold tracking-tight md:text-4xl mb-6 bg-clip-text text-transparent bg-gradient-to-r from-[#130D68] to-[#2D2694]"
            >
              {post.title}
            </motion.h1>

            <motion.div variants={itemVariants} className="flex flex-wrap gap-2 mb-8">
              {post.tags.map((tag) => (
                <Badge key={tag} variant="outline" className="bg-muted/50">
                  <Tag className="mr-1 h-3 w-3" />
                  {tag}
                </Badge>
              ))}
            </motion.div>

            {/* Social Sharing and Actions */}
            <motion.div
              variants={itemVariants}
              className="flex items-center justify-between mb-8 p-4 bg-muted/30 rounded-lg"
            >
              <div className="flex items-center gap-4">
                <Button
                  variant="ghost"
                  size="sm"
                  className={`flex items-center gap-2 ${liked ? "text-red-500" : ""}`}
                  onClick={handleLike}
                >
                  <ThumbsUp className="h-4 w-4" />
                  <span>{likeCount}</span>
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className={`flex items-center gap-2 ${bookmarked ? "text-[#130D68]" : ""}`}
                  onClick={() => setBookmarked(!bookmarked)}
                >
                  <Bookmark className="h-4 w-4" />
                  <span>Save</span>
                </Button>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">Share:</span>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="lucide lucide-linkedin"
                        >
                          <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                          <rect width="4" height="12" x="2" y="9" />
                          <circle cx="4" cy="4" r="2" />
                        </svg>
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Share on LinkedIn</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>

                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="lucide lucide-twitter"
                        >
                          <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
                        </svg>
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Share on Twitter</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>

                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="lucide lucide-facebook"
                        >
                          <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                        </svg>
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Share on Facebook</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>

                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="lucide lucide-mail"
                        >
                          <rect width="20" height="16" x="2" y="4" rx="2" />
                          <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                        </svg>
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Share via Email</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
            </motion.div>

            {/* Article Content */}
            <motion.div variants={itemVariants} dangerouslySetInnerHTML={{ __html: post.content }} />

            {/* Code Snippets Section */}
            {post.category === "engineering" && post.codeSnippets && post.codeSnippets.length > 0 && (
              <motion.div variants={itemVariants} className="mt-12">
                <h2 className="text-2xl font-bold mb-6 text-[#130D68]">Code Examples</h2>

                <Tabs defaultValue={`code-${0}`} className="w-full">
                  <TabsList className="mb-4 overflow-x-auto flex-nowrap">
                    {post.codeSnippets.map((snippet, index) => (
                      <TabsTrigger
                        key={`code-${index}`}
                        value={`code-${index}`}
                        onClick={() => setActiveCodeTab(index)}
                        className="flex items-center gap-2"
                      >
                        <Code className="h-4 w-4" />
                        {snippet.title}
                      </TabsTrigger>
                    ))}
                  </TabsList>

                  {post.codeSnippets.map((snippet, index) => (
                    <TabsContent key={`code-${index}`} value={`code-${index}`}>
                      <div className="relative">
                        <div className="bg-slate-900 text-slate-50 rounded-lg p-4 text-sm overflow-auto max-h-[500px]">
                          <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center gap-2">
                              <FileText className="h-4 w-4" />
                              <span className="font-medium">{snippet.language}</span>
                            </div>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="text-slate-400 hover:text-white"
                              onClick={() => copyCode(snippet.code)}
                            >
                              {copied && activeCodeTab === index ? (
                                <Check className="h-4 w-4 mr-1" />
                              ) : (
                                <Copy className="h-4 w-4 mr-1" />
                              )}
                              {copied && activeCodeTab === index ? "Copied!" : "Copy"}
                            </Button>
                          </div>
                          <pre className="font-mono">
                            <code>{snippet.code}</code>
                          </pre>
                        </div>
                      </div>
                    </TabsContent>
                  ))}
                </Tabs>
              </motion.div>
            )}

            {post.category === "design" && post.designImages && post.designImages.length > 0 && (
              <motion.div variants={itemVariants} className="mt-12">
                <h2 className="text-2xl font-bold mb-6 text-[#130D68]">Design Examples</h2>

                <Tabs defaultValue={`design-${0}`} className="w-full">
                  <TabsList className="mb-4 overflow-x-auto flex-nowrap">
                    {post.designImages.map((design, index) => (
                      <TabsTrigger
                        key={`design-${index}`}
                        value={`design-${index}`}
                        className="flex items-center gap-2"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
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
                        {design.title}
                      </TabsTrigger>
                    ))}
                  </TabsList>

                  {post.designImages.map((design, index) => (
                    <TabsContent key={`design-${index}`} value={`design-${index}`}>
                      <div className="space-y-4">
                        <div className="relative h-[400px] rounded-lg overflow-hidden shadow-lg">
                          <Image
                            src={design.image || "/placeholder.svg"}
                            alt={design.title}
                            fill
                            className="object-contain bg-white p-4"
                          />
                        </div>
                        <div className="bg-muted/30 p-4 rounded-lg">
                          <h3 className="font-medium text-[#130D68] mb-2">{design.title}</h3>
                          <p className="text-slate-700">{design.description}</p>
                        </div>
                      </div>
                    </TabsContent>
                  ))}
                </Tabs>
              </motion.div>
            )}

            {post.category === "marketing" && post.marketingCharts && post.marketingCharts.length > 0 && (
              <motion.div variants={itemVariants} className="mt-12">
                <h2 className="text-2xl font-bold mb-6 text-[#130D68]">Marketing Insights</h2>

                <Tabs defaultValue={`chart-${0}`} className="w-full">
                  <TabsList className="mb-4 overflow-x-auto flex-nowrap">
                    {post.marketingCharts.map((chart, index) => (
                      <TabsTrigger key={`chart-${index}`} value={`chart-${index}`} className="flex items-center gap-2">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
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
                        {chart.title}
                      </TabsTrigger>
                    ))}
                  </TabsList>

                  {post.marketingCharts.map((chart, index) => (
                    <TabsContent key={`chart-${index}`} value={`chart-${index}`}>
                      <div className="space-y-4">
                        <div className="relative h-[400px] rounded-lg overflow-hidden shadow-lg">
                          <Image
                            src={chart.chartImage || "/placeholder.svg"}
                            alt={chart.title}
                            fill
                            className="object-contain bg-white p-4"
                          />
                        </div>
                        <div className="bg-muted/30 p-4 rounded-lg">
                          <h3 className="font-medium text-[#130D68] mb-2">{chart.title}</h3>
                          <p className="text-slate-700">{chart.description}</p>
                        </div>
                      </div>
                    </TabsContent>
                  ))}
                </Tabs>
              </motion.div>
            )}

            <Separator className="my-10" />

            {/* Author Bio */}
            
          </motion.div>

          {/* Sidebar */}
          <div className="space-y-8">
            <Card className="border-none shadow-lg">
              <CardHeader>
                <CardTitle className="text-[#130D68]">Table of Contents</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {post.content.match(/<h[23][^>]*>(.*?)<\/h[23]>/g)?.map((heading, index) => {
                  const text = heading.replace(/<\/?h[23][^>]*>/g, "").trim()
                  const level = heading.startsWith("<h2") ? "h2" : "h3"

                  return (
                    <div key={index} className={`${level === "h3" ? "ml-4" : ""}`}>
                      <a
                        href={`#${text.toLowerCase().replace(/\s+/g, "-")}`}
                        className={`text-slate-700 hover:text-[#130D68] transition-colors ${level === "h2" ? "font-medium" : ""}`}
                      >
                        {text}
                      </a>
                    </div>
                  )
                })}
              </CardContent>
            </Card>

            <Card className="border-none shadow-lg">
              <CardHeader>
                <CardTitle className="text-[#130D68]">About the Author</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col items-center text-center">
                <div className="relative h-24 w-24 rounded-full overflow-hidden mb-4 border-2 border-[#130D68]">
                  <Image
                    src={post.authorAvatar || "/placeholder.svg"}
                    alt={post.author}
                    fill
                    className="object-cover"
                  />
                </div>
                <h3 className="font-bold text-lg text-[#130D68]">{post.author}</h3>
                <p className="text-muted-foreground mb-4">{post.authorRole}</p>
                <p className="text-sm text-slate-700">
                  {post.authorBio ||
                    `An experienced professional with expertise in ${post.tags.join(", ")} and a passion for sharing knowledge with the community.`}
                </p>
              </CardContent>
            </Card>

            {relatedPostsData.length > 0 && (
              <Card className="border-none shadow-lg">
                <CardHeader>
                  <CardTitle className="text-[#130D68]">Related Articles</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {relatedPostsData.map((relatedPost) => (
                    <div key={relatedPost.id} className="flex gap-4 group">
                      <div className="relative h-16 w-16 flex-shrink-0 rounded-md overflow-hidden">
                        <Image
                          src={relatedPost.image || "/placeholder.svg"}
                          alt={relatedPost.title}
                          fill
                          className="object-cover transition-transform group-hover:scale-110"
                        />
                      </div>
                      <div>
                        <Link
                          href={`/blog/${relatedPost.id}`}
                          className="font-medium text-slate-700 hover:text-[#130D68] transition-colors line-clamp-2 group-hover:underline"
                        >
                          {relatedPost.title}
                        </Link>
                        <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {relatedPost.readTime}
                        </p>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            )}

            <Card className="border-none shadow-lg">
              <CardHeader>
                <CardTitle className="text-[#130D68]">Popular Tags</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {Array.from(new Set(Object.values(blogPosts).flatMap((post) => post.tags))).map((tag) => (
                    <Badge
                      key={tag}
                      variant="outline"
                      className="bg-muted/50 hover:bg-[#130D68]/10 transition-colors cursor-pointer"
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="border-none shadow-lg">
              <CardHeader>
                <CardTitle className="text-[#130D68]">Share This Article</CardTitle>
              </CardHeader>
              <CardContent className="flex gap-2">
                <Button variant="outline" size="icon">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-linkedin"
                  >
                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                    <rect width="4" height="12" x="2" y="9" />
                    <circle cx="4" cy="4" r="2" />
                  </svg>
                </Button>
                <Button variant="outline" size="icon">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-twitter"
                  >
                    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
                  </svg>
                </Button>
                <Button variant="outline" size="icon">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-facebook"
                  >
                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                  </svg>
                </Button>
                <Button variant="outline" size="icon">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-mail"
                  >
                    <rect width="20" height="16" x="2" y="4" rx="2" />
                    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                  </svg>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Newsletter Signup */}
        <motion.div
          className="mt-16 bg-gradient-to-r from-[#130D68]/10 to-transparent rounded-lg p-8 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-2xl font-bold mb-4 text-[#130D68]">Subscribe to Our Newsletter</h2>
          <p className="text-slate-700 mb-6 max-w-2xl mx-auto">
            Stay updated with our latest articles, industry insights, and company news. We'll never spam your inbox!
          </p>
          <div className="flex max-w-md mx-auto gap-2">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex h-10 w-full rounded-full border border-input bg-background px-4 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#130D68] focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            />
            <Button className="rounded-full">Subscribe</Button>
          </div>
        </motion.div>
      </div>
    </>
  )
}
