import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import imgHani from "../../../scripts/assets/Hani.jpg";

const CardService = () => {
  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>Cắt Tóc Thương Gia</Text>
        <Text style={styles.titlesub}>Combo cắt kỹ</Text>
        <Text style={styles.titlesub}>Combo gội đầu masage</Text>
        <View style={styles.imgBox}>
          <Image style={styles.img} source={imgHani} />
        </View>
        <View style={styles.lineTime}>
          <Text style={styles.text}>50 phút</Text>
        </View>
        <View></View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "50%",
    height: 250,
  },
  card: {
    padding: 10,
    marginHorizontal: "auto",
    marginVertical: "auto",
    width: "90%",
    height: "90%",
    backgroundColor: "white",
    borderRadius: 20,
    shadowColor: "aqua",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 10,
  },
  title: {
    fontSize: 15,
    fontWeight: "bold",
  },
  titlesub: {
    fontSize: 10,
    marginTop: 5,
  },
  imgBox: {
    marginTop: 10,
    width: "100%",
    height: "40%",
    backgroundColor: "aqua",
    borderRadius: 15,
  },
  img: {
    margin: "auto",
    width: "92%",
    height: "90%",
    borderRadius: 10,
  },
  lineTime: {
    width: "50%",
    height: 19,
    marginTop: 10,
    borderRadius: 20,
    backgroundColor: "#1D397A",
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: "auto",
  },
  text: {
    backgroundColor: "white",
    fontSize: 10,
    textAlign: "center",
    height: 16,
    width: "96%",
    borderRadius: 20,
  },
});

export default CardService;
