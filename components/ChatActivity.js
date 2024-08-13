import { StyleSheet, Text, Image, View} from 'react-native';
import { useEffect, useState, } from "react";
import { BACKEND_IP } from '@env';

export default function ChatActivity(props) {
    const [messagesCount, setMessagesCount] = useState(0);

    useEffect(()=>{
        fetch(`${BACKEND_IP}/chats/${props.chatId}/${props.userToken}`)
        .then (response => response.json())
        .then(data => { data.result && setMessagesCount(data.newMessagesCount)
        })

    },[])
    console.log("messagesCount=>", messagesCount)
    
    const avatar = (props.avatar) ? {uri : props.avatar} : require('../assets/avatarDefault.png');
    return ( 
        <Text  >coucou{String(messagesCount)}</Text> 
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