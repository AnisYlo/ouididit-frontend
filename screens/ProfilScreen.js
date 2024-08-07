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
  // console.log(navigation);

  return (
    <>
      <Header
        navigation={navigation}
        title="Profile"
        avatar={require("../assets/avatarDefault.png")}
      />
      <SafeAreaView>
        <View>
          <TouchableOpacity>
            <RedButton 
              buttonText='Informations'
              onPress={() => navigation.navigate("Profile Infos")} />
          </TouchableOpacity>
        </View>
        <View>
          <TouchableOpacity>
            <RedButton
              buttonText='Paiements Informations'
              onPress={() => navigation.navigate("Profile Paiements")}
            />
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({});
