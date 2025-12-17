import sgMail from '@sendgrid/mail';

if (process.env.SENDGRID_API_KEY) {
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);
}

export const sendConfirmationEmail = async (
    to: string,
    amount: number,
    planId: string
) => {
    if (!process.env.SENDGRID_API_KEY || !process.env.EMAIL_FROM) {
        console.error('Missing SendGrid configuration');
        return;
    }

    const amountInDollars = (amount / 100).toFixed(2);
    const planName = planId.includes('BASIC') ? 'Basic' :
        planId.includes('STANDARD') ? 'Standard' :
            'Premium'; // Simple heuristic, fallback to planId if needed

    const msg = {
        to,
        from: process.env.EMAIL_FROM, // Use the email address or domain you verified with SendGrid
        subject: 'Payment Confirmation - Legends Gym',
        text: `Your payment of $${amountInDollars} for the ${planName} plan was successful. Welcome to Legends Gym!`,
        html: `
      <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
        <h1 style="color: #22c55e;">Payment Successful!</h1>
        <p>Thank you for joining Legends Gym.</p>
        <p><strong>Plan:</strong> ${planName}</p>
        <p><strong>Amount:</strong> $${amountInDollars}</p>
        <p>Your subscription is now active.</p>
        <p>If you have any questions, please reply to this email.</p>
      </div>
    `,
    };

    try {
        await sgMail.send(msg);
        console.log(`Email sent to ${to}`);
    } catch (error: any) {
        console.error('Error sending email:', error);
        if (error.response) {
            console.error(error.response.body);
        }
    }
};
