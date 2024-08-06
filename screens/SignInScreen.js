import React from 'react';
import { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity,Image, Button } from 'react-native';
import RedButton from '../components/redButton';
import Input from '../components/Input';
// import { GoogleSigninButton } from '@react-native-google-signin/google-signin';





<<<<<<< HEAD
function SignInScreen({ navigation }) {
  const [email, setEmail]=useState('')
  const [password, setPassword]=useState('')

  
const handleSubmit = () => {
  fetch('http://172.20.10.3:3000/users/signin', {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({email, password})
  }).then(response => response.json())
  .then(data => {
    console.log(data)
    if(data.result === true) 
    navigation.navigate('Accueil');
    else alert('Email is not deliverable.')
    
  }
  )
  }

  // const handleSubmitGoogle = () => {
  //   navigation.navigate('Accueil')
  // }
=======
export default function SignInScreen({ navigation }) {
>>>>>>> navigation

  return(

 <View style={styles.container}>
<<<<<<< HEAD
    <Image source={require('../assets/logo.png')} style={styles.logo}/>
    <Input onChangeText={(value) => setEmail(value)} value={email} style={styles.input} placeholder='E-mail'/>
    <Input onChangeText={(value) => setPassword(value)} value={password} style={styles.input} placeholder="Password"/>
    <Text style={{ fontFamily: 'ClashGrotesk-Regular', fontSize: 18, color: 'black' }}> Choose another account </Text>
   <RedButton buttonText='Sign In'
   onPress={() => handleSubmit()}/>
   {/* <GoogleSigninButton
  size={GoogleSigninButton.Size.Wide}
  color={GoogleSigninButton.Color.Dark}
  onPress={() => {
  handleSubmitGoogle()
  }}
  disabled={isInProgress}
/>; */}
=======
    <Image source={require('../assets/logo.png')} style={styles.logo}>
    </Image>
    <TextInput>INPUT</TextInput>
    <TextInput>INPUT</TextInput>
    <Text> Choose another account </Text>
   <RedButton buttonText='Sign In' onPress={() => navigation.navigate('Accueil')}>
   {/* <Button onPress={() => navigation.navigate('Accueil')} title="Sign In" /> */}
>>>>>>> navigation

    <Text style={{ fontFamily: 'ClashGrotesk-Regular', fontSize: 18, color: 'black' }}> Not register yet ? Create an account ! </Text>
   <RedButton buttonText='Sign up'></RedButton>
 </View>
  )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: "column",
      backgroundColor: 'white',
      alignItems: 'center',
      justifyContent: 'space-around',
      width: '100%',
      height: '100%',
      paddingBottom: 50,
    },

    logo: {
      resizeMode: 'content',
      width: '80%',
      height: '45%',
    },
    input:{
      width:'80%'
    },
    text: {
      fontFamily: 'ClashGrotesk-Regular'
    }
    
  });


