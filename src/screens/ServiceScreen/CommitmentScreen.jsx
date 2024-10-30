import React from "react";
import { StyleSheet, Text, View, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { TouchableOpacity } from "react-native-gesture-handler"; // Để tạo nút quay lại
import Icon from "react-native-vector-icons/Ionicons"; // Thêm icon quay lại

const CommitmentScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.goBackButton}
        >
          <Icon name="arrow-back" size={24} color="#FAF3E0" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Cam Kết Của Chúng Tôi</Text>
      </View>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.subTitle}>Dịch vụ chất lượng cao</Text>
        <Text style={styles.content}>
          Chúng tôi cam kết cung cấp dịch vụ salon tóc chất lượng cao nhất với
          đội ngũ chuyên viên tận tâm và giàu kinh nghiệm. Mỗi dịch vụ đều được
          thực hiện bằng sản phẩm cao cấp và kỹ thuật hiện đại.
        </Text>

        <Text style={styles.subTitle}>Sự hài lòng của khách hàng</Text>
        <Text style={styles.content}>
          Chúng tôi luôn đặt sự hài lòng của bạn lên hàng đầu. Nếu bạn không hài
          lòng với dịch vụ của chúng tôi, hãy cho chúng tôi biết ngay để có thể
          giải quyết kịp thời.
        </Text>

        <Text style={styles.subTitle}>Chất lượng sản phẩm</Text>
        <Text style={styles.content}>
          Tất cả sản phẩm sử dụng trong quá trình làm đẹp đều là sản phẩm chính
          hãng, an toàn và có nguồn gốc rõ ràng. Chúng tôi luôn cập nhật các xu
          hướng và sản phẩm mới nhất để mang đến cho bạn những trải nghiệm tốt
          nhất.
        </Text>

        <Text style={styles.subTitle}>Đội ngũ chuyên viên</Text>
        <Text style={styles.content}>
          Đội ngũ chuyên viên của chúng tôi được đào tạo bài bản và có nhiều năm
          kinh nghiệm trong ngành làm đẹp. Chúng tôi cam kết sẽ mang đến cho bạn
          những dịch vụ tốt nhất và đáp ứng mọi nhu cầu của bạn.
        </Text>

        <Text style={styles.subTitle}>Thời gian phục vụ</Text>
        <Text style={styles.content}>
          Chúng tôi cam kết sẽ phục vụ bạn đúng thời gian hẹn và tạo điều kiện
          tốt nhất để bạn có thể trải nghiệm dịch vụ một cách thoải mái nhất.
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FAF3E0", // Màu nền kem nhạt
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    backgroundColor: "#5D3A29", // Màu nâu cho header
  },
  goBackButton: {
    padding: 5,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#FAF3E0", // Màu kem cho chữ tiêu đề
    marginLeft: 10,
  },
  scrollContainer: {
    paddingHorizontal: 20,
    paddingBottom: 70,
  },
  subTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#5D3A29", // Màu nâu
    marginTop: 15,
  },
  content: {
    fontSize: 16,
    color: "#333", // Màu chữ tối
    marginBottom: 15,
    lineHeight: 24,
  },
});

export default CommitmentScreen;
