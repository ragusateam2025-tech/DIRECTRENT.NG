import { NextResponse } from 'next/server';
import { contactSchema } from '@/lib/validations';

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const result = contactSchema.safeParse(body);
    if (!result.success) {
      return NextResponse.json(
        { error: 'Validation failed', details: result.error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    const data = result.data;

    // ================================================
    // TODO: INTEGRATION POINTS
    // ================================================

    // 1. Send email to team (Resend)
    // await resend.emails.send({
    //   from: 'Directrent.ng <noreply@directrent.ng>',
    //   to: 'hello@directrent.ng',
    //   subject: `Contact: ${data.subject}`,
    //   replyTo: data.email,
    //   html: `<p>From: ${data.name} (${data.email})</p><p>${data.message}</p>`,
    // });

    // 2. Send auto-reply to sender (Resend)
    // await resend.emails.send({
    //   from: 'Directrent.ng <hello@directrent.ng>',
    //   to: data.email,
    //   subject: 'We received your message — Directrent.ng',
    //   html: `<p>Hi ${data.name}, thanks for reaching out. We'll respond within 24 hours.</p>`,
    // });

    // 3. Save to database
    // await db.contactMessages.create({ data });

    console.log('Contact submission:', data);

    return NextResponse.json(
      { success: true, message: 'Message sent successfully' },
      { status: 201 }
    );
  } catch (error) {
    console.error('Contact API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
