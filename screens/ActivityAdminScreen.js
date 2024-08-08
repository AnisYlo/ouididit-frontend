import { View, StyleSheet, Text, Button } from "react-native";
import Header from "../components/Header";

export default function ActivityAdminScreen({ navigation }) {
  return (
    //implementation du component header
    <>
    <Header
    navigation={navigation}
    title='New activity'
    avatar={require('../assets/avatarDefault.png')}
    onPressProfil = {navigation.navigate('Profile')}/>
    <View style={styles.container}>
      <Text>ActivityAdmin</Text>
    </View>
    </>
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
