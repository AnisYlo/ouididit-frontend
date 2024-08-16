import { KeyboardAvoidingView, Platform, SafeAreaView, ScrollView, StyleSheet, View, Text } from "react-native";
import { useSelector } from "react-redux";
import Header from "../components/Header";

export default function AllActivities({ navigation }) {
  const users = useSelector(state => state.users.value)
// Contenu du screen 
  return (
    <SafeAreaView style={styles.safeArea}>
      <Header 
          navigation={navigation}
          title='Activities' 
          avatar={users.avatar}
      />
      <KeyboardAvoidingView style={styles.keyboardView} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>          
        <ScrollView contentContainerStyle={styles.scroll} >
          <View style={styles.content}>
            <View style={styles.card}></View>
            <View style={styles.card}></View>
            <View style={styles.card}></View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
// StyleSheet du Screen
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
  card: {
    height: 200 ,
    width: '95%',
    borderRadius: 10,
    backgroundColor: 'red',
    margin: 10,
  }
});
