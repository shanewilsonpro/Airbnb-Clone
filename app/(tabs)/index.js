// Libraries
import { useState, useMemo } from "react";
import { View } from "react-native";
import { Stack } from "expo-router";

// Data
import listingsData from "../../assets/data/airbnb-listings.json";
import listingsDataGeo from "../../assets/data/airbnb-listings.geo.json";

// Components
import { ExploreHeader } from "../../components/explore-header";
import { ListingsBottomSheet } from "../../components/listings-bottom-sheet";
import ListingsMap from "../../components/listings-map";

const Page = () => {
  const [category, setCategory] = useState("Tiny homes");

  const items = useMemo(() => listingsData, []);
  const getoItems = useMemo(() => listingsDataGeo, []);

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
      <ListingsMap listings={getoItems} />
      <ListingsBottomSheet listings={items} category={category} />
    </View>
  );
};

export default Page;
