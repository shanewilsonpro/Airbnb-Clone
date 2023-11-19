// Libraries
import { View } from "react-native";
import { Link } from "expo-router"

const Page = () => {
  return (
    <View>
      <Link href={'/(modals)/login'}>Login</Link>
      <Link href={'/(modals)/booking'}>Bookings</Link>
      <Link href={'/listing/1334'}>Listing details</Link>
    </View>
  );
};

export default Page;
