import React, { useEffect, useState } from "react";
import { SafeAreaView, View, Text, TextInput, Modal, TouchableOpacity, StyleSheet } from 'react-native';
import { COLORS, SHADOWS, FONT, SIZES, ItemType } from "../../constants";
import { Spacer } from '../../utils';
import { Ionicons } from "@expo/vector-icons";
import { Picker } from '@react-native-picker/picker';
import SingleSelectDropdown from "../../components/SingleSelectDropdown";

import { directoryList } from "../../API";

export const PropertyCard = ({ item = null, itemType, setFn, isScheduler = false, isSection=false}) => {
  const [category, setCategory] = useState('');
  const [section, setSection] = useState('');
  const [serving, setServing] = useState(null);
  const [priority, setPriority] = useState(null);
  
  const [showPriority, setShowPriority] = useState(false);
  const [showDuration, setShowDuration] = useState(false);
  const [showServing, setShowServing] = useState(false);

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

  useEffect(() => {
    if (item) {
      if(!!item.category){
        setCategory(item.category);
        setSection('All');
      }
      if(!!item.section)
        setSection(item.section);
      if(!!item.duration){
        const hours = Math.floor(item.duration / 60);
        const minutes = item.duration % 60;
        setHour(hours);
        setMinute(minutes);
        setShowDuration(true);
      }
      if(!!item.priority){
        setPriority(item.priority);
        setShowPriority(true);
      }
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
      value: title
    }));
  }

  function getSections() {
    const sectionTitles = directoryList._j.find(cat => cat.title === category).sections;
    return sectionTitles.map((section, index) => ({
      label: section.title,
      value: section.title
    }));
  }

  const onChangeSection = (newSection) => {
    setSection(newSection);
    setFn({"section": newSection});
  };

  const onChangeCategory = (newCategory) => {
    setCategory(newCategory);
    setSection("All");
    setFn({"category": newCategory});
  };

  return (
    <SafeAreaView style={styles.infoContainer}>
      {directoryList._j.length > 0 ? (
          <SingleSelectDropdown
                options={getCategories()}
                placeholder={!!category ? category : "Category"}
                icon={<Ionicons name="folder-open-outline" size={size} style={[styles.icon, {margin: SIZES.xxSmall}]} />}
                setFn={onChangeCategory}
                isDisabled={isSection}
            />
      ) : (
        <Text>Loading categories...</Text>
      )}

      {!!category && (directoryList._j.length > 0 ? (
        <SingleSelectDropdown options={getSections()} placeholder={!!section ? section : "Section"} setFn={onChangeSection} isDisabled={isSection}
          icon={<Ionicons name={"bookmark-outline"} size={size} style={[styles.icon, {margin: SIZES.xxSmall}]} />} />
      ) : (
        <Text>Loading sections...</Text>
      ))}

      <>
      {!isScheduler && (
        <>
        <View style={[styles.divider, {padding: 0}]}/>

        {showDuration == false && (
        <>
          <TouchableOpacity style={[styles.row, styles.property]} onPress={()=>(setShowDuration(true), setFn({"duration": Number(hour * 60) + Number(minute)}))}>
            <Ionicons name={"timer-outline"} size={size} style={[styles.icon]}/>    
            <Text style={styles.property}>Add Duration</Text>
          </TouchableOpacity>
        </>
        )}
        {showDuration == true && (
          <>
          <View style={[styles.row, styles.property]}>
            <Ionicons name={"timer-outline"} size={size} style={[styles.icon]}/>    
            {hourPickerVisible ? (
              <>
                <Picker
                  selectedValue={hour}
                  onValueChange={(newHour) => (
                    setHour(newHour),
                    toggleHourPicker(),
                    //setDuration(newHour*60 + minute),
                    setFn({"duration": Number(newHour * 60) + Number(minute)})
                  )}
                  style={styles.picker}>
                  {hourItem}
                </Picker>
                <Spacer size={30} />
              </>
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
                    //setDuration(hour*60 + newMinute),
                    setFn({"duration": Number(hour * 60) + Number(newMinute)})
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
            {(hourPickerVisible == false && minutePickerVisible == false) && (
              <TouchableOpacity style={[styles.row, styles.removeButton]} onPress={() => (setFn({"duration": "x"}), setShowDuration(false))}>
                <Ionicons name={"close-outline"} size={20} style={styles.iconInverse} />
              </TouchableOpacity>
            )}
          </View>
          </>
        )}
        </>
      )}

      <View style={[styles.divider, {padding: 0}]}/>

      {(itemType === ItemType.Recipe) && (
      <>
        {showServing == false && (
          <>
            <TouchableOpacity style={[styles.row, styles.property]} onPress={()=>(setShowServing(true), setServing(0), setFn({"serving": Number(0)}))}>
              <Ionicons name={"restaurant-outline"} size={size} style={[styles.icon]}/>    
              <Text style={styles.property}>Add Servings</Text>
            </TouchableOpacity>
            <View style={[styles.divider, {padding: 0}]}/>
          </>
        )}
        {showServing == true && (
          <>
          <View style={[styles.row, styles.property, { justifyContent: "space-between" }]}>
            <View style={styles.row}>
              <Ionicons name={"restaurant-outline"} size={size} style={[styles.icon]}/>    
              <TextInput keyboardType="numeric"
                onChangeText={(serving_) => (
                  setServing(serving_),
                  setFn({"serving": Number(serving_)})
                )}
                {...(serving ? { defaultValue: serving.toString() } : { placeholder: "0" })}
              style={[styles.property, styles.box, {backgroundColor: "#FFF"}]}
              />
            </View>
            <>
              <TouchableOpacity style={[styles.row, styles.removeButton]}
                onPress={() => (setFn({"serving": "x"}), setShowServing(false))}
              >
                <Ionicons name={"close-outline"} size={20} style={styles.iconInverse} />
              </TouchableOpacity>
            </>
          </View>
          <View style={[styles.divider, {padding: 0}]}/>
          </>
        )}
      </>
      )}

      {showPriority == false && (
        <TouchableOpacity style={styles.property} onPress={()=>(setShowPriority(true), setPriority('LOW'), setFn({"priority": "LOW"}))}>
          {(itemType === ItemType.Recipe) ? (
            <View style={styles.row}>
              <Ionicons name={"star-half-outline"} size={size} style={styles.icon}/>
              <Text style={styles.property}>Add Rating</Text>
            </View>
          ) : (
            <View style={styles.row}>
              <Ionicons name={"alert-outline"} size={size} style={styles.icon}/>
              <Text style={styles.property}>Add Priority</Text>
            </View>
          )} 
        </TouchableOpacity>
      )}
      {showPriority == true && (
        <>
        <View style={[styles.row, styles.property, { justifyContent: "space-between" }]}>
          <>
            {(itemType === ItemType.Recipe) ? (
              <Ionicons name={"star-half-outline"} size={size} style={[styles.icon, {margin: SIZES.xxSmall}]}/>
            ) : (
              <Ionicons name={"alert-outline"} size={size} style={[styles.icon, {margin: SIZES.xxSmall}]}/>
            )}
            <TouchableOpacity style={[styles.row, styles.box, priority === 'LOW' ? styles.selectedBox:styles.unselectedBox]}
              onPress={() => (
                setPriority("LOW"),
                setFn({"priority": "LOW"})
              )}
            >
              <Ionicons name={"star-outline"} size={20} style={[priority === 'LOW' ? styles.iconInverse:styles.icon]} />
            </TouchableOpacity>
            <TouchableOpacity style={[styles.row, styles.box, priority === 'MED' ? styles.selectedBox:styles.unselectedBox]}
              onPress={() => (
                setPriority("MED"),
                setFn({"priority": "MED"})
              )}
            >
              <Ionicons name={"star-outline"} size={20} style={[priority === 'MED' ? styles.iconInverse:styles.icon]} />
              <Ionicons name={"star-outline"} size={20} style={[priority === 'MED' ? styles.iconInverse:styles.icon]} />
            </TouchableOpacity>
            <TouchableOpacity style={[styles.row, styles.box, priority === 'HIGH' ? styles.selectedBox:styles.unselectedBox]}
              onPress={() => (
                setPriority("HIGH"),
                setFn({"priority": "HIGH"})
              )}
            >
              <Ionicons name={"star-outline"} size={20} style={[priority === 'HIGH' ? styles.iconInverse:styles.icon]} />
              <Ionicons name={"star-outline"} size={20} style={[priority === 'HIGH' ? styles.iconInverse:styles.icon]} />
              <Ionicons name={"star-outline"} size={20} style={[priority === 'HIGH' ? styles.iconInverse:styles.icon]} />
            </TouchableOpacity>
          </>
          <>
            <TouchableOpacity style={[styles.row, styles.removeButton]} onPress={() => (setPriority(null), setFn({"priority": "x"}), setShowPriority(false))} >
                <Ionicons name={"close-outline"} size={20} style={styles.iconInverse} />
            </TouchableOpacity>
          </>
        </View>
        </>
      )}
      </>
    </SafeAreaView>
  )
};

const styles = StyleSheet.create({
  infoContainer: {
    marginHorizontal: SIZES.medium,
    backgroundColor: COLORS({opacity:1}).lightWhite,
    //borderRadius: SIZES.medium/2,
    ...SHADOWS.medium,
    shadowColor: COLORS({opacity:1}).shadow,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  divider: {
    //paddingBottom: SIZES.xSmall,
    marginHorizontal: SIZES.xxSmall,
    borderBottomWidth: 1,
    borderColor: COLORS({opacity:1}).secondary,
  },
  label:{
    fontSize: SIZES.large,
    fontFamily: FONT.regular,
    color: COLORS({opacity:1}).secondary,
    margin: SIZES.xSmall,
  },
  property:{
    fontSize: SIZES.medium,
    fontFamily: FONT.regular,
    color: COLORS({opacity:0.8}).secondary,
    margin: SIZES.small,
  },
  icon: {
    //margin: SIZES.xxSmall,
    color: COLORS({opacity:1}).secondary,
  },
  iconInverse: {
    //margin: SIZES.xxSmall,
    color: COLORS({opacity:1}).lightWhite,
  },
  box: {
    borderWidth: 0.5,
    borderColor: COLORS({opacity:1}).primary,
    borderRadius: SIZES.xxSmall,
    padding: SIZES.small, 
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: SIZES.xxSmall,
  },
  selectedBox: {
    backgroundColor: COLORS({opacity:1}).secondary,
  },
  unselectedBox: {
    backgroundColor: COLORS({opacity:1}).lightWhite,
  },
  selectedText: {
    color: COLORS({opacity:1}).lightWhite,
  },
  unselectedText: {
    color: COLORS({opacity:1}).secondary,
  },
  sectionContainer: {
    margin: SIZES.xSmall,
    padding: SIZES.xSmall,
    backgroundColor: COLORS({opacity:0.5}).primary,
    borderRadius: SIZES.small,
    ...SHADOWS.medium,
    shadowColor: COLORS({opacity:1}).shadow,
  },
  title: {
    fontSize: SIZES.large,
    fontFamily: FONT.regular,
    color: COLORS({opacity:1}).primary,
  },
  section: {
    fontSize: SIZES.medium,
    fontFamily: FONT.regular,
    color: COLORS({opacity:1}).primary,
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
  removeButton: {
    backgroundColor: COLORS({opacity:1}).lightRed, 
    padding: SIZES.small, 
    borderRadius: SIZES.xxSmall,
    marginHorizontal: SIZES.medium,
    alignItems: 'center',
  },
});