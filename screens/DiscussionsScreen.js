import { View, StyleSheet, Text, KeyboardAvoidingView, Platform, ScrollView } from "react-native";
import { useSelector } from "react-redux";
import Header from "../components/Header";
import { SafeAreaView } from "react-native-safe-area-context";
import Input from "../components/Input";
import { FontAwesome } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import Pusher from 'pusher-js/react-native';
import ChatMessage from "../components/ChatMessage";
import { BACKEND_IP } from '@env';
import moment, { invalid } from 'moment';

const chatId = '66b8bc81c2d65214466106d9';

export default function DiscussionsScreen({ navigation }) {
  const [messages, setMessages] = useState([]);
  const [messageText, setMessageText] = useState('');

  const users = useSelector((state) => state.users.value);

  useEffect(()=>{
    // Créer une nouvelle instance de Pusher
    const pusher = new Pusher('dbcb29f95b6462d0bedd', { cluster: 'mt1' });

    const fetchMessages = async () => {
      try {
        const response = await fetch(`${BACKEND_IP}/chats/${chatId}`);
        const chatHistory = await response.json();
        setMessages(chatHistory.messages);
      } catch (error) {
        console.error("Failed to fetch messages:", error);
      }
    };

    fetchMessages();

    const updateUser = async () => {
      try {
        await fetch(`${BACKEND_IP}/chats/${chatId}/${users.token}`, { method: 'PUT' });
      } catch (error) {
        console.error("Failed to update user:", error);
      }
    };
    
    updateUser();

    const subscription = pusher.subscribe(chatId);
    subscription.bind('pusher:subscription_succeeded', () => {
      subscription.bind('message', handleReceiveMessage);
    });

    // Cleanup function pour désabonner et détruire Pusher à la fin du cycle de vie du composant
    return () => {
      subscription.unbind('message', handleReceiveMessage);
      pusher.unsubscribe(chatId);
      const deleteUser = async () => {
        try {
          await fetch(`${BACKEND_IP}/chats/${chatId}/${users.token}`, { method: 'DELETE' });
        } catch (error) {
          console.error("Failed to delete user:", error);
        }
      };
      deleteUser();
    };
  },[]);

  const handleReceiveMessage = (data) => {
    setMessages(messages => [...messages, data]);
  };

  const handleSendMessage = async () => {
    if (!messageText) {
      return;
    }

    const body = {
      messageText,
      username: users.username,
      avatar: users.avatar,
    };

    try {
      await fetch(`${BACKEND_IP}/chats/${chatId}/${users.token}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      setMessageText('');
    } catch (error) {
      console.error("Failed to send message:", error);
    }
  };

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
            <View style={styles.topBar}>
              <Text></Text>
            </View>
            <ScrollView flexGrow={1} >             
              <View style={styles.messages}>
              {
                messages.map((message, i) => (
                <ChatMessage
                  key={i}
                  avatar={message.user.avatar}
                  type={message.type}
                  userName={message.user.username}
                  date={moment(message.createdAt).format('DD/MM HH:mm')}
                  courantUser={users.username}
                  message={message.message}
                />
                ))}
              </View>
            </ScrollView>
          </View>
        </View>
        <View  style={styles.vue2}>
          <Input style={styles.input} onChangeText={(value) => setMessageText(value)} value={messageText} autoCapitalize='none' inputMode='message' placeholder='Message'/>
          <FontAwesome style={styles.sendIcon} onPress={() => handleSendMessage()} name="send-o" size={24} color="black" />
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {    
    flex: 1,
    //paddingTop: 25,
    justifyContent: 'flex-start',
    width: '100%',
    alignItems: 'center',
    backgroundColor: 'white',
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
    height: "100%",
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
    height:'20%',
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
    width:'95%',
    marginHorizontal:'auto',
    alignItems:'center',
  },
  input: {
    width: '90%',
  }
});
