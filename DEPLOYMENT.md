# Deployment Guide

WanderLens is configured for static export and can be deployed to various hosting platforms.

## Quick Deploy Options

### Vercel (Recommended)
1. Push your code to GitHub
2. Connect your GitHub repo to Vercel
3. Vercel will automatically detect Next.js and deploy

### Netlify
1. Build the project: `npm run build`
2. Upload the `/out` folder to Netlify
3. Or connect your GitHub repo for automatic deployments

### GitHub Pages
1. Build the project: `npm run build`
2. Push the `/out` folder contents to a `gh-pages` branch
3. Enable GitHub Pages in repository settings

## Build Process

The project uses Next.js static export:

```bash
npm run build    # Builds and exports static files to /out
npm run start    # Serves the built files locally
```

## Environment Variables

For production deployment with real APIs, you'll need:

```env
# OpenAI API (for image analysis)
OPENAI_API_KEY=your_openai_key

# Travel APIs
AMADEUS_API_KEY=your_amadeus_key
BOOKING_API_KEY=your_booking_key
GOOGLE_MAPS_API_KEY=your_maps_key

# Database (if needed)
DATABASE_URL=your_database_url
```

## Performance Optimizations

The build includes:
- ✅ Static HTML generation
- ✅ CSS optimization with Tailwind
- ✅ Image optimization disabled (for static export)
- ✅ Bundle splitting and tree shaking
- ✅ Minification and compression

## CDN Configuration

For optimal performance, configure your CDN to:
- Cache static assets (JS, CSS, images) for 1 year
- Cache HTML files for 1 hour
- Enable gzip/brotli compression
- Set proper MIME types

## Monitoring

Consider adding:
- Google Analytics for user tracking
- Sentry for error monitoring
- Lighthouse CI for performance monitoring

## Custom Domain

Most hosting providers support custom domains:
1. Add your domain in the hosting platform settings
2. Update your DNS records to point to the hosting provider
3. Enable HTTPS (usually automatic)

## Troubleshooting

### Build Errors
- Ensure all dependencies are installed: `npm install`
- Check for TypeScript errors: `npm run typecheck`
- Verify static export compatibility

### Runtime Errors
- Check browser console for JavaScript errors
- Verify all images and assets are accessible
- Test on different devices and browsers

### Performance Issues
- Run Lighthouse audit
- Check bundle size with `npm run build`
- Optimize images and reduce bundle size if needed