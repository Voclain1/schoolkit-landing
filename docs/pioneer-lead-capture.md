# Pioneer lead capture

`POST /api/pioneer` validates and persists Pioneer Offer leads through the
existing server-side Resend integration. Credentials and submitted personal
data never enter client-side analytics.

## Distributed abuse protection

Valid persistence attempts are limited to five per hashed client identifier
in a fixed ten-minute window. The limiter uses one atomic Upstash Redis `EVAL`
operation to increment the counter and apply `PEXPIRE`. Redis therefore shares
the limit across Vercel instances and automatically removes each counter after
ten minutes. The sixth attempt receives HTTP `429` and `Retry-After`.

Payload parsing, honeypot detection, and complete field validation happen
before Redis is called. Bots caught by the honeypot and ordinary validation
mistakes do not consume the five-attempt allowance. If Redis is unavailable or
misconfigured, the endpoint fails closed with HTTP `503` and does not persist
the lead.

Configure these server-only variables in every Vercel environment where the
form must work:

```text
UPSTASH_REDIS_REST_URL=https://your-database.upstash.io
UPSTASH_REDIS_REST_TOKEN=your_upstash_rest_token
```

Use the read/write REST token, not the read-only token. Never prefix either
variable with `NEXT_PUBLIC_`.

