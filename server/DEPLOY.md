# Backend Server Deployment Guide

## Quick Deploy Options

### Option 1: Railway (Easiest - Recommended)

1. **Go to Railway:** https://railway.app
2. **Sign up/Login** with GitHub
3. **Click "New Project"** → **"Deploy from GitHub repo"**
4. **Select your repository** (or create one and push the `server/` folder)
5. **Set Root Directory** to `server` (if deploying from monorepo)
6. **Add Environment Variable:**
   - Variable: `VITE_GEMINI_API_KEY`
   - Value: Your Gemini API key
7. **Deploy!** Railway will automatically detect Node.js and deploy

**After deployment:**
- Railway will give you a URL like: `https://your-app.railway.app`
- Update your frontend to use this URL instead of `localhost:5001`

---

### Option 2: Render (Also Easy)

1. **Go to Render:** https://render.com
2. **Sign up/Login** with GitHub
3. **Click "New +"** → **"Web Service"**
4. **Connect your GitHub repository**
5. **Configure:**
   - **Name:** vision-assistant-backend
   - **Root Directory:** server
   - **Environment:** Node
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`
6. **Add Environment Variable:**
   - Key: `VITE_GEMINI_API_KEY`
   - Value: Your Gemini API key
7. **Deploy!**

**After deployment:**
- Render will give you a URL like: `https://vision-assistant-backend.onrender.com`
- Update your frontend to use this URL

---

### Option 3: Using Railway CLI

```bash
# Install Railway CLI
npm install -g @railway/cli

# Login
railway login

# Initialize project
cd server
railway init

# Add environment variable
railway variables set VITE_GEMINI_API_KEY=your_api_key_here

# Deploy
railway up
```

---

## Update Frontend After Deployment

Once your backend is deployed, update `services/geminiService.ts`:

```typescript
// Change from:
const response = await fetch("http://localhost:5001/api/gemini", {

// To:
const response = await fetch("https://your-backend-url.com/api/gemini", {
```

Then rebuild and redeploy your frontend:
```bash
npm run build
npx vercel --prod
```

---

## Environment Variables Needed

- `VITE_GEMINI_API_KEY` - Your Gemini API key (required)
- `PORT` - Automatically set by hosting platform (no need to set manually)

---

## Testing the Deployed Backend

Test the health endpoint:
```bash
curl https://your-backend-url.com/health
```

Should return: `{"status":"ok","service":"gemini-proxy-server"}`

