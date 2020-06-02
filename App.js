import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  ActivityIndicator,
  ScrollView,
} from "react-native";
import Header from "./src/components/Header";
import Formulario from "./src/components/Formulario";
import axios from "axios";
import Cotizacion from "./src/components/Cotizacion";

export default function App() {
  const [moneda, setMoneda] = useState("");
  const [criptomoneda, setCriptomoneda] = useState("");
  const [consultarApi, setConsultarApi] = useState(false);
  const [resultado, setResultado] = useState({});
  const [cargando, setCargando] = useState(false);

  useEffect(() => {
    const cotizarCriptomoneda = async () => {
      if (consultarApi) {
        const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${criptomoneda}&tsyms=${moneda}`;

        const res = await axios.get(url);

        setCargando(true);
        setTimeout(() => {
          setResultado(res.data.DISPLAY[criptomoneda][moneda]);
          setConsultarApi(false);
          setCargando(false);
        }, 3000);
      }
    };
    cotizarCriptomoneda();
  }, [consultarApi]);

  const componente = cargando ? (
    <ActivityIndicator size="large" color="tomato" />
  ) : (
    <Cotizacion resultado={resultado} />
  );
  return (
    <ScrollView>
      <View style={styles.container}>
        <Header />
        <Image
          source={require("./assets/img/cryptomonedas.png")}
          style={styles.imagen}
        />
        <View style={{ marginHorizontal: "2.5%" }}>
          <Formulario
            moneda={moneda}
            criptomoneda={criptomoneda}
            setMoneda={setMoneda}
            setCriptomoneda={setCriptomoneda}
            setConsultarApi={setConsultarApi}
          />
        </View>
        <View style={{ marginTop: 40 }}>{componente}</View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {},
  imagen: {
    width: "100%",
    height: 150,
    marginHorizontal: "2.5%",
  },
});
