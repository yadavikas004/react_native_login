export default {
  expo: {
    name: "Learning React Native",
    slug: "learning-react-native", // Update this to match your project name
    version: "1.0.0",
    orientation: "portrait",
    icon: "./assets/icon.png",
    splash: {
      image: "./assets/splash-icon.png",
      resizeMode: "contain",
      backgroundColor: "#ffffff"
    },
    updates: {
      fallbackToCacheTimeout: 0
    },
    assetBundlePatterns: [
      "**/*"
    ],
    ios: {
      supportsTablet: true
    },
    android: {
      package: "com.yourcompany.learningreactnative", // Make sure this is unique
      adaptiveIcon: {
        foregroundImage: "./assets/adaptive-icon.png",
        backgroundColor: "#FFFFFF"
      }
    },
    extra: {
      API_BASE_URL: "http://192.168.0.107:9091",
      eas: {
        projectId: "1430837a-c1eb-48be-a053-fcf4b4b4ccc6"
      }
    },
    newArchEnabled: true,
  },
  cli: {
    appVersionSource: "remote"
  }
};