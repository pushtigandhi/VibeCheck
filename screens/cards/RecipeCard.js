import { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

import { COLORS, SHADOWS, FONT, SIZES } from "../../constants";
import { ExpandableView, Spacer } from '../../utils';
import { Ionicons } from "@expo/vector-icons";

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
        <View style={[styles.row, {flex: 2}]}>
          <Text style={styles.label} numberOfLines={1}>Ingredients</Text>
          {item.ingredients.length > 0 && (
            <TouchableOpacity onPress={() => (setUnSelectIngredients(true))} style={[styles.box, {flex: 1}]} disabled={!isIngredientsExpanded}>
              <Text style={{fontSize: SIZES.medium, color: COLORS({opacity:1}).white}}>Unselect All</Text>
            </TouchableOpacity>
          )}
          <TouchableOpacity style={styles.row} 
            onPress={() => {
              setIsIngredientsExpanded(!isIngredientsExpanded);
            }}
          >
            {isIngredientsExpanded ? (
                <Ionicons name="chevron-up-outline" size={SIZES.xLarge} style={styles.icon}/>
            ) : (
                <Ionicons name="chevron-down-outline" size={SIZES.xLarge} style={styles.icon}/>
            )}
          </TouchableOpacity>
        </View>
      </View>
      <ExpandableView expanded={isIngredientsExpanded} view={expandedIngredients} 
        params={{"originalIngredients": item.ingredients, "setFn": setFn, "isEditable": isEditable, "unSelect": unSelectIngredients, "setUnSelect": setUnSelectIngredients}} vh={300} />
      
      <View style={styles.divider}/>

      <View style={[styles.row, styles.propContainer, {justifyContent: "space-between"}]}>
        <View style={[styles.row, {flex: 2}]} >
          <Text style={styles.label} numberOfLines={1}>Instructions</Text>
          {item.instructions.length > 0 && (
            <TouchableOpacity onPress={() => (setUnSelectInstructions(true))} style={[styles.box, {flex: 1}]} disabled={!isInstructionsExpanded}>
              <Text style={{fontSize: SIZES.medium, color: COLORS({opacity:1}).white}}>Unselect All</Text>
            </TouchableOpacity>
          )}
          <TouchableOpacity style={styles.row} 
            onPress={() => {
                setIsInstructionsExpanded(!isInstructionsExpanded);
            }}
          >
            {isInstructionsExpanded ? (
                <Ionicons name="chevron-up-outline" size={SIZES.xLarge} style={styles.icon}/>
            ) : (
                <Ionicons name="chevron-down-outline" size={SIZES.xLarge} style={styles.icon}/>
            )}
          </TouchableOpacity>
        </View>
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
    fontSize: SIZES.medium,
   // fontFamily: FONT.regular,
    color: COLORS({opacity:1}).primary,
  },
  iconInverted: {
    color: COLORS({opacity:1}).white,
  },
  icon: {
    //marginRight: SIZES.xxSmall,
    color: COLORS({opacity:0.8}).primary,
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
    backgroundColor: COLORS({opacity:0.5}).primary,
    borderRadius: SIZES.small,
    // ...SHADOWS.medium,
    // shadowColor: COLORS({opacity:1}).shadow,
    alignItems: "center",
    justifyContent: "center",
  },
  item: {
    fontSize: SIZES.medium,
    fontFamily: FONT.regular,
    //fontWeight: '200',
    //color: COLORS({opacity:1}).primary,
  },
  propContainer: {
    flex: 1,
    paddingVertical: SIZES.xxSmall,
    marginHorizontal: SIZES.xLarge,
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
    padding: SIZES.xxSmall,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: SIZES.large,
  },
  divider: {
    paddingHorizontal: SIZES.medium,
    paddingBottom: SIZES.xSmall,
    borderBottomWidth: 1,
    borderColor: COLORS({opacity:0.7}).primary,
    marginBottom: SIZES.xSmall,
    marginHorizontal: SIZES.xLarge,
  },
});

export default RecipeCard