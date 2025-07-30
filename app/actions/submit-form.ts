"use server"

interface FormSubmission {
  clientName: string
  channelName: string
  clientEmail: string
  contentType: string
  creativeFredom: boolean
  vision: string
}

export async function submitForm(formData: FormSubmission) {
  try {
    // Generate a temporary submission ID for logging
    const tempSubmissionId = Math.floor(Math.random() * 10000)

    // Try to save to database if connection is available
    let submissionId = tempSubmissionId
    let submittedAt = new Date().toISOString()
    let databaseSaved = false

    try {
      // Only try database if connection string exists
      if (process.env.DATABASE_URL) {
        const { neon } = await import("@neondatabase/serverless")
        const sql = neon(process.env.DATABASE_URL)

        // First, check if client_email column exists, if not add it
        try {
          await sql`ALTER TABLE submissions ADD COLUMN IF NOT EXISTS client_email VARCHAR(255)`
        } catch (alterError) {
          console.log("Column might already exist or alter failed:", alterError)
        }

        // Try to insert with client_email, fallback to without if column doesn't exist
        try {
          const result = await sql`
            INSERT INTO submissions (client_name, channel_name, client_email, content_type, creative_freedom, vision)
            VALUES (${formData.clientName}, ${formData.channelName}, ${formData.clientEmail}, ${formData.contentType}, ${formData.creativeFredom}, ${formData.vision})
            RETURNING id, submitted_at
          `
          submissionId = result[0].id
          submittedAt = result[0].submitted_at
          databaseSaved = true
          console.log("✅ Data saved to database successfully with client_email")
        } catch (insertError) {
          console.log("Insert with client_email failed, trying without:", insertError)
          // Fallback: insert without client_email column
          try {
            const result = await sql`
              INSERT INTO submissions (client_name, channel_name, content_type, creative_freedom, vision)
              VALUES (${formData.clientName}, ${formData.channelName}, ${formData.contentType}, ${formData.creativeFredom}, ${formData.vision})
              RETURNING id, submitted_at
            `
            submissionId = result[0].id
            submittedAt = result[0].submitted_at
            databaseSaved = true
            console.log("✅ Data saved to database successfully without client_email (fallback)")
          } catch (fallbackError) {
            console.error("Both insert attempts failed:", fallbackError)
            databaseSaved = false
          }
        }
      } else {
        console.log("⚠️ No database connection - using fallback logging")
      }
    } catch (dbError) {
      console.error("Database error (continuing with email):", dbError)
      databaseSaved = false
    }

    // Always log the submission data for backup
    logSubmissionData(formData, submissionId, databaseSaved)

    // Send email notification
    let emailSent = false
    try {
      emailSent = await sendNotificationEmail(formData, submissionId, databaseSaved)

      // Update email_sent status in database if database is available and saved successfully
      if (databaseSaved && process.env.DATABASE_URL) {
        try {
          const { neon } = await import("@neondatabase/serverless")
          const sql = neon(process.env.DATABASE_URL)

          await sql`
            UPDATE submissions 
            SET email_sent = true 
            WHERE id = ${submissionId}
          `
        } catch (updateError) {
          console.error("Failed to update email status in database:", updateError)
        }
      }
    } catch (emailError) {
      console.error("Email sending failed:", emailError)
    }

    return {
      success: true,
      submissionId,
      submittedAt,
      emailSent,
      databaseSaved,
    }
  } catch (error) {
    console.error("Error submitting form:", error)
    return {
      success: false,
      error: "Failed to submit form. Please try again.",
    }
  }
}

// Enhanced logging function
function logSubmissionData(formData: FormSubmission, submissionId: number, databaseSaved: boolean) {
  console.log("=== FORM SUBMISSION DATA ===")
  console.log(`Submission ID: ${submissionId}`)
  console.log(`Database Saved: ${databaseSaved ? "✅ Yes" : "❌ No (logged only)"}`)
  console.log(`Client Name: ${formData.clientName}`)
  console.log(`Channel Name: ${formData.channelName}`)
  console.log(`Client Email: ${formData.clientEmail}`)
  console.log(`Content Type: ${formData.contentType}`)
  console.log(`Creative Freedom: ${formData.creativeFredom ? "Yes" : "No"}`)
  if (!formData.creativeFredom) {
    console.log(`Vision: ${formData.vision}`)
  }
  console.log(`Submitted At: ${new Date().toISOString()}`)
  console.log("===============================")
}

async function sendNotificationEmail(formData: FormSubmission, submissionId: number, databaseSaved: boolean) {
  try {
    // Prepare creative direction text
    const creativeDirection = formData.creativeFredom ? "Full Creative Freedom" : formData.vision

    // Prepare email content with the requested format
    const emailContent = {
      from: "MediaPiles <onboarding@resend.dev>",
      to: ["iamidiot724@gmail.com"],
      subject: `🎬 New Free Video Edit Request from ${formData.clientName}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9f9f9;">
          <div style="background-color: #1D1616; color: #EEEEEE; padding: 30px; border-radius: 10px;">
            <h1 style="color: #D84040; margin-bottom: 20px; text-align: center;">🎬 New Free Video Edit Request</h1>
            
            <div style="background-color: rgba(142, 22, 22, 0.1); padding: 20px; border-radius: 8px; margin-bottom: 20px;">
              <h2 style="color: #EEEEEE; margin-bottom: 15px;">📥 New video editing request received:</h2>
              
              <div style="color: #EEEEEE; line-height: 1.8; font-size: 16px;">
                <p style="margin: 8px 0;">- 👤 <strong>Client Name:</strong> ${formData.clientName}</p>
                <p style="margin: 8px 0;">- 📺 <strong>Channel Name:</strong> ${formData.channelName}</p>
                <p style="margin: 8px 0;">- 📧 <strong>Client Email:</strong> ${formData.clientEmail}</p>
                <p style="margin: 8px 0;">- 🎞️ <strong>Content Type:</strong> ${formData.contentType === "short-form" ? "Short Form" : "Long Form"}</p>
                <p style="margin: 8px 0;">- 🧠 <strong>Creative Direction:</strong></p>
                <div style="margin-left: 20px; padding: 10px; background-color: rgba(216, 64, 64, 0.1); border-radius: 6px; margin-top: 8px;">
                  <p style="margin: 0; font-style: ${formData.creativeFredom ? "italic" : "normal"};">${creativeDirection}</p>
                </div>
              </div>
            </div>
            
            <div style="background-color: rgba(216, 64, 64, 0.1); padding: 15px; border-radius: 8px; text-align: center; margin-bottom: 20px;">
              <p style="margin: 0; font-size: 14px;"><strong>Submission ID:</strong> #${submissionId}</p>
              <p style="margin: 5px 0 0 0; font-size: 14px;"><strong>Submitted:</strong> ${new Date().toLocaleString()}</p>
              <p style="margin: 5px 0 0 0; font-size: 12px; color: rgba(238, 238, 238, 0.7);">
                Database Status: ${databaseSaved ? "✅ Saved" : "⚠️ Logged Only"}
              </p>
            </div>
            
            <div style="text-align: center; margin-bottom: 20px;">
              <p style="color: #D84040; font-weight: bold; margin: 0;">⏰ Remember: Reach out within 24 hours!</p>
            </div>
            
            <div style="text-align: center; padding: 15px; background-color: rgba(238, 238, 238, 0.1); border-radius: 8px;">
              <p style="margin: 0; color: #EEEEEE; font-weight: bold;">✅ Submitted via MediaPiles agency website.</p>
            </div>
          </div>
          
          <div style="text-align: center; margin-top: 20px; color: #666;">
            <p style="font-size: 12px; margin: 0;">This is an automated notification from MediaPiles Agency</p>
          </div>
        </div>
      `,
    }

    // Send email using Resend API
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer re_FtYwDDfL_e7dbkHuitrJ1UA2pb7bHjGPe`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(emailContent),
    })

    if (response.ok) {
      const result = await response.json()
      console.log("✅ Email sent successfully:", result)
      return true
    } else {
      const errorText = await response.text()
      console.error("❌ Failed to send email:", errorText)
      return false
    }
  } catch (error) {
    console.error("❌ Error in email sending function:", error)
    return false
  }
}
