import * as React from "react";
import { Provider, useSelector } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { useEffect } from "react";
import { useFonts } from "expo-font";
import Navigation from './components/navigation/Navigation';
import users from "./reducers/users";
import activities from "./reducers/activities";
import chats from "./reducers/chats";
import * as SplashScreen from "expo-splash-screen";
import { Calendar, Agenda } from 'react-native-calendars';

SplashScreen.preventAutoHideAsync();


const MyAgenda = () => {
    return (
      //contenu de l'agenda et theme visuel de l'agenda
        <View>
            <Agenda
                markedDates={{
                    '2023-06-25': { selected: true, marked: true },
                    '2023-06-24': { marked: true },
                    '2023-06-26': {
                        marked: true, dotColor: 'red',
                        activeOpacity: 0
                    },
                }}
                theme={{
                    backgroundColor: '#ffffff',
                    calendarBackground: '#ffffff',
                    textSectionTitleColor: '#b6c1cd',
                    selectedDayBackgroundColor: '#00adf5',
                    selectedDayTextColor: '#ffffff',
                    todayTextColor: '#00adf5',
                    dayTextColor: '#2d4150',
                    textDisabledColor: '#d9e1e8',
                    dotColor: '#00adf5',
                    selectedDotColor: '#ffffff',
                    arrowColor: '#00adf5',
                    monthTextColor: '#00adf5',
                    indicatorColor: 'blue',
                    textDayFontFamily: 'ClashGrotesk-Regular',
                    textMonthFontFamily: 'ClashGrotesk-Regular',
                    textDayHeaderFontFamily: 'ClashGrotesk-Regular',
                    textDayFontSize: 16,
                    textMonthFontSize: 16,
                    textDayHeaderFontSize: 16
                }}
            />
        </View>
    );
};
//configuration du store et le contenu du reducer
const store = configureStore({
  reducer: { 
    users, 
    activities,
    chats 
  },
});
//importation des polices de caractères
export default function App() {
  const [loaded, error] = useFonts({
    "ClashGrotesk-Bold": require("./assets/fonts/ClashGrotesk-Bold.otf"),
    "ClashGrotesk-Extralight": require("./assets/fonts/ClashGrotesk-Extralight.otf"),
    "ClashGrotesk-Light": require("./assets/fonts/ClashGrotesk-Light.otf"),
    "ClashGrotesk-Medium": require("./assets/fonts/ClashGrotesk-Medium.otf"),
    "ClashGrotesk-Regular": require("./assets/fonts/ClashGrotesk-Regular.otf"),
    "ClashGrotesk-Semibold": require("./assets/fonts/ClashGrotesk-Semibold.otf"),
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
      <Navigation />
    </Provider>
  );
}