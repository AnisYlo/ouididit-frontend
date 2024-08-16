import { KeyboardAvoidingView, Platform, SafeAreaView, ScrollView, StyleSheet, View, } from "react-native";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { useRoute } from "@react-navigation/native";
import Header from "../components/Header";
import Input from "../components/Input";
import RedButton from "../components/redButton";
import Wallet from "../components/ProgressBar";

export default function WalletScreen({ navigation }) {

  const users = useSelector(state => state.users.value);
  const [total, setTotal] = useState(0);
  const [maxPrice, setMaxPrice] = useState(0);


  return (
    //contenu de la page 
    <SafeAreaView style={styles.safeArea}>
      <Header 
          navigation={navigation}
          title='Wallet' 
          avatar={users.avatar}
      />
      <KeyboardAvoidingView style={styles.keyboardView} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>          
        <ScrollView contentContainerStyle={styles.scroll} >
          <View style={styles.content}>
            <Wallet
            total={Number(total)}
            max={Number(maxPrice)}/>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
//styleSheet du Screen
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