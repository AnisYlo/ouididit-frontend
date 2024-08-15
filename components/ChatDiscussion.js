import { StyleSheet, Text, TouchableOpacity, Image, View} from 'react-native';
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
    const indexPosition = participants.length >4 ? 4 : participants.length;
    return ( 
        <TouchableOpacity style={styles.viewAvatars} onPress={props.updateChatId(props.chatId)}>
            {participants && participants.length > 0 ? (

                participants.slice(0,4).map((participant, i) =>{
                    return (<Image key={i} style={[styles.avatar, styles.index(i)]} source={avatar(participant.user.avatar)} alt={`Avatar`}/>
                
                )
                })
            ) :(<View></View>)
            }
            {messagesCount > 0 && (
                <View style={[styles.compteurContainer, styles.index(indexPosition)]}>
                    <Text style={styles.compteurText}>{String(messagesCount)}</Text>
                </View>
            )}
        </TouchableOpacity>
    );
}