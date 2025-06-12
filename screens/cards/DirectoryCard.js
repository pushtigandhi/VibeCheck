import React, { useEffect, useState, useRef } from "react";
import { View, Text, TouchableOpacity, Modal, TextInput,
        StyleSheet, Animated, FlatList, ScrollView, Alert } from 'react-native';
import { COLORS, SHADOWS, FONT, textSIZES, ViewType, ItemType, viewSIZES } from "../../constants";
import { Ionicons } from "@expo/vector-icons";
import { ExpandableView } from "../../utils";
import { GETitems, GETitemsTEST } from "../../API";
import { SafeAreaView } from "react-native-safe-area-context";
import { DELETEcategory, PATCHcategory } from "../../API"; 

const expandedCard = ({navigation, category, sections, doRefresh}) => {

  async function getSectionItemsFromAPI(section) {
    try {
      let items_ = await GETitems(ItemType.Item, { category: category.title, section: section.title });
      return items_;
    } catch (error) {
      console.log("error fetching item");
      console.log(error);
      return [];
    }
  }

  async function onSelectSection(section) {
    let items;
    await getSectionItemsFromAPI(section).then((items_) => {
      items = items_;
    }).catch((err) => {
      alert(err.message)
    });

    if(section.view == ViewType.Default) {
      navigation.navigate("DefaultView", {"category": category.title, "section": section.title, "item": items})
    }
  }

  async function addSection(newTitle) {
    const updatedCategory = {
      id: category["_id"],
      sections: [...sections, {title: newTitle, view: ViewType.Default}],
    }
    await PATCHcategory(updatedCategory).then((directory) => {
      let sections_ = directory.find(c => c._id === category["_id"]).sections;
      doRefresh(sections_);
    }).catch((err) => {
      alert(err.message)
    });
  }

  async function deleteSection(sectionID) {
    const updatedCategory = {
      id: category["_id"],
      sections: sections.filter(s => s._id !== sectionID),
    }
    await PATCHcategory(updatedCategory).then((directory) => {  
      let sections_ = directory.find(c => c._id === category["_id"]).sections;
      doRefresh(sections_);
    }).catch((err) => {
      alert(err.message)
    });
  }

  async function editSection(sectionID, newTitle) {
    const updatedCategory = {
      id: category["_id"],
      sections: sections.map(s => s._id === sectionID ? {...s, title: newTitle} : s),
    }
    await PATCHcategory(updatedCategory).then((directory) => {
      let sections_ = directory.find(c => c._id === category["_id"]).sections;
      doRefresh(sections_);
    }).catch((err) => {
      alert(err.message)
    });
  } 

  const [showSectionOptions, setShowSectionOptions] = useState(false);

  return (
    <ScrollView style={styles.expandedContainer}>
      <TouchableOpacity key={"all"} style={styles.sectionContainer} onPress={() => {
        onSelectSection({title: "All", view: ViewType.Default});
      }}>
        <Text style={styles.section}>All</Text>
      </TouchableOpacity>
      
      {sections.map(section => (
        <View key={section["_id"] + "_root"}>
        <TouchableOpacity style={styles.sectionContainer}
          onPress={() => {
            onSelectSection(section);
          }}
          onLongPress={() => {
            setShowSectionOptions(true);
          }}
        >
          <Text style={styles.section} numberOfLines={1}>{section.title}</Text>
        </TouchableOpacity>
        <Modal visible={showSectionOptions} animationType="fade" transparent={true}>
        <SafeAreaView style={{flex: 1}}>
          <TouchableOpacity style={{flex: 1}} onPress={() => setShowSectionOptions(false)}>
            <View style={{
              position: 'absolute',
              right: 10,
              top: 40,
              width: '25%',
              backgroundColor: COLORS({opacity: 1}).white,
              borderRadius: textSIZES.xSmall,
              shadowColor: "#000",
              shadowOffset: {
                width: 0,
                height: 2,
              },
              shadowOpacity: 0.25,
              shadowRadius: 4,
              elevation: 5,
              zIndex: 1000,
            }}>
              <TouchableOpacity style={styles.button} onPress={() => {
                Alert.prompt(
                  "Rename Section",
                  "Enter new section title",
                  [
                    {text: "Cancel", style: "cancel"},
                    {text: "Rename", style: "default", onPress: (newTitle) => {
                      if (newTitle && newTitle.trim() !== "") {
                        editSection(section["_id"], newTitle);
                      }
                    }}
                  ],
                  "plain-text",
                  section.title
                );
                setShowSectionOptions(false);
              }}>
                <Text style={styles.buttonText}>Rename</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.button} onPress={() => {
                Alert.alert(
                  "Delete Section",
                  "Are you sure you want to delete this section?",
                  [
                    {text: "Cancel", style: "cancel"},
                    {text: "Delete", style: "destructive", onPress: async () => {
                      deleteSection(section["_id"]);
                    }}
                  ]
                );
                setShowSectionOptions(false);
              }}>
                <Text style={styles.buttonText}>Delete</Text>
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        </SafeAreaView>
        </Modal>
        </View>
      ))}
    </ScrollView>
  )
};

const DirectoryCard = ({navigation, category, handleDelete, handleRename}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [showOptions, setShowOptions] = useState(false);
  const [sections, setSections] = useState(category.sections);
  const [optionsPosition, setOptionsPosition] = useState({ x: 0, y: 0 });
  const dotsRef = useRef(null);

  const doRefresh = (sections_) => {
    setSections(sections_);
  }

  useEffect(() => {

  }, [sections]);

  const openOptions = () => {
    if (dotsRef.current) {
      dotsRef.current.measure((fx, fy, width, height, px, py) => {
        setOptionsPosition({ x: px, y: py + height });
        setShowOptions(true);
      });
    } else {
      setShowOptions(true);
    }
  };

  async function handleAddSection(newTitle) {
    if (!newTitle || !newTitle.trim()) return;
    const updatedCategory = {
      id: category["_id"],
      sections: [...sections, {title: newTitle, view: ViewType.Default}],
    };
    await PATCHcategory(updatedCategory).then((directory) => {
      let sections_ = directory.find(c => c._id === category["_id"]).sections;
      setSections(sections_);
    }).catch((err) => {
      alert(err.message)
    });
  }

  return (
    <>
      <TouchableOpacity
        onPress={() => {
          setIsExpanded(!isExpanded);
        }}
        style={styles.titleContainer}
      >
        <Text style={styles.title} numberOfLines={1}>{category.title}</Text>
        <TouchableOpacity ref={dotsRef} onPress={openOptions}>
          <Ionicons name={"ellipsis-horizontal-outline"} size={textSIZES.medium} style={styles.icon}/>
        </TouchableOpacity>
      </TouchableOpacity>

      <Modal visible={showOptions} animationType="fade" transparent={true} onRequestClose={() => setShowOptions(false)}>
        <TouchableOpacity style={{flex: 1}} onPress={() => setShowOptions(false)}>
          <View style={{
            position: 'absolute',
            left: optionsPosition.x - 120, // adjust for width of the menu
            top: optionsPosition.y + 5, // a little below the dots
            width: 120,
            backgroundColor: COLORS({opacity: 1}).white,
            borderRadius: textSIZES.xSmall,
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.25,
            shadowRadius: 4,
            elevation: 5,
            zIndex: 1000,
            paddingVertical: 4,
          }}>
            <TouchableOpacity style={styles.button} onPress={() => {
              Alert.prompt(
                "Add Section",
                "Enter new section title",
                [
                  {text: "Cancel", style: "cancel"},
                  {text: "Add", style: "default", onPress: (newTitle) => { handleAddSection(newTitle); }}
                ]
              );
              setShowOptions(false);
            }}>
              <Text style={styles.buttonText}>Add Section</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => {
              Alert.prompt(
                "Rename Category",
                "Enter new category title",
                [
                  {text: "Cancel", style: "cancel"},
                  {text: "Rename", style: "default", onPress: (newTitle) => {
                    if (newTitle && newTitle.trim() !== "") {
                      handleRename(newTitle);
                    }
                  }}
                ],
                "plain-text",
              );
              setShowOptions(false);
            }}>
              <Text style={styles.buttonText}>Rename</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => {
              Alert.alert(
                "Delete Category",
                "Are you sure you want to delete this category?",
                [
                  {text: "Cancel", style: "cancel"},
                  {text: "Delete", style: "destructive", onPress: async () => {
                    handleDelete();
                  }}
                ]
              );
              setShowOptions(false);
            }}>
              <Text style={styles.buttonText}>Delete</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>

      <ExpandableView expanded={isExpanded} view={expandedCard} params={{navigation, category, sections, doRefresh}} vh={200} />
    </>
  );
};

const styles = StyleSheet.create({
  titleContainer: {
   // width: '100%',
    padding: textSIZES.small,
    borderColor: COLORS({opacity:0.5}).primary,
    borderBottomWidth: 1,
    borderBottomLeftRadius: textSIZES.xLarge,
    borderBottomRightRadius: textSIZES.xLarge,
    flexDirection: "row",
    justifyContent: "space-between"
  },
  sectionContainer: {
    margin: textSIZES.tiny,
    marginBottom: textSIZES.xxSmall,
    padding: textSIZES.xSmall,
    backgroundColor: COLORS({opacity:1}).secondary,
    borderRadius: textSIZES.xSmall,
  },
  modalContainer: { 
    margin: textSIZES.xxLarge,
    paddingHorizontal: textSIZES.small,
    width: viewSIZES.medium,
    backgroundColor: COLORS({opacity:1}).white,
    borderRadius: textSIZES.xSmall,
    borderWidth: 1,
    borderColor: COLORS({opacity:0.5}).primary,
  },
  title: {
    fontSize: textSIZES.medium,
    fontFamily: FONT.regular,
    color: COLORS({opacity:1}).primary,
  },
  section: {
    fontSize: textSIZES.small,
    fontFamily: FONT.regular,
    color: COLORS({opacity:1}).white,
  },
  expandedContainer: {
    backgroundColor: COLORS({opacity:1}).lightWhite,
    padding: textSIZES.small,
    marginHorizontal: textSIZES.small,
    flex: 1,
    overflow: 'scroll',
  },
  row: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  addButtonIcon: {
    height: textSIZES.xxLarge,
    margin: textSIZES.xSmall,
    backgroundColor: COLORS({opacity:1}).tertiary,
    borderRadius: textSIZES.xxSmall,
    alignItems: "center",
    justifyContent: "center",
  },
  icon: {
    marginRight: textSIZES.xxSmall,
    color: COLORS({opacity:0.8}).primary,
  },
  iconInverted: {
    color: COLORS({opacity:1}).white,
    margin: textSIZES.xxSmall,
  },
  buttonText: { 
    fontSize: textSIZES.small,
    margin: textSIZES.xSmall,
  },
  removeButton: {
    backgroundColor: COLORS({opacity:1}).lightRed, 
    padding: textSIZES.xxSmall, 
    borderRadius: textSIZES.xxSmall,
    marginLeft: textSIZES.xxSmall,
    alignItems: 'center',
  },
});

export default DirectoryCard