# Fenix Flooring Website

SEO-first, lead-generation website for Fenix Flooring - a commercial flooring contractor specializing in turnkey demo, prep, and installation services.

## Tech Stack

- **Astro** - Static site generator for performance
- **Tailwind CSS** - Utility-first CSS framework
- **TypeScript** - Type safety
- **Netlify** - Hosting and form handling

## Getting Started

### Prerequisites

- Node.js 18+ and npm

### Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

The site will be available at `http://localhost:4321`

### Build

Build the site for production:
```bash
npm run build
```

The built site will be in the `dist/` directory.

### Preview

Preview the production build locally:
```bash
npm run preview
```

## Deployment to Netlify

### Option 1: Deploy via Netlify UI

1. Push your code to a Git repository (GitHub, GitLab, or Bitbucket)
2. Log in to [Netlify](https://app.netlify.com)
3. Click "Add new site" → "Import an existing project"
4. Connect your repository
5. Netlify will auto-detect the build settings:
   - **Build command:** `npm run build`
   - **Publish directory:** `dist`
6. Click "Deploy site"

### Option 2: Deploy via Netlify CLI

1. Install Netlify CLI:
```bash
npm install -g netlify-cli
```

2. Build the site:
```bash
npm run build
```

3. Deploy:
```bash
netlify deploy --prod
```

### Netlify Forms

The contact/quote form is configured to work with Netlify Forms. After deploying to Netlify:

1. Forms will automatically be detected
2. Form submissions will appear in the Netlify dashboard under "Forms"
3. You can set up email notifications in Netlify settings

## Configuration

### Updating Site Information

Edit `src/config/site.ts` to update:
- Business name and domain
- Contact information (phone, email)
- Address
- Service area
- Social media links

### Updating Schema Data

The site uses JSON-LD schema for SEO. Schema is automatically generated using utilities in `src/utils/schema.ts`. Update business information in `src/config/site.ts` and the schema will reflect those changes.

## Project Structure

```
fenix-flooring-test/
├── public/           # Static assets (robots.txt, etc.)
├── src/
│   ├── components/   # Reusable components (Header, Footer, etc.)
│   ├── config/       # Site configuration
│   ├── layouts/      # Page layouts
│   ├── pages/        # Page files (auto-routed)
│   └── utils/        # Utility functions (schema generation)
├── astro.config.mjs  # Astro configuration
├── tailwind.config.mjs # Tailwind configuration
└── package.json
```

## SEO Features

- ✅ Unique `<title>` and meta descriptions on every page
- ✅ Canonical tags
- ✅ OpenGraph and Twitter Card meta tags
- ✅ JSON-LD schema (Organization, LocalBusiness, WebSite, BreadcrumbList, Service, FAQPage)
- ✅ Semantic HTML with proper heading hierarchy
- ✅ Auto-generated sitemap.xml
- ✅ robots.txt

## Pages

### Core Pages
- `/` - Home page
- `/services/` - Services hub
- `/services/*` - Individual service pages
- `/flooring/` - Flooring types hub
- `/flooring/*` - Individual flooring type pages
- `/industries/` - Industries hub
- `/industries/*` - Individual industry pages

### Content Pages
- `/resources/` - Resources hub
- `/resources/*` - Resource articles
- `/case-studies/` - Case studies list
- `/case-studies/*` - Individual case studies

### Utility Pages
- `/about/` - About page
- `/contact/` - Contact page with quote form
- `/privacy/` - Privacy policy
- `/thank-you/` - Form submission thank you page
- `/404/` - 404 error page

## Forms

The quote request form is integrated with Netlify Forms. Form fields include:
- Name, Company, Email, Phone
- Project Address (optional)
- Project Type
- Flooring Type Needed
- Approx Sq Ft (optional)
- Timeline
- Message

Form submissions are handled by Netlify and can be configured to send email notifications.

## Performance

The site is optimized for performance:
- Static site generation (SSG)
- Minimal JavaScript
- Optimized images (when added)
- Fast page loads
- SEO-friendly structure

## Browser Support

Modern browsers (Chrome, Firefox, Safari, Edge) - latest 2 versions.

## License

Proprietary - Fenix Flooring

## Support

For questions or issues, contact the development team or refer to the [Astro documentation](https://docs.astro.build).
