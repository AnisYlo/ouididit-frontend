import { View, Button, Text, StyleSheet } from "react-native";
import ProgressBar from "react-native-progress/Bar";
import { useState } from "react";
import FontAwesome from "@expo/vector-icons/FontAwesome";

export default function Wallet(props) {
  const [progress, setProgress] = useState(0);

  const handlePress = () => {
    setProgress((prevProgress) => prevProgress + 0.1);
  };

  return (
    <View style={styles.progress}>
      <ProgressBar progress={progress} 
        width={null} 
        height={55} 
        color='#F74231' 
        unfilledColor='rgba(247, 66, 49, 0.2)'
        borderRadius={10} />
      <Text>{props.total} / {props.max}</Text>
      <FontAwesome name="unlock" size={50} color="black" />
      <Button onPress={handlePress} title="Increase progress" />
    </View>
  );
};

const styles = StyleSheet.create({
    progress: {
        width:'80%'
    },
})
