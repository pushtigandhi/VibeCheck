import React, { useEffect, useState } from "react";
import { SafeAreaView, View, Text, TextInput, TouchableOpacity, Image,
        StyleSheet, Animated, FlatList, ScrollView } from 'react-native';

import { COLORS, SHADOWS, FONT, SIZES } from "../../constants";
import { MyDateTimePicker, PhoneNumberInput, ExpandableView } from '../../utils';
//import Layout from "../../../_layout";
import { Ionicons } from "@expo/vector-icons";
import {Calendar, LocaleConfig} from 'react-native-calendars';
import DateTimePicker from '@react-native-community/datetimepicker';
import DropDownPicker from 'react-native-dropdown-picker';
import SingleSelectDropdown from "../../components/SingleSelectDropdown";
import MultiSelectDropdown from "../../components/MultiSelectDropdown";

const data = [
  { label: 'Item 1', value: '1' },
  { label: 'Item 2', value: '2' },
  { label: 'Item 3', value: '3' },
  { label: 'Item 4', value: '4' },
  { label: 'Item 5', value: '5' },
  { label: 'Item 6', value: '6' },
  { label: 'Item 7', value: '7' },
  { label: 'Item 8', value: '8' },
];

export const PropertyCard = () => {
  const [priority, setPriority] = useState('');
  const [repeat, setRepeat] = useState('');
  const [selectedValue, setSelectedValue] = useState(null);

  const multiDay = false;
  const hasSections = true;

  const size = 25;

  return (
    <SafeAreaView style={styles.infoContainer}>

      <View style={styles.row}>
        <Text style={styles.label}>Properties</Text>
        <Ionicons name={"information-circle-outline"} size={size} style={styles.icon}/> 
      </View>

      <SingleSelectDropdown data={data} placeholder="Folder" icon={<Ionicons name={"folder-open-outline"} size={size} style={[styles.icon, {margin: SIZES.xxSmall}]} />} />

      {hasSections && (
        <View>
          <SingleSelectDropdown data={data} placeholder="Label" icon={<Ionicons name={"bookmark-outline"} size={size} style={[styles.icon, {margin: SIZES.xxSmall}]} />} />
        </View>
      )}

      <MultiSelectDropdown data={data} placeholder="Tags" icon={<Ionicons name={"list-outline"} size={size} style={[styles.icon, {margin: SIZES.xxSmall}]} />} />
      
      {multiDay && (
        <View>
          <View style={styles.row}>
            <TouchableOpacity onPress={() => {}}>
              <Text style={styles.property}>
                <Ionicons name={"calendar-outline"} size={size} style={styles.icon}/> Start Date
              </Text>
            </TouchableOpacity>
            <Text> - TO -</Text>
            <TouchableOpacity>
              <Text style={styles.property}>
                <Ionicons name={"calendar-outline"} size={size} style={styles.icon}/> End Date
              </Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity>
            <Text style={styles.property}>
              <Ionicons name={"timer-outline"} size={size} style={styles.icon}/> Duration
            </Text>
          </TouchableOpacity>
        </View>
      )}
      {!multiDay && (
        <View>
          <View style={[styles.row, styles.property]}>
            <Ionicons name={"calendar-outline"} size={size} style={styles.icon}/>
            <DateTimePicker
              value={new Date()}
              mode={"date"} // or "date" or "time"
              is24Hour={true}
              display="default"
              //onChange={onChangeDate}
              //maximumDate={new Date()}
            />
          </View>
          <View style={[styles.row, styles.property]}>
              <Ionicons name={"timer-outline"} size={size} style={styles.icon}/>
              <DateTimePicker
                value={new Date()}
                mode={"time"} // or "date" or "time"
                is24Hour={true}
                display="default"
                minuteInterval={15}
                //onChange={onChangeDate}
                //maximumDate={new Date()}
              />
              <Text style={styles.property}> - TO -</Text>
              <DateTimePicker
                value={new Date()}
                mode={"time"} // or "date" or "time"
                is24Hour={true}
                display="default"
                minuteInterval={15}
                //onChange={onChangeDate}
                //maximumDate={new Date()}
              />
          </View>
        </View>
      )}

      <View style={styles.row}>
        <Ionicons name={"alert-outline"} size={size} style={styles.icon}/> 
        <Text style={styles.property}>
          Priority
        </Text>
      </View>
      <View style={[styles.row, styles.property]}>
        <TouchableOpacity style={[styles.row, styles.box, priority === 'LOW' ? styles.selectedBox:styles.unselectedBox]}
          onPress={() => (
            setPriority("LOW")
          )}
        >
          <Ionicons name={"star-outline"} size={20} style={[priority === 'LOW' ? styles.iconInverse:styles.icon]} />
        </TouchableOpacity>
        <TouchableOpacity style={[styles.row, styles.box, priority === 'MED' ? styles.selectedBox:styles.unselectedBox]}
          onPress={() => (
            setPriority("MED")
          )}
        >
          <Ionicons name={"star-outline"} size={20} style={[priority === 'MED' ? styles.iconInverse:styles.icon]} />
          <Ionicons name={"star-outline"} size={20} style={[priority === 'MED' ? styles.iconInverse:styles.icon]} />
        </TouchableOpacity>
        <TouchableOpacity style={[styles.row, styles.box, priority === 'HIGH' ? styles.selectedBox:styles.unselectedBox]}
          onPress={() => (
            setPriority("HIGH")
          )}
        >
          <Ionicons name={"star-outline"} size={20} style={[priority === 'HIGH' ? styles.iconInverse:styles.icon]} />
          <Ionicons name={"star-outline"} size={20} style={[priority === 'HIGH' ? styles.iconInverse:styles.icon]} />
          <Ionicons name={"star-outline"} size={20} style={[priority === 'HIGH' ? styles.iconInverse:styles.icon]} />
        </TouchableOpacity>
      </View>

      <View style={styles.row}>
        <Ionicons name={"repeat-outline"} size={size} style={[styles.icon, {margin: SIZES.xxSmall}]} /> 
        <Text style={styles.property}>Repeat</Text>
      </View>
      <View style={[styles.row, styles.property]}>
        <TouchableOpacity style={[styles.row, styles.box, repeat === 'ONCE' ? styles.selectedBox:styles.unselectedBox]}
          onPress={() => (
            setRepeat("ONCE")
          )}
        >
          <Text style={[styles.property, repeat === 'ONCE' ? styles.selectedText:styles.unselectedText]}>Once</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.row, styles.box, repeat === 'DAILY' ? styles.selectedBox:styles.unselectedBox]}
          onPress={() => (
            setRepeat("DAILY")
          )}
        >
          <Text style={[styles.property, repeat === 'DAILY' ? styles.selectedText:styles.unselectedText]}>Daily</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.row, styles.box, repeat === 'WEEKLY' ? styles.selectedBox:styles.unselectedBox]}
          onPress={() => (
            setRepeat("WEEKLY")
          )}
        >
          <Text style={[styles.property, repeat === 'WEEKLY' ? styles.selectedText:styles.unselectedText]}>Weekly</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.row, styles.box, repeat === 'MONTHLY' ? styles.selectedBox:styles.unselectedBox]}
          onPress={() => (
            setRepeat("MONTHLY")
          )}
        >
          <Text style={[styles.property, repeat === 'MONTHLY' ? styles.selectedText:styles.unselectedText]}>Monthly</Text>
        </TouchableOpacity>
      </View>

    </SafeAreaView>
  )
};

const styles = StyleSheet.create({
  infoContainer: {
    margin: SIZES.medium,
    backgroundColor: COLORS.lightWhite,
    borderRadius: SIZES.medium/2,
    borderWidth: 1,
    borderColor: COLORS({opacity:1}).navy,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  label:{
    fontSize: SIZES.large,
    fontFamily: FONT.regular,
    color: COLORS({opacity:1}).navy,
    margin: SIZES.xSmall,
  },
  property:{
    fontSize: SIZES.medium,
    fontFamily: FONT.regular,
    color: COLORS({opacity:0.8}).navy,
    margin: SIZES.xxSmall,
  },
  icon: {
    //margin: SIZES.xxSmall,
    color: COLORS({opacity:1}).navy,
  },
  iconInverse: {
    //margin: SIZES.xxSmall,
    color: COLORS({opacity:1}).lightWhite,
  },
  box: {
    borderWidth: 0.5,
    borderColor: COLORS({opacity:1}).navy,
    borderRadius: SIZES.small,
    padding: SIZES.xxSmall,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: SIZES.xxSmall,
  },
  selectedBox: {
    backgroundColor: COLORS({opacity:1}).navy,
  },
  unselectedBox: {
    backgroundColor: COLORS({opacity:1}).lightWhite,
  },
  selectedText: {
    color: COLORS({opacity:1}).lightWhite,
  },
  unselectedText: {
    color: COLORS({opacity:1}).navy,
  },
});