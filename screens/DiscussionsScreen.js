import { View, StyleSheet, Text, Button, KeyboardAvoidingView, Platform,ScrollView } from "react-native";
import { useSelector } from "react-redux";
import Header from "../components/Header";
import { SafeAreaView } from "react-native-safe-area-context";
import Input from "../components/Input";
import { TouchableOpacity } from "react-native-gesture-handler";
import { FontAwesome } from "@expo/vector-icons";

import ChatMessage from "../components/ChatMessage"

export default function DiscussionsScreen({ navigation }) {
  const users = useSelector((state) => state.users.value);
  return (
    <SafeAreaView style={styles.container}>
      <Header
        navigation={navigation}
        title="Discussions"
        avatar={users.avatar}
      />
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'}  >
        <View style={styles.vue1}>
          <View style={styles.vue11}></View>
          <View style={styles.vue12}>
            <View style={styles.topBar}></View>
            <ScrollView flexGrow={1} >             
              <View style={styles.messages}>
                <ChatMessage
                  avatar=''
                  type="Message"
                  userName="test k"
                  date="20:00"
                  courantUser="test"
                  message="jolie message !"
                  />
                <ChatMessage
                  avatar={users.avatar}
                  type="Message"
                  userName={users.username}
                  date="20:05"
                  courantUser={users.username}
                  message="jolie message !jolie message !jolie message !jolie message !jolie message !"
                  />
                  
                <ChatMessage 
                  type="Event" 
                  userName="Xavier" 
                  courantUser={users.username}
                  />
                  <ChatMessage
                  avatar=''
                  type="Message"
                  userName="test k"
                  date="20:40"
                  courantUser="test"
                  message="autre message !"
                  />
              </View>
            </ScrollView>
          </View>
          <View> </View>
        </View>
        <View  style={styles.vue2}>
          <Input style={styles.input} autoCapitalize='none' inputMode='message' placeholder='Message'/>
          <FontAwesome style={styles.sendIcon} onPress name="send-o" size={24} color="black" />
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({

  allView: {
    flex: 1,
    
  },
  container: {
    
    flex: 1,
    paddingTop: 25,
    justifyContent: 'center',
    width: '100%',
    alignItems: 'center',
    backgroundColor: 'white'

  },

  vue1: {
    flexDirection: "row",
    width: "100%",
    height: "80%",
   
    
  },
  vue11: {
    flexDirection: "column",
    alignItems: "flex-start",
    backgroundColor: "#1F84D6",
    width: "20%",
    height: 550,
    borderRadius: 10,
  },
  vue12: {
    flex: 1,
    height: "100%",
    width: "80%",
    flexDirection: "column",
   
  },
  vue2: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    width: "100%",
    paddingTop: 25,
  

  },
  topBar: {
    width: "100%",
    height: 50,
    backgroundColor: "#40BCD8",
    borderRadius: 10,
  },
  sendIcon: {
    paddingTop: 10,
    paddingRight: 10,
  },
  messages: {
 
  },
  input: {
    width: '90%',
  }
});
