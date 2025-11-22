# Push Code to GitHub - Authentication Required

Your code is ready to push, but you need to authenticate with GitHub first.

## Option 1: Use Personal Access Token (Easiest)

### Step 1: Create a Personal Access Token
1. Go to: https://github.com/settings/tokens
2. Click **"Generate new token"** → **"Generate new token (classic)"**
3. Give it a name: `Netra Vision Assistant`
4. Select scopes: Check **`repo`** (full control of private repositories)
5. Click **"Generate token"**
6. **⚠️ IMPORTANT:** Copy the token immediately (you won't see it again!)

### Step 2: Push Using Token
When you run the push command, it will ask for:
- **Username:** `abhinavukil28`
- **Password:** Paste your personal access token (NOT your GitHub password)

Run:
```bash
cd /Users/abhinavukil/Desktop/ai-vision-assistant\ copy
git push -u origin main
```

---

## Option 2: Use SSH (More Secure)

### Step 1: Check for SSH Key
```bash
ls -la ~/.ssh/id_*.pub
```

If you see a file, you have an SSH key. If not, create one:
```bash
ssh-keygen -t ed25519 -C "your_email@example.com"
# Press Enter to accept default location
# Press Enter twice for no passphrase (or set one)
```

### Step 2: Add SSH Key to GitHub
1. Copy your public key:
   ```bash
   cat ~/.ssh/id_ed25519.pub
   ```
2. Go to: https://github.com/settings/keys
3. Click **"New SSH key"**
4. Paste your key and save

### Step 3: Change Remote to SSH
```bash
cd /Users/abhinavukil/Desktop/ai-vision-assistant\ copy
git remote set-url origin git@github.com:abhinavukil28/Netra-Vision-Assistant.git
git push -u origin main
```

---

## Option 3: Use GitHub CLI (Alternative)

```bash
# Install GitHub CLI (if not installed)
brew install gh

# Login
gh auth login

# Push
git push -u origin main
```

---

## Quick Command Reference

After setting up authentication, run:
```bash
cd /Users/abhinavukil/Desktop/ai-vision-assistant\ copy
git push -u origin main
```

---

## ✅ After Successful Push

Your code will be at: https://github.com/abhinavukil28/Netra-Vision-Assistant

Then you can:
1. Deploy backend to Railway/Render
2. Connect Vercel to GitHub for auto-deploy

