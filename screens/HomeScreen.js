import { View, StyleSheet, Button, TouchableOpacity } from "react-native";
import RedButton from "../components/redButton";

export default function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
   
      <View style={styles.activitiesCard}>
      <TouchableOpacity></TouchableOpacity>
      </View>
      <View style={styles.chatCard}>
      </View>
      <RedButton
        onPress={() => navigation.navigate('Create activity')}
        title="Créer une activité"
        buttonText='New Activity'
      />
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "space-around",
        alignItems: "center",
        backgroundColor: "white",
        paddingBottom: 50,
      },
      activitiesCard: {
        borderRadius: "20%",
        borderWidth: 2,
        borderColor: '#e74c3c',
        height: '40%',
        backgroundColor: 'white',
        width: '95%'
      },
      chatCard: {
        borderRadius: '20%',
        borderWidth: 2,
        borderColor: '#1F84D6',
        backgroundColor: 'white',
        height: '40%',
        width: '95%'

      }
});
