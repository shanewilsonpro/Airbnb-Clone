// Libraries
import React, { useLayoutEffect } from "react";
import { View, Text, Image, TouchableOpacity, Share } from "react-native";
import { useLocalSearchParams, useNavigation } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import Animated, {
  SlideInDown,
  interpolate,
  useAnimatedRef,
  useAnimatedStyle,
  useScrollViewOffset,
} from "react-native-reanimated";

// Data
import listingsData from "../../assets/data/airbnb-listings.json";

// Styles
import { styles } from "./styles.js/[id].styles";
import { defaultStyles } from "../../constants/styles-default";

const IMG_HEIGHT = 300;

const DetailsPage = () => {
  const { id } = useLocalSearchParams();
  const listing = listingsData.find((item) => item.id === id);
  const navigation = useNavigation();
  const scrollRef = useAnimatedRef();

  const shareListing = async () => {
    try {
      await Share.share({
        title: listing.name,
        url: listing.listing_url,
      });
    } catch (err) {
      console.log(err);
    }
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: "",
      headerTransparent: true,

      headerBackground: () => (
        <Animated.View
          style={[headerAnimatedStyle, styles.Header]}
        ></Animated.View>
      ),
      headerRight: () => (
        <View style={styles.Bar}>
          <TouchableOpacity style={styles.RoundButton} onPress={shareListing}>
            <Ionicons name="share-outline" size={22} color={"#000"} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.RoundButton}>
            <Ionicons name="heart-outline" size={22} color={"#000"} />
          </TouchableOpacity>
        </View>
      ),
      headerLeft: () => (
        <TouchableOpacity
          style={styles.RoundButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="chevron-back" size={24} color={"#000"} />
        </TouchableOpacity>
      ),
    });
  }, []);

  const scrollOffset = useScrollViewOffset(scrollRef);

  const imageAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: interpolate(
            scrollOffset.value,
            [-IMG_HEIGHT, 0, IMG_HEIGHT, IMG_HEIGHT],
            [-IMG_HEIGHT / 2, 0, IMG_HEIGHT * 0.75]
          ),
        },
        {
          scale: interpolate(
            scrollOffset.value,
            [-IMG_HEIGHT, 0, IMG_HEIGHT],
            [2, 1, 1]
          ),
        },
      ],
    };
  });

  const headerAnimatedStyle = useAnimatedStyle(() => {
    return {
      opacity: interpolate(scrollOffset.value, [0, IMG_HEIGHT / 1.5], [0, 1]),
    };
  }, []);

  return (
    <View style={styles.Container}>
      <Animated.ScrollView
        contentContainerStyle={{ paddingBottom: 100 }}
        ref={scrollRef}
        scrollEventThrottle={16}
      >
        <Animated.Image
          source={{ uri: listing.xl_picture_url }}
          style={[styles.Image, imageAnimatedStyle]}
          resizeMode="cover"
        />

        <View style={styles.InfoContainer}>
          <Text style={styles.Name}>{listing.name}</Text>
          <Text style={styles.Location}>
            {listing.room_type} in {listing.smart_location}
          </Text>
          <Text style={styles.Rooms}>
            {listing.guests_included} guests · {listing.bedrooms} bedrooms ·{" "}
            {listing.beds} bed · {listing.bathrooms} bathrooms
          </Text>
          <View style={{ flexDirection: "row", gap: 4, alignItems: "center" }}>
            <Ionicons name="star" size={16} />
            <Text style={styles.Ratings}>
              {listing.review_scores_rating / 20} · {listing.number_of_reviews}{" "}
              reviews
            </Text>
          </View>
          <View style={styles.Divider} />

          <View style={styles.HostView}>
            <Image
              source={{ uri: listing.host_picture_url }}
              style={styles.Host}
            />

            <View>
              <Text style={{ fontWeight: "500", fontSize: 16 }}>
                Hosted by {listing.host_name}
              </Text>
              <Text>Host since {listing.host_since}</Text>
            </View>
          </View>

          <View style={styles.Divider} />

          <Text style={styles.Description}>{listing.description}</Text>
        </View>
      </Animated.ScrollView>

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
          <TouchableOpacity style={styles.FooterText}>
            <Text style={styles.FooterPrice}>€{listing.price}</Text>
            <Text>night</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              defaultStyles.Button,
              { paddingRight: 20, paddingLeft: 20 },
            ]}
          >
            <Text style={defaultStyles.ButtonText}>Reserve</Text>
          </TouchableOpacity>
        </View>
      </Animated.View>
    </View>
  );
};

export default DetailsPage;
