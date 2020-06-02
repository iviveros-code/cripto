import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  StyleSheet,
  Picker,
  TouchableHighlight,
  Alert,
} from "react-native";
import { useFonts } from "@use-expo/font";
import { AppLoading } from "expo";
import axios from "axios";

const Formulario = ({
  moneda,
  criptomoneda,
  setMoneda,
  setCriptomoneda,
  setConsultarApi,
}) => {
  const [criptomonedas, setCriptomonedas] = useState([]);

  const [fontsLoaded] = useFonts({
    "Lato-Black": require("../../assets/fonts/Lato-Black.ttf"),
    "Lato-Regular": require("../../assets/fonts/Lato-Regular.ttf"),
  });

  const obtenerMoneda = (moneda) => {
    setMoneda(moneda);
  };
  const obtenerCriptomoneda = (criptomoneda) => {
    setCriptomoneda(criptomoneda);
  };

  useEffect(() => {
    const consultarApi = async () => {
      const url =
        "https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD";
      const res = await axios.get(url);

      setCriptomonedas(res.data.Data);
    };
    consultarApi();
  }, []);

  const cotizar = () => {
    if (!moneda.trim() === "" || !criptomoneda.trim()) {
      mostrarAlerta();
      return;
    }
    setConsultarApi(true);
  };

  const mostrarAlerta = () => {
    Alert.alert("Alerta", "Debes seleccionar Currency & Cripto", [
      {
        text: "Ok!",
      },
    ]);
  };

  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
    return (
      <View>
        <Text style={styles.label}>Moneda</Text>
        <Picker
          onValueChange={(moneda) => obtenerMoneda(moneda)}
          selectedValue={moneda}
          itemStyle={{ height: 120 }}
        >
          <Picker.Item label="-Seleccione-" value="" />
          <Picker.Item label="-Dolar de Estados Unidos-" value="USD" />
          <Picker.Item label="-Peso Mexicano-" value="MXN" />
          <Picker.Item label="-Euro-" value="EUR" />
          <Picker.Item label="-Libra Esterlina-" value="GBP" />
          <Picker.Item label="-Peso Argentino-" value="ARS" />
        </Picker>

        <Text style={styles.label}>Criptomoneda</Text>
        <Picker
          onValueChange={(criptomoneda) => obtenerCriptomoneda(criptomoneda)}
          selectedValue={criptomoneda}
          itemStyle={{ height: 120 }}
        >
          <Picker.Item label="-Seleccione-" value="" />
          {criptomonedas.map((cripto) => (
            <Picker.Item
              key={cripto.CoinInfo.Id}
              label={cripto.CoinInfo.FullName}
              value={cripto.CoinInfo.Name}
            />
          ))}
        </Picker>

        <TouchableHighlight style={styles.btn} onPress={cotizar}>
          <Text style={styles.texto}>Cotizar</Text>
        </TouchableHighlight>
      </View>
    );
  }
};

export default Formulario;

const styles = StyleSheet.create({
  label: {
    fontFamily: "Lato-Black",
    fontSize: 22,
    marginVertical: 20,
  },
  btn: {
    backgroundColor: "#2fc4b2",
    padding: 10,
    marginTop: 20,
  },
  texto: {
    color: "#fff",
    fontSize: 18,
    fontFamily: "Lato-Regular",
    textAlign: "center",
  },
});
