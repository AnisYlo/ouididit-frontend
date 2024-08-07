import { View, StyleSheet, Button, TouchableOpacity, Text } from "react-native";
import RedButton from "../components/redButton";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "../components/Header"

export default function HomeScreen({ navigation }) {
  return (
    
  <SafeAreaView style={styles.container}>
    <View style={styles.header}>
      <Header 
        navigation={navigation}
        title= "Home"
        avatar={require("../assets/avatarDefault.png")}>
      </Header>
      <Text style={styles.title}>Home</Text>
      </View>
      
        <View style={styles.activitiesCard}>
        </View>
        <View style={styles.chatCard}>
        </View>
            <RedButton
              onPress={() => navigation.navigate('Create activity')}
              title="Créer une activité"
              buttonText='New Activity'
            />
   
    </SafeAreaView>
   
  );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: "space-around",
        backgroundColor: "white",
        paddingBottom: 50,
        
      },
      activitiesCard: {
      
        borderRadius: 10,
        borderWidth: 2,
        borderColor: '#e74c3c',
        height: '40%',
        backgroundColor: 'white',
        width: '95%'
      },
      chatCard: {
      
        borderRadius: 10,
        borderWidth: 2,
        borderColor: '#1F84D6',
        backgroundColor: 'white',
        height: '40%',
        width: '95%'

      },
      title: {
      width: '100%',
      heigth: "25%",
      fontFamily: 'ClashGrotesk-Bold',
      fontSize: 24,
      },
      header: {
        height: '10%',
        width: "100%",
      }
});
