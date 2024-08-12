import { View, StyleSheet, Text, Button } from "react-native";
import { useSelector } from "react-redux";
import Header from "../components/Header";

export default function AllActivities({ navigation }) {
  const users = useSelector(state => state.users.value)

  return (
    <>
      <Header
        navigation={navigation}
        title="Activities"
        avatar={users.avatar}
      />
    <View style={styles.container}> 

    <View style={styles.card}>

    </View>
    

    </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "pink",
  },
});
