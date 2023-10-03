import React, { useState } from 'react';
import { View, Button, Platform } from 'react-native';
import PropTypes from 'prop-types';
import DateTimePicker from '@react-native-community/datetimepicker';


const checkImageURL = (url) => {
    if (!url) return false
    else {
        const pattern = new RegExp('^https?:\\/\\/.+\\.(png|jpg|jpeg|bmp|gif|webp)$', 'i');
        return pattern.test(url);
    }
};

const Spacer = ({horizontal, size}) => {
    const defaultValue = 'auto';
  
    return (
      <>
      <View
        style={{
          width: horizontal ? size : defaultValue,
          height: !horizontal ? size : defaultValue,
        }}
      />
      </>
    );
  };
  
  Spacer.propTypes = {
    size: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.string
    ]).isRequired,
    horizontal: PropTypes.bool,
  };
  
  Spacer.defaultProps = {
    horizontal: false,
  };

const MyDateTimePicker = ({mode, date, onChange }) => {
    
    const onChangeDate = (event, selectedDate) => {
      if (selectedDate) {
        onChange(selectedDate);
      }
    };
  
    return (
      <View>
        <DateTimePicker
            value={date}
            mode={mode} // or "date" or "time"
            is24Hour={true}
            display="default"
            onChange={onChangeDate}
            //maximumDate={new Date()}
          />
      </View>
    );
  };

  export { checkImageURL, Spacer, MyDateTimePicker };