// Libraries
import { StyleSheet } from "react-native";

// Theme
import Colors from "../constants/colors";

export const defaultStyles = StyleSheet.create({
  Screen: {
    flex: 1,
    backgroundColor: "#FDFFFF",
  },
  InputField: {
    height: 44,
    borderWidth: 1,
    borderColor: "#ABABAB",
    borderRadius: 8,
    padding: 10,
    backgroundColor: "#fff",
  },
  Button: {
    backgroundColor: Colors.primary,
    height: 50,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  ButtonText: {
    color: "#fff",
    fontSize: 16,
    fontFamily: "bold",
  },
  ButtonIcon: {
    position: "absolute",
    left: 16,
  },
  Footer: {
    position: "absolute",
    height: 100,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "#fff",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderTopColor: Colors.grey,
    borderTopWidth: StyleSheet.hairlineWidth,
  },
});
