import { NextResponse } from 'next/server';

import { checkRateLimit } from '@/lib/rate-limit';
import { sanitizeObject } from '@/lib/sanitize';
import { newsletterSchema } from '@/lib/validations';

export async function POST(request: Request) {
  try {
    const ip =
      request.headers.get('x-forwarded-for') ??
      request.headers.get('x-real-ip') ??
      'unknown';
    const { allowed } = checkRateLimit(ip, 5, 60000);

    if (!allowed) {
      return NextResponse.json(
        { error: 'Too many requests. Please try again later.' },
        { status: 429, headers: { 'Retry-After': '60' } }
      );
    }

    const body = await request.json();

    const result = newsletterSchema.safeParse(body);
    if (!result.success) {
      return NextResponse.json(
        { error: 'Validation failed', details: result.error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    const data = sanitizeObject(result.data);

    // ================================================
    // TODO: INTEGRATION POINTS
    // ================================================

    // 1. Add to Mailchimp audience
    // await mailchimp.lists.addListMember(AUDIENCE_ID, {
    //   email_address: data.email,
    //   status: 'subscribed',
    // });

    // 2. Save to database
    // await db.newsletter.create({ data: { email: data.email } });

    console.log('Newsletter subscription:', data);

    return NextResponse.json(
      { success: true, message: 'Subscribed successfully' },
      { status: 201 }
    );
  } catch (error) {
    console.error('Newsletter API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
