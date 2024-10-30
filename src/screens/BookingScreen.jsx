import React, { useState } from "react";
import { Text, StyleSheet, Button, ScrollView, View, Alert } from "react-native";
import StepIndicator from 'react-native-step-indicator';
import UserInfo from "./BookingDetails/UserInfo";
import ServiceChoosing from "./BookingDetails/ServiceChoosing";
import { useSelector } from "react-redux";
import StylistChoosing from "./BookingDetails/StylistChoosing";
import TimeSlotChoosing from "./BookingDetails/TimeSlotChoosing";
import ConfirmationChoosing from "./BookingDetails/ConfirmationChoosing";
import PaymentChoosing from "./BookingDetails/PaymentChoosing";

const steps = [
    { title: 'Your info' },
    { title: 'Service' },
    { title: 'Stylist' },
    { title: 'Time Slot' },
    { title: 'Confirm' },
    { title: 'Payment' },
];

const BookingScreen = ({ navigation }) => {
    const customerName = useSelector((state) => state?.rootReducer?.user?.username)
    const customerPhone = useSelector((state) => state?.rootReducer?.user?.phoneNumber)
    const [currentStep, setCurrentStep] = useState(0);
    const [formBooking, setFormBooking] = useState({
        customerName: customerName,
        customerPhone: customerPhone,
        selectedServices: [],
        selectedStylist: {},
        selectedDay: "",
        selectedSlot: "",
    });
    console.log(formBooking)

    const handleNextStep = () => {
        // Validate formBooking fields based on the current step
        if (currentStep === 0) {
            // Step 1: User Info
            const { customerName, customerPhone } = formBooking;
            if (!customerName || !customerPhone) {
                alert("Please fill in your name and phone number.");
                return;
            }
        } else if (currentStep === 1) {
            // Step 2: Service
            if (formBooking.selectedServices.length === 0) {
                alert("Please choose at least one service.");
                return;
            }
        } else if (currentStep === 2) {
            // Step 3: Stylist
            if (!formBooking.selectedStylist.name) {
                alert("Please select a stylist.");
                return;
            }
        } else if (currentStep === 3) {
            // Step 4: Time Slot
            if (!formBooking.selectedDay || !formBooking.selectedSlot) {
                alert("Please select a day and time slot.");
                return;
            }
        } else if (currentStep === 4) {
            // Step 5: Payment
            // Implement payment validation if needed
        }

        // If all validations pass, proceed to the next step
        if (currentStep < steps.length - 1) {
            setCurrentStep(currentStep + 1);
        }
    };

    const handlePreviousStep = () => {
        if (currentStep > 0) {
            setCurrentStep(currentStep - 1);
        }
    };

    const handleBooking = () => {
        // Implement booking confirmation logic
        alert("Booking Confirmed", "Your booking has been confirmed.");
    };

    return (
        <ScrollView style={styles.container}>
            <StepIndicator
                direction="horizontal"
                customStyles={stepIndicatorStyles}
                currentPosition={currentStep}
                stepCount={steps.length}
                labels={steps.map(step => step.title)}
            />

            {currentStep === 0 && (
                <View style={styles.stepContainer}>
                    <UserInfo
                        formBooking={formBooking}
                        setFormBooking={setFormBooking} />
                </View>
            )}

            {currentStep === 1 && (
                <View style={styles.stepContainer}>
                    <ServiceChoosing
                        navigation={navigation}
                        formBooking={formBooking}
                        setFormBooking={setFormBooking} />
                </View>
            )}

            {currentStep === 2 && (
                <View style={styles.stepContainer}>
                    <StylistChoosing formBooking={formBooking} setFormBooking={setFormBooking} />
                </View>
            )}

            {currentStep === 3 && (
                <View>
                    <TimeSlotChoosing formBooking={formBooking} setFormBooking={setFormBooking} />
                </View>
            )}

            {currentStep === 4 && (
                <View style={styles.stepContainer}>
                    <ConfirmationChoosing formBooking={formBooking} setFormBooking={setFormBooking} />
                </View>

            )}

            {currentStep === 5 && (
                <View>
                    <PaymentChoosing formBooking={formBooking} setFormBooking={setFormBooking}/>
                </View>
            )}

            <View style={styles.stepButtonContainer}>
                {/* Back Button */}
                {currentStep > 0 && (
                    <View style={styles.backButtonContainer}>
                        <Button title="Back" onPress={handlePreviousStep} />
                    </View>
                )}
                {/* Next Button */}
                {currentStep < 5 && (
                    <View style={styles.nextButtonContainer}>
                        <Button title="Next" onPress={handleNextStep} />
                    </View>
                )}
            </View>
        </ScrollView>
    );
};

const stepIndicatorStyles = {
    stepIndicatorSize: 30,
    currentStepIndicatorSize: 40,
    separatorStrokeWidth: 3,
    currentStepIndicatorStrokeWidth: 3,
    stepStrokeCurrentColor: '#4F8EF7',
    stepStrokeWidth: 3,
    stepStrokeFinishedColor: '#4F8EF7',
    stepStrokeUnFinishedColor: '#aaaaaa',
    currentStepIndicatorColor: '#4F8EF7',
    stepIndicatorFinishedColor: '#4F8EF7',
    stepIndicatorUnFinishedColor: '#ffffff',
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
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginVertical: 10,
    },
    label: {
        fontSize: 18,
        marginVertical: 10,
        marginBottom: 4,
    },
    stepButtonContainer: {
        flexDirection: 'row',
        marginVertical: 20,
        justifyContent: 'flex-end'
    },
    backButtonContainer: {
        width: '40vw',
        marginHorizontal: 20
    },
    nextButtonContainer: {
        width: '40vw',
    },
});

export default BookingScreen;
