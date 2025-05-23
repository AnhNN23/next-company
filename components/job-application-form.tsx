"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Loader2, Upload } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import { useToast } from "@/components/ui/use-toast"

// Form validation schema
const formSchema = z.object({
  firstName: z.string().min(2, { message: "First name must be at least 2 characters" }),
  lastName: z.string().min(2, { message: "Last name must be at least 2 characters" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  phone: z.string().min(10, { message: "Please enter a valid phone number" }),
  resume: z.instanceof(File, { message: "Please upload your resume" }).refine(
    (file) => file.size < 5000000, // 5MB
    "File size must be less than 5MB",
  ),
  coverLetter: z.instanceof(File, { message: "Please upload your cover letter" }).optional(),
  linkedIn: z.string().url({ message: "Please enter a valid LinkedIn URL" }).optional().or(z.literal("")),
  portfolio: z.string().url({ message: "Please enter a valid portfolio URL" }).optional().or(z.literal("")),
  experience: z.string().min(1, { message: "Please select your experience level" }),
  workAuthorization: z.string().min(1, { message: "Please select your work authorization status" }),
  relocate: z.boolean(),
  referral: z.string().optional(),
  additionalInfo: z
    .string()
    .max(500, { message: "Additional information must be less than 500 characters" })
    .optional(),
  privacyPolicy: z.literal(true, {
    errorMap: () => ({ message: "You must agree to the privacy policy" }),
  }),
})

type FormValues = z.infer<typeof formSchema>

export function JobApplicationForm({
  jobId,
  jobTitle,
  onClose,
}: {
  jobId: string
  jobTitle: string
  onClose: () => void
}) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const { toast } = useToast()

  // Initialize form
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      linkedIn: "",
      portfolio: "",
      referral: "",
      additionalInfo: "",
      relocate: false,
      privacyPolicy: false,
    },
  })

  // Handle form submission
  const onSubmit = async (data: FormValues) => {
    setIsSubmitting(true)

    try {
      // In a real application, you would send this data to your server
      console.log("Form data:", data)
      console.log("Job ID:", jobId)

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000))

      // Show success message
      toast({
        title: "Application Submitted",
        description: "We've received your application and will be in touch soon.",
      })

      setIsSubmitted(true)
    } catch (error) {
      console.error("Error submitting form:", error)
      toast({
        title: "Submission Failed",
        description: "There was an error submitting your application. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  // If form is submitted successfully, show confirmation
  if (isSubmitted) {
    return (
      <div className="text-center py-8">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 dark:bg-green-900 mb-4">
          <svg
            className="w-8 h-8 text-green-600 dark:text-green-300"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
          </svg>
        </div>
        <h3 className="text-2xl font-bold mb-2">Application Submitted!</h3>
        <p className="text-muted-foreground mb-6">
          Thank you for applying to the {jobTitle} position. We've received your application and will review it shortly.
        </p>
        <p className="text-muted-foreground mb-6">
          You'll receive a confirmation email with more details about the next steps in our hiring process.
        </p>
        <Button onClick={onClose}>Close</Button>
      </div>
    )
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid gap-4 sm:grid-cols-2">
          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>First Name *</FormLabel>
                <FormControl>
                  <Input placeholder="John" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="lastName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Last Name *</FormLabel>
                <FormControl>
                  <Input placeholder="Doe" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email *</FormLabel>
                <FormControl>
                  <Input type="email" placeholder="john.doe@example.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone Number *</FormLabel>
                <FormControl>
                  <Input placeholder="+1 (555) 123-4567" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="resume"
          render={({ field: { value, onChange, ...fieldProps } }) => (
            <FormItem>
              <FormLabel>Resume/CV *</FormLabel>
              <FormControl>
                <div className="flex items-center gap-2">
                  <Input
                    type="file"
                    accept=".pdf,.doc,.docx"
                    onChange={(e) => {
                      if (e.target.files?.[0]) {
                        onChange(e.target.files[0])
                      }
                    }}
                    {...fieldProps}
                  />
                  <Upload className="h-4 w-4 text-muted-foreground" />
                </div>
              </FormControl>
              <FormDescription>Upload your resume (PDF, DOC, or DOCX, max 5MB)</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="coverLetter"
          render={({ field: { value, onChange, ...fieldProps } }) => (
            <FormItem>
              <FormLabel>Cover Letter (Optional)</FormLabel>
              <FormControl>
                <div className="flex items-center gap-2">
                  <Input
                    type="file"
                    accept=".pdf,.doc,.docx"
                    onChange={(e) => {
                      if (e.target.files?.[0]) {
                        onChange(e.target.files[0])
                      }
                    }}
                    {...fieldProps}
                  />
                  <Upload className="h-4 w-4 text-muted-foreground" />
                </div>
              </FormControl>
              <FormDescription>Upload your cover letter (PDF, DOC, or DOCX, max 5MB)</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid gap-4 sm:grid-cols-2">
          <FormField
            control={form.control}
            name="linkedIn"
            render={({ field }) => (
              <FormItem>
                <FormLabel>LinkedIn Profile (Optional)</FormLabel>
                <FormControl>
                  <Input placeholder="https://linkedin.com/in/johndoe" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="portfolio"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Portfolio/Website (Optional)</FormLabel>
                <FormControl>
                  <Input placeholder="https://johndoe.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="experience"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Years of Experience *</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="flex flex-col space-y-1"
                >
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="0-2" />
                    </FormControl>
                    <FormLabel className="font-normal">0-2 years</FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="3-5" />
                    </FormControl>
                    <FormLabel className="font-normal">3-5 years</FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="6-10" />
                    </FormControl>
                    <FormLabel className="font-normal">6-10 years</FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="10+" />
                    </FormControl>
                    <FormLabel className="font-normal">10+ years</FormLabel>
                  </FormItem>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="workAuthorization"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Work Authorization Status *</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="flex flex-col space-y-1"
                >
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="authorized" />
                    </FormControl>
                    <FormLabel className="font-normal">Authorized to work in the country</FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="sponsorship" />
                    </FormControl>
                    <FormLabel className="font-normal">Require sponsorship</FormLabel>
                  </FormItem>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="relocate"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0">
              <FormControl>
                <Checkbox checked={field.value} onCheckedChange={field.onChange} />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel>Willing to relocate if necessary</FormLabel>
              </div>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="referral"
          render={({ field }) => (
            <FormItem>
              <FormLabel>How did you hear about us? (Optional)</FormLabel>
              <FormControl>
                <Input placeholder="LinkedIn, Job Board, Referral, etc." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="additionalInfo"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Additional Information (Optional)</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Any additional information you'd like to share..."
                  className="resize-none"
                  {...field}
                />
              </FormControl>
              <FormDescription>Limit: 500 characters</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="privacyPolicy"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0">
              <FormControl>
                <Checkbox checked={field.value} onCheckedChange={field.onChange} />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel>
                  I agree to the{" "}
                  <a href="/privacy-policy" className="text-primary underline" target="_blank" rel="noreferrer">
                    privacy policy
                  </a>{" "}
                  and consent to the processing of my personal data *
                </FormLabel>
                <FormMessage />
              </div>
            </FormItem>
          )}
        />

        <div className="flex justify-end gap-4">
          <Button type="button" variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {isSubmitting ? "Submitting..." : "Submit Application"}
          </Button>
        </div>
      </form>
    </Form>
  )
}
