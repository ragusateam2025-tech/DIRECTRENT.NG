import { NextResponse } from 'next/server';
import { newsletterSchema } from '@/lib/validations';

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const result = newsletterSchema.safeParse(body);
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
