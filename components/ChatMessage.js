import { StyleSheet, Text, Image, View} from 'react-native';

export default function ChatMessage(props) {

    if(props.type === 'Event'){
        if(props.userName === props.courantUser)
            return <Text style={styles.new}>New activity</Text>
        else
            return
    }
    
    const avatar = (props.avatar) ? {uri : props.avatar} : require('../assets/avatarDefault.png');
    return (          
        <View style={styles.messageContainer} >
            <Image style={styles.avatar} source={avatar} />
            <View style={styles.textContainer}>
                <View style={styles.messageInfos}>
                    <Text style={styles.userName} >{props.userName}</Text> 
                    <Text style={styles.date} >{props.date}</Text>
                </View> 
                <Text style={styles.messageText}>{props.message}</Text> 
           </View>
        </View>
    );
}

const styles = StyleSheet.create({
    messageContainer:{
        flexDirection: 'row',
        width:'100%',
        alignItems:'center',
        marginVertical:5,
    },
    avatar: {
      height: 45,
      width: 45,
      borderRadius: 45,
    },
    textContainer:{
        flexDirection:'column',
        flexShrink:1,
        width : '100%',
        height: '100%',
        paddingHorizontal: 10,
    },
    messageInfos:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        width : '100%',        
    },
    userName:{
        fontFamily: 'ClashGrotesk-Regular',
        fontWeight:'bold',
    },
    date:{
        color:'#496F5D',
    },
    messageText:{
        flexShrink:1,
        flexWrap:'wrap',
        fontFamily: 'ClashGrotesk-Regular',
    },


    new:{
        width :'100%',
        height:'auto', 
        textAlign:'right',
        borderTopColor: '#496F5D',
        borderTopWidth:1,
        color:'#496F5D',
        marginVertical:5,
    },
});