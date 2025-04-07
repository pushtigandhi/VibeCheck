import React, { useEffect, useState } from "react";
import { SafeAreaView, View, Text, TextInput, Modal, TouchableOpacity, StyleSheet } from 'react-native';
import { COLORS, SHADOWS, FONT, textSIZES, ItemType, viewSIZES } from "../../constants";
import { Spacer } from '../../utils';
import { Ionicons } from "@expo/vector-icons";
import { Picker } from '@react-native-picker/picker';
import SingleSelectDropdown from "../../components/SingleSelectDropdown";
import MultiSelectDropdown from "../../components/MultiSelectDropdown";
import DateTimePicker from '@react-native-community/datetimepicker';

import { getDirectoryFromStorage } from "../../API";

const allTags = [
  {
    label: "work",
    value: "work"
  },{
    label: "selfcare",
    value: "selfcare"
  },{
    label: "school",
    value: "school"
  },{
    label: "housework",
    value: "housework"
  },{
    label: "hobby",
    value: "hobby"
  },
]


export const PropertyCard = ({ item = null, itemType, setFn}) => {
  const [category, setCategory] = useState('');
  const [section, setSection] = useState('');
  const [serving, setServing] = useState(null);
  const [priority, setPriority] = useState(null);
  
  const [showPriority, setShowPriority] = useState(false);
  const [showDuration, setShowDuration] = useState(false);
  const [showServing, setShowServing] = useState(false);
  const [tags, setTags] = useState([]);
  const [hourPickerVisible, setHourPickerVisible] = useState(false);
  const [minutePickerVisible, setMinutePickerVisible] = useState(false);
  const [hour, setHour] = useState(0);
  const [minute, setMinute] = useState(15);
  const [directoryList, setDirectoryList] = useState([]);

  const size = textSIZES.medium;

  const toggleHourPicker = () => {
    setHourPickerVisible(!hourPickerVisible);
  };

  const toggleMinutePicker = () => {
    setMinutePickerVisible(!minutePickerVisible);
  };

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
    getDirectoryFromStorage().then((directoryList_) => {
      setDirectoryList(directoryList_);
    }).catch((err) => {
        alert(err.message)
    })
  }, []); // Empty dependency array to run only once on component mount

  useEffect(() => {
    if (item) {
      console.log(item);
      if(!!item.category){
        setCategory(item.category);
        setSection('All');
      }
      if(!!item.section)
        setSection(item.section);
      
      if(!!item.priority){
        setPriority(item.priority);
        setShowPriority(true);
      }
      if(!!item.tags) {
        setTags(item.tags);
        //console.log(item.tags);
      }
    }
  }, [item]); // Update category and section when item changes

  function getCategories() {
    const categoryTitles = directoryList.map(cat => {
      return cat.title;
    });
    return categoryTitles.map((title, index) => ({
      label: title,
      value: title
    }));
  }

  function getSections() {
    if (!!category) {
      const sectionTitles = directoryList.find(cat => cat.title === category).sections;
      return sectionTitles.map((section, index) => ({
        label: section.title,
        value: section.title
      }));
    } else {
      return [];
    }
  }

  const onChangeSection = (newSection) => {
    setSection(newSection);
    setFn({"section": newSection});
  };

  const onChangeCategory = (newCategory) => {
    setCategory(newCategory);
    onChangeSection("All");
    setFn({"category": newCategory});
  };

  return (
    <SafeAreaView style={styles.infoContainer}>
      {directoryList.length > 0 ? (
          <SingleSelectDropdown
                options={getCategories()}
                placeholder={!!category ? category : "Category"}
                icon={<Ionicons name="folder-open-outline" size={size} style={[styles.icon, {marginRight: textSIZES.xSmall}]} />}
                setFn={onChangeCategory}
            />
      ) : (
        <Text>Loading categories...</Text>
      )}

      {!!category && (directoryList.length > 0 ? (
        <SingleSelectDropdown options={getSections()} placeholder={!!section ? section : "Section"} setFn={onChangeSection}
          icon={<Ionicons name={"bookmark-outline"} size={size} style={[styles.icon, {marginRight: textSIZES.xxSmall}]} />} />
      ) : (
        <Text>Loading sections...</Text>
      ))}

      <MultiSelectDropdown options={allTags} placeholder="Tags" setFn={setTags} current={tags}
        icon={<Text style={[styles.icon, {marginRight: textSIZES.xSmall, fontSize: size}]}>#</Text>} /> 

        <View style={[styles.divider, {padding: 0}]}/>

        {showDuration == false && (
        <>
          <TouchableOpacity style={[styles.row, styles.property]} onPress={()=>(setShowDuration(true), setFn({"duration": Number(hour * 60) + Number(minute)}))}>
            <Ionicons name={"timer-outline"} size={size} style={[styles.icon]}/>    
            <Text style={styles.label}>Add Duration</Text>
          </TouchableOpacity>
        </>
        )}
        {showDuration == true && (
          <>
          <View style={[styles.row, styles.property]}>
            <Ionicons name={"timer-outline"} size={textSIZES.large} style={[styles.icon]}/>    
            {hourPickerVisible ? (
              <>
                <Picker
                  selectedValue={hour}
                  onValueChange={(newHour) => (
                    setHour(newHour),
                    toggleHourPicker(),
                    setFn({"duration": Number(newHour * 60) + Number(minute)})
                  )}
                  style={styles.picker}>
                  {hourItem}
                </Picker>
                <Spacer size={size} />
              </>
            ) : (
              <TouchableOpacity onPress={toggleHourPicker} style={styles.duration}>
                <Text style={{fontSize: textSIZES.small}}>{hour}</Text>
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
                    setFn({"duration": Number(hour * 60) + Number(newMinute)})
                  )}
                  style={styles.picker}>
                  {minuteItem}
                </Picker>
                <Spacer size={size} />
              </View>
            ) : (
              <TouchableOpacity onPress={toggleMinutePicker} style={styles.duration}>
                <Text style={{fontSize: textSIZES.small}}>{minute}</Text>
              </TouchableOpacity>
            )}
            <Text style={styles.property}>Minutes</Text>
            {(hourPickerVisible == false && minutePickerVisible == false) && (
              <TouchableOpacity style={[styles.row, styles.removeButton]} onPress={() => (setFn({"duration": "x"}), setShowDuration(false))}>
                <Ionicons name={"close-outline"} size={size} style={styles.icon} />
              </TouchableOpacity>
            )}
          </View>
        </>
      )}

      <View style={[styles.divider, {padding: 0}]}/>

      {(itemType === ItemType.Recipe) && (
      <>
        {showServing == false && (
          <>
            <TouchableOpacity style={[styles.row, styles.property]} onPress={()=>(setShowServing(true), setServing(0), setFn({"serving": 0}))}>
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
                onPress={() => (setFn({"serving": 'x'}), setServing(null), setShowServing(false))}
              >
                <Ionicons name={"close-outline"} size={size} style={styles.icon} />
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
              <Text style={styles.label}>Add Rating</Text>
            </View>
          ) : (
            <View style={styles.row}>
              <Ionicons name={"alert-outline"} size={size} style={styles.icon}/>
              <Text style={styles.label}>Add Priority</Text>
            </View>
          )} 
        </TouchableOpacity>
      )}
      {showPriority == true && (
        <>
        <View style={[styles.row, styles.property]}>
          <>
            {(itemType === ItemType.Recipe) ? (
              <Ionicons name={"star-half-outline"} size={size} style={[styles.icon, {margin: textSIZES.xxSmall}]}/>
            ) : (
              <Ionicons name={"alert-outline"} size={size} style={[styles.icon, {margin: textSIZES.xxSmall}]}/>
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
            <TouchableOpacity style={[styles.row, styles.removeButton]} onPress={() => (setPriority(null), setFn({"priority": 'x'}), setShowPriority(false))} >
                <Ionicons name={"close-outline"} size={20} style={styles.icon} />
            </TouchableOpacity>
          </>
        </View>
        </>
      )}
    </SafeAreaView>
  )
};

const styles = StyleSheet.create({
  infoContainer: {
    marginHorizontal: textSIZES.small,
    marginBottom: textSIZES.small,
    padding: textSIZES.xSmall,
    backgroundColor: COLORS({opacity:1}).lightWhite,
    borderRadius: textSIZES.small/2,
    borderWidth: 1,
    borderColor: COLORS({opacity:1}).primary,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  divider: {
    paddingBottom: textSIZES.xxSmall,
    marginHorizontal: textSIZES.xxSmall,
    borderBottomWidth: 1,
    borderColor: COLORS({opacity:1}).secondary,
  },
  label:{
    color: COLORS({opacity:1}).secondary,
    margin: textSIZES.xSmall,
  },
  property:{
    // fontSize: textSIZES.small,
    // fontFamily: FONT.regular,
    // color: COLORS({opacity:0.8}).secondary,
    margin: textSIZES.xxSmall,
  },
  icon: {
    //margin: textSIZES.xxSmall,
    color: COLORS({opacity:1}).secondary,
  },
  iconInverse: {
    //margin: textSIZES.xxSmall,
    color: COLORS({opacity:1}).lightWhite,
  },
  box: {
    borderWidth: 0.5,
    borderColor: COLORS({opacity:1}).primary,
    borderRadius: textSIZES.xxSmall,
    padding: textSIZES.xxSmall, 
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: textSIZES.xxSmall,
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
    margin: textSIZES.xSmall,
    padding: textSIZES.xSmall,
    backgroundColor: COLORS({opacity:0.5}).primary,
    borderRadius: textSIZES.xSmall,
    ...SHADOWS.medium,
    shadowColor: COLORS({opacity:1}).shadow,
  },
  title: {
    fontSize: textSIZES.large,
    fontFamily: FONT.regular,
    color: COLORS({opacity:1}).primary,
  },
  section: {
    fontSize: textSIZES.small,
    fontFamily: FONT.regular,
    color: COLORS({opacity:1}).primary,
  },
  duration: {
    backgroundColor: COLORS({opacity:0.5}).lightGrey,
    padding: textSIZES.xSmall,
    borderRadius: textSIZES.xSmall,
    marginLeft: textSIZES.xSmall,
  },
  picker: {
    width: 100,
    height: 150,
  },
  removeButton: {
    backgroundColor: COLORS({opacity:0.5}).lightGrey, 
    padding: textSIZES.xxSmall, 
    borderRadius: textSIZES.xxSmall,
    marginHorizontal: textSIZES.small,
    alignItems: 'center',
  },
});