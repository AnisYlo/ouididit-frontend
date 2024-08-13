import { KeyboardAvoidingView, Button, Platform, SafeAreaView, StyleSheet, View, Text, Alert, Image } from "react-native";
import moment, { invalid } from "moment";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Input from "../components/Input";
import Header from "../components/Header";
import { BACKEND_IP } from "@env";
import { useRoute } from "@react-navigation/native";
import Wallet from "../components/ProgressBar";
import activities from "../reducers/activities";



export default function ActivityAdminScreen({ navigation }) {

  const [activityName, setActivityName] = useState("");
  const [date, setDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [duration, setDuration] = useState("");
  const [location, setLocation] = useState([]);
  const [description, setDescription] = useState("");
 

  const activityId = "66b5e34b59a79a205eb415ce";
  const route = useRoute();
  // const activtyId = route.params?.activtyId
  const users = useSelector((state) => state.users.value);
  const avatar = !(users.avatar) ? require('../assets/avatarDefault.png') : {uri : users.avatar};

  function isFutureDate(dateString, timeString) {
    // Check input format with regex
    const regexDate = /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/;
    const regexTime = /^([01]\d|2[0-3]):([0-5]\d)$/;
    if (!regexDate.test(dateString) || !regexTime.test(timeString)) {
      return false;
    }

    let [day, month, year] = dateString.split("/");
    // Conversion to integer for comparison with date
    day = parseInt(day);
    month = parseInt(month) - 1; // Months are indexed from 0 to 11 in JS
    year = parseInt(year);
    const [hours, minutes] = timeString.split(":");
    const date = new Date(year, month, day, hours, minutes);

    // Check valide date (isn't 30/02/2025)
    if (
      date.getFullYear() !== year ||
      date.getMonth() !== month ||
      date.getDate() !== day
    ) {
      return false;
    }

    // Check that the date is later than now
    return date > new Date();
  }
  const participants = ["test@MediaList.fr", "toto@MediaList.fr"];

  useEffect(() => {
    fetch(`${BACKEND_IP}/activities/participants/${activityId}`)
      .then((response) => response.json())
      .then((data) => {
        
      })
  });

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
      });
  }, [activityId]);

  const validModifications = (res) => {
    // Check inputs before action
    let alertMessage = "";
    // !/^\d+(\.\d{1,2})?$/.test(price) && (alertMessage += "Invalid price.\n");
    !/^[1-9]\d*$/.test(duration) && (alertMessage += "Invalid duration.\n");
    !isFutureDate(date, startTime) &&
      (alertMessage += "Invalid date/time or passed date/time.\n");

    // If message, show alert and cancel send
    if (alertMessage) {
      alert(alertMessage);
      alertMessage = "";
      return;
    }

    const [day, month, year] = date.split("/");
    const [hours, minutes] = startTime.split(":");
    const startDate = new Date(year, month - 1, day, hours, minutes);

    const modif = {
      name: activityName,
      location: { street: location },
      date: startDate,
      time: duration,
      description: description,
    };
    // console.log(modif)
    fetch(`${BACKEND_IP}/activities/${activityId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(modif),
    })
      // Convertir la réponse en JSON
      .then((response) => response.json())
      .then((data) => {
        // Vérifier si l'activité a été mise à jour
        if (data.modifiedCount > 0) {
          alert("Activitée modifiée");
        }
      })
      .catch((error) => {
        console.error("Erreur lors de la mise à jour de l'activité:", error);
        res.status(500).json({ result: false, error: "Erreur serveur" });
      });
  };

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
        <Wallet total="150" max="150" />
        <Text>date</Text>
        <Text>description</Text>
   
     
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
    justifyContent: "center",
    width: "100%",
  },
  title: {
    fontSize: 20,
    fontWeight: "600",
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
    color: "white",
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
  }
});
