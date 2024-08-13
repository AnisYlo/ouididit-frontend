import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { View, Text, StyleSheet, SafeAreaView } from 'react-native';
import { Agenda } from 'react-native-calendars';
import Header from '../components/Header';
import activities from '../reducers/activities';

const CalendarScreen = ({ navigation }) => {
  const [selectedDate, setSelectedDate] = useState("");
  const user = useSelector((state) => state.users.value);
  const activities = useSelector((state) => state.activities.value)
  console.log( '------>', activities[0])
  // Fonction pour charger les événements du mois
  const loadItems = (day) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve();
      }, 1000);
    });
  };

  // Fonction pour afficher les éléments d'événement
  const renderItem = (item) => {
    return (
      <View style={styles.item}>
        <Text style={styles.itemName}>{activities[0].name}</Text>
        <Text style={styles.itemTime}>{activities[0].date}</Text>
        <Text style={styles.itemDescription}>{activities[0].description}</Text>
      </View>
    );
  };

  // Fonction pour gérer la sélection d'une date
  const onDayPress = (day) => {
    setSelectedDate(day.dateString);
    // peux ajouter une logique pour naviguer vers un autre écran si nécessaire
    // navigation.navigate('Details', { date: day.dateString });
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <Header
        navigation={navigation}
        title={`Welcome ${user.username}`}
        avatar={user.avatar}
      />
      <View style={styles.container}>
        <Text style={styles.title}>Calendrier</Text>
        <Agenda
          items={activities[0]}
          loadItemsForMonth={loadItems}
          selected={selectedDate}
          renderItem={renderItem}
          onDayPress={onDayPress}
          markedDates={{
            [selectedDate]: {
              selected: true,
              marked: true,
              selectedColor: '#F74231',
            },
          }}
        />
        {selectedDate ? (
          <Text style={styles.selectedDate}>
            Date sélectionnée: {selectedDate}
          </Text>
        ) : null}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({  
  safeArea:{
    width:'100%',
    height:'100%',
    paddingTop:35,
    backgroundColor: 'white',
  },
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingTop: 50,
  },
  title: {
    fontFamily: 'ClashGrotesk-Regular',
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  selectedDate: {
    backgroundColor: 'red',
    fontSize: 18,
    textAlign: 'center',
    marginTop: 20,
  },
  item: {
    backgroundColor: 'lightgray',
    borderRadius: 5,
    height: 80,
    marginBottom: 10,
    padding: 10,
  },
  itemName: {
    fontWeight: 'bold',
  },
  itemTime: {
    fontStyle: 'italic',
  },
  itemDescription: {
    marginTop: 5,
  },
});

export default CalendarScreen;