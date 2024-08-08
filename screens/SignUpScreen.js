import { View, StyleSheet, Text, Button } from "react-native";
import RedButton from '../components/redButton';
import Input from '../components/Input';
import InputPassword from '../components/InputPassword';
import { useState } from "react";
import { BACKEND_IP } from '@env';



export default function SignUpScreen({navigation}) {
  const [email, setEmail]=useState('')
const [password, setPassword]=useState('')
const [username, setUsername]=useState('')


  const handleSubmitSignUp = () => {
    fetch(`${BACKEND_IP}/users/signup`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({email, password})
    }).then(response => response.json())
    .then(data => {
      console.log(data)
      if(data.result === true) 
      navigation.navigate('Home');
      else alert('User already exist !')
      
    }
    )
    }

  return (
    <View style={styles.container}>
      <Input onChangeText={(value) => setEmail(value)} value={email}  placeholder='E-mail'></Input>
      <Input onChangeText={(value) => setUsername(value)} value={username}  placeholder='Username'></Input>
      <InputPassword onChangeText={(value) => setPassword(value)} value={password}  placeholder="Password" secureTextEntry={true}></InputPassword>
      <RedButton onPress={() => handleSubmitSignUp()}></RedButton>
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "blue",
      },
});
