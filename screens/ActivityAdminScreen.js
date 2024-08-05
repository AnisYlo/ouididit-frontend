import { View, StyleSheet, Text, Button } from "react-native";

export default function ActivityAdminScreen() {
  return (
    <View style={styles.container}>
      <Text>ActivityAdmin</Text>
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
