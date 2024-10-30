import React from "react";
import { View, Text, StyleSheet, Image, ScrollView } from "react-native";
import imgProfile from "../../../scripts/assets/FunFace.jpg";
import imgHani from "../../../scripts/assets/Hani.jpg";
import Icon from "react-native-vector-icons/AntDesign";
import CardService from './CardService'

const ServiceScreen = () => {
  return (
    <View style={styles.container}>
      <View style={stylesProfile.container}>
        <View style={stylesProfile.infor}>
          <View style={stylesProfile.image}>
            <Image source={imgProfile} style={stylesProfile.avatar} />
          </View>
          <View style={stylesProfile.username}>
            <Text style={stylesProfile.name}>UserName</Text>
            <Text style={stylesProfile.linklog}>
              Login Now <Icon name="right" size={12} color="white" />
            </Text>
          </View>
        </View>
        <View style={stylesProfile.otherIcon}>
          <View style={stylesProfile.otherIconContainer}>
            <Icon name="shoppingcart" size={25} color="white" />
            <Icon name="bells" size={25} color="white" />
          </View>
          <View style={stylesProfile.loyalPoint}>
            <Text style={stylesProfile.loyalText}>Point: 100P </Text>
          </View>
        </View>
      </View>

      <View style={stylesService.container}>
        <ScrollView contentContainerStyle={{ paddingBottom: 1000 }}>
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
                Mời bạn đánh giá chất lượng phục vụ
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
const stylesProfile = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 15,
    marginHorizontal: 10,
    height: 100,
    flexDirection: "row",
  },
  infor: {
    flex: 2,
    flexDirection: "row",
  },
  image: {
    width: 60,
    height: 60,
    marginRight: 10,
  },
  avatar: {
    width: "100%",
    height: "100%",
    borderRadius: 100,
    borderWidth: 1,
    borderColor: "white",
  },
  username: {
    marginTop: 10,
  },
  name: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
  },
  linklog: {
    fontSize: 12,
    color: "white",
  },
  otherIcon: {
    flex: 1,
  },
  otherIconContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    gap: 20,
    marginRight: 10,
  },
  loyalPoint: {
    borderColor: "white",
    borderWidth: 1,
    borderColor: "white",
    borderRadius: 50,
    marginTop: 10,
    height: 30,
    justifyContent: "center",
  },
  loyalText: {
    textAlign: "center",
    color: "white",
  },
});

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
