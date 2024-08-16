import { KeyboardAvoidingView, ScrollView, TouchableOpacity, Platform, SafeAreaView, StyleSheet, View, Text, Image } from "react-native";
import moment from "moment";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Header from "../components/Header";
import { BACKEND_IP } from "@env";
import { useRoute } from "@react-navigation/native";
import Wallet from "../components/ProgressBar";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import RedButton from "../components/redButton";
import PaymentModal from "../components/ModalCB";


export default function ActivityScreen({ navigation }) {
  const route = useRoute();
  const [activityName, setActivityName] = useState("");
  const [date, setDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [duration, setDuration] = useState("");
  const [location, setLocation] = useState([]);
  const [description, setDescription] = useState("");
  const [payementLimit, setPayementLimit] = useState("");
  const [organizerToken, setOrganizerToken] = useState("");
  const [totalPayement, setTotalPayement] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);
  const [participantsArr, setParticipantsArr] = useState([]);
  
  const activityId = route.params?.activity
  const users = useSelector((state) => state.users.value);
  const userToken = users.token;

  const avatar = (avatarUrl) =>
    !avatarUrl ? require("../assets/avatarDefault.png") : { uri: avatarUrl };
  
  
// recuperation des infos de l'activité en fonction de l'activityId
// formatage de la date
// reatribution des different etat correspondant aux different infos de l'activité
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

        fetch(`${BACKEND_IP}/activities/participants/${activityId}`)
        .then((response) => response.json())
        .then((data) => {
          setParticipantsArr(data);
        });
      })
      .then(()=>{
        fetch(`${BACKEND_IP}/transactions/${activityId}`)
          .then((response) => response.json())
          .then((data) => {
            const initialValue = 0;
            const totalAmount = data.reduce(
              (accumulator, currentValue) => accumulator + currentValue.amount,
              initialValue)
              setTotalPayement(totalAmount);
          })
      });
  }, [activityId]);

  let avatarPart;
  if (participantsArr && Array.isArray(participantsArr)) {
    avatarPart = participantsArr.map((data, i) => {
      const participantId = data.user._id;
      return (
        <TouchableOpacity key={i} >
          <Image source={avatar(data.user.avatar)} style={styles.avatar} />
        </TouchableOpacity>
      );
    });
  } else {
    avatarPart = null; // rendu si participantsArr est indéfini ou non un tableau
  }

  return (
    //implementation du component header
    //contenu du screen
    //comparatif inline du Token du user ainsi que le Token attribuer a l'activité en tant qu'admin rien ne s'affiche
    // en tant que User 'invité' une View s'affiche et offre le choix d'accepter ou refuser l'invitation a l'activité
    <SafeAreaView style={styles.safeArea}>
      <Header
        navigation={navigation}
        title={activityName}
        avatar={users.avatar}
      />
      <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : 'height'} >
      <Text style={styles.participantsTitle}>Participants :</Text>
        <View style={styles.friendsContainer}>
          <ScrollView
                horizontal={true}
                style={styles.horizontalScrollContent}
              >
                <View style={styles.friendsContainer}>{avatarPart}</View>
            </ScrollView>
          </View>
          {organizerToken !== userToken && (
          <View style={styles.invitation}>
            <View style={styles.choice}>
              <RedButton buttonText='Accept'></RedButton>
              <RedButton buttonText='Refuse'></RedButton>
            </View>
          </View>
        )}
        {/* wallet dynamique */}
        <Wallet style={styles.wallet} total={Number(totalPayement)} max={Number(payementLimit)} />
        {(Number(totalPayement) < Number(payementLimit)) && <RedButton style={styles.button} buttonText='Contribute' onPress={() => setModalVisible(true)} />}
        <View style={styles.activityInfo}>
        <Text style={styles.text}>Date: {date} <FontAwesome name="calendar" size={24} color="black" /></Text>
        <Text style={styles.text}>Start: {startTime} <FontAwesome name="clock-o" size={24} color="black" /></Text>
        <Text style={styles.text}>Location: {location} <FontAwesome name="map-pin" size={24} color="black" /></Text>
        <Text style={styles.text}>Description: {description} <FontAwesome name="pencil" size={24} color="black" /></Text>
        </View>
        
        <PaymentModal 
          visible={modalVisible} 
          onClose={() => setModalVisible(false)} 
          userToken={userToken}
          activityId={activityId}
          setTotal={setTotalPayement}
          total={totalPayement}
        />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
// styleSheet du Screen
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
    paddingVertical: 20,
  },
  invitation :{    
    justifyContent: 'center',
    alignItems: 'center',
    height: '20%',
    width: '100%',
    paddingBottom: 20,
  },
  choice: {
    height: '100%',
    width: "100%",
    justifyContent: 'space-around',
    alignItems: 'center',  
  },
  button:{
    marginVertical: 15,
  },
  participantsTitle:{
    alignSelf:'flex-start',
    marginLeft: '10%',
  }
});
