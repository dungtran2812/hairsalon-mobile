import React, { useState } from "react";
import {
	Text,
	StyleSheet,
	Button,
	ScrollView,
	View,
	Alert,
} from "react-native";
import StepIndicator from "react-native-step-indicator";
import { useSelector } from "react-redux";
import UserInfo from "./BookingDetails/UserInfo";
import ServiceChoosing from "./BookingDetails/ServiceChoosing";
import StylistChoosing from "./BookingDetails/StylistChoosing";
import TimeSlotChoosing from "./BookingDetails/TimeSlotChoosing";
import ConfirmationChoosing from "./BookingDetails/ConfirmationChoosing";
import PaymentChoosing from "./BookingDetails/PaymentChoosing";
import { useCreateAppointmentMutation } from "../services/hairsalon.service";

const steps = [
	"Your info",
	"Service",
	"Stylist",
	"Time Slot",
	"Confirm",
	"Payment",
];

const BookingScreen = ({ navigation }) => {
	const customerName = useSelector(
		(state) => state?.rootReducer?.user?.username
	);
	const customerPhone = useSelector(
		(state) => state?.rootReducer?.user?.phoneNumber
	);
	const [pinCode, setPinCode] = useState();
	const [isPayment, setIsPayment] = useState(false);
	const [currentStep, setCurrentStep] = useState(0);
	const [formBooking, setFormBooking] = useState({
		customerName,
		customerPhone,
		selectedServices: [],
		selectedStylist: {},
		selectedDay: "",
		selectedSlot: "",
	});
	const { selectedServices, selectedStylist, selectedDay, selectedSlot } =
		formBooking;
	const payload = {
		customerName: customerName,
		customerPhone: customerPhone,
		stylistId: selectedStylist?.stylistId,
		services: selectedServices?.map((service) => ({
			name: service.name,
			price: service.price,
		})),
		appointmentDate: selectedDay,
		appointmentTime: selectedSlot,
	};

	const [createAppointment] = useCreateAppointmentMutation();

	const validateStep = () => {
		switch (currentStep) {
			case 0:
				return formBooking.customerName && formBooking.customerPhone;
			case 1:
				return formBooking.selectedServices.length > 0;
			case 2:
				return formBooking.selectedStylist?.name;
			case 3:
				return formBooking.selectedDay && formBooking.selectedSlot;
			default:
				return true;
		}
	};
	console.log(formBooking);
	const handleNextStep = () => {
		if (validateStep()) {
			setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1));
		} else {
			Alert.alert(
				"Validation Error",
				"Please complete the required fields."
			);
		}
	};

	const handlePreviousStep = () => {
		setCurrentStep((prev) => Math.max(prev - 1, 0));
	};

	const handleBooking = () => {
		setIsPayment(true);
		createAppointment(payload)
			.unwrap()
			.then((res) => {
				setPinCode(res.data.pinCode);
			});
	};

	const handleResetBooking = () => {
		setFormBooking({
			customerName,
			customerPhone,
			selectedServices: [],
			selectedStylist: {},
			selectedDay: "",
			selectedSlot: "",
		});
		setCurrentStep(0);
		setIsPayment(false);
	};

	return (
		<ScrollView style={styles.container}>
			{isPayment ? (
				<PaymentChoosing
					formBooking={formBooking}
					setIsPayment={setIsPayment}
					handleResetBooking={handleResetBooking}
					pinCode={pinCode}
				/>
			) : (
				<>
					<StepIndicator
						direction="horizontal"
						customStyles={stepIndicatorStyles}
						currentPosition={currentStep}
						stepCount={steps.length}
						labels={steps}
					/>

					<View style={styles.stepContainer}>
						{currentStep === 0 && (
							<UserInfo
								formBooking={formBooking}
								setFormBooking={setFormBooking}
							/>
						)}
						{currentStep === 1 && (
							<ServiceChoosing
								navigation={navigation}
								formBooking={formBooking}
								setFormBooking={setFormBooking}
							/>
						)}
						{currentStep === 2 && (
							<StylistChoosing
								formBooking={formBooking}
								setFormBooking={setFormBooking}
							/>
						)}
						{currentStep === 3 && (
							<TimeSlotChoosing
								formBooking={formBooking}
								setFormBooking={setFormBooking}
							/>
						)}
						{currentStep === 4 && (
							<ConfirmationChoosing
								formBooking={formBooking}
								setFormBooking={setFormBooking}
								handleBooking={handleBooking}
							/>
						)}
					</View>

					<View style={styles.stepButtonContainer}>
						{currentStep > 0 && (
							<View style={styles.button}>
								<Button
									title="Back"
									onPress={handlePreviousStep}
								/>
							</View>
						)}
						{currentStep < 5 && (
							<View style={styles.button}>
								<Button title="Next" onPress={handleNextStep} />
							</View>
						)}
					</View>
				</>
			)}
		</ScrollView>
	);
};

const stepIndicatorStyles = {
	stepIndicatorSize: 30,
	currentStepIndicatorSize: 40,
	separatorStrokeWidth: 3,
	currentStepIndicatorStrokeWidth: 3,
	stepStrokeCurrentColor: "#5D3A29",
	stepStrokeWidth: 3,
	stepStrokeFinishedColor: "#5D3A29",
	stepStrokeUnFinishedColor: "#aaaaaa",
	currentStepIndicatorColor: "#5D3A29",
	stepIndicatorFinishedColor: "#5D3A29",
	stepIndicatorUnFinishedColor: "#ffffff",
	stepIndicatorLabelFontSize: 13,
	currentStepIndicatorLabelFontSize: 13,
	labelSize: 12,
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 20,
		backgroundColor: "#fff",
	},
	stepContainer: {
		marginVertical: 10,
	},
	stepButtonContainer: {
		flexDirection: "row",
		justifyContent: "space-between",
		marginVertical: 20,
	},
	button: {
		width: "40%",
	},
});

export default BookingScreen;
