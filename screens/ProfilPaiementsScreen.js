import { View, StyleSheet, Text, Button } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "../components/Header";

export default function ProfilPaiementsScreen({ navigation }) {
  return (
    <>
      <Header
        navigation={navigation}
        title="Profil Paiements"
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
    backgroundColor: "red",
  },
});
