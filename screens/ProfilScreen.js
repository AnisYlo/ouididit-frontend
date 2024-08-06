import React from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  SafeAreaView,
  Image,
} from "react-native";
import Header from "../components/Header";
import RedButton from "../components/redButton";

export default function ProfilScreen({ navigation }) {
  const handleSubmit = () => {
    navigation.navigate("Profile Paiements");
  };
  return (
        <Header
          navigation={navigation}
          title="Profile"
          avatar={require("../assets/avatarDefault.png")}
        />
  );
}

const styles = StyleSheet.create({
});
