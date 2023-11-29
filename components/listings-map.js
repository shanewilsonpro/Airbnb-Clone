// Libraries
import { memo, useEffect, useRef } from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import { Marker } from "react-native-maps";
import MapView from "react-native-map-clustering";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import * as Location from "expo-location";

// Theme
import Colors from "../constants/colors";

// Styles
import { styles } from "./styles/listings-maps.styles";
import { defaultStyles } from "../constants/styles-default";

const INITIAL_REGION = {
  latitude: 37.33,
  longitude: -122,
  latitudeDelta: 9,
  longitudeDelta: 9,
};

const ListingsMap = memo(({ listings }) => {
  const router = useRouter();
  const mapRef = useRef(null);

  // When the component mounts, locate the user
  useEffect(() => {
    onLocateMe();
  }, []);

  // When a marker is selected, navigate to the listing page
  const onMarkerSelected = (event) => {
    router.push(`/listing/${event.properties.id}`);
  };

  // Focus the map on the user's location
  const onLocateMe = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      return;
    }

    let location = await Location.getCurrentPositionAsync({});

    const region = {
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
      latitudeDelta: 7,
      longitudeDelta: 7,
    };

    mapRef.current?.animateToRegion(region);
  };

  // Overwrite the renderCluster function to customize the cluster markers
  const renderCluster = (cluster) => {
    const { id, geometry, onPress, properties } = cluster;

    const points = properties.point_count;
    return (
      <Marker
        key={`cluster-${id}`}
        coordinate={{
          longitude: geometry.coordinates[0],
          latitude: geometry.coordinates[1],
        }}
        onPress={onPress}
      >
        <View style={styles.Marker}>
          <Text
            style={{
              color: "#000",
              textAlign: "center",
              fontFamily: "semibold",
            }}
          >
            {points}
          </Text>
        </View>
      </Marker>
    );
  };

  return (
    <>
      <MapView
        ref={mapRef}
        animationEnabled={false}
        style={StyleSheet.absoluteFillObject}
        initialRegion={INITIAL_REGION}
        clusterColor="#fff"
        clusterTextColor="#000"
        clusterFontFamily="semibold"
        renderCluster={renderCluster}
      >
        {/* Render all our marker as usual */}
        {listings.features.map((item) => (
          <Marker
            coordinate={{
              latitude: item.properties.latitude,
              longitude: item.properties.longitude,
            }}
            key={item.properties.id}
            onPress={() => onMarkerSelected(item)}
          >
            <View style={styles.Marker}>
              <Text style={styles.MarkerText}>€ {item.properties.price}</Text>
            </View>
          </Marker>
        ))}
      </MapView>
      <TouchableOpacity style={styles.LocateButton} onPress={onLocateMe}>
        <Ionicons name="navigate" size={24} color={Colors.dark} />
      </TouchableOpacity>
    </>
  );
});

export default ListingsMap;
