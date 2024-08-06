import React from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  SafeAreaView,
  Image
} from "react-native";
import Header from "../components/Header";

export default function ProfilScreen({ navigation }) {
  return (
    <Header navigation={navigation} title='Profile' avatar={require('../assets/avatarDefault.png')}/>
  );
}

// const styles = StyleSheet.create({
// });
