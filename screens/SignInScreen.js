import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  View,
  Text,
  StyleSheet,
  Image,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import RedButton from "../components/redButton";
import Input from "../components/Input";
import InputPassword from "../components/InputPassword";
import { BACKEND_IP } from "@env";
import { userInfo } from "../reducers/users";
export default function SignInScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();

const handleSubmit = () => {
  fetch(`${BACKEND_IP}/users/signin`, {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({email, password})
  }).then(response => response.json())
  .then(data => {
    if(data.result === true) {
      dispatch(userInfo(data.data))
      navigation.navigate('Home');
    } else { alert('Wrong email or password !')
}})}
  return(
 <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.container}>
    <Image source={require('../assets/logo.png')} style={styles.logo}/>
    <View style={styles.input}>
    <Input autoCapitalize='none' onChangeText={(value) => setEmail(value)} value={email}  placeholder='E-mail'/>
    </View>
    <View style={styles.input}>
    <InputPassword autoCapitalize='none' onChangeText={(value) => setPassword(value)} value={password}  placeholder="Password" secureTextEntry={true}/>
    </View>
    <Text style={{ fontFamily: 'ClashGrotesk-Regular', fontSize: 18, color: 'black' }}> Choose another account </Text>
   <RedButton buttonText='Sign In'
   onPress={() => handleSubmit()}/>
    <Text style={{ fontFamily: 'ClashGrotesk-Regular', fontSize: 18, color: 'black' }}> Not register yet ? Create an account ! </Text>
   <RedButton buttonText='Sign up' onPress={() => navigation.navigate('Signup')}></RedButton>
   <View></View>
 </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "space-around",
    width: "100%",
    height: "100%",
    // paddingBottom: 100,
    paddingTop: 70,
  },

  logo: {
    resizeMode: "contain",
    width: "67%",
    height: "35%",
  },
  input: {
    // paddingTop: 25,
    width: "80%",
  },
  text: {
    fontFamily: "ClashGrotesk-Regular",
  },
});
