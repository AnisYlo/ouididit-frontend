import { View, StyleSheet, Text, Button } from "react-native";

export default function WalletScreen() {
  return (
    <View style={styles.container}>
      <Text>Wallet</Text>
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "red",
      },
});