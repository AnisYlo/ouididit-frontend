import * as React from "react";
import { Alert } from 'react-native';
import { StyleSheet } from "react-native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {NavigationContainer,createAppContainer} from "@react-navigation/native";
import ActivityAdminScreen from "./screens/ActivityAdminScreen";
import CalendarScreen from "./screens/CalendarScreen";
import CreateActivityScreen from "./screens/CreateActivityScreen";
import DiscussionsScreen from "./screens/DiscussionsScreen";
import HomeScreen from "./screens/HomeScreen";
import ProfilPaiementsScreen from "./screens/ProfilPaiementsScreen";
import ProfilInfosScreen from "./screens/ProfilInfos";
import ProfilScreen from "./screens/ProfilScreen";
import SignInScreen from "./screens/SignInScreen";
import SignUpScreen from "./screens/SignUpScreen";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import users from "./reducers/users";
import activities from "./reducers/activities"
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import WalletScreen from "./screens/WalletScreen";
// import { useDispatch } from "react-redux";
// import { logout } from "./reducers/users";


SplashScreen.preventAutoHideAsync();

// const dispatch = useDispatch();
const store = configureStore({
  reducer: { users, activities },
});

const Drawer = createDrawerNavigator();
const Stack = createNativeStackNavigator();


const showLogoutAlert = (navigation) => {
  Alert.alert(
    "Logout Confirmation",
    "Are you sure you want to log out ?",
    [
      { text: "Cancel",
        onPress: () => console.log("Déconnexion annulée"),
        style: "cancel"
      },
      { text: "Log out",
        onPress: () => handleLogout(navigation)
      }
    ],
    { cancelable: false }
  );
};


const handleLogout = (navigation) => {
  // dispatch(logout())
  console.log("Utilisateur déconnecté");
  navigation.navigate('Sign In');
};
const Root = () => {

  return(
      <Drawer.Navigator style={styles.icon} initialRouteName="Home">
        <Drawer.Screen name="Home" component={HomeScreen} options={{headerShown: false}} />
        <Drawer.Screen name="Create activity" component={CreateActivityScreen} options={{headerShown: false}} />
        <Drawer.Screen name="Admin activity" component={ActivityAdminScreen} options={{headerShown: false}}/>
        <Drawer.Screen name="Calendar" component={CalendarScreen} options={{headerShown: false}} />
        <Drawer.Screen name="Discussions" component={DiscussionsScreen} options={{headerShown: false}} />
        <Drawer.Screen name="Profile" component={ProfilScreen} options={{headerShown: false}} />
        <Drawer.Screen name="Sign In" component={SignInScreen} options={{headerShown: false}} />
        <Drawer.Screen name="Logout" component={HomeScreen} options={{headerShown: false}} listeners={({ navigation }) => ({
            drawerItemPress: e => {
              e.preventDefault(); // Empêcher la navigation par défaut
              showLogoutAlert(navigation); // Afficher l'alerte de déconnexion
            },
          })}/>
      </Drawer.Navigator>
  )
}

export default function App() {
  const [loaded, error] = useFonts({
    "ClashGrotesk-Regular": require("./assets/fonts/ClashGrotesk-Regular.otf"),
  });

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  if (!loaded && !error) {
    return null;
  }

  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Root" component={Root}/>
          <Stack.Screen name="Signin" component={SignInScreen}/>
          <Stack.Screen name="Signup" component={SignUpScreen}/>
          <Stack.Screen name="Activity Admin" component={ActivityAdminScreen} />
          <Stack.Screen name="Create activity" component={CreateActivityScreen}/>
          <Stack.Screen name="Profile Paiements" component={ProfilPaiementsScreen}/>
          <Stack.Screen name="Profile Infos" component={ProfilInfosScreen} />
          <Stack.Screen name="Wallet" component={WalletScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

const styles = StyleSheet.create({
  icon: {
    justifyContent: "flex-end",
  },
});
