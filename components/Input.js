import { StyleSheet, Text, TextInput, View} from 'react-native';

export default function Input(props) {
    return (          
        <View style={[styles.input, props.style]}>
            <View style={styles.inputLabel}>
                <Text>{props.placeholder}</Text>
            </View>
            <TextInput
                label={props.label || 'Input'}
                secureTextEntry={props.secureTextEntry}
                onChangeText={props.onChangeText}
                onFocus={props.onFocus}
                onPressIn={props.onPressIn}
                onPressOut={props.onPressOut}
                onEndEditing={props.onEndEditing}
                editable={props.editable}
                value={props.value}
                style={styles.inputStyle}
                onSubmitEditing={props.onSubmitEditing || ''}
                keyboardType={props.keyboardType}
                multiline={props.multiline}
                numberOfLines={props.numberOfLines}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    input:{
        width:'100%'
    },
    inputLabel:{
        color: 'rgba(38,50,56)',
        fontSize: 12,
        backgroundColor: 'white',
        marginLeft: 10,
        paddingHorizontal:3,
        zIndex: 1,
        position: "absolute",
        top: -12,
    },
    inputStyle:{
        fontSize: 14,
        borderRadius: 10,
        height: 40,
        borderColor: 'rgba(38,50,56,0.16)',
        borderWidth:1,
        padding: 5,
    },
});