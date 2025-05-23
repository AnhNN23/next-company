import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function NotFound() {
  return (
    <div className="container py-12 text-center">
      <h1 className="text-3xl font-bold mb-4">Job Not Found</h1>
      <p className="text-muted-foreground mb-8">
        The job posting you're looking for doesn't exist or has been removed.
      </p>
      <Button asChild>
        <Link href="/careers">View All Jobs</Link>
      </Button>
    </div>
  )
}
