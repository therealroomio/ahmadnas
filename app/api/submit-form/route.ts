import { NextResponse } from "next/server"
import { Resend } from "resend"
import { autoInsuranceFormSchema } from "@/types/form"
import { propertyInsuranceFormSchema } from "@/types/property-form"
import { z } from "zod"

const resend = new Resend(process.env.RESEND_API_KEY)

// Combined schema for both form types
const formSubmissionSchema = z.object({
  formType: z.enum(["auto", "property"]),
  data: z.union([autoInsuranceFormSchema, propertyInsuranceFormSchema]),
})

type FormSubmission = z.infer<typeof formSubmissionSchema>

export async function POST(request: Request) {
  try {
    const json = await request.json()
    const { formType, data } = formSubmissionSchema.parse(json) as FormSubmission

    // Create email content based on form type
    const emailContent = createEmailContent(formType, data)

    // Send email using Resend
    await resend.emails.send({
      from: "Insurance Form <onboarding@resend.dev>",
      to: process.env.NOTIFICATION_EMAIL!,
      subject: `New ${formType} Insurance Application`,
      html: emailContent,
    })

    return NextResponse.json(
      { message: "Form submitted successfully" },
      { status: 200 }
    )
  } catch (error) {
    console.error("Form submission error:", error)
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { message: "Invalid form data", errors: error.errors },
        { status: 400 }
      )
    }
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    )
  }
}

function createEmailContent(formType: "auto" | "property", data: any): string {
  const title = formType === "auto" ? "Auto Insurance" : "Property Insurance"
  
  // Convert form data to HTML
  const formDataHtml = Object.entries(data)
    .map(([section, sectionData]) => {
      const sectionHtml = Object.entries(sectionData as object)
        .map(([key, value]) => {
          // Format nested objects and arrays
          const formattedValue = typeof value === "object" 
            ? JSON.stringify(value, null, 2)
            : value
          return `<tr>
            <td style="padding: 8px; border: 1px solid #ddd;">${key}</td>
            <td style="padding: 8px; border: 1px solid #ddd;">${formattedValue}</td>
          </tr>`
        })
        .join("")

      return `
        <h3 style="margin-top: 20px; color: #333;">${section}</h3>
        <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
          <tbody>${sectionHtml}</tbody>
        </table>
      `
    })
    .join("")

  return `
    <!DOCTYPE html>
    <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 800px; margin: 0 auto; padding: 20px; }
        </style>
      </head>
      <body>
        <div class="container">
          <h2 style="color: #2563eb;">New ${title} Application</h2>
          <p>A new insurance application has been submitted:</p>
          ${formDataHtml}
        </div>
      </body>
    </html>
  `
} 