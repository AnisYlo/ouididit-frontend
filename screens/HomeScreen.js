import { View, StyleSheet, Button, TouchableOpacity, Text } from "react-native";
import RedButton from "../components/redButton";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "../components/Header";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { BACKEND_IP } from '@env';
export default function HomeScreen({ navigation }) {
  
  const users = useSelector(state => state.users.value)
  // prend en parametre le token venant du reducer et le compare a celui venant de la route get
  //si il ne le trouve pas il renvoie sur la page signin sinon on reste simplement sur Home
  useEffect(() => {
    fetch(`${BACKEND_IP}/users/:${users.token}`).then(response => response.json())
    .then(data => {
      if(data.result === false) {
        navigation.navigate('Signin')
      }
    })
   }, []);

  return (
    <>
      <Header
        navigation={navigation}
        title="Home"
        avatar={users.avatar}
      ></Header>
      <SafeAreaView style={styles.container}>
        <View style={styles.activitiesCard}></View>
        <View style={styles.chatCard}></View>
        <RedButton
          onPress={() => navigation.navigate("Create activity")}
          title="Créer une activité"
          buttonText="New Activity"
        />
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-around",
    backgroundColor: "white",
    paddingBottom: 50,
  },
  activitiesCard: {
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#e74c3c",
    height: "40%",
    backgroundColor: "white",
    width: "95%",
  },
  chatCard: {
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#1F84D6",
    backgroundColor: "white",
    height: "40%",
    width: "95%",
  },
  title: {
    width: "100%",
    heigth: "25%",
    fontFamily: "ClashGrotesk-Bold",
    fontSize: 24,
  },
});
