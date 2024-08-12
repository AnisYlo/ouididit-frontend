import { View, StyleSheet, Text, Button, KeyboardAvoidingView, Platform } from "react-native";
import RedButton from '../components/redButton';
import Input from '../components/Input';
import InputPassword from '../components/InputPassword';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useDispatch } from 'react-redux';
import { useState } from "react";
import { BACKEND_IP } from '@env';
import { userInfo } from '../reducers/users'
import { TouchableOpacity } from "react-native-gesture-handler";


export default function SignUpScreen({navigation}) {
  const [email, setEmail]=useState('')
  const [password, setPassword]=useState('')
  const [username, setUsername]=useState('')

  const dispatch = useDispatch()
  const handleSubmitSignUp = () => {

    fetch(`${BACKEND_IP}/users/signup`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({email, password, username})
    }).then(response => response.json())
    .then(data => {
      if(data.result === true) {
        dispatch(userInfo(data.newDoc))
        navigation.navigate('Home');
      }
      else alert('User already exist !')
      
    }
    )
    }

  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.container}>
      <View style={styles.close}> 
        <FontAwesome onPress={() => navigation.navigate('Signin')} name="close" size={35} color="black" />
      </View>
      <Text style={styles.title}>Create account</Text>
      <View style={styles.register}>
        <Input autoCapitalize='none' onChangeText={(value) => setEmail(value)} value={email}  placeholder='E-mail'></Input>
        <Input autoCapitalize='none' onChangeText={(value) => setUsername(value)} value={username}  placeholder='Username'></Input>
        <InputPassword autoCapitalize='none' onChangeText={(value) => setPassword(value)} value={password}  placeholder="Password" secureTextEntry={true}></InputPassword>
        <RedButton buttonText='Register' onPress={() => handleSubmitSignUp()}></RedButton>
      </View>
    </KeyboardAvoidingView>
    

  );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: "white",
        fontFamily: 'ClashGrotesk-Regular'
      },
      register: {
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '80%',
        height: '50%',
      },
      title: {
        alignItems: 'center',
        justifyContent: 'center', 
        paddingBottom: 100,
        fontSize: 40,
      },
      close: {
        justifyContent: 'flex-start',
        alignItems: 'flex-end',
        width: '100%',
        height: '10%',
        paddingRight: 20,
      }
});
