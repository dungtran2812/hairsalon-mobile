import React from "react";
import { View, Text, StyleSheet, Image, ScrollView } from "react-native";
import imgHani from "../../scripts/assets/Hani.jpg";

const VoucherScreen = () => {
  return (
    <View style={styles.container}>
      <View style={styles.bg}>
        <View style={styles.title}>
          <Text style={styles.text}>My Vouchers</Text>
        </View>
      </View>
      <ScrollView contentContainerStyle={{ paddingBottom: 1000 }}>
        <View style={stylesCard.container}>
          <View style={stylesCard.card}>
            <View style={stylesCard.imgBox}>
              <Image style={stylesCard.img} source={imgHani} />
            </View>
            <View style={stylesCard.content}>
              <Text style={stylesCard.title}>aasa</Text>
              <Text>asasas</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    borderBottomRightRadius: 20,
    borderBottomLeftRadius: 20,
  },
  bg: {
    paddingLeft: 20,
    paddingRight: 20,
    backgroundColor: "white",
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
    marginTop: 20,
    marginBottom: 20,
    height: 60,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFD700",
    borderRadius: 10,
    shadowColor: "red",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 10,
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
  },
});

const stylesCard = StyleSheet.create({
  container: {
    height: "100%",
    width: "100%",
  },
  card: {
    marginTop: 20,
    height: 120,
    width: "90%",
    marginHorizontal: "auto",
    backgroundColor: "white",
    shadowColor: "red",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 10,
    flexDirection: "row",
    borderRadius: 20,
  },
  imgBox: {
    flex: 1,
  },
  img: {
    width: "100%",
    height: "100%",
    borderBottomLeftRadius: 10,
    borderTopLeftRadius: 10,
  },
  content: {
    flex: 2,
    margin: 5,
    borderRadius: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
});
export default VoucherScreen;
