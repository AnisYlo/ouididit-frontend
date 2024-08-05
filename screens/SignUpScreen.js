import { View, StyleSheet, Text, Button } from "react-native";

export default function SignUpScreen() {
  return (
    <View style={styles.container}>
      <Text>Sign Up</Text>
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
