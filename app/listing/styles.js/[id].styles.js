// Libraries
import { StyleSheet, Dimensions } from "react-native";

// Theme
import Colors from "../../../constants/colors";

const { width } = Dimensions.get("window");

export const styles = StyleSheet.create({
  Container: {
    flex: 1,
    backgroundColor: "white",
  },
  Image: {
    height: 300,
    width: width,
  },
  InfoContainer: {
    padding: 24,
    backgroundColor: "#fff",
  },
  Name: {
    fontSize: 26,
    fontWeight: "bold",
    fontFamily: "semibold",
  },
  Location: {
    fontSize: 18,
    marginTop: 10,
    fontFamily: "semibold",
  },
  Rooms: {
    fontSize: 16,
    color: Colors.grey,
    marginVertical: 4,
    fontFamily: "regular",
  },
  Ratings: {
    fontSize: 16,
    fontFamily: "semibold",
  },
  Divider: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: Colors.grey,
    marginVertical: 16,
  },
  Host: {
    width: 50,
    height: 50,
    borderRadius: 50,
    backgroundColor: Colors.grey,
  },
  HostView: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  FooterText: {
    height: "100%",
    justifyContent: "center",
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  FooterPrice: {
    fontSize: 18,
    fontFamily: "semibold",
  },
  RoundButton: {
    width: 40,
    height: 40,
    borderRadius: 50,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
    color: Colors.primary,
  },
  Bar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
  },
  Header: {
    backgroundColor: "#fff",
    height: 100,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: Colors.grey,
  },
  Description: {
    fontSize: 16,
    marginTop: 10,
    fontFamily: "regular",
  },
});
