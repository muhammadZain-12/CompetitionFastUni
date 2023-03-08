import React, { useState } from "react";
import { Button, View } from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";



{/* <DatePickers mode="datetime" isVisible={isDatePickerVisible} onConfirm = {handleConfirm} onCancel={hideDatePicker}  /> */}


// const hideDatePicker = () => {
//   setDatePickerVisibility(false);
// };

// const handleConfirm = (date) => {
//   console.warn("A date has been picked: ", date);
//   hideDatePicker();
// };


// const showDatePicker = () => {
//   setDatePickerVisibility(true);
// };

// console.log(isDatePickerVisible)



const DatePickers = (Prop) => {

  const {mode,isVisible,onConfirm,onCancel} = Prop

  return (
    <View style={{backgroundColor:"white"}} >
      
      <DateTimePickerModal
        isVisible={isVisible}
        mode={mode}
        onConfirm={onConfirm}
        onCancel={onCancel}
      />
    </View>
  );
};

export default DatePickers;