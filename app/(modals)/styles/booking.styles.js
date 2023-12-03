// Libraries
import { StyleSheet } from "react-native";

// Theme
import Colors from "../../../constants/colors";

export const styles = StyleSheet.create({
  Container: {
    flex: 1,
    paddingTop: 100,
  },
  Card: {
    backgroundColor: "#fff",
    borderRadius: 14,
    margin: 10,
    elevation: 4,
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowRadius: 4,
    shadowOffset: {
      width: 2,
      height: 2,
    },
    gap: 20,
  },
  CardHeader: {
    fontFamily: "bold",
    fontSize: 24,
    padding: 20,
  },
  CardBody: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  CardPreview: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 20,
  },
  SearchSection: {
    height: 50,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#ABABAB",
    borderRadius: 8,
    marginBottom: 16,
  },
  SearchIcon: {
    padding: 10,
  },
  InputField: {
    flex: 1,
    padding: 10,
    backgroundColor: "#fff",
  },
  PlacesContainer: {
    flexDirection: "row",
    gap: 25,
  },
  Place: {
    width: 100,
    height: 100,
    borderRadius: 10,
  },
  PlaceSelected: {
    borderColor: Colors.grey,
    borderWidth: 2,
    borderRadius: 10,
    width: 100,
    height: 100,
  },
  PreviewText: {
    fontFamily: "semibold",
    fontSize: 14,
    color: Colors.grey,
  },
  PreviewdData: {
    fontFamily: "semibold",
    fontSize: 14,
    color: Colors.dark,
  },
  GuestItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 16,
  },
  ItemBorder: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: Colors.grey,
  },
});
