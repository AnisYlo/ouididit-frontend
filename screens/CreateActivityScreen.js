import {
    Keyboard,
    KeyboardAvoidingView,
    Platform,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    TouchableWithoutFeedback,
    View,
} from 'react-native';
import RNDateTimePicker, { DateTimePickerAndroid } from '@react-native-community/datetimepicker';
import moment, { invalid } from 'moment';
import { useState } from 'react';
import { useSelector } from "react-redux";
import Input from '../components/Input';
import Header from "../components/Header";
import RedButton from "../components/redButton";
import { BACKEND_IP } from '@env';


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

    // Get reducer users
    const users = useSelector(state => state.users.value)

    const onChangeDate = (event, selectedDate) => {
        setDatePickerVisible(false);  // Hide picker if user cancel selection
        if (event.type === 'set') {
            setDatePickerVisible(Platform.OS === 'ios');  // Setting for IOs need testing
            const currentDate = selectedDate || datePicker;
            setDate(moment(currentDate).format('DD/MM/YYYY'));
            setDatePicker(currentDate);
        } else {
            setDatePickerVisible(false); // Hide picker for all other events
        }
    };

    const onChangeTime = (event, selectedTime) => {        
        setTimePickerVisible(false); // Hide picker if user cancel selection
        if (event.type === 'set') {
            setTimePickerVisible(Platform.OS === 'ios');  // Setting for IOs need testing
            const currentTime = selectedTime || startTimePicker;
            setStartTime(moment(currentTime).format('HH:mm'));
            setStartTimePicker(currentTime);
        }else {
            setTimePickerVisible(false); // Hide picker for all other events
        }
    };

    // Check Date and TimeStart
    function isFutureDate(dateString, timeString) {
        // Check input format with regex
        const regexDate = /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/;
        const regexTime = /^([01]\d|2[0-3]):([0-5]\d)$/;
        if (!regexDate.test(dateString) || !regexTime.test(timeString)) {
            return false;
        }
    
        let [day, month, year] = dateString.split('/');
        // Conversion to integer for comparison with date
        day = parseInt(day);
        month = parseInt(month) - 1; // Months are indexed from 0 to 11 in JS
        year = parseInt(year);
        const [hours, minutes] = timeString.split(':');
        const date = new Date(year, month, day, hours, minutes);

        // Check valide date (isn't 30/02/2025)
        if (date.getFullYear() !== year || date.getMonth() !== month || date.getDate() !== day) {
            return false;
        }
    
        // Check that the date is later than now
        return date > new Date();
    }

    const sendCreateActivityScreen = () =>{
        // Check inputs before action
        let alertMessage = '';
        !(/^\d+(\.\d{1,2})?$/.test(price)) && (alertMessage += "Invalid price.\n")
        !(/^[1-9]\d*$/.test(duration)) && (alertMessage += "Invalid duration.\n")
        !isFutureDate(date, startTime) && (alertMessage += "Invalid date/time or passed date/time.\n")
        
        // If message, show alert and cancel send
        if(alertMessage){
            alert(alertMessage);
            alertMessage = '';
            return;
        }

        // Date conversion for database
        const [day, month, year] = date.split('/');
        const [hours, minutes] = startTime.split(':');
        const startDate = new Date(year, month - 1, day, hours, minutes);

        const body = {
            organizer : users.token,
            name:activityName,
            location : {street : location},
            date : startDate,
            time : duration,
            description,
            payementLimit : price,
        };
        const participants = [{email :'test2@MediaList.fr'},{email :'2toto@MediaList.fr'},{email :'xavier@gmail.com', status:"Accepted"}]
        let activityId = null;
        try{
            // Create activity
            fetch(`${BACKEND_IP}/activities/`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(body),
            })
            .then(res => res.json())
            .then(res =>{
                activityId = res.activity._id; // Stock activityId
                // Create participants list
                fetch(`${BACKEND_IP}/activities/participants/${activityId}`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({participants}),
                })
            })
            .then(()=>{
                // Clear inputs
                clearInputs()
                // Create Chat
                console.log("activityId =>", activityId)
                fetch(`${BACKEND_IP}/chats/`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({activityId}),
                })
            })
            .then(()=>{
                navigation.navigate('Admin activity',{activityId});
            });
        } catch (error) {
            console.error("Failed to send activty:", error);
        }
    }

    const keyboardClose = () =>{
        setDatePickerVisible(false);
        setTimePickerVisible(false);
        Keyboard.dismiss();
    }

    const clearInputs = () =>{
        setActivityName('');
        setPrice(null);
        setDate('');
        setDatePicker(new Date());
        setStartTime('');    
        setStartTimePicker(new Date());    
        setDuration('');
        setLocation([]);
        setDescription('');
        setDatePickerVisible(false);
        setTimePickerVisible(false);
    }

    return (
    <SafeAreaView style={styles.safeArea}>
        <Header 
            navigation={navigation}
            title='New activity' 
            avatar={users.avatar}
        />
      <TouchableWithoutFeedback onPress={keyboardClose}>
        <KeyboardAvoidingView style={styles.keyboardView} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>          
            <ScrollView contentContainerStyle={styles.scroll} >
                <View style={styles.content}>
                    <Input
                        autoFocus={true}
                        onChangeText={(value) => setActivityName(value)}
                        placeholder = 'Activity Name'
                        require={true}
                        style={styles.input}
                        value={activityName}
                        maxLength={40}
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
                            maxLength={5}
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
                        onChangeText={(value) => setDate(value)}
                        onPressOut ={() => setDatePickerVisible(true)}
                        placeholder = 'Date'
                        require={true}
                        style={styles.input}
                        value={date}
                        maxLength={10}
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
                            maxLength={5}
                        />
                        <Input
                            keyboardType='numeric'
                            onChangeText={(value) => setDuration(value)}
                            placeholder = 'Duration'
                            style={styles.inputLine}
                            value={duration}
                            uniti="hours"
                            maxLength={3}
                        />
                    </View>
                    <Input
                        onChangeText={(value) => setLocation(value)}
                        placeholder = 'Location'
                        style={styles.input}
                        value={location}
                        maxLength={100}
                    />
                    <Input
                        multiline
                        onChangeText={(value) => setDescription(value)}
                        placeholder = 'Description'
                        style={styles.input}
                        value={description}
                        maxLength={200}
                    />
                    <RedButton
                        buttonText='Create'
                        onPress={() => sendCreateActivityScreen()}
                        title='Create activity'
                    />
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
        </TouchableWithoutFeedback>
    </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea:{
        flex: 1,
        backgroundColor: 'white',
    },
    keyboardView:{
        flex:1,
        width:'100%',
    },
    scroll: {
        flexGrow: 1,
        paddingTop: 130,
        paddingBottom: 20,
        justifyContent: 'center',
    },
    content: {
        alignItems: 'center',
        paddingBottom: 20,
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