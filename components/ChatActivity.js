import { StyleSheet, Text, Image, View} from 'react-native';
import { useEffect, useState, } from "react";
import { BACKEND_IP } from '@env';

export default function ChatActivity(props) {
    const [messagesCount, setMessagesCount] = useState(0);
    const [participants, setParticipants] = useState([]);


    useEffect(()=>{
        fetch(`${BACKEND_IP}/chats/${props.chatId}/${props.userToken}`)
        .then (response => response.json())
        .then(data => { data.result && setMessagesCount(data.newMessagesCount)
        })

        fetch(`${BACKEND_IP}/activities/participants/${props.activityId}`)
        .then (response => response.json())
        .then(data => { data && setParticipants(data)
        })


    },[])
    
    const avatar = (avatarUrl) => (avatarUrl) ? {uri : avatarUrl} : require('../assets/avatarDefault.png');

    return ( 
        <View style={styles.viewAvatars}>
            {participants && participants.length > 0 ? (
                participants.slice(0,4).map((participant, i) =>(
                    <Image key={i} style={[styles.avatar, styles.index(i)]} source={avatar(participant.user.avatar)} alt={`Avatar`}/>
                ))
            ) :(<View></View>)
            }
            {messagesCount > 0 && (
                <View style={[styles.compteurContainer, styles.index(participants.length)]}>
                    <Text style={styles.compteurText}>{String(messagesCount)}</Text>
                </View>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    viewAvatars:{
        flexDirection: 'row',
        width:'100%',
        alignItems:'center',
        marginVertical:15,
        paddingHorizontal:5,
    },
    avatar: {
        height: 30,
        width: 30,
        borderRadius: 30,
    },
    compteurContainer: {
        height: 15,
        width: 15,
        backgroundColor: 'red',
        borderRadius: 15,
        alignSelf:'flex-end',
    },
    compteurText: {
        lineHeight: 16,
        textAlign: 'center',
        textAlignVertical: 'center',
        color:'white',
    },
    index: (i) => ({
        left: i * -15,
    }),
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