# Backend Server Deployment - Quick Guide

Your backend server is ready to deploy! Follow these steps:

## 🚀 Option 1: Deploy to Railway (Recommended - 2 minutes)

### Step 1: Prepare Repository
If you haven't already, initialize git and push to GitHub:
```bash
cd /Users/abhinavukil/Desktop/ai-vision-assistant\ copy
git init
git add .
git commit -m "Initial commit"
# Create a repo on GitHub, then:
git remote add origin YOUR_GITHUB_REPO_URL
git push -u origin main
```

### Step 2: Deploy on Railway
1. **Go to:** https://railway.app
2. **Click "Login"** → Sign in with GitHub
3. **Click "New Project"**
4. **Select "Deploy from GitHub repo"**
5. **Choose your repository**
6. **Configure the deployment:**
   - **Root Directory:** Set to `server` (important!)
   - Railway will auto-detect Node.js
7. **Add Environment Variable:**
   - Click on your project → **Variables** tab
   - Add variable:
     - **Name:** `VITE_GEMINI_API_KEY`
     - **Value:** Your Gemini API key (from `.env` file)
8. **Deploy!** Railway will automatically build and deploy

### Step 3: Get Your Backend URL
- After deployment, Railway will show you a URL like: `https://your-app.railway.app`
- Copy this URL - you'll need it for the frontend

---

## 🌐 Option 2: Deploy to Render (Also Easy)

1. **Go to:** https://render.com
2. **Sign up/Login** with GitHub
3. **Click "New +"** → **"Web Service"**
4. **Connect your GitHub repository**
5. **Configure:**
   - **Name:** `vision-assistant-backend`
   - **Root Directory:** `server`
   - **Environment:** `Node`
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`
6. **Add Environment Variable:**
   - **Key:** `VITE_GEMINI_API_KEY`
   - **Value:** Your Gemini API key
7. **Click "Create Web Service"**

---

## 🔄 Update Frontend After Backend Deployment

Once your backend is deployed, you need to update the frontend:

### Step 1: Update API URL
Edit `services/geminiService.ts`:

```typescript
// Find this line (around line 24):
const response = await fetch("http://localhost:5001/api/gemini", {

// Replace with your deployed backend URL:
const response = await fetch("https://your-backend-url.railway.app/api/gemini", {
```

### Step 2: Rebuild and Redeploy Frontend
```bash
npm run build
npx vercel --prod
```

---

## ✅ Test Your Deployed Backend

Test the health endpoint:
```bash
curl https://your-backend-url.railway.app/health
```

Should return: `{"status":"ok","service":"gemini-proxy-server"}`

---

## 📝 Quick Reference

**Backend Files Ready:**
- ✅ `server/index.js` - Updated for production
- ✅ `server/package.json` - Configured
- ✅ `server/.gitignore` - Created
- ✅ Environment variable support ready

**What You Need:**
- Your Gemini API key (from `.env` file)
- A GitHub repository (to connect to Railway/Render)

**After Deployment:**
- Backend URL (e.g., `https://vision-backend.railway.app`)
- Update frontend API URL
- Rebuild and redeploy frontend

---

## 🆘 Troubleshooting

**Backend not starting?**
- Check environment variable `VITE_GEMINI_API_KEY` is set
- Check logs in Railway/Render dashboard

**CORS errors?**
- Backend already has CORS enabled
- Make sure frontend URL is allowed (if needed)

**API not working?**
- Verify backend URL is correct in frontend
- Test backend health endpoint
- Check backend logs for errors

