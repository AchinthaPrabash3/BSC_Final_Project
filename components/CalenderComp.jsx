import { Calendar, toDateId } from "@marceloterreiro/flash-calendar";
import React, { useEffect, useState } from "react";
import {
  Alert,
  Platform,
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
} from "react-native";
import { Ionicons } from "@expo/vector-icons"; // For arrow icons
import useAppwrite from "../hooks/useAppwrite";
import { getBookedDates } from "../lib/appwrite";

const CalendarComp = ({
  selectDate,
  setSelectDate,
  today,
  gigId,
  getDate,
  order,
}) => {
  const { data } = useAppwrite(getBookedDates(gigId));
  const [dates, setDates] = useState([]);
  const [currentMonth, setCurrentMonth] = useState(toDateId(new Date(today))); // Track the current month

  useEffect(() => {
    if (data) {
      setDates(data.map((item) => toDateId(new Date(item.date))));
    }
  }, [data]);

  // Function to navigate to the previous month
  const goToPreviousMonth = () => {
    const date = new Date(currentMonth);
    date.setMonth(date.getMonth() - 1); // Move to the previous month
    setCurrentMonth(toDateId(date));
  };

  // Function to navigate to the next month
  const goToNextMonth = () => {
    const date = new Date(currentMonth);
    date.setMonth(date.getMonth() + 1); // Move to the next month
    setCurrentMonth(toDateId(date));
  };

  const handleDateSelect = (e) => {
    if (dates.includes(e)) {
      Alert.alert("Unavailable", "This date is already booked.");
      return;
    }
    setSelectDate(e);
    getDate({ ...order, date: e });
  };

  return (
    <View className="mb-4">
      <View style={styles.calendarContainer}>
        {/* Buttons for navigating months */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            onPress={goToPreviousMonth}
            style={styles.arrowButton}
          >
            <Ionicons name="chevron-back" size={30} color="#000" />
          </TouchableOpacity>
          <TouchableOpacity onPress={goToNextMonth} style={styles.arrowButton}>
            <Ionicons name="chevron-forward" size={30} color="#000" />
          </TouchableOpacity>
        </View>
        <Calendar
          calendarMinDateId={today}
          calendarDisabledDateIds={dates}
          calendarMonthId={currentMonth} // Use the state to control the current month
          onCalendarDayPress={handleDateSelect}
          calendarActiveDateRanges={[
            {
              startId: selectDate,
              endId: selectDate,
            },
          ]}
          calendarDayStyle={{
            default: {
              textStyle: {
                color: Platform.OS == "ios" ? "#000000" : "#ffffff",
              },
            },
            active: {
              containerStyle: {
                backgroundColor: Platform.OS == "ios" ? "#000000" : "red",
              },
              textStyle: {
                color: Platform.OS == "ios" ? "#FFFFFF" : "#000000",
              },
            },
          }}
          style={styles.calendar}
        />
      </View>
    </View>
  );
};

// Styles
const styles = StyleSheet.create({
  calendarContainer: {
    backgroundColor: Platform.OS == "ios" ? "#fff" : "gray",
    borderRadius: 10,
    padding: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  calendar: {
    borderRadius: 10,
    overflow: "hidden",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  arrowButton: {
    padding: 10,
    backgroundColor: "#f0f0f0",
    borderRadius: 5,
  },
});

export default CalendarComp;
