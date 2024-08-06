import React from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity,Image } from 'react-native';

function RedButton(props){

    return(

<TouchableOpacity style={styles.redButton} onPress={props.onPress}>
    <Text style={{ fontFamily: 'ClashGrotesk-Regular', fontSize: 24, color: '#fff' }} >
        {props.buttonText}
    </Text>
</TouchableOpacity>)
}
const styles = StyleSheet.create({
    redButton: {
        backgroundColor: '#F74231',
        justifyContent: 'center',
        alignItems: 'center',
        height: '5%',
        width: '80%',
        borderRadius: '10%'
        
       },
    //    redButtonText: {
    //      color: 'white',
    //      fontSize: '24'
       
    //    },
})

export default RedButton