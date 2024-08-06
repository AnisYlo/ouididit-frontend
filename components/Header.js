import React from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  SafeAreaView,
  Image,
} from "react-native";
import Entypo from "@expo/vector-icons/Entypo";
import { AntDesign } from "@expo/vector-icons";

export default function Header(props) {
    // console.log(props.navigation)
    const handlePress = () => {
        console.log('bonjour')
        navigation.navigate('Profil')
    }
  const navigation = props.navigation;
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.buttonsMenu}>
        <TouchableOpacity>
          <Image
            style={styles.avatar}
            source={props.avatar}
            onPress={() => handlePress()}
        
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.drawer}>
          <Entypo
            name="menu"
            size={35}
            color="black"
            onPress={() => navigation.openDrawer()}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.page}>
        <TouchableOpacity style={styles.arrow}>
          <AntDesign
            name="arrowleft"
            size={35}
            color="black"
            onPress={() => navigation.goBack(null)}
          />
        </TouchableOpacity>
        <Text style={styles.title}>{props.title}</Text>
        <View style={styles.view}></View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 0.05,
    // backgroundColor: "red",
  },
  buttonsMenu: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 15,
  },
  page: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
    paddingHorizontal: 15,
  },
  title: {
    flex: 4,
    // backgroundColor: 'red',
    textAlign: "center",
    fontWeight: "600",
    fontSize: 24,
  },
  arrow: {
    flex: 1,
    justifyContent: "flex-start",
  },
  avatar: {
    // backgroundColor: "yellow",
    height: 45,
    width: 45,
    borderRadius: 45,
  },
  view: {
    flex: 1,
  },
});
