# API Reference

## 1. POST `/api/contact`
Handles contact form submissions.

### Request Body
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "1234567890",
  "plan": "Pro Plan",
  "message": "I want to join."
}
```

### Response
- **200 OK**: `{ "success": true, "message": "Email sent and data saved" }`
- **500 Error**: `{ "error": "Internal Server Error" }`

---

## 2. POST `/api/checkout`
Initiates a Stripe Checkout session.

### Request Body
```json
{
  "priceId": "price_12345...",
  "planName": "Pro Plan"
}
```

### Response
- **200 OK**: `{ "url": "https://checkout.stripe.com/..." }`
- **500 Error**: `{ "error": "Failed to create session" }`

---

## 3. POST `/api/webhook`
Receives events from Stripe. **Signature Verified**.

### Events Handled
- `checkout.session.completed`: Records payment to database.

### Response
- **200 OK**: `{ "received": true }`
