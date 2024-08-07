import {
    Image,
    KeyboardAvoidingView,
    Platform,
    SafeAreaView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    Button,
    View,
} from 'react-native';
import RNDateTimePicker, { DateTimePickerAndroid } from '@react-native-community/datetimepicker';
import moment from 'moment';
import { useState } from 'react';
import Input from '../components/Input';
import Header from "../components/Header";
import RedButton from "../components/redButton";

//const BACKEND_IP = 'http://192.168.1.120:3000'; //maison
const BACKEND_IP = 'http://10.0.2.129:3000'; //cowork

export default function CreateActivityScreen( {navigation} ) {
    const [activityName, setActivityName] = useState('');
    const [price, setPrice] = useState(null);
    const [date, setDate] = useState('');
    const [datePicker, setDatePicker] = useState(new Date());
    const [startTime, setStartTime] = useState('');    
    const [startTimePicker, setStartTimePicker] = useState(new Date());    
    const [duration, setDuration] = useState('');
    const [location, setLocation] = useState([]);
    const [description, setDescription] = useState('');
    const [datePickerVisible, setDatePickerVisible] = useState(false);
    const [timePickerVisible, setTimePickerVisible] = useState(false);

    const onChangeDate = (event, selectedDate) => {
        setDatePickerVisible(false);  // Masquer le picker si l'utilisateur annule la sélection
        if (event.type === 'set') {
            //setDatePickerVisible(Platform.OS === 'ios');  // Setting for IOs need testing
            const currentDate = selectedDate || datePicker;
            setDate(moment(currentDate).format('DD/MM/YYYY'));
            setDatePicker(currentDate);
        } else {
            setDatePickerVisible(false);
        }
    };

    const onChangeTime = (event, selectedTime) => {        
        setTimePickerVisible(false); // Masquer le picker si l'utilisateur annule la sélection
        if (event.type === 'set') {
            const currentTime = selectedTime || startTimePicker;
            setStartTime(moment(currentTime).format('HH:mm'));
            setStartTimePicker(currentTime);
        }
    };

    const sendCreateActivityScreen = async () =>{
        // Conversion de la date pour enregitrement en BDD
        const [day, month, year] = date.split('/');
        const [hours, minutes] = startTime.split(':');
        const startDate = new Date(year, month - 1, day, hours, minutes);

        const body = {
            organizer : "7HIcKJ04pAR8Wqxt7O268oFVLG-AvfEI",
            name:activityName,
            location : {street : location},
            date : startDate,
            time : duration,
            description,
            payementLimit : price,
          };

        try{
            await fetch(`${BACKEND_IP}/activities/`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(body),
            });
        } catch (error) {
            console.error("Failed to send activty:", error);
        }
    }

    return (
    <>
        <Header 
            navigation={navigation}
            title='New activity'
            avatar={require('../assets/avatarDefault.png')}
        />  
        <SafeAreaView style={styles.container}>          
            <Input
                autoFocus
                onChangeText={(value) => setActivityName(value)}
                placeholder = 'Activity Name'
                require={true}
                style={styles.input}
                value={activityName}
            />
            <View style={styles.line}>
                <Input
                    keyboardType='numeric'
                    onChangeText={(value) => setPrice(value)}
                    placeholder = 'Price'
                    require={true}
                    style={styles.inputLine}
                    value={price}
                    uniti="€"
                />
            </View>

            {datePickerVisible && (<RNDateTimePicker
                display='spinner'
                mode='date'
                onChange={onChangeDate}
                value={datePicker}
            />)}
            <Input
                keyboardType={Platform.OS === 'ios' ? 'numbers-and-punctuation' : 'phone-pad'}
                onChangeText={(value) => setTempDate(value)}
                onPressOut ={() => setDatePickerVisible(true)}
                placeholder = 'Date'
                require={true}
                style={styles.input}
                value={date}
            />
            
            {timePickerVisible && (<RNDateTimePicker
                display='spinner'
                minuteInterval={15}
                mode='time'
                onChange={onChangeTime}
                value={startTimePicker}
            />)}
            <View style={styles.line}>
                <Input
                    keyboardType={Platform.OS === 'ios' ? 'numbers-and-punctuation' : 'default'}
                    onChangeText={(value) => setStartTime(value)}
                    onPressOut ={() => setTimePickerVisible(true)}
                    placeholder = 'Start time'
                    require={true}
                    style={styles.inputLine}
                    value={startTime}
                />
                <Input
                    keyboardType='numeric'
                    onChangeText={(value) => setDuration(value)}
                    placeholder = 'Duration'
                    style={styles.inputLine}
                    value={duration}
                    uniti="hours"
                />
            </View>
            <Input
                onChangeText={(value) => setLocation(value)}
                placeholder = 'Location'
                style={styles.input}
                value={location}
            />
            <Input
                multiline
                onChangeText={(value) => setDescription(value)}
                placeholder = 'Description'
                style={styles.input}
                value={description}
            />
            <RedButton
                buttonText='Create'
                onPress={() => sendCreateActivityScreen()}
                title='Create activity'
            />
        </SafeAreaView>
    </>
    );
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        backgroundColor: '#ffffff',
        flex: 1,
        height:'100%',
        justifyContent: 'center',
        width:'100%',
    },
    title:{
        fontSize: 20,
        fontWeight: '600',
    },
    input:{
        marginVertical:10,
        width:'80%',
    },    
    line:{
        flexDirection:'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginVertical:10,
        width:'80%',
    },
    inputLine:{
        width:'48%',
    },
});