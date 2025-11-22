# Railway Port Configuration

## Quick Answer

When Railway asks for the port, you have two options:

### Option 1: Leave it blank or use PORT variable
Railway automatically sets the `PORT` environment variable. Your app reads it with:
```javascript
const PORT = process.env.PORT || 5001;
```

So you can:
- **Leave the port field blank** - Railway will auto-detect
- Or enter: **`$PORT`** (Railway will substitute the actual port)

### Option 2: Check Railway Service Settings
1. Go to your Railway project
2. Click on your service
3. Go to **Settings** tab
4. Look for **"Port"** or check the **"Deploy Logs"**
5. You'll see something like: `Listening on port 3000` or similar

Common Railway ports:
- `3000` (default for Node.js)
- `5000`
- `8080`

---

## How to Find Your Port

### Method 1: Check Deployment Logs
1. In Railway dashboard → Your service
2. Click **"Deploy Logs"** or **"View Logs"**
3. Look for: `Gemini proxy server running on port XXXX`
4. That's your port number!

### Method 2: Check Service Settings
1. Railway dashboard → Your service → **Settings**
2. Look for **"Port"** field
3. It should show the assigned port

### Method 3: Use Railway's Default
If unsure, try: **`3000`** (Railway's default for Node.js apps)

---

## After Setting Port

Once you set the port and generate the domain, Railway will give you a URL like:
- `https://your-app.railway.app`

This is your backend URL that you'll use in the frontend!

