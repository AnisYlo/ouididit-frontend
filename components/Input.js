import { StyleSheet, Text, TextInput, View} from 'react-native';

export default function Input(props) {
    return (          
        <View style={[styles.input, props.style]}>
            <View style={styles.inputLabelView}>
                <Text style={styles.inputLabel}>{props.placeholder} {props.require && (<Text style={styles.require}>*</Text>)}</Text>
            </View>
            <TextInput
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
            <Text style={styles.uniti}>{props.uniti}</Text>
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
        borderColor: 'rgba(38,50,56,0.16)',
        borderRadius: 10,
        borderWidth:1,
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
});