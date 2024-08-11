import { View, StyleSheet, Text, Button } from "react-native";
import { useSelector } from "react-redux";
import Header from "../components/Header";
import { SafeAreaView } from "react-native-safe-area-context";
import Input from "../components/Input";

export default function DiscussionsScreen({ navigation }) {
  const users = useSelector((state) => state.users.value);
  return (
    <>
      <Header
        navigation={navigation}
        title="Discussions"
        avatar={users.avatar}
      />
      <View style={styles.container}>
        <View style={styles.vue1}>
          <View style={styles.vue11}></View>
          <View style={styles.vue12}>
            <View style={styles.topBar}></View>
            <View style={styles.messages}></View>
          </View>
        </View>
        <View style={styles.vue2}>
        <Input></Input>
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    backgroundColor: "white",
    alignItems: 'center'
    // marginHorizontal: 10,
  },

  vue1: {
    flexDirection: "row",
    width: "95%",
    height: "80%",
    backgroundColor: "white",
    
  },
  vue11: {
    flexDirection: "column",
    alignItems: "flex-start",
    backgroundColor: "#1F84D6",
    width: "20%",
    height: "100%",
    borderRadius: 10,
  },
  vue12: {
    height: "100%",
    width: "80%",
    flexDirection: "column",
  },
  vue2: {
    alignItems: 'center',
    justifyContent: 'center',
    width: "95%",
    height: "15%",
    backgroundColor: "white",
  },
  topBar: {
    width: "100%",
    height: "10%",
    backgroundColor: "#40BCD8",
    borderRadius: 10,
  },
  messages: {
    
  },
});
