import { View, FlatList } from "react-native";
import { StyleSheet } from "react-native";
import DirectoryCard from "./cards/DirectoryCard";
import { COLORS, FONT, SIZES } from "../constants";

export default function Directory () {
    return (
       <View style={styles.container}>

    <View style={styles.cardsContainer}>
    <FlatList 
          data={[1,2,3,4,5, 6, 7, 8]}
          renderItem={() => (
            <DirectoryCard />
            )
          }
          keyExtractor={() => {}}
          contentContainerStyle={{ columnGap: SIZES.medium }}
          
        />
    </View>
    </View> 
    );
};
const styles = StyleSheet.create({
    container: {
        width: "100%",
      },
    cardsContainer: {
        marginTop: SIZES.medium,
      },
});