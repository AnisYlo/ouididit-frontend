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
import Feather from "@expo/vector-icons/Feather";
import { useState, useEffect } from "react";
import { useNavigationState } from "@react-navigation/native";
import { useRoute } from "@react-navigation/native";

export default function Header(props) {
  const [homeArrow, setHomeArrow] = useState("");
  const state = useNavigationState((state) => state);
  //hook useRoute pour récupérer la valeur du nom de la route (route.name)
  const route = useRoute();
  // console.log("route name ==>",route.name);

  useEffect(() => {
    const routesWithHomeIcon = [
      "Home",
      "Create activity",
      "Calendar",
      "Discussions",
      "Profile",
    ]; 
    //Si le route.name est présent dans le tableau routesWithHomeIcon alors l'icone sera home
      if (routesWithHomeIcon.includes(route.name)) {
        setHomeArrow("home");
        //sinon l'icone sera la flèche
      } else {
        setHomeArrow("arrow-left");
      
    }
    //dans le tableau de redevance on surveille route.name -> useEffect est relancé à chaque 
    //fois que route.name change
  }, [route.name]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.buttonsMenu}>
        <TouchableOpacity onPress={() => props.navigation.navigate("Profile")}>
          <Image style={styles.avatar} source={props.avatar} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.drawer}>
          <Entypo
            name="menu"
            size={35}
            color="black"
            onPress={() => props.navigation.openDrawer()}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.page}>
        <TouchableOpacity style={styles.arrow}>
          <Feather
            name={homeArrow}
            size={35}
            color="black"
            onPress={() => props.navigation.goBack()}
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
    backgroundColor:'white',
    flex: 0.16,
    paddingTop: 35,
    zIndex:10,
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
    textAlign: "center",
    fontWeight: "600",
    fontSize: 24,
  },
  arrow: {
    flex: 1,
    justifyContent: "flex-start",
  },
  avatar: {
    height: 45,
    width: 45,
    borderRadius: 45,
  },
  view: {
    flex: 1,
  },
});
