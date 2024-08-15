import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useSelector } from 'react-redux';
import DrawerNavigator from "./DrawerNavigator";
import SignInScreen from "../../screens/SignInScreen";
import SignUpScreen from "../../screens/SignUpScreen";
import CreateActivityScreen from "../../screens/CreateActivityScreen";
import ActivityAdminScreen from "../../screens/ActivityAdminScreen";
import ProfilPaiementsScreen from "../../screens/ProfilPaiementsScreen";
import ProfilInfosScreen from "../../screens/ProfilInfos";
import ProfilScreen from "../../screens/ProfilScreen";
import WalletScreen from "../../screens/WalletScreen";
import CalendarScreen from "../../screens/CalendarScreen";
import allActivities from "../../screens/AllActivities";
import Activity from "../../screens/Activity";

const Stack = createNativeStackNavigator();

export default function Navigation() {
  // Retrive user authification status (true -> connected, false -> not connected)
  const isAuthenticated = useSelector(state => state.users.isAuthenticated);
  //console.log("isAuthenticated =>", isAuthenticated)

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {/* Ternary expression : Connected ? true -> setup stack navigator with drawer navigator / false -> setup stack navigator Signin and Signup */}
        {isAuthenticated ? (
          <Stack.Screen name="Drawer" component={DrawerNavigator} />
        ) : (
          <>
            <Stack.Screen name="SignIn" component={SignInScreen} />
            <Stack.Screen name="SignUp" component={SignUpScreen} />
          </>
        )}
        <Stack.Screen name="Activity Admin" component={ActivityAdminScreen} />
        <Stack.Screen name="The Calendar" component={CalendarScreen}/>
        <Stack.Screen name="Create activity" component={CreateActivityScreen}/>
        <Stack.Screen name="AllActivites" component={allActivities}/>
        <Stack.Screen name="Profile" component={ProfilScreen} />
        <Stack.Screen name="Profile Infos" component={ProfilInfosScreen} />
        <Stack.Screen name="Profile Paiements" component={ProfilPaiementsScreen}/>
        <Stack.Screen name="Wallet" component={WalletScreen} />
        <Stack.Screen name="Activity" component={Activity}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
