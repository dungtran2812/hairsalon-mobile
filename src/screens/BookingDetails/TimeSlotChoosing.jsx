import React, { useState, useEffect } from 'react';
import { Text, View, ActivityIndicator, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useAvailableTimeSlotsMutation } from '../../services/hairsalon.service';
import { generateNext7Days } from '../../utils/util';
import DropDownPicker from 'react-native-dropdown-picker';

const TimeSlotChoosing = ({ formBooking, setFormBooking }) => {
  const { selectedStylist, selectedSlot, selectedDay } = formBooking;
  const next7Days = generateNext7Days();
  const [dayDropDown, setDayDropDown] = useState(false);
  
  const payload = {
    stylistId: selectedStylist?._id,
    startDate: next7Days[0],
    endDate: next7Days[6],
  };

  const [loadDataSchedule, { data: scheduleData, isLoading, error }] = useAvailableTimeSlotsMutation();

  // Trigger the mutation hook immediately to get time slots
  useEffect(() => {
    if (selectedStylist) {
      loadDataSchedule(payload);
    }
  }, [selectedStylist]);

  const handleDaySelect = (day) => {
    // Update formBooking with the selected day and reset selected slot
    setFormBooking((prev) => ({
      ...prev,
      selectedDay: day,
      selectedSlot: null, // Reset selected slot when day changes
    }));
  };

  const handleSlotSelect = (time) => {
    setFormBooking((prev) => ({
      ...prev,
      selectedSlot: time,
    }));
  };

  if (isLoading) return <ActivityIndicator size="large" color="#0000ff" />;
  if (error) return <Text style={styles.error}>Failed to load time slots.</Text>;

  const timeSlots = scheduleData?.data?.find((slot) => slot.date === selectedDay)?.timeSlots || [];

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Choose a Day</Text>
      <DropDownPicker
        items={next7Days.map((day) => ({
          label: new Date(day).toLocaleDateString(), // Format date for display
          value: day,
        }))}
        value={formBooking?.selectedDay}
        placeholder="Select a Day"
        containerStyle={{ height: 200 }}
        setValue={handleDaySelect} // Set the handler here
        open={dayDropDown} // Control open state
        setOpen={setDayDropDown}
      />

      <Text style={styles.header}>Choose a Time Slot</Text>
      <View contentContainerStyle={styles.slotsContainer}>
        {timeSlots.length > 0 ? (
          timeSlots.map((item, index) => (
            <TouchableOpacity
              key={index}
              style={[styles.slotButton, item.time === selectedSlot ? styles.selectedSlot : styles.availableSlot]}
              onPress={() => handleSlotSelect(item.time)}
              disabled={!item.available}
            >
              <Text style={item.available ? styles.slotText : styles.unavailableText}>
                {item.time}
              </Text>
            </TouchableOpacity>
          ))
        ) : (
          <Text style={styles.noSlots}>No available time slots for this day.</Text>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f9f9f9',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  slotsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  slotButton: {
    padding: 10,
    margin: 8,
    borderRadius: 5,
    minWidth: 80,
    alignItems: 'center',
  },
  availableSlot: {
    backgroundColor: '#4CAF50',
  },
  selectedSlot: {
    backgroundColor: '#FFA726',
  },
  slotText: {
    color: '#fff',
    fontSize: 16,
  },
  unavailableText: {
    color: '#b0b0b0',
  },
  error: {
    color: 'red',
    fontSize: 16,
    textAlign: 'center',
    marginTop: 20,
  },
  noSlots: {
    fontSize: 16,
    textAlign: 'center',
    color: '#777',
  },
});

export default TimeSlotChoosing;
