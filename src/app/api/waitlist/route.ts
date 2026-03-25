import { NextResponse } from 'next/server';
import { waitlistSchema } from '@/lib/validations';

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Validate input
    const result = waitlistSchema.safeParse(body);
    if (!result.success) {
      return NextResponse.json(
        {
          error: 'Validation failed',
          details: result.error.flatten().fieldErrors,
        },
        { status: 400 }
      );
    }

    const data = result.data;

    // ================================================
    // TODO: INTEGRATION POINTS
    // Uncomment and configure when services are ready
    // ================================================

    // 1. Save to database (Firebase/Supabase/Prisma)
    // await db.waitlist.create({ data });

    // 2. Send confirmation email (Resend)
    // await resend.emails.send({
    //   from: 'Directrent.ng <hello@directrent.ng>',
    //   to: data.email,
    //   subject: 'You\'re on the Directrent.ng waitlist!',
    //   html: `<p>Hi ${data.name}, thanks for joining...</p>`,
    // });

    // 3. Add to Mailchimp audience
    // await mailchimp.lists.addListMember(AUDIENCE_ID, {
    //   email_address: data.email,
    //   status: 'subscribed',
    //   merge_fields: { FNAME: data.name, PHONE: data.phone, UTYPE: data.userType },
    // });

    // 4. Send Slack/Discord notification
    // await fetch(SLACK_WEBHOOK, { method: 'POST', body: JSON.stringify({ text: `New waitlist: ${data.name} (${data.userType})` }) });

    console.log('Waitlist submission:', data);

    return NextResponse.json(
      { success: true, message: 'Successfully joined the waitlist' },
      { status: 201 }
    );
  } catch (error) {
    console.error('Waitlist API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
