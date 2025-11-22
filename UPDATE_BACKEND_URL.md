# Update Backend URL

## Quick Update Steps

Once you have your Railway backend URL, update it in one of these ways:

### Option 1: Environment Variable (Recommended for Production)

1. **In Vercel Dashboard:**
   - Go to your project: https://vercel.com/abhinav-ukils-projects/vision-assistant
   - Go to **Settings** → **Environment Variables**
   - Add new variable:
     - **Name:** `VITE_API_BASE_URL`
     - **Value:** `https://your-backend-url.railway.app`
   - **Redeploy** your frontend

### Option 2: Update Code Directly

Edit `services/geminiService.ts` and replace:
```typescript
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5001";
```

With:
```typescript
const API_BASE_URL = "https://your-backend-url.railway.app";
```

Then rebuild and redeploy:
```bash
npm run build
npx vercel --prod
```

---

## Current Configuration

The code now supports:
- **Development:** Uses `http://localhost:5001` when `VITE_API_BASE_URL` is not set
- **Production:** Uses `VITE_API_BASE_URL` environment variable if set

This allows you to:
- Develop locally with local backend
- Deploy with production backend URL via environment variable

