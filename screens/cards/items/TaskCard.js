import { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Image,
        StyleSheet, Animated, FlatList } from 'react-native';

import { COLORS, SHADOWS, FONT, SIZES } from "../../../constants";
import { ExpandableView, Spacer } from '../../../utils';
import { taskProperties } from "../PropertyCards";
import Layout from "../../../_layout";
import { Ionicons } from "@expo/vector-icons";

const TaskCard = () => {

  const [isExpanded, setIsExpanded] = useState(false);

  return (
    
    <View style={styles.infoContainer}>
     
      <TouchableOpacity
        onPress={() => {
            setIsExpanded(!isExpanded);
          }}
      >
      <View>
        <Text style={styles.label}>
          <Ionicons name={"information-circle-outline"} size={25} color={"#80adad"}/> Properties
        </Text>
        <ExpandableView expanded={isExpanded} view={taskProperties} vh={300}/>
      </View>
      </TouchableOpacity>
      
      <Spacer size={20} />

      <View style={styles.infoContainer}>
        <Text style={styles.label}>
          <Ionicons name={"square-outline"} size={20} color={"#80adad"}/> Checklist:
        </Text>
       {/* <FlatList 
          data={[1,2,3,4,5]}
          renderItem={({item}) => (
          <Text>{item}</Text>
          )}
          keyExtractor={() => {}}
          contentContainerStyle={{ columnGap: SIZES.medium }}
        /> */}
      </View>
    
     </View>
  )
};

const styles = StyleSheet.create({
infoContainer: {
  backgroundColor: COLORS.lightWhite,
  borderRadius: SIZES.medium/2,
},
label:{
  fontSize: SIZES.medium,
  fontFamily: FONT.regular,
  color: "#B3AEC6",
  margin: SIZES.xSmall,
  flexDirection: "row",
  justifyContent: "center",
},
});

export default TaskCard