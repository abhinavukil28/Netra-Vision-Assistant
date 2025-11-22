import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.visionassistant.app',
  appName: 'Vision Assistant',
  webDir: 'dist',
  server: {
    androidScheme: 'https',
    iosScheme: 'https'
  },
  plugins: {
    Camera: {
      permissions: {
        camera: 'Camera permission is required for vision assistance. This app uses your camera to analyze your surroundings and provide audio descriptions.'
      }
    }
  },
  ios: {
    contentInset: 'automatic'
  },
  android: {
    allowMixedContent: true,
    buildOptions: {
      keystorePath: undefined,
      keystoreAlias: undefined
    }
  }
};

export default config;

