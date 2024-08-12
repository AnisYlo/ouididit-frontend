import { View, StyleSheet, Button, TouchableOpacity, Text } from "react-native";
import RedButton from "../components/redButton";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "../components/Header";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { BACKEND_IP } from '@env';
import { addActivities } from "../reducers/activities";


export default function HomeScreen({ navigation }) {
  const dispatch = useDispatch()
  const activity = useSelector(state => state.activities.value)
  const users = useSelector(state => state.users.value)
  // prend en parametre le token venant du reducer et le compare a celui venant de la route get
  //si il ne le trouve pas il renvoie sur la page signin sinon on reste simplement sur Home

  useEffect(() => {
    fetch(`${BACKEND_IP}/users/${users.token}/activities`)
    .then(response => response.json()).then(data => {
  
      if (data) {
        let activitiesTab = data.allActivities.map(object => {return object})
        dispatch(addActivities(activitiesTab))
      }
    })
  }, []);

  console.log("activity Reducer =>",activity[0])
  return (
    <SafeAreaView style={styles.safeArea}>
    <Header
      navigation={navigation}
      title={`Welcome ${users.username}`}
      avatar={users.avatar}
    ></Header>
      <View style={styles.container}>
      <View style={styles.activitiesCard}>
        {activity.length > 0 && activity[0] && (
          <View>
            <Text style={styles.activityList}>{activity[0].name}</Text>
            <Text style={styles.activityInfo}>{activity[0].location.street}, {activity[1].location.city} {activity[0].date}</Text>
          </View>
        )}

        {activity.length > 0 && activity[1] && (
          <View>
            <Text style={styles.activityList}>{activity[1].name}</Text>
            <Text style={styles.activityInfo}>{activity[1].location.street}, {activity[1].location.city} {activity[1].date}</Text>
          </View>
        )}
        {activity.length > 0 && activity[2] && (
          <View>
            <Text style={styles.activityList}>{activity[2].name}</Text>
            <Text style={styles.activityInfo}>{activity[2].location.street}, {activity[1].location.city} {activity[2].date}</Text>
          </View>
        )}
      </View>
      <View style={styles.chatCard}></View>
      <RedButton
        onPress={() => navigation.navigate("Create activity")}
        title="Créer une activité"
        buttonText="New Activity"
      />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea:{
    width:'100%',
    height:'100%',
    backgroundColor: 'white',
  },
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
    justifyContent: 'space-around',
    paddingLeft: 10,
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
  activityList: {
    fontSize: 24,
    fontFamily: 'ClashGrotesk-Bold'
   
  },
  activityInfo: {
    fontFamily: 'ClashGrotesk-Regular',
    fontSize: 12,
    color: "grey"
  }
});
