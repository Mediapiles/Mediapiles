import { NextResponse } from 'next/server';
import { Resend } from 'resend';

export async function POST(req: Request) {
  try {
    const apiKey = process.env.RESEND_API_KEY;

    // Gracefully handle missing API key during build/runtime
    if (!apiKey) {
      console.error("Missing RESEND_API_KEY environment variable");
      return NextResponse.json({ error: 'Server configuration error: Missing API Key' }, { status: 500 });
    }

    const resend = new Resend(apiKey);
    const { name, email, services, price, notes } = await req.json();

    if (!email || !name) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const { data, error } = await resend.emails.send({
      from: 'Acme <onboarding@resend.dev>', // Default Resend testing sender
      to: [email], // Send copy to client
      // bcc: ['your-agency-email@example.com'], // Optional: Send copy to yourself
      subject: `Your Custom Quote from Mediapiles`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
          <h1>Thanks for choosing Mediapiles!</h1>
          <p>Hi ${name},</p>
          <p>Here is a summary of your custom plan:</p>
          
          <div style="background: #f9f9f9; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p><strong>Calculated Price:</strong> <span style="font-size: 1.25em; color: #16a34a;">${price}</span></p>
            <h3>Selected Services:</h3>
            <ul>
              ${services.map((s: string) => `<li>${s}</li>`).join('')}
            </ul>
            ${notes ? `<h3>Your Notes:</h3><p>${notes}</p>` : ''}
          </div>

          <p>We'll lie review your details and get back to you shortly to finalize everything.</p>
          <p>Best regards,<br/>The Mediapiles Team</p>
        </div>
      `,
    });

    if (error) {
      return NextResponse.json({ error }, { status: 500 });
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error("API Route Error:", error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
