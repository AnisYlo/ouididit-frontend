import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { useGoogleLogin } from '@react-oauth/google';

const login = useGoogleLogin({
  onSuccess: codeResponse => console.log(codeResponse),
  flow: 'auth-code',
});


export default function App() {
  return (
    <GoogleOAuthProvider clientId="<your_client_id>">...
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
      <MyCustomButton onClick={() => login()}>Sign in with Google 🚀</MyCustomButton>;
      <StatusBar style="auto" />
    </View>
    </GoogleOAuthProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
