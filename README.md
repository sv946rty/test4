# Testimora Web

A modern Next.js 15 application with Tailwind CSS v4 and ShadCN UI components.

## Features

- **Next.js 15** - Latest React framework with App Router
- **Tailwind CSS v4** - Zero-config setup with new features
- **ShadCN UI** - Beautiful, accessible components
- **Dark Mode** - Seamless light/dark theme switching
- **Custom Primary Color** - #794bff purple theme
- **TypeScript** - Full type safety

## Tech Stack

- **Framework**: Next.js 15.4.5
- **Styling**: Tailwind CSS v4 (zero-config)
- **Components**: ShadCN UI with Radix UI primitives
- **Theme**: next-themes for dark mode
- **Icons**: Lucide React
- **Package Manager**: pnpm

## Getting Started

### Prerequisites

- Node.js 18+
- pnpm (recommended) or npm

### Installation

1. Clone the repository

```bash
git clone <repository-url>
cd testimora-web
```

2. Install dependencies

```bash
pnpm install
```

3. Start the development server

```bash
pnpm dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

```
testimora-web/
├── src/
│   ├── app/
│   │   ├── globals.css          # Tailwind v4 + CSS variables
│   │   ├── layout.tsx           # Root layout with ThemeProvider
│   │   └── page.tsx             # Landing page
│   ├── components/
│   │   ├── ui/
│   │   │   └── button.tsx       # ShadCN UI Button component
│   │   ├── theme-provider.tsx   # Theme provider wrapper
│   │   └── theme-toggle.tsx     # Dark mode toggle
│   └── lib/
│       └── utils.ts             # Utility functions (cn)
├── public/                      # Static assets
└── package.json
```

## Key Features

### Tailwind CSS v4 Setup

- **Zero-config**: No `tailwind.config.ts` required
- **CSS Variables**: All colors defined in `globals.css`
- **Primary Color**: Custom #794bff purple theme
- **Dark Mode**: Automatic system preference detection

### ShadCN UI Components

- **Button**: Multiple variants (default, secondary, outline, ghost, link, destructive)
- **Theme Toggle**: Animated sun/moon icon with smooth transitions
- **Responsive Design**: Mobile-first approach

### Theme System

- **Light/Dark Mode**: Toggle in top-right corner
- **System Preference**: Automatically detects OS theme
- **Smooth Transitions**: No flash on page load
- **CSS Variables**: Consistent theming across components

## Customization

### Primary Color

The primary color (#794bff) is defined in `src/app/globals.css`:

```css
:root {
  --primary: #794bff;
  --primary-foreground: #ffffff;
}
```

### Adding New Components

1. Create component in `src/components/ui/`
2. Use the `cn` utility for class merging
3. Follow ShadCN UI patterns for consistency

### Theme Variables

All theme colors are defined in `globals.css`:

- `--primary`: Main brand color
- `--background`: Page background
- `--foreground`: Text color
- `--card`: Card backgrounds
- `--border`: Border colors
- And more...

## Development

### Available Scripts

- `pnpm dev` - Start development server
- `pnpm build` - Build for production
- `pnpm start` - Start production server
- `pnpm lint` - Run ESLint

### Code Quality

- **TypeScript**: Full type safety
- **ESLint**: Code linting with Next.js config
- **Prettier**: Code formatting (if configured)

## Deployment

The application is ready for deployment on Vercel, Netlify, or any other platform that supports Next.js.

### Build Output

```bash
pnpm build
```

This creates an optimized production build in the `.next` directory.

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is open source and available under the [MIT License](LICENSE).
