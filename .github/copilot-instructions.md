# AI Agent Instructions for ArthTechnologies Site

## Project Overview
This is a SvelteKit-based website using Vite, TailwindCSS, and DaisyUI. The site serves as a company platform with various features including analytics, documentation, and hosting services.

## Architecture

### Core Technologies
- **Framework**: SvelteKit with TypeScript support
- **Styling**: TailwindCSS + DaisyUI
- **Build Tool**: Vite
- **Dependencies**: 
  - Chart.js for data visualization
  - Appwrite for backend services
  - Marked for markdown processing
  - SCSS for additional styling

### Directory Structure
- `/src/routes/` - SvelteKit file-based routing
- `/src/lib/` - Shared components and utilities
  - `/components/` - Reusable UI components
  - `/scripts/` - Utility functions and i18n
  - `/stores/` - Svelte stores for state management
  - `/styles/` - Global SCSS styles

## Key Development Patterns

### Internationalization
- Localization files are stored in `/src/lib/scripts/locales/`
- i18n logic is managed through `i18n.ts`
- Always use translation keys for text content

### Component Organization
- Layout components: `/src/lib/components/layout/`
- UI components: `/src/lib/components/ui/`
- Landing page specific components: `/src/lib/components/ui/landing/`

### Analytics Implementation
Analytics tracking is implemented in `+layout.svelte` with:
- DoNotTrack respect
- Local storage-based opt-out
- A/B testing support for landing pages
- Analytics endpoint: `https://ocelot.arthmc.xyz/analytics/`

### Theme Management
- Uses theme-change library
- Theme switching logic must be initialized in onMount
- Example:
```typescript
onMount(() => {
  themeChange(false);  // false parameter required for Svelte
});
```

## Development Workflow

### Common Commands
```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run preview  # Preview production build
npm run check    # Type-check the codebase
```

### File Creation Conventions
1. Route pages go in `/src/routes/` following SvelteKit conventions
2. New components should be categorized under appropriate `/src/lib/components/` subdirectories
3. Use `.svelte` extension for components, `.ts` for utilities
4. SCSS modules should be imported in components that use them

## Integration Points
- Appwrite backend integration
- Analytics service communication
- RSS feed generation (`/static/rss.xml`)
- Sitemap generation (`/static/sitemap.xml`)

## Common Patterns to Follow
1. Use Svelte stores for global state management
2. Layout components handle page structure and theming
3. Implement responsive design using Tailwind breakpoints
4. Always respect user privacy settings for analytics
5. Use DaisyUI components for consistent UI elements

## Key Files to Reference
- `/src/routes/+layout.svelte` - Main layout and analytics setup
- `/src/lib/components/layout/Navbar.svelte` - Navigation implementation
- `/src/lib/scripts/i18n.ts` - Internationalization setup
- `/src/app.css` - Global styles and Tailwind configuration