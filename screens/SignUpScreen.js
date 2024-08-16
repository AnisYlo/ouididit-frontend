import { View, StyleSheet, Text, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard } from "react-native";
import RedButton from '../components/redButton';
import Input from '../components/Input';
import InputPassword from '../components/InputPassword';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useDispatch } from 'react-redux';
import { useState } from "react";
import { BACKEND_IP } from '@env';
import { login } from '../reducers/users';


export default function SignUpScreen({navigation}) {
  const [email, setEmail]=useState('');
  const [password, setPassword]=useState('');
  const [username, setUsername]=useState('');

  const dispatch = useDispatch();

  // a l'appuie d'un bouton correspondant a cette fonction un controle est fait grace a un regex sur le contenue de 
  // l'input email et execute un fetch de la route signup uniquement si les caractere attendu dans email sont bon
  // dans ce cas les information necessaire a la route post email, password et username sont envoyer, si l'utilisateur
  // est deja existant dans la base de donnée la route renvoie une alert disant que l'utilisateur existe deja 
  const handleSubmitSignUp = () => {
    if(!(/^[\w-.]+@([\w-]+.)+[\w-]{2,}$/ig.test(email))){
      alert("Invalid email format");
      return;
    }
    
    fetch(`${BACKEND_IP}/users/signup`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({email, password, username})
    }).then(response => response.json())
    .then(data => {
      if(data.result === true) {
        dispatch(login(data.newDoc));
        navigation.navigate('Drawer');
      }
      else alert('User already exist !');
    })
  }

  return (
    //contenu de la page 
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.container}>
      <View style={styles.close}> 
        <FontAwesome onPress={() => navigation.navigate('SignIn')} name="close" size={35} color="black" />
      </View>
      <Text style={styles.title}>Create account</Text>
      <View style={styles.register}>
        <Input autoCapitalize='none' inputMode='email' onChangeText={(value) => setEmail(value.toLowerCase())} value={email}  placeholder='E-mail'></Input>
        <Input autoCapitalize='none' onChangeText={(value) => setUsername(value)} value={username}  placeholder='Username'></Input>
        <InputPassword autoCapitalize='none' onChangeText={(value) => setPassword(value)} value={password}  placeholder="Password" secureTextEntry={true}></InputPassword>
        <RedButton buttonText='Register' onPress={() => handleSubmitSignUp()}></RedButton>
      </View>
    </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
}
//styleSheet du Screen
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
