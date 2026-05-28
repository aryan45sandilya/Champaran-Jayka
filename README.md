# 🍛 Champaran's Jayka — Restaurant Website

> **Taste Like Home** — A full-stack restaurant website built with Next.js 15, Supabase, and Tailwind CSS.

![Champaran's Jayka](https://qhidayelxwxwppfqqjdk.supabase.co/storage/v1/object/public/images/1.png)

---

## ✨ Features

### Customer Website
- 🎬 **Cinematic Hero** — Auto-rotating image slideshow with smooth crossfade
- 🍽️ **Bestsellers Section** — Top 6 dishes fetched live from database
- 📋 **Full Menu** — Category tabs (Starters, Main Course, Desserts, Drinks) with Quarter/Half/Full pricing
- 🔍 **Dish Zoom** — Click any dish image to see it full-size with details
- 📖 **Our Story** — Restaurant history and values
- 📍 **Location** — Embedded Google Maps + address, hours, contact
- 📬 **Contact Form** — Saves submissions directly to Supabase
- 📱 **Fully Responsive** — Mobile-first design for all screen sizes

### Admin Panel (`/admin`)
- 🔐 **Secure Login** — Supabase Auth (email + password)
- 🍛 **Menu Management** — Add, edit, delete dishes with image preview
- 🏷️ **Category Management** — Add/rename/delete menu categories
- 📊 **CSV Import** — Bulk upload menu items from a spreadsheet
- 📍 **Settings** — Edit address, map, phone, email, opening hours live
- 💬 **Messages** — View all contact form submissions
- 📈 **Dashboard** — Overview stats

---

## 🛠️ Tech Stack

| Technology | Purpose |
|---|---|
| **Next.js 15** (App Router) | Framework |
| **TypeScript** | Type safety |
| **Tailwind CSS v4** | Styling |
| **Supabase** | Database + Auth + Storage |
| **Framer Motion** | Animations |
| **Lucide React** | Icons |
| **Sonner** | Toast notifications |

---

## 🚀 Getting Started

### 1. Clone & Install

```bash
git clone https://github.com/your-username/restaurant-website.git
cd restaurant-website
npm install
```

### 2. Set Up Supabase

1. Create a free project at [supabase.com](https://supabase.com)
2. Go to **SQL Editor** and run `supabase/schema.sql`
3. Then run `supabase/seed.sql` for sample data
4. Run `supabase/add-pricing-columns.sql` for portion pricing
5. Run `supabase/admin-setup.sql` for admin write permissions
6. Run `supabase/restaurant-settings.sql` for settings table

### 3. Environment Variables

Create `.env.local` in the project root:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
```

Get these from: **Supabase Dashboard → Project Settings → API**

### 4. Create Admin User

In Supabase → **Authentication → Users → Add user**:
- Enter your email and password
- Check "Auto Confirm User"

### 5. Run Locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) — customer website  
Open [http://localhost:3000/admin](http://localhost:3000/admin) — admin panel

---

## 📁 Project Structure

```
src/
├── app/
│   ├── admin/                  # Admin panel pages
│   │   ├── login/              # Login page
│   │   └── dashboard/
│   │       ├── page.tsx        # Overview stats
│   │       ├── menu/           # Menu item management
│   │       ├── categories/     # Category management
│   │       ├── import/         # CSV bulk import
│   │       ├── messages/       # Contact form submissions
│   │       └── settings/       # Contact & location settings
│   ├── layout.tsx              # Root layout + metadata
│   ├── page.tsx                # Customer homepage
│   └── globals.css             # Design system
├── components/
│   ├── admin/                  # Admin UI components
│   ├── layout/                 # Navbar, Footer
│   ├── sections/               # Page sections (Hero, Menu, etc.)
│   └── ui/                     # Reusable UI components
├── lib/
│   ├── supabase/               # Supabase client (browser + server)
│   ├── data.ts                 # Server-side data fetching
│   └── fallback-data.ts        # Sample data (no DB needed)
└── types/
    └── database.ts             # TypeScript types for all tables
supabase/
├── schema.sql                  # Database tables + RLS policies
├── seed.sql                    # Sample menu data
├── add-pricing-columns.sql     # Quarter/Half/Full pricing
├── admin-setup.sql             # Admin write permissions
└── restaurant-settings.sql     # Settings table
```

---

## 🗄️ Database Schema

### Tables

| Table | Description |
|---|---|
| `categories` | Menu categories (Starters, Mains, etc.) |
| `menu_items` | All dishes with pricing, images, flags |
| `contact_messages` | Contact form submissions |
| `restaurant_settings` | Address, hours, phone, email, map URL |

### Menu Item Fields

| Field | Type | Description |
|---|---|---|
| `name` | text | Dish name |
| `description` | text | Short description |
| `category_id` | uuid | Foreign key to categories |
| `price` | numeric | Base/single price |
| `price_quarter` | numeric | Quarter portion price |
| `price_half` | numeric | Half portion price |
| `price_full` | numeric | Full portion price |
| `image_url` | text | Image URL |
| `is_veg` | boolean | Vegetarian flag |
| `is_spicy` | boolean | Spicy flag |
| `is_bestseller` | boolean | Shows in bestsellers |
| `is_chef_special` | boolean | Chef's special badge |
| `is_available` | boolean | Show/hide on menu |

---

## 📤 CSV Import Format

Upload a CSV file at `/admin/dashboard/import` with these columns:

```csv
name,description,category,price,price_quarter,price_half,price_full,image_url,is_veg,is_spicy,is_bestseller,is_chef_special,is_available
Champaran Mutton,Slow-cooked mutton,Main Course,,,350,650,,false,true,true,true,true
Litti Chokha,Traditional litti,Starters,120,,,,,true,false,true,false,true
```

- `category` must match an existing category name exactly
- At least one price field is required
- Boolean fields accept: `true`, `false`, `1`, `0`, `yes`, `no`

---

## 🌐 Deployment (Vercel)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

Or connect your GitHub repo at [vercel.com](https://vercel.com) and add environment variables:
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`

---

## 📞 Contact

**Champaran's Jayka**  
280, Pratap Vihar Rd, Sector 12, Block J  
Pratap Vihar, Ghaziabad, UP – 201009  

📞 +91 76677 51506 / +91 99344 12330  
📧 champaranjayka@gmail.com

---

*Built with ❤️ for authentic Champaran flavours*
