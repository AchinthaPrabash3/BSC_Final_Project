import { Calendar, toDateId } from "@marceloterreiro/flash-calendar";
import React, { useEffect, useState } from "react";
import { Alert, Platform, StyleSheet, View } from "react-native";
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

  useEffect(() => {
    if (data) {
      setDates(data.map((item) => toDateId(new Date(item.date))));
    }
  }, [data]);

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
        <Calendar
          calendarMinDateId={today}
          calendarDisabledDateIds={dates}
          calendarMonthId={today}
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
});

export default CalendarComp;
