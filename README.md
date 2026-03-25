# Directrent.ng Website

<p align="center">
  <img src="public/images/logo.svg" alt="Directrent.ng Logo" width="200">
</p>

<p align="center">
  <strong>Connecting Landlords & Tenants Directly — No Middlemen, No Stress</strong>
</p>

<p align="center">
  <a href="https://directrent.ng">Website</a> •
  <a href="#features">Features</a> •
  <a href="#getting-started">Getting Started</a> •
  <a href="#deployment">Deployment</a>
</p>

---

## 🏠 About Directrent.ng

Directrent.ng is a Lagos-based PropTech platform that eliminates the traditional "Mandatory Middleman" system in Nigerian real estate. Our platform enables direct landlord-tenant connections with:

- **2% Platform Fee** vs. 15% traditional agency fees
- **BVN/NIN Verification** for trusted transactions
- **Paystack Escrow** for secure payments
- **Zero Agency Hassles** — no more inflated prices or hidden charges

### The Problem We Solve

In Lagos, tenants pay combined agency and legal fees of approximately 15% of annual rent, causing:
- Significant financial friction
- Psychological stress during house hunting
- Extended vacancy periods for landlords
- Opacity in rental transactions

### Our Solution

A transparent, technology-driven marketplace that puts landlords and tenants in direct control of their rental transactions.

---

## 🚀 Features

### For Tenants
- Browse verified property listings
- Connect directly with landlords
- Secure escrow payments
- Digital lease agreements
- Neighborhood insights

### For Landlords
- List properties for free
- Verified tenant profiles
- Automated rent collection
- Property management tools
- Reduced vacancy periods

---

## 🛠️ Tech Stack

| Category | Technology |
|----------|------------|
| Framework | Next.js 14 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS |
| Animations | Framer Motion |
| Forms | React Hook Form + Zod |
| Deployment | Vercel |
| Analytics | Google Analytics (planned) |

---

## 📁 Project Structure

```
directrent-website/
├── docs/                    # Documentation
│   ├── roles/               # Claude Code role instructions
│   ├── ARCHITECTURE.md
│   ├── PRD.md
│   └── STYLE_GUIDE.md
├── public/                  # Static assets
├── src/
│   ├── app/                 # Next.js App Router pages
│   ├── components/          # React components
│   │   ├── ui/              # Base UI components
│   │   ├── layout/          # Layout components
│   │   ├── sections/        # Page sections
│   │   └── forms/           # Form components
│   ├── lib/                 # Utilities
│   ├── hooks/               # Custom hooks
│   ├── types/               # TypeScript types
│   └── styles/              # Additional styles
├── tests/                   # Test files
├── CLAUDE.md                # Claude Code instructions
└── README.md                # This file
```

---

## 🏁 Getting Started

### Prerequisites

- Node.js 18.17 or later
- npm (comes with Node.js)
- Git
- VS Code (recommended)
- Claude Code extension

### Installation

1. **Clone the repository**
   ```powershell
   git clone https://github.com/[your-username]/directrent-website.git
   cd directrent-website
   ```

2. **Install dependencies**
   ```powershell
   npm install
   ```

3. **Set up environment variables**
   ```powershell
   Copy-Item .env.example .env.local
   ```
   Then edit `.env.local` with your values.

4. **Start the development server**
   ```powershell
   npm run dev
   ```

5. **Open in browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

---

## 📝 Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |
| `npm run format` | Format code with Prettier |
| `npm run type-check` | Run TypeScript compiler check |
| `npm test` | Run unit tests |
| `npm run test:e2e` | Run end-to-end tests |

---

## 🎨 Design System

### Colors

| Name | Hex | Usage |
|------|-----|-------|
| Primary Dark | `#1A0A0A` | Backgrounds |
| Primary Medium | `#2D1515` | Cards, sections |
| Accent Gold | `#D4A853` | Highlights, secondary CTAs |
| Accent Coral | `#E85A4F` | Primary buttons, links |
| White | `#FFFFFF` | Text on dark backgrounds |

### Typography

- **Headlines:** Outfit
- **Body:** Inter
- **Base size:** 16px
- **Scale:** 1.25 (Major Third)

---

## 🚢 Deployment

### Vercel (Recommended)

1. **Connect Repository**
   - Go to [vercel.com](https://vercel.com)
   - Import your GitHub repository
   - Vercel auto-detects Next.js

2. **Configure Environment Variables**
   - Add all variables from `.env.example`
   - Set for Production, Preview, and Development

3. **Deploy**
   - Push to `main` branch for automatic deployment
   - Pull requests create preview deployments

### Custom Domain Setup

1. In Vercel Dashboard, go to Settings → Domains
2. Add `directrent.ng`
3. Configure DNS records as instructed
4. SSL is automatically provisioned

---

## 🧪 Testing

### Unit Tests
```powershell
npm test
```

### E2E Tests
```powershell
npm run test:e2e
```

### Accessibility Testing
- Run Lighthouse audit in Chrome DevTools
- Use axe DevTools browser extension

---

## 📊 Performance Targets

| Metric | Target |
|--------|--------|
| Lighthouse Performance | 90+ |
| Lighthouse Accessibility | 95+ |
| Lighthouse Best Practices | 95+ |
| Lighthouse SEO | 100 |
| First Contentful Paint | < 1.5s |
| Largest Contentful Paint | < 2.5s |
| Total Blocking Time | < 200ms |
| Cumulative Layout Shift | < 0.1 |

---

## 🤝 Contributing

We use Claude Code for development. See `CLAUDE.md` for detailed instructions.

### Quick Start for Contributors

1. Read `CLAUDE.md` thoroughly
2. Check `/docs/roles/` for role-specific guidance
3. Follow the branch naming convention
4. Write tests for new features
5. Ensure all checks pass before PR

---

## 📄 License

This project is proprietary software owned by Directrent.ng. All rights reserved.

---

## 📞 Contact

- **Website:** [directrent.ng](https://directrent.ng)
- **Email:** hello@directrent.ng
- **Location:** Lagos, Nigeria

---

## 🙏 Acknowledgments

- Rome Business School — MBA Capstone Program
- Anthropic Claude — Development assistance
- Vercel — Hosting and deployment

---

<p align="center">
  Made with ❤️ in Lagos, Nigeria
</p>
