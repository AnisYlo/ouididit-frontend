import { StyleSheet, Text, TextInput, View} from 'react-native';
import { useState } from 'react';
import FontAwesome from '@expo/vector-icons/FontAwesome';;


export default function Input(props) {
    const [hide, setHide]=useState(props.secureTextEntry)
    const [eyeIcon, setEyeIcon]=useState('eye')
    const [eyeIconColor, setEyeIconColor]=useState('')

    const handlePasswordIcon = () => {
        if (eyeIcon === 'eye') {
            setEyeIcon('eye-slash');
            setEyeIconColor('#F74231')
            setHide(!hide);
        } else if (eyeIcon === 'eye-slash') {
            setEyeIcon('eye');
            setEyeIconColor('black')
            setHide(!hide);
        }
      };








    return (          
        <View style={[styles.input, props.style]}>
            <View style={styles.inputLabelView}>
                <Text style={styles.inputLabel}>{props.placeholder} {props.require && (<Text style={styles.require}>*</Text>)}</Text>
            </View>
            <View style={styles.inputpassword}>
            <TextInput
                autoCapitalize={props.autoCapitalize}
                textContentType='oneTimeCode'
                autoComplete={props.autoComplete}
                editable={props.editable}
                keyboardType={props.keyboardType}
                label={props.label || 'Input'}
                multiline={props.multiline}
                numberOfLines={props.numberOfLines}
                onChangeText={props.onChangeText}
                onFocus={props.onFocus}
                onPressIn={props.onPressIn}
                onPressOut={props.onPressOut}
                onEndEditing={props.onEndEditing}
                onSubmitEditing={props.onSubmitEditing || ''}
                secureTextEntry={hide}
                style={styles.inputStyle}
                value={props.value}>
                </TextInput>
                <FontAwesome style= {styles.iconeye} name={eyeIcon} size={24} color={eyeIconColor} onPress={() => handlePasswordIcon()}/>
                </View>
        </View>
        
    );
}

const styles = StyleSheet.create({
    input:{
        width:'100%'
    },
    inputLabelView:{
        backgroundColor: 'white',
        color: 'rgba(38,50,56)',
        fontSize: 12,
        marginLeft: 10,
        paddingHorizontal:3,
        position: "absolute",
        top: -10,
        zIndex: 1,
    },
    inputLabel:{
        backgroundColor: 'white',
        color: 'rgba(38,50,56)',
        fontFamily: 'ClashGrotesk-Regular',
        fontSize: 16,
    },
    require:{
        color : '#F74231',
        fontFamily: 'ClashGrotesk-Regular',
        fontSize: 16,
    },
    inputStyle:{
        width: '80%',
        fontFamily: 'ClashGrotesk-Regular',
        fontSize: 18,
        height: 40,
        padding: 5,
        paddingHorizontal:10,
    },
    inputpassword: {
        borderColor: 'rgba(38,50,56,0.16)',
        borderRadius: 10,
        borderWidth:1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: 'white',
        borderRadius: 10,
        // paddingHorizontal: 14,
        backgroundColor: 'white',
    },
    iconeye: {
        marginLeft: 10,
        paddingRight: 10,
    }
});