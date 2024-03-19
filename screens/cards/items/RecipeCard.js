import { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Image,
        StyleSheet, Animated, FlatList } from 'react-native';

import { COLORS, SHADOWS, FONT, SIZES } from "../../../constants";
import { ExpandableView, Spacer } from '../../../utils';
import { taskProperties } from "../PropertyCards";
import Layout from "../../../_layout";
import { Ionicons } from "@expo/vector-icons";
import { PropertyCard } from "../PropertyCards";

const expandedIngredients = ({originalIngredients, setFn}) => {
  const [ingredients, setIngredients] = useState(originalIngredients);

  const toggleIngredient = (id) => {
    const updatedIngredients = ingredients.map((ingredient) => {
      if (ingredient["_id"] === id) {
        return { ...ingredient, isChecked: !ingredient.isChecked };
      }
      return ingredient;
    });
    setIngredients(updatedIngredients);
    setFn({"ingredients": updatedIngredients}); // Indicate that changes have been made
  };
  
  return (
    <View style={styles.expandedContainer}>
      <TouchableOpacity style={styles.addButtonIcon} >
        <Ionicons name={"add-circle"} size={SIZES.large} style={styles.iconInverted} />
      </TouchableOpacity>
      {ingredients.length > 0 ? (ingredients.map(item => (
        <TouchableOpacity style={styles.subtaskContainer} key={item["_id"]} 
          onPress={() => toggleIngredient(item["_id"])}
        >
          <View style={styles.row}>
            {item.isChecked ? (
              <Ionicons name={"checkbox-outline"} size={SIZES.large} style={styles.icon}/> 
            ) : (
              <Ionicons name={"square-outline"} size={SIZES.large} style={styles.icon}/>
            )}
            <Text style={styles.item} numberOfLines={1}>{item.task}</Text>
          </View>
        </TouchableOpacity>
      ))) : (
        <View>
          <Text style={[styles.item, {marginRight: SIZES.small}]} numberOfLines={1}>None</Text>
        </View>
      )}
    </View>
  )
};

const expandedInstructions = ({originalInstructions, setFn}) => {
    const [instructions, setInstructions] = useState(originalInstructions);
  
    const toggleInstruction = (id) => {
      const updatedInstructions = instructions.map((instruction) => {
        if (instruction["_id"] === id) {
          return { ...instruction, isChecked: !instruction.isChecked };
        }
        return instruction;
      });
      setInstructions(updatedInstructions);
      setFn({"instructions": updatedInstructions}); // Indicate that changes have been made
    };
    
    return (
      <View style={styles.expandedContainer}>
        <TouchableOpacity style={styles.addButtonIcon} >
          <Ionicons name={"add-circle"} size={SIZES.large} style={styles.iconInverted} />
        </TouchableOpacity>
        {instructions.length > 0 ? (instructions.map(item => (
          <TouchableOpacity style={styles.subtaskContainer} key={item["_id"]} 
            onPress={() => toggleInstruction(item["_id"])}
          >
            <View style={styles.row}>
              {item.isChecked ? (
                <Ionicons name={"checkbox-outline"} size={SIZES.large} style={styles.icon}/> 
              ) : (
                <Ionicons name={"square-outline"} size={SIZES.large} style={styles.icon}/>
              )}
              <Text style={styles.item} numberOfLines={1}>{item.task}</Text>
            </View>
          </TouchableOpacity>
        ))) : (
          <View>
            <Text style={[styles.item, {marginRight: SIZES.small}]} numberOfLines={1}>None</Text>
          </View>
        )}
      </View>
    )
  };

const RecipeCard = ({item, setFn, expanded=false}) => {
  const [isIngredientsExpanded, setIsIngredientsExpanded] = useState(true);
  const [isInstructionsExpanded, setIsInstructionsExpanded] = useState(true);

  return (
    <View style={styles.infoContainer}>
      <TouchableOpacity
        onPress={() => {
            setIsIngredientsExpanded(!isIngredientsExpanded);
        }}
        style={styles.propContainer}
       // disabled={!isPressable}
      >
        <View style={[styles.row, {justifyContent: "space-between"}]}>
          <Text style={styles.label} numberOfLines={1}>Ingredients</Text>
          <View>
            {isIngredientsExpanded ? (
                <Ionicons name="chevron-up-outline" size={SIZES.xLarge} style={styles.icon}/>
            ) : (
                <Ionicons name="chevron-down-outline" size={SIZES.xLarge} style={styles.icon}/>
            )}
          </View>
        </View>
      </TouchableOpacity>
      <ExpandableView expanded={isIngredientsExpanded} view={expandedIngredients} params={{"originalIngredients": item.ingredients, "setFn": setFn}} vh={300} />
      <TouchableOpacity
        onPress={() => {
            setIsInstructionsExpanded(!isInstructionsExpanded);
        }}
        style={styles.propContainer}
       // disabled={!isPressable}
      >
        <View style={[styles.row, {justifyContent: "space-between"}]}>
          <Text style={styles.label} numberOfLines={1}>Instructions</Text>
          <View>
            {isInstructionsExpanded ? (
                <Ionicons name="chevron-up-outline" size={SIZES.xLarge} style={styles.icon}/>
            ) : (
                <Ionicons name="chevron-down-outline" size={SIZES.xLarge} style={styles.icon}/>
            )}
          </View>
        </View>
      </TouchableOpacity>
      <ExpandableView expanded={isInstructionsExpanded} view={expandedInstructions} params={{"originalInstructions": item.instructions, "setFn": setFn}} vh={300} />
    </View>
  )
};

const styles = StyleSheet.create({
  infoContainer: {
    backgroundColor: COLORS.lightWhite,
    borderRadius: SIZES.medium/2,
  },
  label: {
    fontSize: SIZES.large,
    fontFamily: FONT.regular,
    color: COLORS({opacity:1}).darkBlue,
  },
  iconInverted: {
    color: COLORS({opacity:1}).white,
  },
  icon: {
    //marginRight: SIZES.xxSmall,
    color: COLORS({opacity:0.8}).darkBlue,
  },
  row: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  expandedContainer: {
    width: '90%',
    margin: SIZES.medium,
    backgroundColor: COLORS.lightWhite,
    borderRadius: SIZES.medium/2,
    borderWidth: 1,
    borderColor: COLORS({opacity:1}).navy,
    padding: SIZES.medium,
    flex: 1,
  },
  addButtonIcon: {
    height: SIZES.xxLarge,
    margin: SIZES.xSmall,
    backgroundColor: COLORS({opacity:0.5}).darkBlue,
    borderRadius: SIZES.small,
    ...SHADOWS.medium,
    shadowColor: COLORS({opacity:1}).indigo,
    alignItems: "center",
    justifyContent: "center",
  },
  item: {
    fontSize: SIZES.mlarge,
    fontFamily: FONT.regular,
    color: COLORS({opacity:1}).darkBlue,
  },
  propContainer: {
    width: '90%',
    padding: SIZES.medium,
    borderColor: COLORS({opacity:0.5}).darkBlue,
    borderBottomWidth: 1,
    borderRadius: SIZES.medium,
    marginHorizontal: SIZES.medium,
  },
  subtaskContainer: {
    margin: SIZES.xxSmall,
    padding: SIZES.xSmall,
    backgroundColor: COLORS({opacity:0.5}).lightWhite,
    borderRadius: SIZES.small,
    ...SHADOWS.medium,
    shadowColor: COLORS({opacity:1}).indigo,
  },
});

export default RecipeCard