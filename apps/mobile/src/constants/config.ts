import { Platform } from 'react-native';

// For Android emulator, localhost maps to 10.0.2.2
// For iOS simulator, it maps to localhost
const DEV_API_URL = Platform.select({
  android: 'http://10.0.2.2:3000/api',
  ios: 'http://localhost:3000/api',
  default: 'http://localhost:3000/api',
});

export const CONFIG = {
  API_URL: DEV_API_URL,
};
