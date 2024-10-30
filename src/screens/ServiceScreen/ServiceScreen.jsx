import React from "react";
import { View, Text, StyleSheet, Image, ScrollView } from "react-native";
import imgHani from "../../../scripts/assets/Hani.jpg";
import Icon from "react-native-vector-icons/AntDesign";
import CardService from './CardService'
import Header from '../../components/header'


const ServiceScreen = () => {
  return (
    <View style={styles.container}>
      <Header />

      <View style={stylesService.container}>
        <ScrollView contentContainerStyle={{ paddingBottom: 100 }}>
          <View style={stylesService.boxIcon}>
            <View style={stylesService.content}>
              <View style={stylesService.iconbg}>
                <Icon
                  style={stylesService.icon}
                  name="gift"
                  size={30}
                  color="#1D397A"
                />
              </View>
              <Text style={stylesService.text}>Ưu đãi</Text>
            </View>
            <View style={stylesService.content}>
              <View style={stylesService.iconbg}>
                <Icon
                  style={stylesService.icon}
                  name="Safety"
                  size={30}
                  color="#1D397A"
                />
              </View>
              <Text style={stylesService.text}>Cam Kết</Text>
            </View>
            <View style={stylesService.content}>
              <View style={stylesService.iconbg}>
                <Icon
                  style={stylesService.icon}
                  name="earth"
                  size={30}
                  color="#1D397A"
                />
              </View>
              <Text style={stylesService.text}>Hệ thống</Text>
            </View>
          </View>

          <View style={stylesIntroCard.container}>
            <View style={stylesIntroCard.avatarBox}>
              <Image source={imgHani} style={stylesIntroCard.avatar} />
            </View>
            <View style={stylesIntroCard.content}>
              <Text style={stylesIntroCard.title}>
                Bạn nhớ để lại đánh giá sau khi sử dụng dịch vụ nhé!
              </Text>
              <Text style={stylesIntroCard.subScript}>
                Phản hồi của bạn sẽ giúp chúng tôi cải thiện chất lượng hơn
              </Text>
              <View style={stylesIntroCard.star}>
                <Icon name="star" size={25} color="yellow" />
                <Icon name="star" size={25} color="yellow" />
                <Icon name="star" size={25} color="yellow" />
                <Icon name="star" size={25} color="yellow" />
                <Icon name="star" size={25} color="yellow" />
              </View>
            </View>
          </View>

          <View style={styleTitle.container}>
            <View style={styleTitle.line}></View>
            <View style={styleTitle.boxTitle}>
              <Text style={styleTitle.title}>Dịch Vụ Tóc</Text>
            </View>
          </View>
          <View style={styleCardField.container}>
            <CardService />
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

const stylesService = StyleSheet.create({
  container: {
    flex: 7,
    backgroundColor: "#F9F9F9",
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    overflow: "hidden",
  },
  boxIcon: {
    width: "100%",
    paddingTop: 20,
    flexDirection: "row",
  },
  content: {
    flex: 1,
    alignItems: "center",
  },
  iconbg: {
    height: 60,
    width: 60,
    borderRadius: 100,
    backgroundColor: "white",
    shadowOffset: {
      width: 0, // Độ dịch chuyển theo chiều ngang
      height: 4, // Độ dịch chuyển theo chiều dọc
    },
    shadowOpacity: 0.2, // Độ mờ của bóng
    shadowRadius: 8, // Bán kính của bóng
    elevation: 5,
  },
  icon: {
    margin: "auto",
  },
  text: {
    marginTop: 10,
  },
});

const stylesIntroCard = StyleSheet.create({
  container: {
    backgroundColor: "aqua",
    marginVertical: 20,
    marginHorizontal: 20,
    borderRadius: 15,
    flexDirection: "row",
    paddingHorizontal: 10,
    paddingVertical: 10,

    shadowColor: "red",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 10,
  },
  avatarBox: {
    flex: 1,
  },
  avatar: {
    height: 70,
    width: 50,
    borderRadius: 10,
  },
  content: {
    flex: 4,
  },
  title: {
    fontWeight: "bold",
    fontSize: 16,
  },
  subScript: {
    marginVertical: 10,
    color: "white",
  },
  star: {
    flexDirection: "row",
  },
});

const styleTitle = StyleSheet.create({
  container: {
    flexDirection: "row",
    marginLeft: 20,
    alignItems: "center",
  },
  line: {
    width: 5,
    height: 30,
    backgroundColor: "aqua",
  },
  boxTitle: {
    marginLeft: 10,
  },
  title: {
    fontWeight: "bold",
    fontSize: 20,
    color: "#1D397A",
  },
});

const styleCardField = StyleSheet.create({
 container: {
  marginHorizontal: 20,
 }
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1D397A",
  },

  text: {
    fontSize: 22,
    fontWeight: "bold",
  },
});

export default ServiceScreen;
