import { View, StyleSheet, Text, Button, SafeAreaView, TouchableOpacity } from "react-native";
import { useDispatch } from "react-redux";
import RedButton from "../components/redButton";
import { logout } from "../reducers/users";
import Header from "../components/Header";

export default function LogoutScreen({ navigation }) {
  const dispatch = useDispatch();
  const logoutClick = () => {
    dispatch(logout());
  };

  <>
    <Header
      navigation={navigation}
      title="Logout"
      avatar={require("../assets/avatarDefault.png")}
    />
    <SafeAreaView>
        <View>
          <TouchableOpacity>
            <RedButton 
              buttonText='YES'
              onPress={() => logoutClick()} />
          </TouchableOpacity>
        </View>
        <View>
          <TouchableOpacity>
            <RedButton
              buttonText='NOT NOW'
              onPress={() => navigation.navigate("Home")}
            />
          </TouchableOpacity>
        </View>
      </SafeAreaView>
  </>;

}
const styles = StyleSheet.create({});
