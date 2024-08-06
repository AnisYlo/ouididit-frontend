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



export default function CreateActivityScreen( {navigation} ) {
    const [activityName, setActivityName] = useState('');
    const [price, setPrice] = useState(null);
    const [date, setDate] = useState('');
    const [datePicker, setDatePicker] = useState(new Date());
    const [startTime, setStartTime] = useState(new Date());    
    const [duration, setDuration] = useState('');
    const [location, setLocation] = useState([]);
    const [description, setDescription] = useState('');
    const [datePickerVisible, setDatePickerVisible] = useState(false);
    const [timePickerVisible, setTimePickerVisible] = useState(false);

    const showDatePicker = () => {
        setDatePickerVisible(true);
    };
    const showTimePicker = () => {
        setTimePickerVisible(true);
    };

    const onChangeDate = (event, selectedDate) => {
        setDatePickerVisible(false);  // Masquer le picker si l'utilisateur annule la sélection
        if (event.type === 'set') {   // 
            const currentDate = selectedDate || date;
            setDate(moment(currentDate).format('DD/MM/YYYY'));
            setDatePicker(currentDate);
        } 
    };

    function setTempDate(dateTemp){
        const regexDate =  /\d\d\/\d\d\/\d\d\d\d/
        if(regexDate.test(dateTemp))
            setDate(Date(dateTemp))
    }

    const onChangeTime = (event, selectedTime) => {        
        setTimePickerVisible(false); // Masquer le picker si l'utilisateur annule la sélection
        if (event.type === 'set') {
            const currentTime = selectedTime || startTime;
            setStartTime(currentTime);
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.title}>New Activity</Text>            
            <Input
                placeholder = 'Activity Name'
                onChangeText={(value) => setActivityName(value)}
                value={activityName}
                autoFocus
                style={styles.input}
            />
            <View style={styles.line}>
                <Input
                    placeholder = 'Price'
                    onChangeText={(value) => setPrice(value)}
                    value={price}
                    style={styles.inputLine}
                    keyboardType='numeric'
                />
            </View>

            {datePickerVisible && (<RNDateTimePicker
                value={datePicker}
                mode='date'
                onChange={onChangeDate}
                display='spinner'
            />)}
            <Input
                placeholder = 'Date'
                onChangeText={(value) => setDate(value)}
                onPressOut ={showDatePicker}
                value={date}
                style={styles.input}
                keyboardType={Platform.OS === 'ios' ? 'numbers-and-punctuation' : 'phone-pad'}
            />
            
            {timePickerVisible && (<RNDateTimePicker
                value={startTime}
                mode='time'
                onChange={onChangeTime}
                display='spinner'
            />)}
            <View style={styles.line}>
                <Input
                    placeholder = 'Start time'
                    onChangeText={(value) => setStartTime(value)}
                    onPressOut ={showTimePicker}
                    value={moment(startTime).format('HH:mm')}
                    style={styles.inputLine}
                    keyboardType={Platform.OS === 'ios' ? 'numbers-and-punctuation' : 'default'}
                />
                <Input
                    placeholder = 'Duration'
                    onChangeText={(value) => setDuration(value)}
                    value={duration}
                    style={styles.inputLine}
                />
            </View>
            <Input
                placeholder = 'Location'
                onChangeText={(value) => setLocation(value)}
                value={location}
                style={styles.input}
            />
            <Input
                placeholder = 'Description'
                onChangeText={(value) => setDescription(value)}
                value={description}
                style={styles.input}
                multiline
            />
            <Text>{JSON.stringify(date)}</Text>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width:'100%',
        height:'100%',
        backgroundColor: '#ffffff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    title:{
        fontSize: 20,
        fontWeight: '600',
    },
    input:{
        width:'80%',
        marginVertical:10,
    },    
    line:{
        flexDirection:'row',
        justifyContent: 'space-between',
        width:'80%',
        marginVertical:10,
    },
    inputLine:{
        width:'48%',
    },
});