// Libraries
import { View, Text } from "react-native";
import { useLocalSearchParams} from "expo-router"

const Page = () => {
    const { id } = useLocalSearchParams();
    console.log("🚀 ~ file: [id].js:7 ~ Page ~ id:", id)
  return (
    <View>
      <Text>Booking</Text>
    </View>
  );
};

export default Page;