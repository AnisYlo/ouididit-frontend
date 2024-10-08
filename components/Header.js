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
  const [logoHome, setLogoHome] = useState(false);
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
    //Si le route.name est présent dans le tableau routesWithHomeIcon
    //  et si le route.name est différent de Home alors l'icone sera home
    if (routesWithHomeIcon.includes(route.name) && route.name !== "Home") {
      setLogoHome(true);
      setHomeArrow("home");
      //sinon l'icone sera la flèche
    } else if (!routesWithHomeIcon.includes(route.name)) {
      setLogoHome(true);
      setHomeArrow("arrow-left");
    }
    //dans le tableau de redevance on surveille route.name -> useEffect est relancé à chaque
    //fois que route.name change
  }, [route.name]);

  function truncateString(str, num) {
    return str.length > num ? str.slice(0, num) + "..." : str;
  }
  // set avatar to user uri if exist or to default avatar
  const avatar = !(props.avatar) ? require('../assets/avatarDefault.png') : {uri : props.avatar};

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.buttonsMenu}>
        <TouchableOpacity onPress={() => props.navigation.navigate("Profile")}>
          <Image style={styles.avatar} source={avatar} alt="Your avatar"/>
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
          {/* si l'état est initialisé à false, alors le logo sur la page Home ne s'affichera pas */}
            <Feather style={(!logoHome && styles.home)}
              name={homeArrow}
              size={35}
              color="black"
              onPress={() => props.navigation.goBack()}
            />
      
        </TouchableOpacity>
        <Text style={styles.title}>{truncateString(props.title, 20)}</Text>
        <View style={styles.view}></View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 135,
    width: '100%',
    zIndex:10,
    backgroundColor: 'white',
    //backgroundColor: 'red',
    position:'absolute',
    justifyContent: 'flex-end',
    paddingBottom:5,
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
    flex: 8,
    textAlign: "center",
    fontWeight: "600",
    fontSize: 24,
  },
  home:{    
    display:'none',
  },
  arrow: {
    flex: 1,
    height:35,
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
