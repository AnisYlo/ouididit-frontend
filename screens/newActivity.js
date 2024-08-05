import {
    Image,
    KeyboardAvoidingView,
    Platform,
    SafeAreaView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';

import { useState } from 'react';
import Input from '../components/Input';

export default function Activity() {
    const [activityName, setActivityName] = useState([]);
    const [price, setPrice] = useState([]);
    const [date, setDate] = useState([]);
    const [startTime, setStartTime] = useState([]);
    const [duration, setDuration] = useState([]);
    const [location, setLocation] = useState([]);
    const [description, setDescription] = useState([]);

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
            <Input
            placeholder = 'Price'
            onChangeText={(value) => setPrice(value)}
            value={price}
            autoFocus
            style={styles.input}
            />
            <Input
            placeholder = 'Date'
            onChangeText={(value) => setDate(value)}
            value={date}
            autoFocus
            style={styles.input}
            />
            <Input
            placeholder = 'Start time'
            onChangeText={(value) => setStartTime(value)}
            value={startTime}
            autoFocus
            style={styles.input}
            />
            <Input
            placeholder = 'Duration'
            onChangeText={(value) => setDuration(value)}
            value={duration}
            autoFocus
            style={styles.input}
            />
            <Input
            placeholder = 'Location'
            onChangeText={(value) => setLocation(value)}
            value={location}
            autoFocus
            style={styles.input}
            />
            <Input
            placeholder = 'Description'
            onChangeText={(value) => setDescription(value)}
            value={description}
            autoFocus
            style={styles.input}
            multiline
            numberOfLines={4}
            />
            <Text>{activityName}</Text>
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
});