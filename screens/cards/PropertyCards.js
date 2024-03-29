import React, { useEffect, useState } from "react";
import { SafeAreaView, View, Text, TextInput, Modal, TouchableOpacity,
        StyleSheet, ScrollView } from 'react-native';

import { COLORS, SHADOWS, FONT, SIZES, ItemType } from "../../constants";
import { MyDateTimePicker, PhoneNumberInput, ExpandableView, Spacer } from '../../utils';
//import Layout from "../../../_layout";
import { Ionicons } from "@expo/vector-icons";
import {Calendar, LocaleConfig} from 'react-native-calendars';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Picker } from '@react-native-picker/picker';
import SingleSelectDropdown from "../../components/SingleSelectDropdown";
import MultiSelectDropdown from "../../components/MultiSelectDropdown";

import { directoryList } from "../../API";

export const PropertyCard = ({ item = null, itemType, setFn, isFilter = false}) => {
  const [category, setCategory] = useState('');
  const [section, setSection] = useState('');
  const [startDate, setStartDate] = useState(new Date());
  const [tags, setTags] = useState([]);
  const [serving, setServing] = useState(null);
  const [priority, setPriority] = useState(null);
  const [repeat, setRepeat] = useState(null);
  
  const [allTags, setAllTags] = useState([]);

  const [hourPickerVisible, setHourPickerVisible] = useState(false);
  const [minutePickerVisible, setMinutePickerVisible] = useState(false);
  const [hour, setHour] = useState(0);
  const [minute, setMinute] = useState(15);

  const toggleHourPicker = () => {
    setHourPickerVisible(!hourPickerVisible);
  };

  const toggleMinutePicker = () => {
    setMinutePickerVisible(!minutePickerVisible);
  };
   
  function updateNewItem(params) { 
    setFn(params);
  };

  const size = 25;

  // Generate picker items
  const hourItem = [];
  for (let i = 0; i <= 12; i++) {
    hourItem.push(<Picker.Item key={i} label={`${i}`} value={`${i}`} />);
  }
  const minuteItem = [];
  for (let i = 0; i <= 55; i += 5) {
    minuteItem.push(<Picker.Item key={i} label={`${i}`} value={`${i}`} />);
  }

  async function getTagsFromAPI() {
    try {
        let allTags_ = await GETtags();
        return allTags_;
    } catch (error) {
      console.log("error fetching tags");
      console.log(error);

        return [];
    }
  }

  useEffect(() => {
    // getTagsFromAPI().then((allTags_) => {
    //   setAllTags(allTags_);
    // }).catch((err) => {
    //     alert(err.message)
    // })
  }, []); // Empty dependency array to run only once on component mount

  useEffect(() => {
    if (item) {
      setCategory(item.category);
      setSection(item.section);
      if(!!item.duration){
        const hours = Math.floor(item.duration / 60);
        const minutes = item.duration % 60;
        setHour(hours);
        setMinute(minutes);
      }
      if(!!item.startDate){
        const parsedDate = new Date(item.startDate);
        setStartDate(parsedDate);
      }
      if(!!item.priority)
        setPriority(item.priority);
      if(!!item.repeat)
        setRepeat(item.repeat);
      if(!!item.tags)
        setTags(item.tags);
    }
  }, [item]); // Update category and section when item changes

  function getCategories() {
    const categoryTitles = directoryList._j.map(cat => {
      return cat.title;
    });
    return categoryTitles.map((title, index) => ({
      label: title,
      value: String(index + 1)
    }));
  }

  function getSections() {
    const sectionTitles = directoryList._j.find(cat => cat.title === category).sections;
    return sectionTitles.map((title, index) => ({
      label: title,
      value: String(index + 1)
    }));
  }

  const onChangeSection = (newSection) => {
    setSection(newSection);
    updateNewItem({"section": newSection});
  };

  const onChangeCategory = (newCategory) => {
    setCategory(newCategory);
    setSection("All");
    updateNewItem({"category": newCategory});
  };

  return (
    <SafeAreaView style={styles.infoContainer}>
      <ScrollView>
      {directoryList._j.length > 0 ? (
        <SingleSelectDropdown options={getCategories()} placeholder={!!category ? category : "Category"} setFn={onChangeCategory}
          icon={<Ionicons name={"folder-open-outline"} size={size} style={[styles.icon, {margin: SIZES.xxSmall}]} />} />
      ) : (
        <Text>Loading categories...</Text>
      )}

      {!!category && (directoryList._j.length > 0 ? (
        <SingleSelectDropdown options={getSections()} placeholder={!!section ? section : "Section"} setFn={onChangeSection}
          icon={<Ionicons name={"bookmark-outline"} size={size} style={[styles.icon, {margin: SIZES.xxSmall}]} />} />
      ) : (
        <Text>Loading sections...</Text>
      ))}

      <MultiSelectDropdown options={allTags.map(tag => tag.title)} placeholder="Tags" setFn={setTags}
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
      {(itemType === ItemType.Task || itemType === ItemType.Event || isFilter) && (
        <>
          <View style={[styles.row, styles.property, {justifyContent: "space-between"}]}>
            <View style={styles.row}>
              <Ionicons name={"calendar-outline"} size={size} style={styles.icon}/>
              <DateTimePicker
                value={startDate}
                mode={"date"} // or "date" or "time"
                is24Hour={true}
                display="default"
                onChange={(event, selectedDate) => {
                  const currentDate = selectedDate || startDate;
                  setStartDate(currentDate);
                  updateNewItem({"startDate": startDate});
                }}
              />
            </View>
            {/* <Ionicons name={"alarm-outline"} size={size} style={styles.icon}/> */}
            <DateTimePicker
              value={startDate}
              mode={"time"} // or "date" or "time"
              is24Hour={true}
              display="default"
              onChange={(event, selectedDate) => {
                const currentDate = selectedDate || startDate;
                setStartDate(currentDate);
                updateNewItem({"startDate": startDate});
              }}
            />
          </View>
        </>
      )}
      {(itemType === ItemType.Task || itemType === ItemType.Event || isFilter) && (
            <View style={[styles.row, styles.property]}>
            <Ionicons name={"timer-outline"} size={size} style={styles.icon}/>
            {hourPickerVisible ? (
              <View>
                <Picker
                  selectedValue={hour}
                  onValueChange={(newHour) => (
                    setHour(newHour),
                    toggleHourPicker(),
                    setDuration(newHour*60 + minute),
                    updateNewItem({"duration": Number(newHour * 60) + Number(minute)})
                  )}
                  style={styles.picker}>
                  {hourItem}
                </Picker>
                <Spacer size={30} />
              </View>
            ) : (
              <TouchableOpacity onPress={toggleHourPicker} style={styles.duration}>
                <Text style={{fontSize: SIZES.medium}}>{hour}</Text>
              </TouchableOpacity>
            )}
            <Text style={styles.property}>Hours</Text>
            {minutePickerVisible ? (
              <View>
                <Picker
                  selectedValue={minute}
                  onValueChange={(newMinute) => (
                    setMinute(newMinute),
                    toggleMinutePicker(),
                    setDuration(hour*60 + newMinute),
                    updateNewItem({"duration": Number(hour * 60) + Number(newMinute)})
                  )}
                  style={styles.picker}>
                  {minuteItem}
                </Picker>
                <Spacer size={30} />
              </View>
            ) : (
              <TouchableOpacity onPress={toggleMinutePicker} style={styles.duration}>
                <Text style={{fontSize: SIZES.medium}}>{minute}</Text>
              </TouchableOpacity>
            )}
            <Text style={styles.property}>Minutes</Text>
          </View>
          )}
      {(itemType === ItemType.Recipe) && (
        <View style={styles.row}>
          <Ionicons name={"restaurant-outline"} size={size} style={[styles.icon, {margin: SIZES.xxSmall}]}/>
          <Text style={styles.property}>
            Servings
          </Text>
          <TextInput keyboardType="numeric"
            onChangeText={(serving_) => (
              setServing(serving_),
              updateNewItem({"serving": Number(serving_)})
            )}
            {...(serving ? { defaultValue: serving.toString() } : { placeholder: "0" })}
           style={[styles.property, styles.box, {backgroundColor: "#FFF"}]}
          />
        </View>
      )}
      <View>
        {(itemType === ItemType.Recipe) ? (
          <View style={styles.row}>
            <Ionicons name={"star-half-outline"} size={size} style={[styles.icon, {margin: SIZES.xxSmall}]}/>
            <Text style={styles.property}>
              Rating
            </Text>
          </View>
        ) : (
          <View style={styles.row}>
            <Ionicons name={"alert-outline"} size={size} style={[styles.icon, {margin: SIZES.xxSmall}]}/>
            <Text style={styles.property}>
              Priority
            </Text>
          </View>
        )} 
      </View>
      <View style={[styles.row, styles.property]}>
        <TouchableOpacity style={[styles.row, styles.box, priority === 'NONE' ? styles.selectedBox:styles.unselectedBox]}
          onPress={() => setPriority("NONE")}
        >
          <Ionicons name={"close-outline"} size={20} style={[priority === 'NONE' ? styles.iconInverse:styles.icon]} />
        </TouchableOpacity>
        <TouchableOpacity style={[styles.row, styles.box, priority === 'LOW' ? styles.selectedBox:styles.unselectedBox]}
          onPress={() => (
            setPriority("LOW"),
            updateNewItem({"priority": "LOW"})
          )}
        >
          <Ionicons name={"star-outline"} size={20} style={[priority === 'LOW' ? styles.iconInverse:styles.icon]} />
        </TouchableOpacity>
        <TouchableOpacity style={[styles.row, styles.box, priority === 'MED' ? styles.selectedBox:styles.unselectedBox]}
          onPress={() => (
            setPriority("MED"),
            updateNewItem({"priority": "MED"})
          )}
        >
          <Ionicons name={"star-outline"} size={20} style={[priority === 'MED' ? styles.iconInverse:styles.icon]} />
          <Ionicons name={"star-outline"} size={20} style={[priority === 'MED' ? styles.iconInverse:styles.icon]} />
        </TouchableOpacity>
        <TouchableOpacity style={[styles.row, styles.box, priority === 'HIGH' ? styles.selectedBox:styles.unselectedBox]}
          onPress={() => (
            setPriority("HIGH"),
            updateNewItem({"priority": "HIGH"})
          )}
        >
          <Ionicons name={"star-outline"} size={20} style={[priority === 'HIGH' ? styles.iconInverse:styles.icon]} />
          <Ionicons name={"star-outline"} size={20} style={[priority === 'HIGH' ? styles.iconInverse:styles.icon]} />
          <Ionicons name={"star-outline"} size={20} style={[priority === 'HIGH' ? styles.iconInverse:styles.icon]} />
        </TouchableOpacity>
      </View>

      {(itemType === ItemType.Task || itemType === ItemType.Event || isFilter) && (
        <View>
          <View style={styles.row}>
            <Ionicons name={"repeat-outline"} size={size} style={[styles.icon, {marginLeft: SIZES.xSmall, marginRight: SIZES.xxSmall}]} /> 
            <Text style={styles.property}>Repeat</Text>
          </View>
          <View style={[styles.row, styles.property]}>
            <TouchableOpacity style={[styles.row, styles.box, repeat === 'NEVER' ? styles.selectedBox:styles.unselectedBox]}
              onPress={() => setRepeat("NEVER")}
            >
              <Ionicons name={"close-outline"} size={20} style={[priority === 'NONE' ? styles.iconInverse:styles.icon]} />
            </TouchableOpacity>
            <TouchableOpacity style={[styles.row, styles.box, repeat === 'ONCE' ? styles.selectedBox:styles.unselectedBox]}
              onPress={() => (
                setRepeat("ONCE"),
                updateNewItem({"repeat": "ONCE"})
              )}
            >
              <Text style={[styles.property, repeat === 'ONCE' ? styles.selectedText:styles.unselectedText]}>Once</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.row, styles.box, repeat === 'DAILY' ? styles.selectedBox:styles.unselectedBox]}
              onPress={() => (
                setRepeat("DAILY"),
                updateNewItem({"repeat": "DAILY"})
              )}
            >
              <Text style={[styles.property, repeat === 'DAILY' ? styles.selectedText:styles.unselectedText]}>Daily</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.row, styles.box, repeat === 'WEEKLY' ? styles.selectedBox:styles.unselectedBox]}
              onPress={() => (
                setRepeat("WEEKLY"),
                updateNewItem({"repeat": "WEEKLY"})
              )}
            >
              <Text style={[styles.property, repeat === 'WEEKLY' ? styles.selectedText:styles.unselectedText]}>Weekly</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.row, styles.box, repeat === 'MONTHLY' ? styles.selectedBox:styles.unselectedBox]}
              onPress={() => (
                setRepeat("MONTHLY"),
                updateNewItem({"repeat": "MONTHLY"})
              )}
            >
              <Text style={[styles.property, repeat === 'MONTHLY' ? styles.selectedText:styles.unselectedText]}>Monthly</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
      
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
    margin: SIZES.xSmall,
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
    padding: SIZES.tiny,
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
  duration: {
    backgroundColor: COLORS({opacity:0.5}).lightGrey,
    padding: SIZES.xSmall,
    borderRadius: SIZES.xSmall,
    marginLeft: SIZES.xSmall,
  },
  picker: {
    width: 100,
    height: 150,
  },
});