# Features Deep Dive

## 1. Lead Generation (Contact Form)
We use a custom-built form in `components/contact.tsx`.

### Workflow
1. User fills out Name, Email, Phone, and Message.
2. **Validation**: Client-side validation ensures fields are not empty.
3. **Submission**: Data is POSTed to `/api/contact`.
4. **Processing**:
   - Data stored in **Supabase** `contact_submissions` table.
   - Email sent to admin via **SendGrid**.
5. **Feedback**: User receives a Success Toast notification (via Sonner).

## 2. Membership Payments (Stripe)
Located in `components/pricing.tsx`.

### Workflow
1. User clicks "Join Now" on a pricing card.
2. App triggers `/api/checkout` with the Plan ID.
3. User is redirected to a hosted **Stripe Checkout** page.
4. **Success**:
   - User redirected back to `/success`.
   - Stripe sends `checkout.session.completed` event to `/api/webhook`.
   - System records payment in **Supabase** `payments` table.

## 3. Dark Mode UI
The design system is heavily customized in `tailwind.config.ts` (if fully exposed) or `globals.css`.
- **Primary Color**: Neon Green/Blue accents.
- **Background**: Deep Zinc/Slate grays (not pure black) for depth.
- **Typography**: Uses `Inter` or `Outfit` for a modern look.
