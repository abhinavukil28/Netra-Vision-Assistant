# Quick Deployment Instructions

Your app is built and ready to deploy! Follow these steps:

## Option 1: Deploy to Vercel (Recommended - Easiest)

### Step 1: Login to Vercel
```bash
npx vercel login
```
This will open a browser window for you to login with GitHub, GitLab, or email.

### Step 2: Deploy
```bash
npx vercel --prod
```

That's it! Vercel will give you a URL where your app is live.

---

## Option 2: Deploy to Netlify

### Step 1: Install Netlify CLI
```bash
npm install -g netlify-cli
```

### Step 2: Login
```bash
netlify login
```

### Step 3: Deploy
```bash
netlify deploy --prod --dir=dist
```

---

## Option 3: Deploy via GitHub (Easiest - No CLI needed)

1. **Push your code to GitHub:**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin YOUR_GITHUB_REPO_URL
   git push -u origin main
   ```

2. **Connect to Vercel:**
   - Go to https://vercel.com
   - Click "Add New Project"
   - Import your GitHub repository
   - Vercel will auto-detect settings and deploy!

3. **Or connect to Netlify:**
   - Go to https://netlify.com
   - Click "Add new site" → "Import an existing project"
   - Connect GitHub and select your repo
   - Set build command: `npm run build`
   - Set publish directory: `dist`
   - Click "Deploy site"

---

## Important: Backend Server Deployment

Your app needs the backend server running. You have two options:

### Option A: Deploy Backend Separately
Deploy `server/` folder to:
- **Railway** (https://railway.app) - Easy, free tier
- **Render** (https://render.com) - Easy, free tier  
- **Heroku** (https://heroku.com) - Free tier available
- **DigitalOcean App Platform**

Then update the API URL in `services/geminiService.ts` to point to your deployed backend.

### Option B: Use Vercel Serverless Functions
Convert your Express server to Vercel serverless functions.

---

## After Deployment

1. **Update API URL** (if backend is on different server):
   Edit `services/geminiService.ts` and change:
   ```typescript
   const response = await fetch("http://localhost:5001/api/gemini", {
   ```
   To:
   ```typescript
   const response = await fetch("https://your-backend-url.com/api/gemini", {
   ```

2. **Set Environment Variables:**
   - In Vercel/Netlify dashboard, add `VITE_GEMINI_API_KEY` in project settings

3. **Test PWA Installation:**
   - Visit your deployed URL on mobile
   - Android: Chrome → Menu → "Add to Home screen"
   - iOS: Safari → Share → "Add to Home Screen"

---

## Current Status

✅ App built successfully (`dist/` folder ready)
✅ Icons configured
✅ PWA manifest ready
✅ Service worker configured

Ready to deploy! 🚀

