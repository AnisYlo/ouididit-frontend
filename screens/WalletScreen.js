import { View, StyleSheet, Text, Button } from "react-native";

export default function WalletScreen() {
  return (
    <Header
          navigation={navigation}
          title="Wallet"
          avatar={require("../assets/avatarDefault.png")}
        />
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
