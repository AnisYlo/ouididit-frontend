import { View, StyleSheet, Text, KeyboardAvoidingView, Platform, ScrollView, TouchableWithoutFeedback, Keyboard } from "react-native";
import { useSelector } from "react-redux";
import Header from "../components/Header";
import { SafeAreaView } from "react-native-safe-area-context";
import Input from "../components/Input";
import { FontAwesome } from "@expo/vector-icons";
import { useEffect, useState, useRef } from "react";
import Pusher from 'pusher-js/react-native';
import ChatMessage from "../components/ChatMessage";
import ChatActivity from "../components/ChatActivity";
import { BACKEND_IP } from '@env';
import moment, { invalid } from 'moment';
import { useRoute } from "@react-navigation/native";
import { useIsFocused } from '@react-navigation/native';



export default function DiscussionsScreen({ navigation }) {
  const route = useRoute();
  const [messages, setMessages] = useState([]);
  const [messageText, setMessageText] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const isFocused = useIsFocused();

  const users = useSelector((state) => state.users.value);
  const activities = useSelector((state) => state.activities.value);
  const chats = useSelector((state) => state.chats.value);
  const scrollViewRef = useRef();

  const routeId = route.params?.chatId
  const [chatId, setChatId] = useState(routeId);

  const initFetchMessages = async () => {
    try {
      const response = await fetch(`${BACKEND_IP}/chats/${chatId}`);
      const chatHistory = await response.json();

      if(chatHistory !==null && chatHistory.messages?.length > 0){
      // If last message, is event then it's remove from array
        if(chatHistory.messages[chatHistory.messages.length-1].type==='Event')
          chatHistory.messages.pop();
        setMessages(chatHistory.messages);
      }
    } catch (error) {
      console.error("Failed to fetch messages:", error);
    }
  };

  useEffect(() => {
    // Initialiser chatId si nécessaire
    if (routeId) {
      setChatId(routeId);
    }
  }, [routeId]);

useEffect(() => {
  if (chatId) {  // Assurez-vous que chatId est défini
    (async () => {
      setIsLoading(true);
      await initFetchMessages();
      setIsLoading(false);
      setMessageText('');
    })();
    
    const pusher = new Pusher('dbcb29f95b6462d0bedd', { cluster: 'mt1' });

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
  }
}, [isFocused, chatId]);

  const handleReceiveMessage = (data) => {
    const newMessage = {
      user :{
        username: data.userName,
        avatar: data.userAvatar,
      },
      message : data.text,
      type : "Message",
      createdAt : data.createdAt,
      _id : data.id,
    }
    setMessages(messages => [...messages, newMessage]);
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

  const updateChatId = (newId) => {
    setIsLoading(true);  // Commence le chargement
    setChatId(newId);
  };

  return (
      <SafeAreaView style={styles.container}>
      <Header
        navigation={navigation}
        title="Discussions"
        avatar={users.avatar}
      />
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'}  >
        <View style={styles.vue1}>
          <View style={styles.vue11}>
            {
              activities.map((activityData, i)=>{

                const chat = chats.find(chat => chat.activity._id === activityData._id);
               
                return ( 
                 <ChatActivity
                  key={activityData._id}
                  userToken ={users.token}
                  chatId = {chat._id}
                  activityId = {activityData._id}
                  updateChatId = {updateChatId}
                  />
                )
              })
            }
          </View>
          <View style={styles.vue12}>
          <View style={styles.topBar}>
            {chats.length > 0 && chatId ? (
              <Text style={styles.topBarText}>{chats.find(chat => chat._id === chatId)?.activity?.name}</Text>
            ) : (
              <Text style={styles.topBarText}>No Chats Available</Text> // Affiche un texte par défaut ou un message d'erreur
            )}
          </View>
            <ScrollView flexGrow={1} ref={scrollViewRef} 
              onContentSizeChange={() => 
                        scrollViewRef.current?.scrollToEnd({ animated: false }) // 3. Appel de scrollToEnd
                    }
            >             
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
          <Input 
            style={styles.input}
            onChangeText={(value) => setMessageText(value)}
            value={messageText}
            autoCapitalize='none'
            inputMode='message'
            placeholder='Message'
            maxLength={200}
            />
          <FontAwesome style={styles.sendIcon} onPress={() => handleSendMessage()} name="send-o" size={24} color="black" />
        </View>
      </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {    
    flex: 1,
    justifyContent: 'flex-start',
    width: '100%',
    alignItems: 'center',
    backgroundColor: 'white',
    paddingTop:80,
  },
  vue1: {
    flexDirection: "row",
    width: "100%",
    height: "80%",
  },
  vue11: {
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: "#1F84D6",
    paddingVertical: 10,
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
    backgroundColor:'white',
  },
  topBar: {
    width: "100%",
    flexDirection: 'row',
    height: 50,
    backgroundColor: "#40BCD8",
    borderRadius: 10,
    paddingHorizontal : 10,
    alignItems: 'center',
  },
  topBarText:{
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    fontFamily: 'ClashGrotesk-Regular',
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
