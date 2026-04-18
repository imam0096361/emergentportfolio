# 🚀 ASTRA CORE Portfolio - Deployment Guide

## Netlify Deployment (Recommended for Frontend-Only)

### Option 1: Deploy via Netlify Dashboard

1. **Save to GitHub**:
   - Use Emergent's "Save to GitHub" button
   - This will push your code to your GitHub repository

2. **Connect to Netlify**:
   - Go to [netlify.com](https://netlify.com)
   - Click "Add new site" → "Import an existing project"
   - Connect your GitHub account
   - Select your repository

3. **Build Settings** (Auto-detected from netlify.toml):
   - Build command: `cd frontend && yarn install --frozen-lockfile && DISABLE_ESLINT_PLUGIN=true CI=false yarn build`
   - Publish directory: `frontend/build`
   - These are already configured in `netlify.toml`

4. **Deploy**:
   - Click "Deploy site"
   - Your site will be live in 2-3 minutes!

### Option 2: Deploy via Netlify CLI

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Login to Netlify
netlify login

# Initialize and deploy
netlify init

# Or deploy directly
netlify deploy --prod
```

---

## Vercel Deployment (Alternative)

### Via Vercel Dashboard

1. **Save to GitHub** (use Emergent button)

2. **Import to Vercel**:
   - Go to [vercel.com](https://vercel.com)
   - Click "Add New" → "Project"
   - Import your GitHub repository

3. **Configure** (Auto-detected from vercel.json):
   - Framework Preset: Create React App
   - Build Command: `cd frontend && yarn install --frozen-lockfile && DISABLE_ESLINT_PLUGIN=true CI=false yarn build`
   - Output Directory: `frontend/build`

4. **Deploy**: Click "Deploy"

---

## Emergent Native Deployment (FREE & Easiest)

**The simplest option - no external service needed!**

1. Click the **Deploy** button in Emergent chat
2. Your app will be live at: `https://your-app-name.emergent.sh`
3. Free HTTPS, auto-scaling, zero configuration

**Advantages:**
- ✅ Free deployment
- ✅ Automatic HTTPS
- ✅ No GitHub required
- ✅ One-click deployment
- ✅ Built-in monitoring

---

## Troubleshooting

### Build Fails on Netlify/Vercel

**Issue**: "Module not found" or "Build failed"

**Solution**:
```bash
# Make sure all dependencies are in package.json
cd frontend
yarn install
```

### Blank Page After Deployment

**Issue**: White screen or "Cannot GET /" error

**Solution**: 
- Netlify: Check `netlify.toml` has SPA redirect rule ✅ (Already configured)
- Vercel: Check `vercel.json` has rewrite rules ✅ (Already configured)

### 3D Scene Not Loading

**Issue**: Black screen instead of 3D hero

**Solution**: 
- Check browser console for WebGL errors
- Ensure React Three Fiber dependencies are installed
- Try on a different browser (Chrome/Edge recommended)

---

## Environment Variables

If you add backend integration later, set these in Netlify/Vercel dashboard:

```
REACT_APP_BACKEND_URL=https://your-backend-api.com
```

---

## Custom Domain Setup

### Netlify:
1. Go to Site settings → Domain management
2. Add your custom domain: `imamchowdhury.com`
3. Update DNS records as instructed

### Vercel:
1. Go to Project Settings → Domains
2. Add your custom domain
3. Configure DNS

---

## Performance Tips

- ✅ Already optimized: Static assets cached for 1 year
- ✅ Already optimized: Gzip compression enabled
- ✅ Already optimized: Code splitting via React lazy loading
- ✅ Production build minified and optimized

---

## Need Help?

- Netlify Docs: https://docs.netlify.com
- Vercel Docs: https://vercel.com/docs
- Emergent Support: Use the support agent in chat

**Your portfolio is ready to go live! 🎉**
