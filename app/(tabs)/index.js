// Libraries
import { useState, useMemo } from "react";
import { View } from "react-native";
import { Stack } from "expo-router";

// Data
import listingsData from "../../assets/data/airbnb-listings.json";

// Components
import { ExploreHeader } from "../../components/explore-header";
import { ListingsBottomSheet } from "../../components/listings-bottom-sheet";

const Page = () => {
  const [category, setCategory] = useState("Tiny homes");

  const items = useMemo(() => listingsData, []);

  const onDataChanged = (category) => {
    setCategory(category);
  };

  return (
    <View style={{ flex: 1, marginTop: 70 }}>
      <Stack.Screen
        options={{
          header: () => <ExploreHeader onCategoryChanged={onDataChanged} />,
        }}
      />
      <ListingsBottomSheet listings={items} category={category} />
    </View>
  );
};

export default Page;
