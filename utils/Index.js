import React, { useEffect, useState } from 'react';
import { View, Button, Animated, Platform, StyleSheet, TextInput } from 'react-native';
import PropTypes from 'prop-types';
import DateTimePicker from '@react-native-community/datetimepicker';
import PhoneInput from 'react-native-phone-input';
import { COLORS, SHADOWS, FONT, SIZES } from "../constants";

const ExpandableView = ({ expanded = false, view, vh = 200 }) => {
  const [height] = useState(new Animated.Value(0));

  useEffect(() => {
    Animated.timing(height, {
      toValue: expanded ? vh : 0,
      duration: 250,
      useNativeDriver: false
    }).start();
  }, [expanded, height]);

  return (
    <Animated.View
      style={{ height }}
    >
    <View style={styles.infoContainer}>
     {view()}
    </View>
    </Animated.View>
  );

};

const PhoneNumberInput = ({ onNumberChange }) => {
  const [phoneNumber, setPhoneNumber] = useState('');

  const handleNumberChange = (number) => {
    setPhoneNumber(number);
    onNumberChange(number);
  };

  return (
    <View style={styles.phoneNumberContainer}>
      {/* Use react-native-phone-input for better phone number input handling */}
      <PhoneInput
        style={styles.phoneInput}
        ref={(ref) => {
          this.phone = ref;
        }}
        initialCountry="ca"
        onChangePhoneNumber={handleNumberChange}
      />

      {/* Alternatively, you can use a simple TextInput */}
      {/* <TextInput
        style={styles.phoneInput}
        placeholder="Phone Number"
        keyboardType="phone-pad"
        value={phoneNumber}
        onChangeText={handleNumberChange}
      /> */}

      <Button title="Submit" onPress={() => console.log('Submitted:', phoneNumber)} />
    </View>
  );
};

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
            display="spinner"
            onChange={onChangeDate}
            //maximumDate={new Date()}
          />
      </View>
    );
  };

  const styles = StyleSheet.create({
    phoneNumberContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    phoneInput: {
      fontSize: SIZES.medium,
      //fontFamily: FONT.regular,
      backgroundColor: COLORS.lightWhite,
      marginTop: SIZES.small / 1.5,
      width: 200,
      height: 40,
    },
  });

  export { checkImageURL, Spacer, MyDateTimePicker, PhoneNumberInput, ExpandableView };