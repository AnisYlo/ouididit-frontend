import { StyleSheet, Text, TextInput, View} from 'react-native';

export default function Input(props) {
    return (          
        <View style={[styles.input, props.style]}>
            <View style={styles.inputLabelView}>
                <Text style={styles.inputLabel}>{props.placeholder} {props.require && (<Text style={styles.require}>*</Text>)}</Text>
            </View>
            <View style={styles.inputEmail}>
            <TextInput
                textContentType='oneTimeCode'
                autoCorrect={props.autoCorrect}
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
                secureTextEntry={props.secureTextEntry}
                style={styles.inputStyle}
                value={props.value}
            />
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
    inputEmail: {
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
    }
});