import { View, StyleSheet, Text, Button } from "react-native";
import { useSelector } from "react-redux";
import { TouchableOpacity } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "../components/Header";

export default function ProfilPaiementsScreen({ navigation }) {
  const users = useSelector(state => state.users.value)
  return (
    <>
      <Header
        navigation={navigation}
        title="Profil Paiements"
        avatar={users.avatar}
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
