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
  TextInput,
  Button,
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
import { TouchableOpacity } from "react-native-gesture-handler";
import { useRoute } from "@react-navigation/native";
import Wallet from "../components/ProgressBar";
import { useIsFocused } from "@react-navigation/native";

export default function ActivityAdminScreen({ route, navigation }) {
  const [activityName, setActivityName] = useState("");
  const [price, setPrice] = useState(null);
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
  const [newParticipant, setNewParticipant] = useState("");
  const [total, setTotal] = useState(0);
  const [maxPrice, setMaxPrice] = useState(0)

  // const { activityId }  = route.params;
  const activityId = "66bb6b6e425d42873c3dbec0";

  // Grabbed from emailregex.com
  const EMAIL_REGEX = /^[\w-.]+@([\w-]+.)+[\w-]{2,}$/ig;

  const users = useSelector((state) => state.users.value);
  const avatar = !users.avatar
    ? require("../assets/avatarDefault.png")
    : { uri: users.avatar };
  const isFocused = useIsFocused();

  const onChangeDate = (event, selectedDate) => {
    setDatePickerVisible(false); // Hide picker if user cancel selection
    if (event.type === "set") {
      //setDatePickerVisible(Platform.OS === 'ios');  // Setting for IOs need testing
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
  const participants = ["test@MediaList.fr", "toto@MediaList.fr"];

  useEffect(() => {
    if (activityId)
      fetch(`${BACKEND_IP}/activities/participants/${activityId}`)
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
        });
  }, [isFocused, activityId]);

  useEffect(() => {
    if (activityId) {
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
    }
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
    EMAIL_REGEX.test({email: newParticipant})
    setModalVisible(false);
    fetch(`${BACKEND_IP}/activities/participants/${activityId}`, {
      method: 'POST',
      headers: { "Content-Type" : "application/json" },
      body: JSON.stringify({participants : [{email: newParticipant}]}),
    })
    .then((response) => response.json())
    .then((data) => {
      if(data){
        alert('Email sent to participant')
      } else {
        alert('Error')
      }
      setNewParticipant('')
    })

  };

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
                  setNewParticipant(value.toLowerCase());
                }}
                value={newParticipant}
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
            <View style={styles.friendsContainer}>
              <Image style={styles.avatar} source={avatar} />
              <Ionicons
                style={styles.add}
                name="add"
                size={45}
                color="black"
                onPress={() => addFriend()}
              />
            </View>
            <View style={styles.editButton}>
              <TouchableOpacity
                style={styles.edit}
                onPress={() => setEdit(!edit)}
              >
                <MaterialIcons name="edit" color="white" size={30} />
              </TouchableOpacity>
            </View>
            <View>
              <Input
              autoFocus
              editable={!edit}
              onChangeText={(value) => setTotal(value)}
              placeholder="Amount added"
              require={true}
              style={styles.input}
              value={total} />
            </View>
            <View>
              <Input
              autoFocus
              editable={!edit}
              onChangeText={(value) => setMaxPrice(value)}
              placeholder="Payment ceiling"
              require={true}
              style={styles.input}
              value={maxPrice} />
            </View>
            <Wallet total={Number(total)} max={Number(maxPrice)} style={styles.wallet} />
            {edit && (
              <Input
                autoFocus
                editable={edit}
                onChangeText={(value) => setActivityName(value)}
                placeholder="Activity Name"
                require={true}
                style={styles.input}
                value={activityName}
              />
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
  },
  friendsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    height: 50,
    width: "80%",
    marginBottom: 20,
  },
  add: {
    backgroundColor: "rgb(31,132,214)",
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
});
