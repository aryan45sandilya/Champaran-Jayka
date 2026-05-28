# Ember & Oak — Setup Guide

## Prerequisites

- Node.js 18+
- npm or yarn
- A Supabase account (free tier works)

---

## 1. Clone & Install

```bash
# Install dependencies (already done if you're reading this)
npm install
```

---

## 2. Supabase Setup

### Create a Project

1. Go to [supabase.com](https://supabase.com) and sign in
2. Click **New Project**
3. Choose a name (e.g., `ember-oak`), set a strong database password, and select a region
4. Wait for the project to provision (~2 minutes)

### Run the Schema

1. In your Supabase dashboard, go to **SQL Editor**
2. Click **New Query**
3. Copy and paste the contents of `supabase/schema.sql`
4. Click **Run**

### Seed Sample Data (Optional)

1. In the SQL Editor, create another new query
2. Copy and paste the contents of `supabase/seed.sql`
3. Click **Run**

### Get Your API Keys

1. Go to **Project Settings → API**
2. Copy:
   - **Project URL** (e.g., `https://xxxx.supabase.co`)
   - **anon public** key

---

## 3. Environment Variables

Create a `.env.local` file in the project root:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
```

> **Note:** The website works without Supabase configured — it falls back to built-in sample data. You only need Supabase for the contact form to actually save submissions.

---

## 4. Run Locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

---

## 5. Deploy to Vercel

### Option A: Vercel CLI

```bash
npm install -g vercel
vercel
```

Follow the prompts. When asked about environment variables, add:
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`

### Option B: Vercel Dashboard

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com) → **New Project**
3. Import your GitHub repository
4. Under **Environment Variables**, add:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
5. Click **Deploy**

---

## 6. Supabase Storage (Optional — for custom food images)

1. In Supabase dashboard, go to **Storage**
2. Create a new bucket called `menu-images`
3. Set it to **Public**
4. Upload your food images
5. Copy the public URL and update `image_url` values in your database

---

## Project Structure

```
src/
├── app/
│   ├── layout.tsx          # Root layout with fonts & metadata
│   ├── page.tsx            # Main page (assembles all sections)
│   └── globals.css         # Design system & utility classes
├── components/
│   ├── layout/
│   │   ├── Navbar.tsx      # Sticky navbar with mobile menu
│   │   └── Footer.tsx      # Footer with links & contact info
│   ├── sections/
│   │   ├── Hero.tsx        # Full-screen cinematic hero
│   │   ├── Bestsellers.tsx # Server component — fetches bestsellers
│   │   ├── Menu.tsx        # Server component — fetches menu data
│   │   ├── MenuClient.tsx  # Client component — interactive tabs
│   │   ├── About.tsx       # Restaurant story & chef section
│   │   ├── Location.tsx    # Map, hours, parking info
│   │   ├── Contact.tsx     # Contact section wrapper
│   │   └── ContactForm.tsx # Client component — form with validation
│   └── ui/
│       ├── BestsellerCard.tsx  # Animated dish card
│       └── ScrollReveal.tsx    # Scroll-triggered animation wrapper
├── lib/
│   ├── supabase/
│   │   ├── client.ts       # Browser Supabase client
│   │   └── server.ts       # Server-side Supabase client
│   ├── data.ts             # Server-side data fetching functions
│   └── fallback-data.ts    # Sample data when DB isn't configured
└── types/
    └── database.ts         # TypeScript types for Supabase tables
supabase/
├── schema.sql              # Database schema with RLS policies
└── seed.sql                # Sample data for development
```

---

## Customisation

### Branding
- Restaurant name: Search for "Ember & Oak" and replace globally
- Colors: Edit CSS variables in `globals.css` (look for `rgb(196 142 72)` for gold)
- Fonts: Change `Playfair_Display` and `Inter` in `layout.tsx`

### Content
- Hero image: Update the `src` in `Hero.tsx`
- About section: Edit text directly in `About.tsx`
- Location: Update address, hours, and map embed in `Location.tsx`
- Menu data: Add/edit rows in Supabase or update `fallback-data.ts`

### Google Maps
Replace the iframe `src` in `Location.tsx` with your actual Google Maps embed URL:
1. Go to [maps.google.com](https://maps.google.com)
2. Search for your restaurant
3. Click **Share → Embed a map**
4. Copy the `src` URL from the iframe code
