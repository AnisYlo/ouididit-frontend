import { View, StyleSheet, Text, Button } from "react-native";
import Header from "../components/Header";

export default function DiscussionsScreen({ navigation }) {
  return (
    <>
    <Header
      navigation={navigation}
      title="Discussions"
      avatar={require("../assets/avatarDefault.png")}
    />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    // backgroundColor: "blue",
  },
});
