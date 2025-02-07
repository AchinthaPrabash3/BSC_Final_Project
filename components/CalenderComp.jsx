import { Calendar, toDateId } from "@marceloterreiro/flash-calendar";
import React, { useEffect, useState } from "react";
import { Alert, StyleSheet, View } from "react-native";
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
      setDates(data.map((item) => item.date));
    }
  }, [data]);

  console.log(dates);

  const handleDateSelect = (e) => {
    if (dates.includes(e)) {
      Alert.alert("Unavailable", "This date is already booked.");
      return;
    }
    setSelectDate(e);
    getDate({ ...order, date: e });
  };

  return (
    <View style={styles.container}>
      <View style={styles.calendarContainer}>
        <Calendar
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
                color: "#000000",
              },
            },
            active: {
              containerStyle: {
                backgroundColor: "#000000",
              },
              textStyle: {
                color: "#FFFFFF",
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
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
    borderRadius: 10,
    marginVertical: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  calendarContainer: {
    backgroundColor: "#FFF",
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
