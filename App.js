import * as React from 'react';
import { StyleSheet } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import HomeScreen from "./screens/HomeScreen"
import CreateActivityScreen from "./screens/CreateActivityScreen";
import CalendarScreen from "./screens/CalendarScreen";
import DiscussionsScreen from "./screens/DiscussionsScreen";
import ProfilScreen from "./screens/ProfilScreen";
import SignInScreen from "./screens/SignInScreen";


const Drawer = createDrawerNavigator();
const Stack = createNativeStackNavigator();

const Root = () => {
  return(
      <Drawer.Navigator style={styles.icon} initialRouteName="Home">
        <Drawer.Screen name="Home" component={HomeScreen} options={{headerShown: false}} />
        <Drawer.Screen name="Create activity" component={CreateActivityScreen} options={{headerShown: false}} />
        <Drawer.Screen name="Calendar" component={CalendarScreen} options={{headerShown: false}} />
        <Drawer.Screen name="Discussions" component={DiscussionsScreen} options={{headerShown: false}} />
        <Drawer.Screen name="Profile" component={ProfilScreen} options={{headerShown: false}} />
        <Drawer.Screen name="SignInScreen" component={SignInScreen} options={{headerShown: false}} />
      </Drawer.Navigator>
    
  )
}

export default function App() {
  return (
    <NavigationContainer>
     <Stack.Navigator screenOptions={{ headerShown: false }}>
       <Stack.Screen name="Root" component={Root} />
       <Stack.Screen name="Create activity" component={CreateActivityScreen}/>

     </Stack.Navigator>
   </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  icon : {
    justifyContent: "flex-end"
  }
})
