# LinkPulse

A fast, minimal link-in-bio tool with click analytics, custom themes, and QR codes. Built with Next.js 15 and Supabase.

**Live:** [LinkPulse](https://link-pulse-iota.vercel.app)

---

## Features

- **Magic link auth** — passwordless sign-in via email
- **Public profile page** — shareable at `yourdomain.com/username`
- **Link manager** — add, hide, delete, and drag-to-reorder links
- **Click analytics** — track clicks by day, country, device, and referrer
- **Custom themes** — 12 minimal presets with fonts, colors, and button shapes
- **QR code** — generate and download a PNG for your profile
- **Open Graph images** — dynamic per-profile preview cards for social sharing
- **Row-level security** — every query protected by Supabase RLS

---

## Tech stack

| Layer | Technology |
|---|---|
| Framework | Next.js 15 (App Router) |
| Database + Auth | Supabase |
| UI | Shadcn UI + Tailwind CSS |
| Charts | Recharts |
| Drag & drop | dnd-kit |
| QR code | qrcode.react |
| Deployment | Vercel |

---

## Local setup

### 1. Clone and install

```bash
git clone https://github.com/rishabhraikwar98/link-pulse.git
cd link-pulse
npm install
```

### 2. Environment variables

Copy the example env file and fill in your values:

```bash
cp .env.local.example .env.local
```

```env
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=
SUPABASE_SERVICE_ROLE_KEY=
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### 3. Run

```bash
npm run dev
```

Visit `http://localhost:3000`.

---

## Deployment

Deployed on Vercel. Add your environment variables to the Vercel project settings and push to deploy.

---

## Contributing

Issues and PRs are welcome.

---

## License

MIT
