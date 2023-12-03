// Libraries
import { useEffect } from "react";
import { TouchableOpacity } from "react-native";
import { useFonts } from "expo-font";
import { SplashScreen, Stack, useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { getItemAsync, setItemAsync } from "expo-secure-store";
import { ClerkProvider, useAuth } from "@clerk/clerk-expo";

// Components
import { ModalHeaderText } from "../components/modal-header-text";

// Theme
import Colors from "../constants/colors";

// Keys
const CLERK_PUBLISHABLE_KEY = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY;

// Cache the Clerk JWT
const tokenCache = {
  async getToken(key) {
    try {
      return getItemAsync(key);
    } catch (err) {
      return null;
    }
  },
  async saveToken(key, value) {
    try {
      return setItemAsync(key, value);
    } catch (err) {
      return;
    }
  },
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    // Regular Fonts
    regular: require("../assets/fonts/Poppins-Regular.ttf"),
    black: require("../assets/fonts/Poppins-Black.ttf"),
    light: require("../assets/fonts/Poppins-Light.ttf"),
    bold: require("../assets/fonts/Poppins-Bold.ttf"),
    medium: require("../assets/fonts/Poppins-Medium.ttf"),
    thin: require("../assets/fonts/Poppins-Thin.ttf"),
    extralight: require("../assets/fonts/Poppins-ExtraLight.ttf"),
    extrabold: require("../assets/fonts/Poppins-ExtraBold.ttf"),
    semibold: require("../assets/fonts/Poppins-SemiBold.ttf"),

    // Italic Fonts
    italic: require("../assets/fonts/Poppins-Italic.ttf"),
    blackitalic: require("../assets/fonts/Poppins-BlackItalic.ttf"),
    lightitalic: require("../assets/fonts/Poppins-LightItalic.ttf"),
    bolditalic: require("../assets/fonts/Poppins-BoldItalic.ttf"),
    mediumitalic: require("../assets/fonts/Poppins-MediumItalic.ttf"),
    thinitalic: require("../assets/fonts/Poppins-ThinItalic.ttf"),
    extralightitalic: require("../assets/fonts/Poppins-ExtraLightItalic.ttf"),
    extrabolditalic: require("../assets/fonts/Poppins-ExtraBoldItalic.ttf"),
    semibolditalic: require("../assets/fonts/Poppins-SemiBoldItalic.ttf"),
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <ClerkProvider
      publishableKey={CLERK_PUBLISHABLE_KEY}
      tokenCache={tokenCache}
    >
      <RootLayoutNav />
    </ClerkProvider>
  );
}

function RootLayoutNav() {
  const router = useRouter();
  const { isLoaded, isSignedIn } = useAuth();

  // Automatically open login if user is not authenticated
  useEffect(() => {
    if (isLoaded && !isSignedIn) {
      router.push("/(modals)/login");
    }
  }, [isLoaded]);

  return (
    <Stack>
      <Stack.Screen
        name="(modals)/login"
        options={{
          presentation: "modal",
          title: "Log in or sign up",
          headerTitleStyle: {
            fontFamily: "semibold",
          },
          headerLeft: () => (
            <TouchableOpacity onPress={() => router.back()}>
              <Ionicons name="close-outline" size={28} />
            </TouchableOpacity>
          ),
        }}
      />
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="listing/[id]" options={{ headerTitle: "" }} />
      <Stack.Screen
        name="(modals)/booking"
        options={{
          presentation: "transparentModal",
          animation: "fade",
          headerTransparent: true,
          headerTitle: (props) => <ModalHeaderText />,
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => router.back()}
              style={{
                backgroundColor: "#fff",
                borderColor: Colors.grey,
                borderRadius: 20,
                borderWidth: 1,
                padding: 4,
              }}
            >
              <Ionicons name="close-outline" size={22} />
            </TouchableOpacity>
          ),
        }}
      />
    </Stack>
  );
}
