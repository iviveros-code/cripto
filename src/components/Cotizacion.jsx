import React from "react";
import { Text, View, StyleSheet } from "react-native";
import { useFonts } from "@use-expo/font";
import { AppLoading } from "expo";

const Cotizacion = ({ resultado }) => {
  if (Object.keys(resultado).length === 0) return null;

  const [fontsLoaded] = useFonts({
    "Lato-Regular": require("../../assets/fonts/Lato-Regular.ttf"),
    "Lato-Black": require("../../assets/fonts/Lato-Black.ttf"),
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
    return (
      <View style={styles.resultado}>
        <Text style={styles.texto}>
          <Text style={styles.span}>{resultado.PRICE}</Text>
        </Text>
        <Text style={styles.texto}>
          Precio más alto del día:{" "}
          <Text style={styles.span}>{resultado.HIGHDAY}</Text>
        </Text>
        <Text style={styles.texto}>
          Precio más bajo del día:{" "}
          <Text style={styles.span}>{resultado.LOWDAY}</Text>
        </Text>
        <Text style={styles.texto}>
          Variación últimas 24 hs:{" "}
          <Text style={styles.span}>{resultado.CHANGEPCT24HOUR} %</Text>
        </Text>
        <Text style={styles.texto}>
          Última actualización:{" "}
          <Text style={styles.span}>{resultado.LASTUPDATE}</Text>
        </Text>
      </View>
    );
  }
};

export default Cotizacion;

const styles = StyleSheet.create({
  resultado: {
    backgroundColor: "#12947f",
    padding: 10,
    marginTop: 10,
  },
  texto: {
    color: "#fff",
    fontFamily: "Lato-Regular",
    fontSize: 18,
    marginBottom: 5,
  },
  precio: {
    fontSize: 30,
  },
  span: {
    fontFamily: "Lato-Black",
  },
});
