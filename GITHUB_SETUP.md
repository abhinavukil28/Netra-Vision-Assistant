# GitHub Repository Setup - Step by Step

## ✅ Step 1: Create Repository on GitHub

1. **Go to GitHub:** https://github.com
2. **Click the "+" icon** (top right) → **"New repository"**
3. **Fill in the details:**
   - **Repository name:** `vision-assistant` (or any name you prefer)
   - **Description:** `AI-Powered Vision Assistant for Visually Impaired Users`
   - **Visibility:** Choose Public or Private
   - **⚠️ IMPORTANT:** Do NOT check "Initialize with README" (we already have files)
   - **Do NOT** add .gitignore or license (we already have them)
4. **Click "Create repository"**

## ✅ Step 2: Copy Your Repository URL

After creating the repo, GitHub will show you a URL like:
- `https://github.com/YOUR_USERNAME/vision-assistant.git`

**Copy this URL** - you'll need it in the next step.

## ✅ Step 3: Connect and Push Your Code

Run these commands (replace YOUR_USERNAME and REPO_NAME with your actual values):

```bash
cd /Users/abhinavukil/Desktop/ai-vision-assistant\ copy

# Add your GitHub repository as remote
git remote add origin https://github.com/YOUR_USERNAME/REPO_NAME.git

# Push your code to GitHub
git branch -M main
git push -u origin main
```

## 🎉 Done!

Your code is now on GitHub! You can now:
- Deploy backend to Railway/Render
- Deploy frontend to Vercel (already done, but you can connect GitHub for auto-deploy)

---

## Quick Command Reference

If you need to update your code later:
```bash
git add .
git commit -m "Your commit message"
git push
```

