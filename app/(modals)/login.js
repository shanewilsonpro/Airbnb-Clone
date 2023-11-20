// Libraries
import {
  View,
  StyleSheet,
  TextInput,
  Text,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { useOAuth } from "@clerk/clerk-expo";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

// Hooks
import { useWarmUpBrowser } from "../../hooks/use-warm-up-browser";

// Styles
import { styles } from "./styles/login.styles";
import { defaultStyles } from "../../constants/styles-default";

const Strategy = {
  Google: "oauth_google",
  Apple: "oauth_apple",
  Facebook: "oauth_facebook",
};

const Page = () => {
  useWarmUpBrowser();

  const router = useRouter();
  const { startOAuthFlow: googleAuth } = useOAuth({ strategy: "oauth_google" });
  const { startOAuthFlow: appleAuth } = useOAuth({ strategy: "oauth_apple" });
  const { startOAuthFlow: facebookAuth } = useOAuth({
    strategy: "oauth_facebook",
  });

  const onSelectAuth = async (strategy) => {
    const selectedAuth = {
      [Strategy.Google]: googleAuth,
      [Strategy.Apple]: appleAuth,
      [Strategy.Facebook]: facebookAuth,
    }[strategy];

    try {
      const { createdSessionId, setActive } = await selectedAuth();

      if (createdSessionId) {
        setActive({ session: createdSessionId });
        router.back();
      }
    } catch (err) {
      console.error("OAuth error", err);
    }
  };

  return (
    <ScrollView style={styles.Screen} scrollEnabled={false}>
      {/* Email Input */}
      <TextInput
        autoCapitalize="none"
        placeholder="Email"
        style={[defaultStyles.InputField, { marginBottom: 30 }]}
      />

      {/* Continue Button */}
      <TouchableOpacity style={defaultStyles.Button}>
        <Text style={defaultStyles.ButtonText}>Continue</Text>
      </TouchableOpacity>

      {/* Or with Seperators */}
      <View style={styles.SeperatorView}>
        <View
          style={{
            flex: 1,
            borderBottomColor: "black",
            borderBottomWidth: StyleSheet.hairlineWidth,
          }}
        />
        <Text style={styles.Seperator}>or</Text>
        <View
          style={{
            flex: 1,
            borderBottomColor: "black",
            borderBottomWidth: StyleSheet.hairlineWidth,
          }}
        />
      </View>

      <View style={{ gap: 20 }}>
        {/* Phone Button */}
        <TouchableOpacity style={styles.ButtonOutline}>
          <Ionicons
            name="mail-outline"
            size={24}
            style={defaultStyles.ButtonIcon}
          />
          <Text style={styles.ButtonOutlineText}>Continue with Phone</Text>
        </TouchableOpacity>

        {/* Apple Button */}
        <TouchableOpacity
          style={styles.ButtonOutline}
          onPress={() => onSelectAuth(Strategy.Apple)}
        >
          <Ionicons
            name="md-logo-apple"
            size={24}
            style={defaultStyles.ButtonIcon}
          />
          <Text style={styles.ButtonOutlineText}>Continue with Apple</Text>
        </TouchableOpacity>

        {/* Google Button */}
        <TouchableOpacity
          style={styles.ButtonOutline}
          onPress={() => onSelectAuth(Strategy.Google)}
        >
          <Ionicons
            name="md-logo-google"
            size={24}
            style={defaultStyles.ButtonIcon}
          />
          <Text style={styles.ButtonOutlineText}>Continue with Google</Text>
        </TouchableOpacity>

        {/* Facebook Button */}
        <TouchableOpacity
          style={styles.ButtonOutline}
          onPress={() => onSelectAuth(Strategy.Facebook)}
        >
          <Ionicons
            name="md-logo-facebook"
            size={24}
            style={defaultStyles.ButtonIcon}
          />
          <Text style={styles.ButtonOutlineText}>Continue with Facebook</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default Page;
