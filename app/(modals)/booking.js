// Libraries
import { useState } from "react";
import { View, Text, ScrollView, Image } from "react-native";
import Animated, {
  FadeIn,
  FadeOut,
  SlideInDown,
} from "react-native-reanimated";
import { Ionicons } from "@expo/vector-icons";
import { BlurView } from "expo-blur";
import { TextInput } from "react-native-gesture-handler";
import { TouchableOpacity } from "@gorhom/bottom-sheet";
import { useRouter } from "expo-router";
import DatePicker from "react-native-modern-datepicker";

// Data
import { places } from "../../assets/data/places";

// Theme
import Colors from "../../constants/colors";

// Styles
import { defaultStyles } from "../../constants/styles-default";
import { styles } from "./styles/booking.styles";

const AnimatedTouchableOpacity =
  Animated.createAnimatedComponent(TouchableOpacity);

const guestsGropus = [
  {
    name: "Adults",
    text: "Ages 13 or above",
    count: 0,
  },
  {
    name: "Children",
    text: "Ages 2-12",
    count: 0,
  },
  {
    name: "Infants",
    text: "Under 2",
    count: 0,
  },
  {
    name: "Pets",
    text: "Pets allowed",
    count: 0,
  },
];

const Page = () => {
  // States
  const [openCard, setOpenCard] = useState(0);
  const [selectedPlace, setSelectedPlace] = useState(0);
  const [groups, setGroups] = useState(guestsGropus);

  // Router
  const router = useRouter();

  // Date
  const today = new Date().toISOString().substring(0, 10);

  // Functions
  const onClearAll = () => {
    setSelectedPlace(0);
    setOpenCard(0);
  };

  return (
    <BlurView intensity={70} style={styles.Container} tint="light">
      {/*  Where */}
      <View style={styles.Card}>
        {openCard != 0 && (
          <AnimatedTouchableOpacity
            onPress={() => setOpenCard(0)}
            style={styles.CardPreview}
            entering={FadeIn.duration(200)}
            exiting={FadeOut.duration(200)}
          >
            <Text style={styles.PreviewText}>Where</Text>
            <Text style={styles.PreviewdData}>I'm flexible</Text>
          </AnimatedTouchableOpacity>
        )}

        {openCard == 0 && <Text style={styles.CardHeader}>Where to?</Text>}
        {openCard == 0 && (
          <Animated.View
            entering={FadeIn}
            exiting={FadeOut}
            style={styles.CardBody}
          >
            <View style={styles.SearchSection}>
              <Ionicons
                style={styles.SearchIcon}
                name="ios-search"
                size={20}
                color="#000"
              />
              <TextInput
                style={styles.InputField}
                placeholder="Search destinations"
                placeholderTextColor={Colors.grey}
              />
            </View>

            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.PlacesContainer}
            >
              {places.map((item, index) => (
                <TouchableOpacity
                  onPress={() => setSelectedPlace(index)}
                  key={index}
                >
                  <Image
                    source={item.img}
                    style={
                      selectedPlace == index
                        ? styles.PlaceSelected
                        : styles.Place
                    }
                  />
                  <Text style={{ fontFamily: "regular", paddingTop: 6 }}>
                    {item.title}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </Animated.View>
        )}
      </View>

      {/* When */}
      <View style={styles.Card}>
        {openCard != 1 && (
          <AnimatedTouchableOpacity
            onPress={() => setOpenCard(1)}
            style={styles.CardPreview}
            entering={FadeIn.duration(200)}
            exiting={FadeOut.duration(200)}
          >
            <Text style={styles.PreviewText}>When</Text>
            <Text style={styles.PreviewdData}>Any week</Text>
          </AnimatedTouchableOpacity>
        )}

        {openCard == 1 && (
          <Text style={styles.CardHeader}>When's your trip?</Text>
        )}

        {openCard == 1 && (
          <Animated.View style={styles.CardBody}>
            <DatePicker
              options={{
                defaultFont: "regular",
                headerFont: "semibold",
                mainColor: Colors.primary,
                borderColor: "transparent",
              }}
              current={today}
              selected={today}
              mode={"calendar"}
            />
          </Animated.View>
        )}
      </View>

      {/* Guests */}
      <View style={styles.Card}>
        {openCard != 2 && (
          <AnimatedTouchableOpacity
            onPress={() => setOpenCard(2)}
            style={styles.CardPreview}
            entering={FadeIn.duration(200)}
            exiting={FadeOut.duration(200)}
          >
            <Text style={styles.PreviewText}>Who</Text>
            <Text style={styles.PreviewdData}>Add guests</Text>
          </AnimatedTouchableOpacity>
        )}

        {openCard == 2 && <Text style={styles.CardHeader}>Who's coming?</Text>}

        {openCard == 2 && (
          <Animated.View style={styles.CardBody}>
            {groups.map((item, index) => (
              <View
                key={index}
                style={[
                  styles.GuestItem,
                  index + 1 < guestsGropus.length ? styles.ItemBorder : null,
                ]}
              >
                <View>
                  <Text style={{ fontFamily: "semibold", fontSize: 14 }}>
                    {item.name}
                  </Text>
                  <Text
                    style={{
                      fontFamily: "regular",
                      fontSize: 14,
                      color: Colors.grey,
                    }}
                  >
                    {item.text}
                  </Text>
                </View>

                <View
                  style={{
                    flexDirection: "row",
                    gap: 10,
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <TouchableOpacity
                    onPress={() => {
                      const newGroups = [...groups];
                      newGroups[index].count =
                        newGroups[index].count > 0
                          ? newGroups[index].count - 1
                          : 0;

                      setGroups(newGroups);
                    }}
                  >
                    <Ionicons
                      name="remove-circle-outline"
                      size={26}
                      color={groups[index].count > 0 ? Colors.grey : "#cdcdcd"}
                    />
                  </TouchableOpacity>
                  <Text
                    style={{
                      fontFamily: "regular",
                      fontSize: 16,
                      minWidth: 18,
                      textAlign: "center",
                    }}
                  >
                    {item.count}
                  </Text>
                  <TouchableOpacity
                    onPress={() => {
                      const newGroups = [...groups];
                      newGroups[index].count++;
                      setGroups(newGroups);
                    }}
                  >
                    <Ionicons
                      name="add-circle-outline"
                      size={26}
                      color={Colors.grey}
                    />
                  </TouchableOpacity>
                </View>
              </View>
            ))}
          </Animated.View>
        )}
      </View>

      {/* Footer */}
      <Animated.View
        style={defaultStyles.Footer}
        entering={SlideInDown.delay(200)}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <TouchableOpacity
            style={{ height: "100%", justifyContent: "center" }}
            onPress={onClearAll}
          >
            <Text
              style={{
                fontSize: 18,
                fontFamily: "semibold",
                textDecorationLine: "underline",
              }}
            >
              Clear all
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              defaultStyles.Button,
              { paddingRight: 20, paddingLeft: 50 },
            ]}
            onPress={() => router.back()}
          >
            <Ionicons
              name="search-outline"
              size={24}
              style={defaultStyles.ButtonIcon}
              color={"#fff"}
            />
            <Text style={defaultStyles.ButtonText}>Search</Text>
          </TouchableOpacity>
        </View>
      </Animated.View>
    </BlurView>
  );
};

export default Page;
