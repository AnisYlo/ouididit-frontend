import { View, StyleSheet, Button, ScrollView,Platform, Text, KeyboardAvoidingView } from "react-native";
import RedButton from "../components/redButton";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "../components/Header";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { BACKEND_IP } from '@env';
import { addActivities } from "../reducers/activities";
import { addchats } from "../reducers/chats";
import { useIsFocused} from '@react-navigation/native';
import moment from 'moment';


export default function HomeScreen({ navigation }) {
  const dispatch = useDispatch();
  const users = useSelector(state => state.users.value);
  const activity = useSelector(state => state.activities.value);
  const chats = useSelector(state => state.chats.value);
  const isFocused = useIsFocused();

  useEffect(() => {
    fetch(`${BACKEND_IP}/users/${users.token}/activities`)
    .then(response => response.json())
    .then(data => {
      if (data && data.allActivities.length > 0) {
        const activityPromises = data.allActivities.map(async (activity) => {
          return fetch(`${BACKEND_IP}/activities/participants/${activity._id}/${users.token}`)
            .then(response => response.json())
            .then(dataStatus => {
              if (dataStatus) {
                activity.status = dataStatus.status;
              }
              return activity;
            })
        });
        // Await all Promises of each activities before dispatch
        Promise.all(activityPromises)
          .then(updatedActivities => {
            // Order activity by dates (from the nearest to the furthest)
            updatedActivities.sort((a, b) => new Date(a.date) - new Date(b.date));
            dispatch(addActivities(updatedActivities));
          })
      }
    })
  }, [isFocused]);
  
  return (
    <SafeAreaView style={styles.safeArea}>
    <Header
      navigation={navigation}
      title={`Welcome ${users.username}`}
      avatar={users.avatar}
    ></Header>
      <View style={styles.container}>
      <View style={styles.activitiesCard}>
        <Text style={styles.activityList}>Next Activities :</Text>
        <View style={styles.viewActivity}>
          {activity && activity.length > 0 ? (
            activity.filter(act => new Date(act.date) > new Date())  // Filter activities that have not passed
              .slice(0, 4)  // Limit to 4 activities
              .map((act, i) => (
                <View key={i}>
                  <View style={styles.activityTitle}>
                    <Text style={styles.activityList}>{act.name}</Text>
                    <Text style={[styles.activityStatus, act.status==="Accepted" && styles.activityAccepted]}>{act.status}</Text>
                  </View>
                  <Text style={styles.activityInfo}>
                    {act.location.street}, {act.location.city} le {moment(act.date).format('DD/MM/YYYY à HH:mm')}
                  </Text>
                </View>
              ))
          ) : (
            <Text>No upcoming activities yet</Text>  // Message if no activity to display
          )}
        </View>
      </View>
      <View style={styles.chatCard}>
        <Text>{JSON.stringify(activity[1])}</Text>
      </View>
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
    flex: 1,
    backgroundColor: 'white',
},
  container: {
    flex: 1,
    paddingTop: 130,
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
    paddingHorizontal: 10,
  },
  viewActivity:{
    flex:1, 
    justifyContent:'space-around',
  },
  activityTitle:{
    flexDirection:'row',
    justifyContent: 'space-between',
  },
  activityStatus:{
    fontFamily: "ClashGrotesk-Semibold",
    color : "#496F5D",
    },
  activityAccepted:{
    color : "#1F84D6",
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
    fontSize: 14,
    color: "grey"
  }
});
