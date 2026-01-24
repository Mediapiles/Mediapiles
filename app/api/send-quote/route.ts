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
      from: 'Acme <onboarding@resend.dev>',
      to: ['mediapilesagency@gmail.com'], // Send to the verified Resend account email
      subject: `New Booking Request from ${name}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
          <h1>New Booking Request</h1>
          <p><strong>Client Name:</strong> ${name}</p>
          <p><strong>Client Email:</strong> ${email}</p>
          
          <div style="background: #f9f9f9; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p><strong>Calculated Price:</strong> <span style="font-size: 1.25em; color: #16a34a;">${price}</span></p>
            <h3>Selected Services:</h3>
            <ul>
              ${services.map((s: string) => `<li>${s}</li>`).join('')}
            </ul>
            ${notes ? `<h3>Client Notes:</h3><p>${notes}</p>` : ''}
          </div>
        </div>
      `,
    });

    if (error) {
      console.error("Resend API Error:", error);
      return NextResponse.json({ error }, { status: 500 });
    }

    console.log("Resend Email Sent:", data);
    return NextResponse.json(data);
  } catch (error) {
    console.error("API Route Error:", error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
