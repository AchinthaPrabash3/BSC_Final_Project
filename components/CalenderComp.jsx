import { Calendar, toDateId } from "@marceloterreiro/flash-calendar";
import React, { useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";

const CalendarComp = ({ selectDate, setSelectDate, today }) => {
  return (
    <View className="h-[280px] my-5">
      <Calendar
        calendarMonthId={today}
        onCalendarDayPress={setSelectDate}
        calendarActiveDateRanges={[
          {
            startId: selectDate,
            endId: selectDate,
          },
        ]}
      />
    </View>
  );
};

const styles = StyleSheet.create({});

export default CalendarComp;
