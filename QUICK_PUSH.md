# Quick Push to GitHub - Simple Method

Since GitHub CLI installation requires admin access, here's the easiest way:

## Method 1: Use Personal Access Token (Recommended)

### Step 1: Create Token
1. Visit: https://github.com/settings/tokens/new
2. Name: `Netra Vision Assistant`
3. Expiration: Choose your preference (90 days recommended)
4. Scopes: Check **`repo`** (Full control of private repositories)
5. Click **"Generate token"**
6. **Copy the token** (starts with `ghp_...`)

### Step 2: Push with Token
Run this command:
```bash
cd /Users/abhinavukil/Desktop/ai-vision-assistant\ copy
git push -u origin main
```

When prompted:
- **Username:** `abhinavukil28`
- **Password:** Paste your personal access token (NOT your GitHub password)

---

## Method 2: Download GitHub CLI Manually

1. **Download:** https://github.com/cli/cli/releases/latest
2. **Install:** Open the downloaded `.pkg` file
3. **Then run:**
   ```bash
   gh auth login
   git push -u origin main
   ```

---

## Method 3: Use SSH (One-time setup)

If you want to set up SSH keys:

```bash
# Generate SSH key
ssh-keygen -t ed25519 -C "your_email@example.com"
# Press Enter for default location
# Press Enter twice (no passphrase, or set one)

# Copy public key
cat ~/.ssh/id_ed25519.pub

# Add to GitHub: https://github.com/settings/keys
# Then change remote:
git remote set-url origin git@github.com:abhinavukil28/Netra-Vision-Assistant.git
git push -u origin main
```

---

**Easiest:** Use Method 1 (Personal Access Token) - takes 2 minutes!

