import * as React from "react";
import { Provider, useSelector } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { useEffect } from "react";
import { useFonts } from "expo-font";
import Navigation from './components/navigation/Navigation';
import users from "./reducers/users";
import activities from "./reducers/activities";
import * as SplashScreen from "expo-splash-screen";

SplashScreen.preventAutoHideAsync();

const store = configureStore({
  reducer: { 
    users, 
    activities },
});

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
      <Navigation />
    </Provider>
  );
}