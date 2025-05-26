"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

const navigation = [
  { name: "Blog", href: "/blog" },
  { name: "Careers", href: "/careers" },
  { name: "Products", href: "/products" },
  { name: "Activities", href: "/activities" },
];

export function SiteHeader() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        {/* Logo section - bên trái */}
        <Link href="/" className="flex items-center space-x-2">
          <div className="relative h-8 w-8">
            <Image
              src="/company-logo.png"
              alt="Company Logo"
              fill
              className="object-contain"
            />
          </div>
          <span className="font-bold text-xl">LimGrow</span>
        </Link>

        {/* Navigation section - bên phải */}
        <div className="flex items-center space-x-4">
          <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
            {navigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "transition-colors hover:text-primary",
                  pathname === item.href
                    ? "text-primary font-bold"
                    : "text-foreground"
                )}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Mobile menu button */}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <div className="flex items-center space-x-2 mb-6">
                <div className="relative h-8 w-8">
                  <Image
                    src="/company-logo.png"
                    alt="Company Logo"
                    fill
                    className="object-contain"
                  />
                </div>
                <span className="font-bold text-xl">InfinityGrowth</span>
              </div>
              <nav className="flex flex-col gap-4">
                {navigation.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      "transition-colors hover:text-primary",
                      pathname === item.href
                        ? "text-primary font-bold"
                        : "text-foreground"
                    )}
                  >
                    {item.name}
                  </Link>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
