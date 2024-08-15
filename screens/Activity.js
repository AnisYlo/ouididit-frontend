import { KeyboardAvoidingView, Button, Platform, SafeAreaView, StyleSheet, View, Text, Alert, Image } from "react-native";
import moment, { invalid } from "moment";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Input from "../components/Input";
import Header from "../components/Header";
import { BACKEND_IP } from "@env";
import { useRoute } from "@react-navigation/native";
import Wallet from "../components/ProgressBar";
import users from "../reducers/users"
import activities from "../reducers/activities";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import RedButton from "../components/redButton";




export default function ActivityScreen({ navigation }) {
  const route = useRoute();
  const [activityName, setActivityName] = useState("");
  const [date, setDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [duration, setDuration] = useState("");
  const [location, setLocation] = useState([]);
  const [description, setDescription] = useState("");
  const [payementLimit, setPayementLimit] = useState("")
  const [organizerToken, setOrganizerToken] = useState("")
  
  const activityId = route.params?.activity
  const organizer = route.params?.organizer
  const users = useSelector((state) => state.users.value);
  const avatar = !(users.avatar) ? require('../assets/avatarDefault.png') : {uri : users.avatar};
  const userToken = users.token
  const participants = ["test@MediaList.fr", "toto@MediaList.fr"];

  

  useEffect(() => {
    fetch(`${BACKEND_IP}/activities/${activityId}`)
      .then((response) => response.json())
      .then((data) => {
        setDescription(data.activity.description);
        setActivityName(data.activity.name);
        setDate(moment(data.activity.date).format("DD/MM/YYYY"));
        setDuration(String(data.activity.time));
        setLocation(data.activity.location.street);
        setStartTime(moment(data.activity.startTime).format("HH:mm"));
        setPayementLimit(data.activity.payementLimit)
        setOrganizerToken( data.activity.organizer.token)
      });
  }, [activityId]);

  

  return (
    //implementation du component header
    <SafeAreaView style={styles.safeArea}>
      <Header
        navigation={navigation}
        title={activityName}
        avatar={users.avatar}
      />
      <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : 'height'} >
        <View style={styles.friendsContainer}>
          <Image style={styles.avatar} source={avatar} />
          </View>
          {organizerToken !== userToken && (
          <View style={styles.invitation}>
            <View style={styles.choice}>
            <RedButton buttonText='Accept'></RedButton>
            <RedButton buttonText='Refuse
            '></RedButton>
            </View>
          </View>
        )}
        <Wallet style={styles.wallet}total="3" max={payementLimit} />
        <View style={styles.activityInfo}>
        <Text style={styles.text}>Date: {date} <FontAwesome name="calendar" size={24} color="black" /></Text>
        <Text style={styles.text}>Start: {startTime} <FontAwesome name="clock-o" size={24} color="black" /></Text>
        <Text style={styles.text}>Location: {location} <FontAwesome name="map-pin" size={24} color="black" /></Text>
        <Text style={styles.text}>Description: {description} <FontAwesome name="pencil" size={24} color="black" /></Text>
        </View>
     
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea:{
    width:'100%',
    height:'100%',
    paddingTop:35,
    backgroundColor: 'white',
  },
  container: {
    alignItems: "center",
    backgroundColor: "#ffffff",
    flex: 1,
    height: "100%",
    justifyContent: "flex-start",
    width: "100%",
    paddingTop: 100,
  },
  title: {
    fontSize: 20,
    fontWeight: "600",
    fontFamily: "ClashGrotesk-Bold"
  },
  input: {
    marginVertical: 10,
    width: "80%",
  },
  line: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 10,
    width: "80%",
  },
  inputLine: {
    width: "48%",
  },
  editButton: {
    flexDirection: "row",
    justifyContent: "flex-end",
    width: "80%",
    marginTop: 35,
  },
  edit: {
    height: 40,
    width: 40,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F74231",
    borderRadius: 10,
  },
  text: {
    fontFamily: "ClashGrotesk-Regular",
    fontSize: 30,
    color: "black",
  },
  progress: {
    height: 20,
    width: "80%",
  },
  avatar: {
    height: 45,
    width: 45,
    borderRadius: 45,
  },
  friendsContainer: {
    flexDirection: "row",
    justifyContent:"space-between",
    alignItems:'center',
    height: 50,
    width: "80%", 
    marginBottom: 30
  },
  add:{
    backgroundColor: 'rgb(31,132,214)',
  },
  activityInfo: {
    justifyContent: "space-around",
    alignItems: 'center',
    height: '50%',
    width: '100%',
    fontFamily: "ClashGrotesk-Regular",
    fontSize: 24,
    paddingTop: 50,
  },
  invitation :{
    
    justifyContent: 'center',
    alignItems: 'center',
    height: '20%',
    width: '80%',
    paddingBottom: 20,
  },
  choice: {
    height: '100%',
    width: "100%",
    justifyContent: 'space-around',
    alignItems: 'center'
    
  }
});
