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
            setDatePickerVisible(Platform.OS === 'ios');  // Setting for IOs need testing
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

    const sendCreateActivityScreen =()=>{

    }

    return (
    <>
        <Header 
            navigation={navigation}
            title='New activity'
            avatar={require('../assets/avatarDefault.png')}
            onPressProfil = {navigation.navigate('Profil')}
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
                    onChangeText={(value) => setDuration(value)}
                    placeholder = 'Duration'
                    style={styles.inputLine}
                    value={duration}
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
        marginVertical:10,
        width:'80%',
    },
    inputLine:{
        width:'48%',
    },
});