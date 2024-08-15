import { View, StyleSheet, Button, ScrollView,Platform, Text, KeyboardAvoidingView } from "react-native";
import RedButton from "../components/redButton";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "../components/Header";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { BACKEND_IP } from '@env';
import activities, { addActivities } from "../reducers/activities";
import { addChats } from "../reducers/chats";
import { useIsFocused} from '@react-navigation/native';
import moment from 'moment';
import { TouchableOpacity } from "react-native-gesture-handler";


export default function HomeScreen({ navigation }) {
  const dispatch = useDispatch();
  const users = useSelector(state => state.users.value);
  const activity = useSelector(state => state.activities.value);
  const chats = useSelector(state => state.chats.value);
  const isFocused = useIsFocused();

  function truncateString(str, num) {
    return str.length > num ? str.slice(0, num) + "..." : str;
  }

 const handlePress = (act) => {
    if(act.organizer.token === users.token) {
  
      navigation.navigate("Activity Admin", {organizer: act.organizer})
    }
    else {
      navigation.navigate('Activity', { activity: act._id, organizer: act.organizer })
    }
  }


  // Return last message for a chat {message} or null
  const getLastMessage = chat => {                  
    const lastMessage = chat.messages.findLast(mess => mess.type === 'Message');                  
    if(lastMessage)
        return lastMessage
      else 
        return null
  };
  

  // Show last message or replacement text if not exist
  function showMessage (chat) {
    const message =(getLastMessage(chat))
    
    if(message)
      return `${message.user.username} : ${moment(message.createdAt).format('DD/MM à HH:mm')} - ${message.message}`;
    else 
      return 'No messages yet'
  }


  useEffect(() => {
    fetch(`${BACKEND_IP}/users/${users.token}/activities`)
    .then(response => response.json())
    .then(data => {
      if (data && data.allActivities.length > 0) {
        fetch(`${BACKEND_IP}/activities/participants/all/${users.token}`)
        .then(response => response.json())
        .then(participationData => {
          if (participationData.result) {
            // Map participation statuses to corresponding activities
            const updatedActivities = data.allActivities.map(activity => {
              const status = participationData.status.find(status => status.activity === activity._id);
              if (status) {
                activity.status = status.status; // Associe le statut à l'activité
              }
              return activity;
            });
            // Order activity by dates (from the nearest to the furthest)
            const sortedActivities = updatedActivities.sort((a, b) => new Date(a.date) - new Date(b.date));
            dispatch(addActivities(sortedActivities));
            const activityIds = sortedActivities.map(activity => activity._id);

            fetch(`${BACKEND_IP}/chats/byActivities`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({ activityIds }),
            })
            .then(response => response.json())
            .then(chatData => {
              if (chatData.result) {
                dispatch(addChats(chatData.chats));
              } else {
                console.error("Failed to fetch chats:", chatData.error);
              }
            });
          } else {
            console.error("Failed to fetch activities with status:", data.error);
          }
        })
        .catch(error => console.error("Error fetching activities with status:", error)
          )};
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
                <TouchableOpacity key={i} onPress={() => handlePress(act)}> 
                  <View style={styles.activityTitle}>
                    <Text style={styles.activityList}>{truncateString(act.name, 19)}</Text>
                    <Text style={[styles.activityStatus, act.status==="Accepted" && styles.activityAccepted]}>{act.status}</Text>
                  </View>
                  <Text style={styles.activityInfo}>
                    {act.location.street}, {act.location.city} le {moment(act.date).format('DD/MM/YYYY à HH:mm')}
                  </Text>
                </TouchableOpacity>
              ))
          ) : (
            <Text>No upcoming activities yet</Text>  // Message if no activity to display
          )}
        </View>
      </View>
      <View style={styles.chatCard}>
      <Text style={styles.activityList}>Discussions :</Text>
      <View style={styles.viewActivity}>
          {chats && chats.length > 0 ? (
            chats.slice(0, 4)  // Limit to 4 chats
              .map((chat, i) => (                
                <View key={i}>
                  <View style={styles.activityTitle}>
                    <Text style={styles.activityList}>{chat.activity.name}</Text>
                  </View>
                  <Text style={styles.activityInfo}>
                    {showMessage(chat)}
                  </Text>
                </View>
              ))
          ) : (
            <Text>{JSON.stringify(chats)}No upcoming activities yet</Text>  // Message if no activity to display
          )}
        </View>
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
    paddingHorizontal: 10,
  },
  title: {
    width: "100%",
    heigth: "25%",
    fontFamily: "ClashGrotesk-Bold",
    fontSize: 24,
  },
  activityList: {
    fontSize: 24,
    fontFamily: 'ClashGrotesk-Bold',
  },
  activityInfo: {
    fontFamily: 'ClashGrotesk-Regular',
    fontSize: 14,
    color: "grey"
  }
});
