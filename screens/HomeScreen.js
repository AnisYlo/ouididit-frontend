import { View, StyleSheet, Button, TouchableOpacity, Text } from "react-native";
import RedButton from "../components/redButton";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "../components/Header";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { BACKEND_IP } from '@env';
import { addActivities } from "../reducers/activities";


export default function HomeScreen({ navigation }) {
  
  const activity = useSelector(state => state.activities.value)
  const dispatch = useDispatch()
  const users = useSelector(state => state.users.value)
  // prend en parametre le token venant du reducer et le compare a celui venant de la route get
  //si il ne le trouve pas il renvoie sur la page signin sinon on reste simplement sur Home

  useEffect(() => {
    
    if(users.token === ''){
      navigation.navigate('Signin')
    }
      
    fetch(`${BACKEND_IP}/users/${users.token}`).then(response => response.json())
    .then(data => {
      if(data.result === false) {
        navigation.navigate('Signin')
      }
    })
    fetch(`${BACKEND_IP}/users/${users.token}/activities`)
    .then(response => response.json()).then(data => {
      if (data) {
       let activitiesTab = data.allActivities.map(object => {return object})
       dispatch(addActivities(activitiesTab))
     }
    })
   }, []);

   
  
  return (
    <>
      <Header
        navigation={navigation}
        title="Home"
        avatar={require("../assets/avatarDefault.png")}
      ></Header>
      <SafeAreaView style={styles.container}>
        <View style={styles.activitiesCard}>
          {/* <View>
            <Text>{activity[0][0].name}</Text>
            <Text>{activity[0][0].location.street}, {activity[0][0].date}</Text>
          </View> */}

          {/* <View>
            <Text>{activity[0][1].name}</Text>
            <Text>{activity[0][1].location.street}, {activity[0][1].date}</Text>
          </View> */}

          {/* <View>
          <Text>{activity[0][2].name}</Text>
          <Text>{activity[0][2].location.street}, {activity[0][2].date}</Text> 
          </View> */}
        
        </View>
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
