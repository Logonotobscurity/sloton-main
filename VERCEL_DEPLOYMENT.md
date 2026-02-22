# Vercel Deployment Guide

## Overview
This project is configured for deployment on Vercel, the platform built by the creators of Next.js.

## Quick Deploy

### Option 1: Deploy via Vercel Dashboard (Recommended)

1. **Sign up/Login to Vercel**
   - Go to https://vercel.com
   - Sign up or login with your GitHub account

2. **Import Your Repository**
   - Click "Add New..." → "Project"
   - Select your GitHub repository: `Logonotobscurity/sloton-main`
   - Vercel will automatically detect it's a Next.js project

3. **Configure Environment Variables**
   Add these environment variables in the Vercel dashboard:
   ```
   NEXT_PUBLIC_SITE_URL=https://your-project.vercel.app
   GEMINI_API_KEY=your_gemini_api_key_here
   ```

4. **Deploy**
   - Click "Deploy"
   - Vercel will build and deploy your site automatically
   - You'll get a production URL like: `https://logonsolutions.vercel.app`

### Option 2: Deploy via Vercel CLI

1. **Install Vercel CLI**
   ```bash
   npm install -g vercel
   ```

2. **Login to Vercel**
   ```bash
   vercel login
   ```

3. **Deploy**
   ```bash
   # For preview deployment
   vercel
   
   # For production deployment
   vercel --prod
   ```

## Configuration

### vercel.json
The project includes a `vercel.json` configuration file with:
- Build settings
- Security headers
- Environment variables
- Region configuration (US East)

### Environment Variables
Required environment variables:
- `NEXT_PUBLIC_SITE_URL`: Your production URL
- `GEMINI_API_KEY`: Your Google Gemini API key (optional)

### Build Settings
- **Framework**: Next.js (auto-detected)
- **Build Command**: `npm run build`
- **Output Directory**: `.next`
- **Install Command**: `npm install`
- **Dev Command**: `npm run dev`

## Automatic Deployments

Once connected to GitHub, Vercel will automatically:
- Deploy every push to the `master` branch (production)
- Create preview deployments for pull requests
- Run builds and tests before deployment

## Custom Domain

To add a custom domain:
1. Go to your project settings in Vercel
2. Navigate to "Domains"
3. Add your custom domain
4. Follow the DNS configuration instructions

## Performance Features

Vercel provides:
- ✅ Global CDN
- ✅ Automatic HTTPS
- ✅ Edge caching
- ✅ Image optimization
- ✅ Serverless functions
- ✅ Analytics (optional)
- ✅ Web Vitals monitoring

## Deployment Status

After deployment, you can:
- View deployment logs in the Vercel dashboard
- Monitor performance metrics
- Set up custom domains
- Configure preview deployments

## Troubleshooting

### Build Fails
1. Check the build logs in Vercel dashboard
2. Ensure all environment variables are set
3. Test the build locally: `npm run build`

### Environment Variables Not Working
1. Make sure variables are added in Vercel dashboard
2. Redeploy after adding new variables
3. Check variable names match exactly

### TypeScript Errors
1. Run `npm run typecheck` locally
2. Fix any type errors before pushing
3. Ensure all dependencies are installed

## Migration from Netlify

✅ Removed Netlify configuration files:
- `netlify.toml` (deleted)
- `.github/workflows/deploy-netlify.yml` (deleted)

✅ Added Vercel configuration:
- `vercel.json` (created)
- `.vercelignore` (created)

## Next Steps

1. Push the changes to GitHub:
   ```bash
   git add .
   git commit -m "chore: Migrate from Netlify to Vercel"
   git push origin master
   ```

2. Go to https://vercel.com and import your repository

3. Configure environment variables

4. Deploy!

## Support

- Vercel Documentation: https://vercel.com/docs
- Next.js on Vercel: https://vercel.com/docs/frameworks/nextjs
- Vercel Support: https://vercel.com/support

---

**Deployment URL**: https://logonsolutions.vercel.app (after setup)
**Status**: Ready for deployment
**Last Updated**: 2026-02-21
