import { View, StyleSheet, Text, Button } from "react-native";
import Header from "../components/Header";

export default function ProfilInfosScreen() {
  return (
    <Header
    navigation={navigation}
    title="Profile Infos"
    avatar={require("../assets/avatarDefault.png")}
  />
  );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "red",
      },
});
