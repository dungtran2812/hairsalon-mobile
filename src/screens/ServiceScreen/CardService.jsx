import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { useViewServiceQuery } from "../../services/hairsalon.service";
import { TouchableOpacity } from "react-native";

const CardService = () => {
  const { data: serviceInfo, error, isLoading } = useViewServiceQuery();

  // Handle loading and error states
  if (isLoading) {
    return <Text>Loading...</Text>;
  }

  if (error) {
    return <Text>Error: {error.message}</Text>;
  }

  return (
    <View style={styles.grid}>
      {serviceInfo?.services?.map((data, index) => (
        <View style={styles.container}>
          <View key={index} style={styles.card}>
            <Text style={styles.title}>{data.name}</Text>
            <View style={styles.imgBox}>
              <Image style={styles.img} source={{ uri: data.image }} />
            </View>
            <View style={styles.lineTime}>
              <Text style={styles.text}>
                {data.price}
                {" VNĐ"}
              </Text>
            </View>
            <View style={styles.lineTime}>
              <Text style={styles.text}>
                {data.loyaltyPoints}
                {" Điểm"}
              </Text>
            </View>
            <TouchableOpacity style={styles.button}>
              <Text style={styles.buttonText}>Đặt lịch ngay !</Text>
            </TouchableOpacity>
          </View>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "50%",
    height: 300,
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
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
    height: "50%",
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
    width: "100%",
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
    width: "98%",
    borderRadius: 20,
  },
  button: {
    width: "100%",
    height: 30,
    marginTop: 10,
    borderRadius: 10,
    backgroundColor: "#1D397A",
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: "auto",
    backgroundColor: "aqua",
  },
  buttonText: {
    color: '#fff',
    fontSize: 13,
    fontWeight: 'bold',
  },
});

export default CardService;
