import { View, StyleSheet, Text, Button } from "react-native";

export default function CreateActivityScreen() {
  return (
    <View style={styles.container}>
      <Text>Créer une activité</Text>
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "blue",
      },
});
