import { useState, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity, Image,
        StyleSheet, Animated, FlatList } from 'react-native';

import { COLORS, SHADOWS, FONT, SIZES } from "../../../constants";
import { ExpandableView, Spacer } from '../../../utils';
import { taskProperties } from "../PropertyCards";
import Layout from "../../../_layout";
import { Ionicons } from "@expo/vector-icons";
import { PropertyCard } from "../PropertyCards";

const expandedIngredients = ({originalIngredients, setFn, isEditable, unSelect = false, setUnSelect}) => {
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

  const unSelectAll = () => {
    const updatedIngredients = ingredients.map((ingredient) => {
        return { ...ingredient, isChecked: false };
    });
    setIngredients(updatedIngredients);
    setFn({"ingredients": updatedIngredients});
    setUnSelect(false);
  };

  useEffect(() => {
    if(unSelect == true) {
      unSelectAll();
    }
  }, [unSelect]);
  
  return (
    <View style={styles.expandedContainer}>
      {isEditable==true && (
        <TouchableOpacity style={styles.addButtonIcon} >
          <Ionicons name={"add-circle"} size={SIZES.large} style={styles.iconInverted} />
        </TouchableOpacity>
      )}
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

const expandedInstructions = ({originalInstructions, setFn, isEditable, unSelect = false, setUnSelect}) => {
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

    const unSelectAll = () => {
      const updatedInstructions = instructions.map((instruction) => {
          return { ...instruction, isChecked: false };
      });
      setInstructions(updatedInstructions);
      setFn({"instructions": updatedInstructions});
      setUnSelect(false);
    };
  
    useEffect(() => {
      if(unSelect == true) {
        unSelectAll();
      }
    }, [unSelect]);

    return (
      <View style={styles.expandedContainer}>
        {isEditable==true && (
          <TouchableOpacity style={styles.addButtonIcon} >
            <Ionicons name={"add-circle"} size={SIZES.large} style={styles.iconInverted} />
          </TouchableOpacity>
        )}
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

const RecipeCard = ({item, setFn, isEditable=true}) => {
  const [isIngredientsExpanded, setIsIngredientsExpanded] = useState(true);
  const [isInstructionsExpanded, setIsInstructionsExpanded] = useState(true);

  const [unSelectIngredients, setUnSelectIngredients] = useState(false);
  const [unSelectInstructions, setUnSelectInstructions] = useState(false);

  return (
    <View style={styles.infoContainer}>
      <View style={[styles.row, styles.propContainer, {justifyContent: "space-between"}]}>
        <TouchableOpacity style={[styles.row, {flex: 2}]}
          onPress={() => {
            setIsIngredientsExpanded(!isIngredientsExpanded);
          }}
        >
          <Text style={styles.label} numberOfLines={1}>Ingredients</Text>
          <View style={styles.row}>
            {isIngredientsExpanded ? (
                <Ionicons name="chevron-up-outline" size={SIZES.xLarge} style={styles.icon}/>
            ) : (
                <Ionicons name="chevron-down-outline" size={SIZES.xLarge} style={styles.icon}/>
            )}
          </View>
        </TouchableOpacity>
        {item.ingredients.length > 0 && (
          <TouchableOpacity onPress={() => (setUnSelectIngredients(true))} style={[styles.box, {flex: 1}]} disabled={!isIngredientsExpanded}>
            <Text style={{fontSize: SIZES.medium, color: COLORS({opacity:1}).white}}>Unselect All</Text>
          </TouchableOpacity>
        )}
      </View>
      <ExpandableView expanded={isIngredientsExpanded} view={expandedIngredients} 
        params={{"originalIngredients": item.ingredients, "setFn": setFn, "isEditable": isEditable, "unSelect": unSelectIngredients, "setUnSelect": setUnSelectIngredients}} vh={300} />
      
      <View style={[styles.row, styles.propContainer, {justifyContent: "space-between"}]}>
        <TouchableOpacity style={[styles.row, {flex: 2}]}
          onPress={() => {
              setIsInstructionsExpanded(!isInstructionsExpanded);
          }}
        >
          <Text style={styles.label} numberOfLines={1}>Instructions</Text>
          <View style={styles.row}>
            {isInstructionsExpanded ? (
                <Ionicons name="chevron-up-outline" size={SIZES.xLarge} style={styles.icon}/>
            ) : (
                <Ionicons name="chevron-down-outline" size={SIZES.xLarge} style={styles.icon}/>
            )}
          </View>
        </TouchableOpacity>
        {item.instructions.length > 0 && (
          <TouchableOpacity onPress={() => (setUnSelectInstructions(true))} style={[styles.box, {flex: 1}]} disabled={!isInstructionsExpanded}>
            <Text style={{fontSize: SIZES.medium, color: COLORS({opacity:1}).white}}>Unselect All</Text>
          </TouchableOpacity>
        )}
      </View>
      <ExpandableView expanded={isInstructionsExpanded} view={expandedInstructions} 
        params={{"originalInstructions": item.instructions, "setFn": setFn, "isEditable": isEditable, "unSelect": unSelectInstructions, "setUnSelect": setUnSelectInstructions}} vh={300} />
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
    margin: SIZES.medium,
    backgroundColor: COLORS({opacity:1}).lightWhite,
    borderRadius: SIZES.medium/2,
    borderWidth: 1,
    borderColor: COLORS({opacity:1}).navy,
    padding: SIZES.medium,
    paddingBottom: SIZES.xxLarge,
    flex: 1,
  },
  addButtonIcon: {
    height: SIZES.xxLarge,
    margin: SIZES.xSmall,
    backgroundColor: COLORS({opacity:0.5}).darkBlue,
    borderRadius: SIZES.small,
    // ...SHADOWS.medium,
    // shadowColor: COLORS({opacity:1}).shadow,
    alignItems: "center",
    justifyContent: "center",
  },
  item: {
    fontSize: SIZES.mlarge,
    fontFamily: FONT.regular,
    color: COLORS({opacity:1}).darkBlue,
  },
  propContainer: {
    flex: 1,
    padding: SIZES.medium,
    borderColor: COLORS({opacity:0.5}).darkBlue,
    borderBottomWidth: 1,
    borderRadius: SIZES.medium,
    marginHorizontal: SIZES.medium,
  },
  subtaskContainer: {
    margin: SIZES.xxSmall,
    padding: SIZES.xSmall,
    backgroundColor: COLORS({opacity:0.5}).white,
    borderRadius: SIZES.small,
    borderColor: COLORS({opacity:0.5}).lightGrey,
    borderWidth: 1,
  },
  box: {
    backgroundColor: COLORS({opacity:1}).secondary,
    borderRadius: SIZES.xxSmall,
    padding: SIZES.xSmall,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: SIZES.xxSmall,
  },
});

export default RecipeCard