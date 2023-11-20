// Libraries
import { StyleSheet } from "react-native";

// Theme
import Colors from "../../../constants/colors";

export const styles = StyleSheet.create({
  Screen: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 26,
  },
  SeperatorView: {
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
    marginVertical: 30,
  },
  Seperator: {
    fontFamily: "semibold",
    color: Colors.grey,
    fontSize: 16,
  },
  ButtonOutline: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: Colors.grey,
    height: 50,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    paddingHorizontal: 10,
  },
  ButtonOutlineText: {
    color: "#000",
    fontSize: 16,
    fontFamily: "semibold",
  },
});
