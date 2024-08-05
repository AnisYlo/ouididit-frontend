import React from 'react';
// import { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity,Image } from 'react-native';
import RedButton from '../components/redButton';
// import { GoogleSignin, GoogleSigninButton, statusCodes } from '@react-native-google-signin/google-signin';
// import jwtDecode from 'jwt-decode';

const clientId = '893917699125-l9kugcm1qd3rkelgn479pldmipn58706.apps.googleusercontent.com';

function SignInScreen({ navigation }) {

  return(

 <View style={styles.container}>
    <Image source={require('../assets/logo.png')} style={styles.logo}>
    </Image>
    <TextInput>INPUT</TextInput>
    <TextInput>INPUT</TextInput>
    <Text> Choose another account </Text>
   <RedButton buttonText='Sign In'>
   <Button onPress={() => navigation.navigate('HomeScreen')} title="Sign Up" />

   </RedButton>
    <View>
    </View>
    <Text> Not register yet ? Create an account ! </Text>
   <RedButton buttonText='Sign up'></RedButton>
 </View>
  )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      paddingTop: 50,
      flexDirection: "column",
      backgroundColor: 'white',
      alignItems: 'center',
      justifyContent: 'space-around',
      width: '100%',
      height: '100%',
      paddingBottom: 50,
    },

    logo: {
      width: '100%',
      height: '50%'
    },
    
  });


export default SignInScreen;

