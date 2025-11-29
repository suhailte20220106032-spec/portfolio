# Portfolio Website - Next.js 15 with Turbopack

A modern, responsive portfolio website built with Next.js 15, TypeScript, Tailwind CSS, and shadcn/ui.

## 🚀 Features

- **Next.js 15** with App Router and Turbopack for blazing-fast development
- **TypeScript** for type safety
- **Tailwind CSS** for styling
- **shadcn/ui** components for beautiful, accessible UI
- **Dark/Light/System theme** with next-themes
- **Responsive design** optimized for all devices
- **SEO optimized** with Next.js metadata API
- **Static generation** for optimal performance

## 📦 Tech Stack

- [Next.js 15](https://nextjs.org/) - React framework with Turbopack
- [TypeScript](https://www.typescriptlang.org/) - Type safety
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS
- [shadcn/ui](https://ui.shadcn.com/) - UI components
- [Radix UI](https://www.radix-ui.com/) - Unstyled, accessible components
- [TanStack Query](https://tanstack.com/query) - Data fetching
- [React Hook Form](https://react-hook-form.com/) - Form handling
- [Zod](https://zod.dev/) - Schema validation
- [Lucide React](https://lucide.dev/) - Icons

## 🛠️ Getting Started

### Prerequisites

- Node.js 18+ and npm

### Installation

```bash
# Clone the repository
git clone <YOUR_GIT_URL>

# Navigate to the project directory
cd suhail-s-ui-clone

# Install dependencies
npm install

# Start the development server with Turbopack
npm run dev
```

The application will be available at `http://localhost:3000`

## 📜 Available Scripts

```bash
# Development server with Turbopack (ultra-fast)
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run ESLint
npm run lint
```

## 📁 Project Structure

```
src/
├── app/                      # Next.js app directory
│   ├── layout.tsx           # Root layout
│   ├── page.tsx             # Home page
│   ├── providers.tsx        # Client-side providers
│   ├── globals.css          # Global styles
│   ├── about/               # About pages
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   ├── skills/
│   │   ├── timeline/
│   │   └── certificates/
│   ├── portfolio/           # Portfolio page
│   ├── blog/                # Blog page
│   ├── contact/             # Contact page
│   └── not-found.tsx        # 404 page
├── components/              # React components
│   ├── ui/                  # shadcn/ui components
│   ├── Navigation.tsx
│   ├── Footer.tsx
│   └── NavLink.tsx
├── contexts/                # React contexts
│   └── ThemeContext.tsx
├── hooks/                   # Custom hooks
└── lib/                     # Utility functions
public/                      # Static assets
```

## 🎨 Customization

### Theme

The website supports dark, light, and system themes. Theme switching is handled by the `ThemeContext` and uses CSS variables defined in `globals.css`.

### Content

Update the content in the page files:
- Home: `src/app/page.tsx`
- About: `src/app/about/page.tsx`
- Skills: `src/app/about/skills/page.tsx`
- Timeline: `src/app/about/timeline/page.tsx`
- Certificates: `src/app/about/certificates/page.tsx`
- Portfolio: `src/app/portfolio/page.tsx`
- Blog: `src/app/blog/page.tsx`
- Contact: `src/app/contact/page.tsx`

### Styling

Modify Tailwind configuration in `tailwind.config.ts` and CSS variables in `src/app/globals.css`.

## 📝 Migration Notes

This project was migrated from Vite to Next.js 15. See [MIGRATION_SUMMARY.md](./MIGRATION_SUMMARY.md) for detailed information about the migration process.

## 🚀 Deployment

### Vercel (Recommended)

The easiest way to deploy is using [Vercel](https://vercel.com):

```bash
npm install -g vercel
vercel
```

### Other Platforms

- Build the app: `npm run build`
- The output will be in the `.next` folder
- Deploy following your platform's Node.js deployment guide

## 📄 License

This project is open source and available under the MIT License.
