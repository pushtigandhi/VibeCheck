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

export const PropertyCard = ({ item = null }) => {
  const [category, setCategory] = useState('');
  const [section, setSection] = useState('');
  const [duration, setDuration] = useState(15);
  const [startTime, setStartTime] = useState(new Date());
  const [endTime, setEndTime] = useState(new Date(startTime.getTime() + 15 * 60 * 1000));
  const [startDate, setStartDate] = useState(new Date());
  //const [endDate, setEndDate] = !!item ? useState(item.endDate) : useState(new Date().getDate());
  const [tags, setTags] = useState([]);
  const [priority, setPriority] = useState('');
  const [repeat, setRepeat] = useState('');
  //const [notes, setNotes] = useState([]);
  const [directory, setDirectory] = useState([]);
  const [allTags, setAllTags] = useState([]);

  const multiDay = false;
  const hasSections = true;

  const size = 25;

  async function getDirectoryFromAPI() {
    try {
        let directory_ = await GETdirectory();
        return directory_;
    } catch (error) {
      console.log("error fetching directory");
      console.log(error);

        return [];
    }
  }
  
  async function getTagsFromAPI() {
    try {
        let allTags_ = await GETtags();
        return allTags_;
    } catch (error) {
      console.log("error fetching directory");
      console.log(error);

        return [];
    }
  }

  useEffect(() => {
    getDirectoryFromAPI().then((directory_) => {
      setDirectory(directory_);
    }).catch((err) => {
        alert(err.message)
    })

    getTagsFromAPI().then((allTags_) => {
      setAllTags(allTags_);
    }).catch((err) => {
        alert(err.message)
    })

    if (!!item) {
      // if we are editing an item, set the state to the item's values
      // setTitle(item.title);
      // setDescription(item.description);
      setCategory(item.category);
      setSection(item.section);
      setStartTime(item.startTime);
      setEndTime(item.endTime);
      setStartDate(item.startDate);
      setPriority(item.priority);
      setRepeat(item.repeat);
      setTags(item.tags);
    }

    
  }, [item]) // only run once on load

  async function save() {
    item.category = category;
    item.section = section;
    item.startTime = startTime;
    item.endTime = endTime;
    item.startDate = startDate;
    item.priority = priority;
    item.repeat = repeat;
    item.tags = tags;

    //navigation.navigate("Drafts");
  }

  function validatePostFields() {
    if (title === "" || description === "") {
      alert("Please fill in all fields");
      return false;
    }
    return true;
  }

  const onChangeDate = (selectedDate, isStartTime) => {
    const currentDate = selectedDate instanceof Date ? selectedDate : (isStartTime ? startTime : endTime); // Ensure currentDate is always a Date object
    if (isStartTime) {
        if (currentDate < endTime) {
            setStartTime(currentDate);
        } else {
            const newEndTime = new Date(currentDate.getTime() + 15 * 60 * 1000);
            setStartTime(currentDate);
            setEndTime(newEndTime);
        }
    } else {
        if (currentDate > startTime) {
            setEndTime(currentDate);
        }
    }
  };

  return (
    <SafeAreaView style={styles.infoContainer}>

      <View style={styles.row}>
        <Text style={styles.label}>Properties</Text>
        <Ionicons name={"information-circle-outline"} size={size} style={styles.icon}/> 
      </View>
      <ScrollView style={styles.propertiesContainer}>
      <SingleSelectDropdown options={directory.map(cat => cat.title)} placeholder="Category" defaultValue={category} setFn={setCategory}
        icon={<Ionicons name={"folder-open-outline"} size={size} style={[styles.icon, {margin: SIZES.xxSmall}]} />} />

      {!!category && (
        <View>
          <SingleSelectDropdown options={directory.find(cat => cat.title === category).sections} placeholder="Sections" defaultValue={section} setFn={setSection}
            icon={<Ionicons name={"bookmark-outline"} size={size} style={[styles.icon, {margin: SIZES.xxSmall}]} />} />
        </View>
      )}

      <MultiSelectDropdown options={allTags.map(tag => tag.title)} placeholder="Tags" defaultValue={tags} setFn={setTags}
        icon={<Ionicons name={"list-outline"} size={size} style={[styles.icon, {margin: SIZES.xxSmall}]} />} />
      
      { /* OUT OF SCOPE - MULTI-DAY EVENT
      {multiDay && (
        <View>
          <View style={styles.row}>
            <TouchableOpacity onPress={() => {}}>
              <Text style={styles.property}>
                <Ionicons name={"calendar-outline"} size={size} style={styles.icon}/>
                <DateTimePicker
                  value={!!item.startDate ? new Date(item.startDate) : new Date()}
                  mode={"date"} // or "date" or "time"
                  is24Hour={true}
                  display="default"
                  //onChange={onChangeDate}
                  //maximumDate={new Date()}
                />
              </Text>
            </TouchableOpacity>
            <Text> - TO -</Text>
            <TouchableOpacity>
              <Text style={styles.property}>
                <Ionicons name={"calendar-outline"} size={size} style={styles.icon}/>
                <DateTimePicker
                  value={!!item.endDate ? new Date(item.endDate) : new Date()}
                  mode={"date"} // or "date" or "time"
                  is24Hour={true}
                  display="default"
                  //onChange={onChangeDate}
                  //maximumDate={new Date()}
                />
              </Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity>
            <Text style={styles.property}>
              <Ionicons name={"timer-outline"} size={size} style={styles.icon}/> Duration
            </Text>
          </TouchableOpacity>
        </View>
      )} */}
      {!multiDay && (
        <View>
          <View style={[styles.row, styles.property]}>
            <Ionicons name={"calendar-outline"} size={size} style={styles.icon}/>
            <DateTimePicker
              value={startDate}
              mode={"date"} // or "date" or "time"
              is24Hour={true}
              display="default"
              onChange={selectedDate => {
                const currentDate = selectedDate || startDate;
                setStartDate(currentDate);
              }}
              //maximumDate={new Date()}
            />
          </View>
          <View style={[styles.row, styles.property]}>
              <Ionicons name={"timer-outline"} size={size} style={styles.icon}/>
              <DateTimePicker
                value={startTime}
                mode={"time"} // or "date" or "time"
                is24Hour={true}
                display="default"
                minuteInterval={15}
                onChange={selectedDate => {
                  onChangeDate(selectedDate, true);
                }}
                //maximumDate={new Date()}
              />
              <Text style={styles.property}> - TO -</Text>
              <DateTimePicker
                value={endTime}
                mode={"time"} // or "date" or "time"
                is24Hour={true}
                display="default"
                minuteInterval={15}
                onChange={selectedDate => {
                  onChangeDate(selectedDate, false);
                }}
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
            priority === 'LOW'?  setPriority('') : setPriority("LOW")
          )}
        >
          <Ionicons name={"star-outline"} size={20} style={[priority === 'LOW' ? styles.iconInverse:styles.icon]} />
        </TouchableOpacity>
        <TouchableOpacity style={[styles.row, styles.box, priority === 'MED' ? styles.selectedBox:styles.unselectedBox]}
          onPress={() => (
              priority === 'MED'?  setPriority('') : setPriority("MED")
          )}
        >
          <Ionicons name={"star-outline"} size={20} style={[priority === 'MED' ? styles.iconInverse:styles.icon]} />
          <Ionicons name={"star-outline"} size={20} style={[priority === 'MED' ? styles.iconInverse:styles.icon]} />
        </TouchableOpacity>
        <TouchableOpacity style={[styles.row, styles.box, priority === 'HIGH' ? styles.selectedBox:styles.unselectedBox]}
          onPress={() => (
            priority === 'HIGH'?  setPriority('') : setPriority("HIGH")
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
            repeat === 'ONCE'? setRepeat('') : setRepeat("ONCE")
          )}
        >
          <Text style={[styles.property, repeat === 'ONCE' ? styles.selectedText:styles.unselectedText]}>Once</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.row, styles.box, repeat === 'DAILY' ? styles.selectedBox:styles.unselectedBox]}
          onPress={() => (
            repeat === 'DAILY'? setRepeat('') : setRepeat("DAILY")
          )}
        >
          <Text style={[styles.property, repeat === 'DAILY' ? styles.selectedText:styles.unselectedText]}>Daily</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.row, styles.box, repeat === 'WEEKLY' ? styles.selectedBox:styles.unselectedBox]}
          onPress={() => (
            repeat === 'WEEKLY'? setRepeat('') : setRepeat("WEEKLY")
          )}
        >
          <Text style={[styles.property, repeat === 'WEEKLY' ? styles.selectedText:styles.unselectedText]}>Weekly</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.row, styles.box, repeat === 'MONTHLY' ? styles.selectedBox:styles.unselectedBox]}
          onPress={() => (
            repeat === 'MONTHLY'? setRepeat('') : setRepeat("MONTHLY")
          )}
        >
          <Text style={[styles.property, repeat === 'MONTHLY' ? styles.selectedText:styles.unselectedText]}>Monthly</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
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
  propertiesContainer: {
    height: '70%',
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
  sectionContainer: {
    margin: SIZES.xSmall,
    padding: SIZES.xSmall,
    backgroundColor: COLORS({opacity:0.5}).darkBlue,
    borderRadius: SIZES.small,
    ...SHADOWS.medium,
    shadowColor: COLORS({opacity:1}).indigo,
  },
  title: {
    fontSize: SIZES.large,
    fontFamily: FONT.regular,
    color: COLORS({opacity:1}).darkBlue,
  },
  section: {
    fontSize: SIZES.medium,
    fontFamily: FONT.regular,
    color: COLORS({opacity:1}).darkBlue,
  },
});