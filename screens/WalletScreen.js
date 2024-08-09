import { View, StyleSheet, Text, Button } from "react-native";
import { useSelector } from "react-redux";

export default function WalletScreen() {
  const users = useSelector(state => state.users.value)

  return (
    <Header
          navigation={navigation}
          title="Wallet"
          avatar={users.avatar}
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
