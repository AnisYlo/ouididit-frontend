import {
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  Alert,
  Image,
  Modal,
  TouchableOpacity,
} from "react-native";
import RNDateTimePicker from "@react-native-community/datetimepicker";
import moment from "moment";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Input from "../components/Input";
import Header from "../components/Header";
import RedButton from "../components/redButton";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import Ionicons from "@expo/vector-icons/Ionicons";
import { BACKEND_IP } from "@env";
import { useRoute } from "@react-navigation/native";
import Wallet from "../components/ProgressBar";
import { useIsFocused } from "@react-navigation/native";
import PaymentModal from "../components/ModalCB";

export default function ActivityAdminScreen({ navigation }) {
  const [activityName, setActivityName] = useState("");
  const [date, setDate] = useState("");
  const [datePicker, setDatePicker] = useState(new Date());
  const [startTime, setStartTime] = useState("");
  const [startTimePicker, setStartTimePicker] = useState(new Date());
  const [duration, setDuration] = useState("");
  const [location, setLocation] = useState([]);
  const [description, setDescription] = useState("");
  const [datePickerVisible, setDatePickerVisible] = useState(false);
  const [timePickerVisible, setTimePickerVisible] = useState(false);
  const [edit, setEdit] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [inputParticipant, setinputParticipant] = useState(null);
  const [participantsArr, setParticipantsArr] = useState([]);
  const [maxPrice, setMaxPrice] = useState(0);
  const [totalPayement, setTotalPayement] = useState(0);
  const [modalCBVisible, setModalCBVisible] = useState(false);
  const route = useRoute();

  const organizer = route.params?.organizer  
  const activityId = route.params?.activity

  // Grabbed from emailregex.com
  const EMAIL_REGEX = /^[\w-.]+@([\w-]+.)+[\w-]{2,}$/gi;

  const users = useSelector((state) => state.users.value);
  const avatar = (avatarUrl) =>
    !avatarUrl ? require("../assets/avatarDefault.png") : { uri: avatarUrl };
  const isFocused = useIsFocused();

  const onChangeDate = (event, selectedDate) => {
    setDatePickerVisible(false); // Hide picker if user cancel selection
    if (event.type === "set") {
      setDatePickerVisible(Platform.OS === 'ios');  // Setting for IOs
      const currentDate = selectedDate || datePicker;
      setDate(moment(currentDate).format("DD/MM/YYYY"));
      setDatePicker(currentDate);
    } else {
      setDatePickerVisible(false); // Hide picker for all other events
    }
  };

  const onChangeTime = (event, selectedTime) => {
    setTimePickerVisible(false); // Hide picker if user cancel selection
    if (event.type === "set") {
      setTimePickerVisible(Platform.OS === 'ios');
      const currentTime = selectedTime || startTimePicker;
      setStartTime(moment(currentTime).format("HH:mm"));
      setStartTimePicker(currentTime);
    } else {
      setTimePickerVisible(false); // Hide picker for all other events
    }
  };

  // Check Date and TimeStart
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

  useEffect(() => {

    fetch(`${BACKEND_IP}/activities/${activityId}`)
      .then((response) => response.json())
      .then((data) => {
        setDescription(data.activity.description);
        setActivityName(data.activity.name);
        setDate(moment(data.activity.date).format("DD/MM/YYYY"));
        setDuration(String(data.activity.time));
        setLocation(data.activity.location.street);
        setStartTime(moment(data.activity.startTime).format("HH:mm"))
        setMaxPrice(data.activity.payementLimit);
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
  

  const validModifications = (res) => {
    // Check inputs before action
    let alertMessage = "";
    !/^\d+(\.\d{1,2})?$/.test(maxPrice) && (alertMessage += "Invalid price.\n");
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
      payementLimit : maxPrice,
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
          alert("Activity updated");
        }
      })
      .catch((error) => {
        console.error("Erreur lors de la mise à jour de l'activité:", error);
        res.status(500).json({ result: false, error: "Erreur serveur" });
      });
  };

  const addFriend = () => {
    setModalVisible(true);
  };

  const handleNewParticipant = () => {
    EMAIL_REGEX.test({ email: inputParticipant });
    setModalVisible(false);
    fetch(`${BACKEND_IP}/activities/participants/${activityId}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ participants: [{ email: inputParticipant }] }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.result) {
          const newParticipant = {
            ...participantsArr[0], // Clone du premier participant comme modèle
            user: data.participants[0], // Remplacement des données utilisateur
            _id: '', // ID vide pour un nouveau participant
          };
    
          // Mise à jour de l'état avec le nouveau participant
          setParticipantsArr(prev => [...prev, newParticipant]);
          setinputParticipant("");
          alert("Email sent to participant");
        } else {
          alert("Error");
        }
      });
  };

  
  const deleteParticipant = (participantId) => {
    if(participantsArr.length === 1){
      Alert.alert('Impossible de supprimer le dernier participant')
      return;
    }
    fetch(`${BACKEND_IP}/activities/participants/${participantId}`, {
      method: "DELETE",
      headers: { "Content-type": "application/json" },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data) {
          fetch(`${BACKEND_IP}/activities/participants/${activityId}`)
          .then((response) => response.json())
          .then((data) => {
            setParticipantsArr(data);
          });
          alert("Invitation removed!");
        } else {
          alert("Error during process!");
        }
      });
  };

  let avatarPart;

if (participantsArr && Array.isArray(participantsArr)) {
  avatarPart = participantsArr.map((data, i) => {
    const participantId = data.user._id;
    return (
      <TouchableOpacity
        key={i}
        onPress={() =>
          Alert.alert(
            "Remove invitation",
            "Are you sure you want to remove invitation?",
            [
              {
                text: "Cancel",
                onPress: () => console.log("Suppression annulée"),
                style: "cancel",
              },
              {
                text: "Yes",
                onPress: () => {
                  deleteParticipant(participantId);
                  console.log("Suppression validée");
                },
              },
            ],
            { cancelable: false }
          )
        }
      >
        <Image key={i} source={avatar(data.user.avatar)} style={styles.avatar} /> 
      </TouchableOpacity>
    );
  });
} else {
  avatarPart = null; // rendu si participantsArr est indéfini ou non un tableau
}


  return (
    //implementation du component header
    <SafeAreaView style={styles.safeArea}>
      <Header
        navigation={navigation}
        title={activityName}
        avatar={users.avatar}
      />
      {modalVisible && (
        <Modal visible={modalVisible} animationType="fade" transparent>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Input
                placeholder="Email's participant"
                onChangeText={(value) => {
                  setinputParticipant(value.toLowerCase());
                }}
                value={inputParticipant}
                style={styles.input}
              />
              <RedButton
                buttonText="Add"
                onPress={() => handleNewParticipant()}
                style={styles.button}
                activeOpacity={0.8}
              />
              <RedButton
                buttonText="Close"
                onPress={() => setModalVisible(false)}
                style={styles.button}
                activeOpacity={0.8}
              />
            </View>
          </View>
        </Modal>
      )}
      <KeyboardAvoidingView
        style={styles.keyboardView}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <ScrollView contentContainerStyle={styles.scroll}>
          <View style={styles.content}>            
          <Text style={styles.participantsTitle}>Participants :</Text>
            <View style={styles.friendsContainerWrapper}>
              <ScrollView
                horizontal={true}
                style={styles.horizontalScrollContent}
              >
                <View style={styles.friendsContainer}>{avatarPart}</View>
              </ScrollView>
              <View style={styles.add}>
                <Ionicons
                  name="add"
                  size={45}
                  color="white"
                  onPress={() => addFriend()}
                />
              </View>
            </View>
            <Wallet total={Number(totalPayement)} max={Number(maxPrice)} />
            {(Number(totalPayement) < Number(maxPrice)) && <RedButton style={styles.buttonWallet} buttonText='Contribute' onPress={() => setModalCBVisible(true)} />}
            <View style={styles.editButton}>
              <TouchableOpacity
                style={styles.edit}
                onPress={() => setEdit(!edit)}
              >
                <MaterialIcons name="edit" color="white" size={30} />
              </TouchableOpacity>
            </View>

            {edit && (
              <View style={styles.viewHidden}>
            
              <Input
                autoFocus
                editable={edit}
                onChangeText={(value) => setActivityName(value)}
                placeholder="Activity Name"
                require={true}
                style={styles.input}
                value={activityName}
              />

              <Input
                editable={edit}
                keyboardType="numeric"
                onChangeText={(value) => setMaxPrice(value)}
                placeholder="Total payement"
                require={true}
                style={styles.input}
                value={maxPrice}
              />
              </View>
            )}
            <Input
              editable={edit}
              multiline
              onChangeText={(value) => setDescription(value)}
              placeholder="Description"
              style={styles.input}
              value={description}
            />
            {datePickerVisible && edit && (
              <RNDateTimePicker
                display="spinner"
                mode="date"
                onChange={onChangeDate}
                value={datePicker}
              />
            )}
            <Input
              editable={edit}
              keyboardType={
                Platform.OS === "ios" ? "numbers-and-punctuation" : "phone-pad"
              }
              onChangeText={(value) => setDate(value)}
              onPressOut={() => setDatePickerVisible(true)}
              placeholder="Date"
              require={true}
              style={styles.input}
              value={date}
            />

            {timePickerVisible && edit && (
              <RNDateTimePicker
                display="spinner"
                minuteInterval={15}
                mode="time"
                onChange={onChangeTime}
                value={startTimePicker}
              />
            )}
            <View style={styles.line}>
              <Input
                editable={edit}
                keyboardType={
                  Platform.OS === "ios" ? "numbers-and-punctuation" : "default"
                }
                onChangeText={(value) => setStartTime(value)}
                onPressOut={() => setTimePickerVisible(true)}
                placeholder="Start time"
                require={true}
                style={styles.inputLine}
                value={startTime}
              />
              <Input
                editable={edit}
                keyboardType="numeric"
                onChangeText={(value) => setDuration(value)}
                placeholder="Duration"
                style={styles.inputLine}
                value={duration}
                uniti="hours"
              />
            </View>
            <Input
              editable={edit}
              onChangeText={(value) => setLocation(value)}
              placeholder="Location"
              style={styles.input}
              value={location}
            />
            <RedButton
              buttonText="Valid Modifications"
              onPress={() => validModifications()}
              title="Valid Modifications"
            />
          </View>
        </ScrollView>
        <PaymentModal 
          visible={modalCBVisible} 
          onClose={() => setModalCBVisible(false)} 
          userToken={users.token}
          activityId={activityId}
          setTotal={setTotalPayement}
          total={totalPayement}
        />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "white",
  },
  keyboardView: {
    flex: 1,
    width: "100%",
  },
  scroll: {
    flexGrow: 1,
    paddingTop: 130,
    paddingBottom: 20,
    justifyContent: "center",
  },
  content: {
    alignItems: "center",
    paddingBottom: 15,
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
    backgroundColor: "green",
  },
  friendsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    height: 100,
    width: "80%",
    // backgroundColor: "green",
  },
  add: {
    backgroundColor: "rgb(31,132,214)",
    borderRadius: 15,
    justifyContent: "flex-end",
    marginLeft: 10,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalView: {
    backgroundColor: "white",
    borderRadius: 20,
    padding: 30,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    width: 150,
    height: 50,
    alignItems: "center",
    marginBottom: 20,
    marginTop: 20,
    paddingTop: 8,
    backgroundColor: "#F74231",
    borderRadius: 10,
  },
  textButton: {
    color: "#ffffff",
    justifyContent: "center",
    alignItems: "center",
    padding: 3,
    height: 24,
    fontWeight: "600",
    fontSize: 15,
  },
  friendsContainerWrapper: {
    width: "80%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  buttonWallet:{
    marginVertical: 15,
  },
  viewHidden:{
    width:'100%',
    alignItems: 'center',
  },
  participantsTitle:{
    alignSelf:'flex-start',
    marginBottom: -20,
    marginLeft: '10%',
  }
});
