import { KeyboardAvoidingView, Platform, SafeAreaView, ScrollView, StyleSheet, View, } from "react-native";
import { useSelector } from "react-redux";
import Header from "../components/Header";

export default function ProfilInfosScreen({ navigation }) {
  const users = useSelector(state => state.users.value)

  return (
    <SafeAreaView style={styles.safeArea}>
      <Header 
          navigation={navigation}
          title='Profile Infos' 
          avatar={users.avatar}
      />
      <KeyboardAvoidingView style={styles.keyboardView} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>          
        <ScrollView contentContainerStyle={styles.scroll} >
          <View style={styles.content}>
            {/* Add page content here */}
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

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
