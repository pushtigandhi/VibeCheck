import React, { useEffect, useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Image,
        StyleSheet, Animated, FlatList } from 'react-native';

//import styles from './popularjobcard.style';
import { COLORS, SHADOWS, FONT, SIZES } from "../../constants";
import { MyDateTimePicker, PhoneNumberInput } from '../../utils';


const ExpandableView = ({ expanded = false }) => {
    const [height] = useState(new Animated.Value(0));
    const [date, setDate] = useState(new Date());
    const options = { month: 'short', day: 'numeric', year: 'numeric' };
    const formattedDate = date.toLocaleDateString('en-US', options);

    const [show, setShowDatePicker] = useState(false);

    const showDatePicker = () => {
        setShowDatePicker(true);
      };

    const handlePhoneNumberChange = (number) => {
        console.log('Phone Number Changed:', number);
      };

    const handleDateChange = (selectedDate) => {
        setShowDatePicker(false);
        if (selectedDate)
        {
            const year = selectedDate.getFullYear() || new Date().getFullYear();
            const newDate = new Date(year, selectedDate.getMonth(), selectedDate.getDate());
            setDate(newDate);
        }
      };

    useEffect(() => {
      Animated.timing(height, {
        toValue: expanded ? 300 : 0,
        duration: 150,
        useNativeDriver: false
      }).start();
    }, [expanded, height]);
  
    // console.log('rerendered');
  
    return (
      <Animated.View
        style={{ height }}
      >
       <View style={styles.infoContainer}>
       <View style={styles.column}>
            <Text style={styles.label}>
            Phone:
            </Text>
            <View style={styles.container}>
                <PhoneNumberInput onNumberChange={handlePhoneNumberChange} />
            </View>
        </View>
        <View style={styles.column}>
            <Text style={styles.label}>
            Birthday:
            </Text>
            <TouchableOpacity onPress={showDatePicker}>
            
            {show && (
                <MyDateTimePicker
                date={date}
                mode="date"
                //is24Hour={true}
                //display="spinner"
                onChange={handleDateChange}
                //textColor="#000000" // Customize text color
                />
            )}
            {!show && ( 
                <Text>{formattedDate.toString()}</Text>)}
        </TouchableOpacity>
        </View>
        <View style={styles.column}>
            <Text style={styles.label}>
            Check-In:
            </Text>
            <TouchableOpacity onPress={showDatePicker}>
            
            {show && (
                <MyDateTimePicker
                date={date}
                mode="date"
                //is24Hour={true}
                //display="spinner"
                onChange={handleDateChange}
                //textColor="#000000" // Customize text color
                />
            )}
            {!show && ( 
                <Text>{formattedDate.toString()}</Text>)}
            </TouchableOpacity>
        </View>
            <Text style={styles.label}>
            Last Update:
            </Text>
            <TextInput style={styles.notes}></TextInput>
        </View>
      </Animated.View>
    );

};
const ContactCard = () => {
    const [isExpanded, setIsExpanded] = useState(false);

  return (
    <TouchableOpacity
       onPress={() => {
          setIsExpanded(!isExpanded);
        }}
    >
    <View style={styles.container}>
    <View style={styles.column}>
      <TouchableOpacity style={styles.photoContainer}>
        <Image 
          source={{ uri: 'https://t4.ftcdn.net/jpg/05/05/61/73/360_F_505617309_NN1CW7diNmGXJfMicpY9eXHKV4sqzO5H.jpg'}}
          resizeMode='contain'
          style={styles.contactImage}
        />
      </TouchableOpacity>
      
      <View style={styles.textContainer}>
        <Text style={styles.contactName} numberOfLines={1}> Name </Text>
        <Text style={styles.jobType}>Company</Text>
      </View>
      </View>
    </View>
    <ExpandableView expanded={isExpanded} />
        
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
    container: {
        //flex: 1,
        justifyContent: "space-between",
        //alignItems: "center",
        padding: SIZES.medium,
        borderRadius: SIZES.xLarge,
        backgroundColor: "#FFF",
        ...SHADOWS.medium,
        shadowColor: COLORS.white,
        marginBottom: SIZES.xSmall,
      },
    photoContainer: {
        width: 50,
        height: 50,
        backgroundColor: COLORS.white,
        borderRadius: SIZES.medium,
        justifyContent: "center",
        alignItems: "center",
  },
  contactImage: {
    width: "70%",
    height: "70%",
  },
  companyName: {
    fontSize: SIZES.medium,
    fontFamily: FONT.regular,
    color: "#B3AEC6",
    marginTop: SIZES.small / 1.5,
  },
  infoContainer: {
    padding: SIZES.medium,
        borderRadius: SIZES.xLarge,
        backgroundColor: "#FFF",
        ...SHADOWS.medium,
        shadowColor: COLORS.white,
    //flex: 1,
    //marginTop: SIZES.large,
  },
  contactName: {
    fontSize: SIZES.medium,
    fontFamily: "DMBold",
    color: COLORS.primary,
  },
  label:{
    fontSize: SIZES.medium,
    fontFamily: FONT.regular,
    color: "#B3AEC6",
    marginTop: SIZES.small / 1.5,
  },
  detail: {
    lineHeight: 20,
    padding: 10,
    fontSize: SIZES.medium,
    color: "#B3AEC6",
    backgroundColor: COLORS.white,
  },
  notes: {
    padding: 10,
    fontSize: SIZES.Small,
    backgroundColor: COLORS.white,
    width: "100%",
    height: 100,
    marginTop: 5,
    borderRadius: 10,
    textAlign: "left"
  },
  textContainer: {
    flex: 1,
    marginHorizontal: SIZES.medium,
  },
  jobType: {
    fontSize: SIZES.small + 2,
    fontFamily: "DMRegular",
    color: COLORS.gray,
    marginTop: 3,
    textTransform: "capitalize",
  },
  column: {
    flexDirection: "row",
    justifyContent: "space-between",
    //alignItems: "baseline",
  },
});

export default ContactCard