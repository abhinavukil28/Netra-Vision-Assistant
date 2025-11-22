# Vision Assistant - AI-Powered Scene Description

An accessible mobile application that uses AI to describe scenes in real-time for visually impaired users.

## Features

- 🎥 Real-time camera analysis
- 🔊 Audio descriptions of surroundings
- 📱 Mobile-optimized UI
- ♿ Accessibility-focused design
- 🌐 Works as PWA (Progressive Web App)
- 📲 Can be deployed as native app

## Run Locally

**Prerequisites:** Node.js

1. Install dependencies:
   ```bash
   npm install
   ```

2. Set up environment variables:
   - Create a `.env` file in the root directory
   - Add your Gemini API key:
     ```
     VITE_GEMINI_API_KEY=your_api_key_here
     ```

3. Start the backend server:
   ```bash
   cd server
   npm install
   npm start
   ```

4. Start the frontend (in a new terminal):
   ```bash
   npm run dev
   ```

5. Open `http://localhost:5173` in your browser

## Mobile App Deployment

This app can be deployed as:
- **Progressive Web App (PWA)** - Install directly from browser
- **Native App** - Publish to iOS App Store and Google Play Store

See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed deployment instructions.

### Quick PWA Setup

1. Generate app icons (see `public/icons/README.md`)
2. Build the app: `npm run build`
3. Deploy the `dist` folder to any static hosting (Vercel, Netlify, etc.)

### Quick Native App Setup

1. Build the app: `npm run build`
2. Add platforms: `npm run cap:add:ios` or `npm run cap:add:android`
3. Sync: `npm run cap:sync`
4. Open in native IDE: `npm run cap:open:ios` or `npm run cap:open:android`

## Project Structure

```
├── public/          # Static assets and PWA files
│   ├── icons/      # App icons
│   ├── manifest.json
│   └── sw.js       # Service worker
├── server/         # Backend proxy server
├── components/     # React components
├── services/       # API services
├── hooks/          # React hooks
└── capacitor.config.ts  # Capacitor configuration
```

## Tech Stack

- **Frontend:** React, TypeScript, Vite, Tailwind CSS
- **Backend:** Node.js, Express
- **AI:** Google Gemini API
- **Mobile:** Capacitor (for native apps)
- **PWA:** Service Worker, Web App Manifest

## License

Private project
