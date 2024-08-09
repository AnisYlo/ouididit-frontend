import { View, StyleSheet, Text, Button } from "react-native";
import { useSelector } from "react-redux";
import Header from '../components/Header'

export default function CalendarScreen({ navigation }) {

  const users = useSelector(state => state.users.value)

  return (
    <>
    <Header
      navigation={navigation}
      title="Calendar"
      avatar={users.avatar}
    />
    </>
  );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        // backgroundColor: "blue",
      },
});
