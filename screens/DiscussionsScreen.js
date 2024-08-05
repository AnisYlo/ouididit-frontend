import { View, StyleSheet, Text, Button } from "react-native";

export default function DiscussionsScreen() {
  return (
    <View style={styles.container}>
      <Text>Discussions</Text>
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
