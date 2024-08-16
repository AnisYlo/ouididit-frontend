import React from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  SafeAreaView,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  Image,
} from "react-native";
import { useSelector } from "react-redux";
import Header from "../components/Header";
import RedButton from "../components/redButton";

export default function ProfilScreen({ navigation }) {
  const users = useSelector(state => state.users.value)
  
  return (
    //contenu de la page
    <SafeAreaView style={styles.safeArea}>
      <Header 
          navigation={navigation}
          title='Profile Infos' 
          avatar={users.avatar}
      />
      <KeyboardAvoidingView style={styles.keyboardView} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>          
        <ScrollView contentContainerStyle={styles.scroll} >
          <View style={styles.content}>
            <View>
            <TouchableOpacity>
            <RedButton 
              buttonText='Informations'
              onPress={() => navigation.navigate("Profile Infos")} />
          </TouchableOpacity>
        </View>
        <View>
          <TouchableOpacity>
            <RedButton
              buttonText='Paiements Informations'
              onPress={() => navigation.navigate("Profile Paiements")}
            />
          </TouchableOpacity>
        </View>
        </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
//StyleSheet du Screen
const styles = StyleSheet.create({
  safeArea:{
    flex: 1,
    backgroundColor: 'white',
  },
  keyboardView:{
    flex:1,
    width:'100%',
  },
  scroll: {
    flexGrow: 1,
    paddingTop: 130,
    paddingBottom: 20,
    justifyContent: 'center',
  },
  content: {
    alignItems: 'center',
    paddingBottom: 20,
  },
});
