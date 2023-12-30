import { View, FlatList } from "react-native";
import { StyleSheet } from "react-native";
import ContactCard from "./cards/ContactCard";
import { COLORS, FONT, SIZES } from "../constants";

export default function ContactList () {
    return (
        <View style={styles.container}>
    {/* <View style={styles.header}>
      <Text style={styles.headerTitle}>Popular jobs</Text>
      <TouchableOpacity><Text style={styles.headerBtn}>Show All</Text></TouchableOpacity>
    </View> */}

    <View style={styles.cardsContainer}>
    <FlatList 
          data={[1,2,3,4,5, 6, 7, 8]}
          renderItem={() => (
            <ContactCard />
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