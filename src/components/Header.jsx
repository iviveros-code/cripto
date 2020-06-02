import React from "react";
import { Text, View, StyleSheet, Platform } from "react-native";
import { useFonts } from "@use-expo/font";
import { AppLoading } from "expo";

const Header = () => {
  const [fontsLoaded] = useFonts({
    "RockSalt-Regular": require("../../assets/fonts/RockSalt-Regular.ttf"),
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
    return <Text style={styles.encabezado}>Criptomonedas</Text>;
  }
};

export default Header;

const styles = StyleSheet.create({
  encabezado: {
    paddingTop: Platform.OS === "ios" ? 50 : 10,
    fontSize: 20,
    fontFamily: "RockSalt-Regular",
    textAlign: "center",
    backgroundColor: "#2fc4b2",
    color: "#fff",
    paddingBottom: 10,
    marginBottom: 30,
    fontWeight: "bold",
  },
});
