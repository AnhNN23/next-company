import Link from "next/link"
import Image from "next/image"
import { Github, Linkedin, Twitter } from "lucide-react"

export function SiteFooter() {
  return (
    <footer className="border-t py-12 md:py-16">
      <div className="container grid gap-8 md:grid-cols-2 lg:grid-cols-4">
        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <div className="relative h-8 w-8">
              <Image src="/company-logo.png" alt="Company Logo" fill className="object-contain" />
            </div>
            <h3 className="text-lg font-medium">LimGrow</h3>
          </div>
          <p className="text-sm text-muted-foreground">Building the future of technology, one innovation at a time.</p>
          <div className="flex space-x-4">
            <Link href="#" className="text-muted-foreground hover:text-foreground">
              <Twitter className="h-5 w-5" />
              <span className="sr-only">Twitter</span>
            </Link>
            <Link href="#" className="text-muted-foreground hover:text-foreground">
              <Github className="h-5 w-5" />
              <span className="sr-only">GitHub</span>
            </Link>
            <Link href="#" className="text-muted-foreground hover:text-foreground">
              <Linkedin className="h-5 w-5" />
              <span className="sr-only">LinkedIn</span>
            </Link>
          </div>
        </div>
        <div>
          <h3 className="mb-4 text-lg font-medium">Company</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <Link href="/" className="text-muted-foreground hover:text-foreground">
                Home
              </Link>
            </li>
            <li>
              <Link href="/careers" className="text-muted-foreground hover:text-foreground">
                Careers
              </Link>
            </li>
            <li>
              <Link href="/contact" className="text-muted-foreground hover:text-foreground">
                Contact
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <h3 className="mb-4 text-lg font-medium">Resources</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <Link href="/blog" className="text-muted-foreground hover:text-foreground">
                Blog
              </Link>
            </li>
            <li>
              <Link href="/products" className="text-muted-foreground hover:text-foreground">
                Products
              </Link>
            </li>
            <li>
              <Link href="/activities" className="text-muted-foreground hover:text-foreground">
                Activities
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <h3 className="mb-4 text-lg font-medium">Legal</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <Link href="/privacy" className="text-muted-foreground hover:text-foreground">
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link href="/terms" className="text-muted-foreground hover:text-foreground">
                Terms of Service
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="container mt-8 border-t pt-8">
        <p className="text-center text-sm text-muted-foreground">
          &copy; {new Date().getFullYear()} InfinityGrowth. All rights reserved.
        </p>
      </div>
    </footer>
  )
}
