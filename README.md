# Fill Growth Marketing

A modern, fully responsive, animated, professional marketing agency website with full backend integration.

## Tech Stack

- **Next.js 14** - React framework with App Router
- **TypeScript** - Type safety
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Animation library
- **MongoDB** - Database for storing contact form submissions
- **Nodemailer** - Email service for notifications
- **Mongoose** - MongoDB ODM

## Features

- ✅ Fully responsive design (mobile, tablet, desktop)
- ✅ Modern animations with Framer Motion
- ✅ Sticky navbar with scroll effects
- ✅ Hero section with animated headline and gradient background
- ✅ About Us section with animated stats counters
- ✅ Services Overview with 8 service cards (clickable)
- ✅ Packages page with 3 pricing tiers (Basic, Premium, Diamond)
- ✅ Premium package highlighting with glow & scale animations
- ✅ Service detail pages with Hero, Benefits, Tools, Process steps, and CTA
- ✅ Team page with profile cards
- ✅ Individual team member profile pages
- ✅ Contact page with animated form, Google map, and company info
- ✅ **Backend API routes for contact form submission**
- ✅ **MongoDB database integration**
- ✅ **Email notifications (admin + auto-reply)**
- ✅ **Form validation (client & server-side)**
- ✅ **SEO optimization with meta tags and schema markup**
- ✅ **Sitemap and robots.txt**
- ✅ **Performance optimizations**

## Getting Started

### Prerequisites

- Node.js 18+ installed
- MongoDB database (local or MongoDB Atlas)
- Email service credentials (Gmail, SendGrid, etc.)

### Installation

1. **Clone the repository**
```bash
git clone <repository-url>
cd FILL_GROWTH_MARKETING
```

2. **Install dependencies**
```bash
npm install
```

3. **Set up environment variables**

Create a `.env.local` file in the root directory:

```env
# MongoDB Connection
MONGODB_URI=mongodb://localhost:27017/fill-growth-marketing
# Or use MongoDB Atlas:
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/fill-growth-marketing

# Email Configuration (Nodemailer)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password

# Admin Email (receives contact form submissions)
ADMIN_EMAIL=admin@fillgrowthmarketing.com

# Site URL
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

**For Gmail:**
- Enable 2-factor authentication
- Generate an App Password: https://myaccount.google.com/apppasswords
- Use the app password as `SMTP_PASS`

4. **Run the development server**
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### Production Build

```bash
npm run build
npm start
```

## API Endpoints

### POST `/api/contact`
Submit contact form

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "+1234567890",
  "service": "seo",
  "message": "I need help with SEO"
}
```

**Response:**
```json
{
  "message": "Contact form submitted successfully",
  "id": "contact_id"
}
```

### GET `/api/contact`
Get all contact submissions (for admin dashboard - add authentication in production)

## Database Schema

### Contact Model
```typescript
{
  name: string (required)
  email: string (required, validated)
  phone: string (optional)
  service: string (optional)
  message: string (required)
  createdAt: Date
  updatedAt: Date
}
```

## SEO Features

- ✅ Optimized meta tags for all pages
- ✅ Open Graph tags for social sharing
- ✅ Twitter Card tags
- ✅ Schema.org structured data (Organization, WebSite, Service)
- ✅ Sitemap.xml generation
- ✅ Robots.txt configuration
- ✅ Semantic HTML structure

## Performance Optimizations

- ✅ Image optimization with Next.js Image component
- ✅ Code splitting and lazy loading
- ✅ Compressed responses
- ✅ Security headers
- ✅ Font optimization
- ✅ CSS optimization

## Brand Colors

- Primary: Deep Navy Blue #0A2540
- Secondary: Royal Blue #2563EB
- Accent: Gradient Cyan → Purple (#22D3EE → #A855F7)
- Background: Off-White / Light Gray #F8FAFC
- Text: Dark Gray #0F172A

## Project Structure

```
├── app/
│   ├── api/
│   │   └── contact/
│   │       └── route.ts          # Contact form API
│   ├── contact/
│   ├── packages/
│   ├── services/
│   ├── team/
│   ├── layout.tsx
│   ├── page.tsx
│   ├── sitemap.ts
│   └── robots.ts
├── components/
│   ├── ContactSection.tsx
│   ├── ServiceDetail.tsx
│   ├── TeamSection.tsx
│   └── ...
├── data/
│   ├── services.ts
│   └── team.ts
├── lib/
│   ├── mongodb.ts               # Database connection
│   ├── email.ts                 # Email service
│   └── seo.ts                   # SEO utilities
├── models/
│   └── Contact.ts               # Contact model
└── ...
```

## Environment Variables

See `.env.example` for all required environment variables.

## Deployment

### GitHub Pages

This project is configured for GitHub Pages deployment with automatic builds via GitHub Actions.

**Setup Instructions:**

1. **Enable GitHub Pages in your repository:**
   - Go to your repository settings
   - Navigate to "Pages" in the left sidebar
   - Under "Source", select "GitHub Actions"
   - Save the settings

2. **Push your code to GitHub:**
   ```bash
   git add .
   git commit -m "Configure for GitHub Pages"
   git push origin main
   ```

3. **The GitHub Actions workflow will automatically:**
   - Build the Next.js static site
   - Deploy to GitHub Pages
   - Your site will be available at: `https://mryamaslam.github.io/Fill_Growth_Marketing/`

**Important Notes for GitHub Pages:**
- ⚠️ **API Routes**: GitHub Pages only serves static files, so API routes (`/api/contact`) will not work. You'll need to:
  - Use a third-party form service like [Formspree](https://formspree.io/), [FormSubmit](https://formsubmit.co/), or [EmailJS](https://www.emailjs.com/)
  - Or deploy the API separately to a service like Vercel, Netlify Functions, or Railway
- The site is configured with basePath `/Fill_Growth_Marketing` for the repository name
- All images are optimized for static export
- The `.nojekyll` file prevents GitHub from processing files with Jekyll

**Manual Build (if needed):**
```bash
npm run build
# The static files will be in the 'out' directory
```

### Vercel (Recommended for Full Features)

For full backend functionality (API routes, server-side features):

1. Push your code to GitHub
2. Import project in Vercel
3. Add environment variables in Vercel dashboard
4. Deploy!

### Other Platforms

Make sure to:
- Set all environment variables
- Configure MongoDB connection
- Set up email service
- Update `NEXT_PUBLIC_SITE_URL` with your domain

## Security Notes

- Add authentication to `/api/contact` GET endpoint in production
- Use environment variables for all sensitive data
- Enable HTTPS in production
- Consider rate limiting for API endpoints
- Validate and sanitize all user inputs

## License

This project is private and proprietary.
