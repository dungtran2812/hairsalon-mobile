import React, { useState, useEffect } from 'react';
import { Text, View, ActivityIndicator, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import { useAvailableTimeSlotsMutation } from '../../services/hairsalon.service';
import { generateNext7Days } from '../../utils/util';
import { PickerView } from '@ant-design/react-native';

const TimeSlotChoosing = ({ formBooking, setFormBooking }) => {
  const { selectedStylist, selectedSlot, selectedDay } = formBooking;
  const next7Days = generateNext7Days();
  const [selectedDayIndex, setSelectedDayIndex] = useState(next7Days[0]);

  const payload = {
    stylistId: selectedStylist?._id,
    startDate: next7Days[0],
    endDate: next7Days[6],
  };

  const [loadDataSchedule, { data: scheduleData, isLoading, error }] = useAvailableTimeSlotsMutation();

  useEffect(() => {
      loadDataSchedule(payload);
  }, [selectedStylist, selectedDay]);
  console.log(scheduleData)
  const handleDaySelect = (index) => {
    const selectedDay = next7Days[index];
    setFormBooking((prev) => ({
      ...prev,
      selectedDay: selectedDay,
      selectedSlot: null,
    }));
    setSelectedDayIndex(index);
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

  const renderTimeSlot = ({ item }) => (
    <TouchableOpacity
      style={[styles.slotButton, item.time === selectedSlot ? styles.selectedSlot : styles.availableSlot]}
      onPress={() => handleSlotSelect(item.time)}
      disabled={!item.available}
    >
      <Text style={item.available ? styles.slotText : styles.unavailableText}>
        {item.time}
      </Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Choose a Day</Text>
      <PickerView
        data={next7Days.map(day => ({ label: new Date(day).toLocaleDateString(), value: day }))}
        value={[next7Days[selectedDayIndex]]}
        onChange={(value) => handleDaySelect(next7Days.findIndex(day => day === value[0]))}
        cols={1}
      />

      <Text style={styles.header}>Choose a Time Slot</Text>
      <View style={styles.slotsContainer}>
        {timeSlots.length > 0 ? (
          console.log(timeSlots),
          <FlatList
            data={timeSlots}
            renderItem={renderTimeSlot}
            keyExtractor={(item) => item.time}
            numColumns={3} // Adjust number of columns as needed
            contentContainerStyle={styles.flatListContainer}
          />
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
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  flatListContainer: {
    justifyContent: 'center',
    alignItems: 'center',
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
