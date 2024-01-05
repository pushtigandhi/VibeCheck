import React from 'react';
import { View, Text, ScrollView } from 'react-native';

const Calendar = () => {
  // Simulating the start day of the month and the total number of days
  const startDay = 3; // 0: Sunday, 1: Monday, ..., 6: Saturday
  const totalDays = 30;

  // Create an array representing the days of the week
  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  // Create an array representing the days of the month
  const daysOfMonth = Array.from({ length: totalDays }, (_, index) => index + 1);

  // Calculate the number of empty slots needed before the first day
  const emptySlots = Array.from({ length: startDay }, (_, index) => (
    <View key={`empty-${index}`} style={{ width: 100, height: 100, alignItems: 'center' }}>
      <Text>{''}</Text>
    </View>
  ));

  return (
    <View>
    <ScrollView horizontal={true} scrollEnabled={true}>
      <View style={{ flexDirection: 'row', flexWrap: 'wrap', width: 700 }}>
        {/* Render the days of the week */}
        {daysOfWeek.map(day => (
          <View key={day} style={{ width: 100, height: 100, alignItems: 'center', justifyContent: 'center', padding: 10 }}>
            <Text>{day}</Text>
          </View>
        ))}
        {/* Render the empty slots before the first day */}
        {emptySlots}

        {/* Render the days of the month */}
        {daysOfMonth.map(day => (
          <View key={day} style={{ width: 100, height: 100, alignItems: 'center', justifyContent: 'center', padding: 10 }}>
            <Text>{day}</Text>
          </View>
        ))}
      </View>
    </ScrollView>
    </View>
  );
};

export default Calendar;
