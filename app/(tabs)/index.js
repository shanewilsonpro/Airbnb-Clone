// Libraries
import { useState } from "react";
import { View } from "react-native";
import { Stack } from "expo-router";

// Components
import { ExploreHeader } from "../../components/explore-header";

const Page = () => {
  const [category, setCategory] = useState("Tiny homes");

  const onDataChanged = (category) => {
    setCategory(category);
  };

  return (
    <View style={{ flex: 1, marginTop: 130 }}>
      <Stack.Screen
        options={{
          header: () => <ExploreHeader onCategoryChanged={onDataChanged} />,
        }}
      />
    </View>
  );
};

export default Page;
