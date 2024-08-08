import { StyleSheet, Text, TextInput, View} from 'react-native';

export default function Input(props) {
    return (          
        <View style={[styles.input, props.style]}>
            <View style={styles.inputLabelView}>
                <Text style={styles.inputLabel}>{props.placeholder} {props.require && (<Text style={styles.require}>*</Text>)}</Text>
            </View>
            <View style={styles.inputEmail}>
                <TextInput
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
                    style={[styles.inputStyle, (props.multiline && styles.multiline)]}
                    textContentType='oneTimeCode'
                    value={props.value}
                />
                <Text style={styles.uniti}>{props.uniti}</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    input:{
        width:'100%',
        justifyContent: 'center',
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
    uniti:{
        backgroundColor: 'white',
        color: 'rgba(38,50,56)',
        fontFamily: 'ClashGrotesk-Regular',
        fontSize: 16,
        position: "absolute",
        right:'5%',
        zIndex: 1,
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
    },
    multiline:{
        height:80
    }
});