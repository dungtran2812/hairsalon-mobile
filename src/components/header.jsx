import React, { useEffect } from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import Icon from "react-native-vector-icons/AntDesign";
import { useGetUserInforQuery } from "../services/hairsalon.service";

const header = () => {
  const { data: userInfo, refetch } = useGetUserInforQuery();
  const role =
    userInfo?.user?.role && Array.isArray(userInfo?.user?.role)
      ? userInfo?.user?.role[0]
      : "Unknown role";
      useEffect(() => {
        refetch()
      }, [])
  return (
    <View style={stylesProfile.container}>
      <View style={stylesProfile.infor}>
        <View style={stylesProfile.image}>
          <Image
            source={{ uri: userInfo?.user?.avatar }}
            style={stylesProfile.avatar}
          />
        </View>
        <View style={stylesProfile.username}>
          <Text style={stylesProfile.name}>{userInfo?.user?.name}</Text>
          <Text style={stylesProfile.linklog}>
            {role} <Icon name="right" size={12} color="white" />
          </Text>
        </View>
      </View>
      <View style={stylesProfile.otherIcon}>
        <View style={stylesProfile.otherIconContainer}>
          <Icon name="bells" size={25} color="white" />
        </View>
        <View style={stylesProfile.loyalPoint}>
          <Text style={stylesProfile.loyalText}>
            Điểm: {userInfo?.user?.loyaltyPoints}
          </Text>
        </View>
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
    marginTop: 10,
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
    borderWidth: 2,
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

export default header;
