# Mobile App Deployment Guide

This guide covers two methods to deploy Vision Assistant as a mobile app:

## Option 1: Progressive Web App (PWA) - Quick & Easy

### What is PWA?
A Progressive Web App can be installed on users' devices directly from the browser. It works on both iOS and Android without app store submission.

### Steps to Deploy PWA:

#### 1. Generate App Icons
You need to create app icons in multiple sizes. You can:
- Use an online tool like [PWA Asset Generator](https://github.com/onderceylan/pwa-asset-generator)
- Or create a 512x512 icon and use this script:

```bash
# Install ImageMagick (if not installed)
# macOS: brew install imagemagick
# Then create icons:
convert icon-512x512.png -resize 72x72 public/icons/icon-72x72.png
convert icon-512x512.png -resize 96x96 public/icons/icon-96x96.png
convert icon-512x512.png -resize 128x128 public/icons/icon-128x128.png
convert icon-512x512.png -resize 144x144 public/icons/icon-144x144.png
convert icon-512x512.png -resize 152x152 public/icons/icon-152x152.png
convert icon-512x512.png -resize 192x192 public/icons/icon-192x192.png
convert icon-512x512.png -resize 384x384 public/icons/icon-384x384.png
cp icon-512x512.png public/icons/icon-512x512.png
```

#### 2. Build the App
```bash
npm run build
```

#### 3. Deploy to Hosting
Deploy the `dist` folder to any static hosting service:

**Recommended Services:**
- **Vercel** (Free, Easy)
  ```bash
  npm install -g vercel
  vercel --prod
  ```

- **Netlify** (Free, Easy)
  ```bash
  npm install -g netlify-cli
  netlify deploy --prod --dir=dist
  ```

- **GitHub Pages**
  - Push to GitHub
  - Enable GitHub Pages in repository settings
  - Set source to `dist` folder

- **Firebase Hosting**
  ```bash
  npm install -g firebase-tools
  firebase init hosting
  firebase deploy
  ```

#### 4. Install on Mobile Devices

**Android:**
1. Open the deployed URL in Chrome
2. Tap the menu (3 dots)
3. Select "Add to Home screen" or "Install app"
4. The app will appear on your home screen

**iOS:**
1. Open the deployed URL in Safari
2. Tap the Share button
3. Select "Add to Home Screen"
4. The app will appear on your home screen

### PWA Features:
✅ Works offline (with service worker)
✅ Can be installed on home screen
✅ Full-screen experience
✅ Fast loading
✅ No app store approval needed

---

## Option 2: Native App with Capacitor (App Store Ready)

### What is Capacitor?
Capacitor wraps your web app in a native container, allowing you to publish to iOS App Store and Google Play Store.

### Steps to Set Up Capacitor:

#### 1. Install Capacitor
```bash
npm install @capacitor/core @capacitor/cli
npm install @capacitor/ios @capacitor/android
```

#### 2. Initialize Capacitor
```bash
npx cap init
# App name: Vision Assistant
# App ID: com.visionassistant.app
# Web dir: dist
```

#### 3. Build Your App
```bash
npm run build
```

#### 4. Add Platforms
```bash
# For iOS (macOS only)
npx cap add ios

# For Android
npx cap add android
```

#### 5. Sync Files
```bash
npx cap sync
```

#### 6. Open in Native IDEs

**iOS (requires macOS + Xcode):**
```bash
npx cap open ios
```
- Open in Xcode
- Configure signing & certificates
- Build and run on device/simulator
- Archive for App Store submission

**Android:**
```bash
npx cap open android
```
- Open in Android Studio
- Build APK or AAB
- Test on device/emulator
- Generate signed bundle for Play Store

#### 7. Configure Native Features

Update `capacitor.config.ts`:
```typescript
import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.visionassistant.app',
  appName: 'Vision Assistant',
  webDir: 'dist',
  server: {
    androidScheme: 'https'
  },
  plugins: {
    Camera: {
      permissions: {
        camera: 'Camera permission is required for vision assistance'
      }
    }
  }
};

export default config;
```

### App Store Submission:

**iOS App Store:**
1. Create Apple Developer account ($99/year)
2. Configure app in App Store Connect
3. Archive and upload via Xcode
4. Submit for review

**Google Play Store:**
1. Create Google Play Developer account ($25 one-time)
2. Create app in Google Play Console
3. Upload signed AAB file
4. Submit for review

---

## Option 3: Hybrid Approach

You can use both:
1. Deploy PWA for immediate access
2. Build native apps with Capacitor for app stores
3. Users can choose their preferred method

---

## Environment Variables for Production

For production deployment, set environment variables:

**Vercel/Netlify:**
- Add `VITE_GEMINI_API_KEY` in project settings

**Capacitor:**
- Update `capacitor.config.ts` to use environment variables
- Or use Capacitor's Preferences plugin

---

## Backend Server Deployment

Your backend server also needs to be deployed:

### Option A: Same Server (Vercel/Netlify Functions)
Convert `server/index.js` to serverless functions

### Option B: Separate Server
Deploy to:
- **Heroku** (Free tier available)
- **Railway** (Easy deployment)
- **Render** (Free tier)
- **DigitalOcean App Platform**
- **AWS/Google Cloud/Azure**

Update the API URL in `geminiService.ts` to point to your deployed backend.

---

## Testing Checklist

Before deploying:
- [ ] Test on real mobile devices
- [ ] Test camera permissions
- [ ] Test offline functionality (PWA)
- [ ] Test on both iOS and Android
- [ ] Verify API keys are set correctly
- [ ] Test app installation process
- [ ] Check app icons display correctly
- [ ] Verify service worker works

---

## Troubleshooting

**PWA not installing:**
- Ensure HTTPS (required for service workers)
- Check manifest.json is accessible
- Verify icons exist and are correct size

**Capacitor build errors:**
- Ensure all dependencies are installed
- Run `npx cap sync` after changes
- Check platform-specific requirements

**Camera not working:**
- Verify permissions in native config
- Test on real device (not just simulator)
- Check browser console for errors

---

## Need Help?

- [Capacitor Docs](https://capacitorjs.com/docs)
- [PWA Guide](https://web.dev/progressive-web-apps/)
- [Vite PWA Plugin](https://vite-pwa-org.netlify.app/)

