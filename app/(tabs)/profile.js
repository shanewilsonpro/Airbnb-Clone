// Libraries
import { View, Text, Button } from "react-native";
import { useAuth, useUser } from "@clerk/clerk-expo";
import Colors from "../../constants/colors";

const Page = () => {
  const { signOut, isSignedIn } = useAuth();

  return (
    <View>
      <Text>Profile</Text>
      {isSignedIn && (
        <Button title="Log Out" onPress={() => signOut()} color={Colors.dark} />
      )}
      {!isSignedIn && (
        <Link href={"/(modals)/login"} asChild>
          <Button title="Log In" color={Colors.dark} />
        </Link>
      )}
    </View>
  );
};

export default Page;
