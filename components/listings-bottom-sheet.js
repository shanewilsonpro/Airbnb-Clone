// Libraries
import { useMemo, useRef, useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import BottomSheet from "@gorhom/bottom-sheet";
import { Ionicons } from "@expo/vector-icons";

// Components
import { Listings } from "./listings";

// Theme
import Colors from "../constants/colors";

// Styles
import { styles } from "./styles/listings-bottom-sheet.styles";

// Bottom sheet that wraps our Listings component
export const ListingsBottomSheet = ({ listings, category }) => {
  const snapPoints = useMemo(() => ["10%", "100%"], []);
  const bottomSheetRef = useRef(null);
  const [refresh, setRefresh] = useState(0);

  const onShowMap = () => {
    bottomSheetRef.current?.collapse();
    setRefresh(refresh + 1);
  };

  return (
    <BottomSheet
      ref={bottomSheetRef}
      index={1}
      snapPoints={snapPoints}
      enablePanDownToClose={false}
      handleIndicatorStyle={{ backgroundColor: Colors.grey }}
      style={styles.SheetContainer}
    >
      <View style={styles.ContentContainer}>
        <Listings listings={listings} refresh={refresh} category={category} />
        <View style={styles.AbsoluteView}>
          <TouchableOpacity onPress={onShowMap} style={styles.Button}>
            <Text style={{ fontFamily: "semibold", color: "#fff" }}>Map</Text>
            <Ionicons
              name="map"
              size={20}
              style={{ marginLeft: 10 }}
              color={"#fff"}
            />
          </TouchableOpacity>
        </View>
      </View>
    </BottomSheet>
  );
};
