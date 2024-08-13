import { View, Text, StyleSheet } from "react-native";
import ProgressBar from "react-native-progress/Bar";
import { useState, useEffect } from "react";
import FontAwesome from "@expo/vector-icons/FontAwesome";

export default function Wallet(props) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if(props.max === 0) {
      setProgress(1)
    } else {
    // Calculer le pourcentage de progression
    const calculatedProgress = props.total / props.max;
    setProgress(calculatedProgress)
  };
    //Le tableau de redevance indique à React quand exécuter la fonction d'effet.
  }, [props.total, props.max]);

  // Déterminer le nom de l'icône basé sur la progression avec une fonction ternaire
  const iconName = progress < 1 ? "unlock" : "lock";

  return (
    <View style={styles.progress}>
      <ProgressBar
        progress={progress}
        width={null}
        height={55}
        color="#F74231"
        unfilledColor="rgba(247, 66, 49, 0.2)"
        borderRadius={10}
      />
      <Text style={styles.text}>
        {props.total} / {props.max} Wallet
      </Text>
      <FontAwesome
        name={iconName}
        size={50}
        color="white"
        style={styles.lock}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  progress: {
    width: "80%",
  },
  text: {
    color: "rgba(38,50,56)",
    fontFamily: "ClashGrotesk-Regular",
    fontSize: 28,
    position: "absolute",
    top: "20%",
    right: "20%",
    zIndex: 1,
    color: 'white'
  },
  lock: {
    fontSize: 34,
    position: "absolute",
    top: "10%",
    right: "5%",
    zIndex: 1,
  },
});
