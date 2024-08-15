import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { Alert, StyleSheet } from 'react-native';
import { useDispatch } from 'react-redux';
import { logout } from "../../reducers/users";
import { logoutActivities } from "../../reducers/activities";
import { useNavigation } from '@react-navigation/native';
import HomeScreen from "../../screens/HomeScreen";
import CreateActivityScreen from "../../screens/CreateActivityScreen";
import ActivityAdminScreen from "../../screens/ActivityAdminScreen";
import CalendarScreen from "../../screens/CalendarScreen";
import DiscussionsScreen from "../../screens/DiscussionsScreen";
import ProfilScreen from "../../screens/ProfilScreen";
import allActivities from "../../screens/AllActivities";
import Activity from "../../screens/Activity"
import WalletScreen from "../../screens/WalletScreen";

const Drawer = createDrawerNavigator();

export default function DrawerNavigator() {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const showLogoutAlert = (navigation) => {
    Alert.alert(
      "Logout Confirmation",
      "Are you sure you want to log out?",
      [
        { text: "Cancel",
          onPress: () => console.log("Déconnexion annulée"),
          style: "cancel"
        },
        { text: "Log out",
          onPress: () => {
            dispatch(logout()) // Déclenche l'action de déconnexion
            dispatch(logoutActivities()) // Déclenche l'action de déconnexion des ativités
          }
        }
      ],
      { cancelable: false }
    );
  };
  
  return (
    <Drawer.Navigator screenOptions={{ 
      headerShown: false,
      drawerActiveTintColor: '#e91e63', // Couleur du texte de l'élément actif
          drawerItemStyle: { 
            // flexDirection: 'row',
            // backgroundColor: 'blue',
            // justifyContent:'center',
            // alignItems:'center',
            marginVertical: 5, }, // Style de chaque élément du drawer
          drawerLabelStyle: { color: '#496F5D',
            
           }, // Style du texte des éléments
          drawerStyle: {
            flexDirection: 'colum',
            
            justifyContent:'center',
            //alignItems:'center',
          //  backgroundColor: '#c6cbef', // Couleur d'arrière-plan du drawer
          //  width: 240, // Largeur du drawer
          },
       }} >
      <Drawer.Screen name="Home" component={HomeScreen} />
      <Drawer.Screen name="Create activity" component={CreateActivityScreen} />
      {/* <Drawer.Screen name="Admin Activity" component={ActivityAdminScreen} /> */}
      <Drawer.Screen name="Activities" component={allActivities}/>
      <Drawer.Screen name="Calendar" component={CalendarScreen} />
      <Drawer.Screen name="Discussions" component={DiscussionsScreen} />
      <Drawer.Screen name="Profile" component={ProfilScreen} />
      <Drawer.Screen name="Logout" component={HomeScreen}
        options={{
          drawerLabelStyle: { 
            borderColor: 'rgba(31,132,214,0.16)',
            borderTopWidth: 1,
            paddingTop : 5,
            marginTop:10,
            color: '#e91e63',
          },
        }}
        listeners={({ navigation }) => ({
          drawerItemPress: e => {
            e.preventDefault(); // Empêcher la navigation par défaut
            showLogoutAlert(navigation); // Afficher l'alerte de déconnexion
          },
          })}
      />
    </Drawer.Navigator>
  );
};
