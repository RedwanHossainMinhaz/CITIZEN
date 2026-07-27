# CITIZEN — Civic Engagement Platform (Frontend Demo)

A frontend-only React + Vite rebuild of the CITIZEN UI, with a fully working
login/signup flow and an admin panel that can manage every user and every
piece of content on the site.

> This is a **frontend-only** demo. There is no real backend/database —
> all data (users, posts, complaints, site settings) lives in your
> browser's `localStorage`. See **"Going to production"** below for what
> to change when you're ready to add a real server.

## Quick start

```bash
npm install
npm run dev
```

Then open the URL Vite prints (usually `http://localhost:5173`).

To build for production / GitHub Pages / Netlify / Vercel:

```bash
npm run build
npm run preview   # optional: preview the production build locally
```

## Demo accounts

| Role  | Email               | Password  |
|-------|----------------------|-----------|
| Admin | admin@citizen.bd     | admin123  |
| User  | demo@citizen.bd      | demo1234  |

Admin login is a separate page at `/admin/login` (linked from the regular
login page). Regular sign-up always creates a normal `user` account —
you promote someone to admin from **Admin > Manage Users > Edit > Role**.

## What's included

- **Public site**: Landing page, Discussion feed (Hot/New/Top, trending
  topics, community rules), Support Hub (FAQ), multi-step Complaints form
  with live tracking sidebar.
- **Auth**: functional Login and Signup pages backed by `localStorage`.
- **User Dashboard**: profile card, resolved-issues count, active
  discussions, an engagement trend chart, and recent activity.
- **Admin Panel** (`/admin`):
  - **Manage Users** — edit any user's name, account ID, ward, national
    ID, trust score and role; ban/unban; permanently delete an account.
  - **Manage Posts** — view and delete any discussion post.
  - **Manage Complaints** — change status or delete any complaint.
  - **Site Settings** — upload a new logo/hero image, edit the site name,
    tagline, description, and the homepage stats. There's also a
    "Reset demo data" button to restore the original seed data.

## Project structure

```
src/
  components/       Shared UI: Navbar, Footer, Logo, PostCard, AdminLayout,
                     ProtectedRoute, AdminRoute, TrendChart
  context/
    AppDataContext.jsx   Single source of truth for users/posts/complaints/
                         settings + every CRUD action (add/update/delete)
    AuthContext.jsx      Session state: login, signup, logout, admin login
  data/
    seed.js              Starter data — edit this to change the defaults
  pages/
    Landing, Discussion, SupportHub, Complaints, Login, Signup, Dashboard
    Admin/  AdminLogin, AdminDashboard, ManageUsers, ManagePosts,
            ManageComplaints, SiteSettings
  utils/
    storage.js           The only file that talks to localStorage directly
```

## How to customize things

- **Colors / theme**: `tailwind.config.js` → `theme.extend.colors.brand`
  and `.accent`. Every component reads from these Tailwind classes, so
  changing the hex values here re-themes the whole app.
- **Logo / hero image**: log in as admin → Site Settings → Upload. Or
  edit `src/data/seed.js` (`SEED_SETTINGS.logo` / `heroImage`) to bake in
  a default image path instead.
- **Starter/demo data** (accounts, posts, complaints): `src/data/seed.js`.
- **Reusable styles** (buttons, cards, inputs): `src/index.css`, under the
  `.btn-primary`, `.card`, `.input` etc. classes — change them once, and
  every page picks it up.
- **Admin permissions**: all admin logic lives in
  `src/context/AppDataContext.jsx`. Add new fields/actions there and they
  become available to every admin page automatically.

## Going to production

This app currently "fakes" a backend using `localStorage`, which means:
data is per-browser, passwords are stored in plain text, and anyone with
devtools access can inspect it. That's fine for a demo/prototype, but
before real users sign up you should:

1. Replace `src/utils/storage.js` calls with real API requests to a
   server you control.
2. Hash passwords server-side (never store or compare plain-text
   passwords).
3. Move image uploads to real object storage (e.g. S3) instead of
   base64 data URLs in `localStorage`.
4. Add server-side authorization checks for every admin action — the
   `AdminRoute` component only guards the UI, not a real API.

## Deploying to GitHub Pages

1. Push this project to a GitHub repo.
2. `npm install -D gh-pages`, add `"homepage": "https://<user>.github.io/<repo>"`
   and a `"deploy": "gh-pages -d dist"` script to `package.json`.
3. `npm run build && npm run deploy`.

(Or just connect the repo to Vercel/Netlify — no extra config needed for
either.)
