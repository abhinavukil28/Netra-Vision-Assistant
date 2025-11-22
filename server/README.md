# Gemini Proxy Server

Backend server for Vision Assistant that proxies requests to Gemini API.

## Environment Variables

- `VITE_GEMINI_API_KEY` - Your Gemini API key (required)
- `PORT` - Server port (defaults to 5001, set automatically by hosting platform)

## Local Development

```bash
npm install
npm start
```

## Deployment

This server can be deployed to:
- Railway (recommended)
- Render
- Heroku
- DigitalOcean App Platform

Make sure to set the `VITE_GEMINI_API_KEY` environment variable in your hosting platform.

