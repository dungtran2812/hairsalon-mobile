import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
  Alert,
  ScrollView,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import {
  useGetUserInforQuery,
  useUpdateUserMutation,
} from "../../services/hairsalon.service";

const EditInfoScreen = ({ navigation }) => {

  // Fetch user info
  const { data: userInfo, refetch } = useGetUserInforQuery();
  const [name, setName] = useState(userInfo?.user?.name || ""); 
  const [email, setEmail] = useState(userInfo?.user?.email || ""); 
  const [phone, setPhone] = useState(userInfo?.user?.phone || ""); 

  const [updateUser, { isLoading }] = useUpdateUserMutation();

  const handleUpdateUser = async () => {
    try {
      const userData = {
        name: name,
        email: email,
        phone: phone,
      };
      await updateUser(userData).unwrap();
      Alert.alert("Success", "User updated successfully!");

      // Refetch the user info after updating
      refetch();

      navigation.goBack();
    } catch (error) {
      console.error("Failed to update user:", error);
      Alert.alert("Error", "Failed to update user. Please try again.");
    }
  };

  const handleCancel = () => {
    navigation.goBack();
  };

  const handleAvatarUpload = () => {
    // Handle avatar upload logic (e.g., open media picker)
    Alert.alert("Upload", "Avatar upload feature to be implemented.");
  };

  return (
    <ScrollView
      contentContainerStyle={{ paddingBottom: 50, backgroundColor: "white" }}
    >
      <View style={styles.container}>
        {/* Avatar and Loyalty Points */}
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.avatarContainer}
            onPress={handleAvatarUpload}
          >
            <Image
              source={{
                uri: userInfo.user.image,
              }}
              style={styles.avatar}
            />
            <Icon
              name="pencil"
              size={20}
              color="#FFF"
              style={styles.editIcon}
            />
          </TouchableOpacity>
          <View style={styles.userInfo}>
            <Text style={styles.userName}>{name}</Text>
            <TouchableOpacity onPress={handleAvatarUpload}>
              <Icon name="pencil" size={16} color="#FF6B6B" />
            </TouchableOpacity>
            <View style={styles.loyaltyTag}>
              <Text style={styles.loyaltyText}>
                {userInfo?.user?.loyaltyPoints} Loyalty Points
              </Text>
            </View>
          </View>
          <Text style={styles.userEmail}>{email}</Text>
        </View>

        {/* Input Fields */}
        <View style={styles.inputContainer}>
          <View style={styles.inputWrapper}>
            <Icon name="person-outline" size={24} color="#4A4A4A" />
            <TextInput
              style={styles.input}
              value={name}
              onChangeText={setName}
              placeholder="Name"
            />
          </View>
          <View style={styles.inputWrapper}>
            <Icon name="mail-outline" size={24} color="#4A4A4A" />
            <TextInput
              style={styles.input}
              value={email}
              onChangeText={setEmail}
              placeholder="Email"
              autoCompleteType="email"
            />
          </View>
          <View style={styles.inputWrapper}>
            <Icon name="mail-outline" size={24} color="#4A4A4A" />
            <TextInput
              style={styles.input}
              value={phone}
              onChangeText={setPhone}
              placeholder="phone"
              autoCompleteType="phone"
            />
          </View>
        </View>

        {/* Buttons */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[styles.button, styles.cancelButton]}
            onPress={handleCancel}
          >
            <Text style={styles.cancelButtonText}>Cancel</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, styles.updateButton]}
            onPress={handleUpdateUser} // Call the function directly, do not invoke it
          >
            <Text style={styles.updateButtonText}>
              {isLoading ? "Updating..." : "Update User"}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
    paddingHorizontal: 20,
    paddingTop: 40,
  },
  header: {
    alignItems: "center",
    marginBottom: 20,
  },
  avatarContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    overflow: "hidden",
    borderWidth: 3,
    borderColor: "#FF6B6B",
    marginBottom: 10,
    position: "relative",
  },
  avatar: {
    width: "100%",
    height: "100%",
  },
  editIcon: {
    position: "absolute",
    right: 5,
    bottom: 5,
    backgroundColor: "#FF6B6B",
    borderRadius: 15,
    padding: 5,
  },
  userInfo: {
    flexDirection: "row",
    alignItems: "center",
  },
  userName: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#333",
    marginRight: 10,
  },
  loyaltyTag: {
    backgroundColor: "#FF6B6B",
    borderRadius: 15,
    paddingVertical: 3,
    paddingHorizontal: 10,
    marginLeft: 10,
  },
  loyaltyText: {
    color: "#FFF",
    fontSize: 14,
    fontWeight: "bold",
  },
  userEmail: {
    fontSize: 16,
    color: "#666",
    marginTop: 8,
  },
  inputContainer: {
    marginTop: 20,
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
    backgroundColor: "#F5F5F5",
    borderRadius: 10,
    paddingHorizontal: 10,
  },
  input: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 10,
    fontSize: 16,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
  button: {
    flex: 1,
    paddingVertical: 15,
    borderRadius: 10,
    marginHorizontal: 5,
    alignItems: "center",
  },
  cancelButton: {
    backgroundColor: "#F5F5F5",
    color: "#000000",
  },
  cancelButtonText: {
    color: "#000000",
    fontSize: 16,
    fontWeight: "bold",
  },
  updateButton: {
    backgroundColor: "#FF6B6B",
  },
  updateButtonText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default EditInfoScreen;
