import { View, Text, TextInput, TouchableOpacity, Image } from 'react-native';

//import styles from './popularjobcard.style';
import { StyleSheet } from "react-native";
import { COLORS, SHADOWS, FONT, SIZES } from "../../constants";
//import { checkImageURL } from '../../../../../utils';

const ContactCard = () => {
  return (
    <TouchableOpacity
      style={styles.container} onPress={() => {}}
    >
      <TouchableOpacity style={styles.photoContainer}>
        <Image 
          source={{ uri: 'https://t4.ftcdn.net/jpg/05/05/61/73/360_F_505617309_NN1CW7diNmGXJfMicpY9eXHKV4sqzO5H.jpg'}}
          resizeMode='contain'
          style={styles.contactImage}
        />
      </TouchableOpacity>
      
      <View style={styles.textContainer}>
        <Text style={styles.contactName} numberOfLines={1}> Name </Text>
        <Text style={styles.jobType}>Company</Text>
      </View>
      
      <View style={styles.infoContainer}>
        <Text style={styles.label} numberOfLines={1}>
          Phone:
        </Text>
        <TextInput style={styles.detail}></TextInput>
      </View>

    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "space-between",
        alignItems: "center",
        flexDirection: "row",
        padding: SIZES.medium,
        borderRadius: SIZES.xLarge,
        backgroundColor: "#FFF",
        ...SHADOWS.medium,
        shadowColor: COLORS.white,
        marginBottom: SIZES.xSmall,
      },
    photoContainer: {
        width: 50,
        height: 50,
        backgroundColor: COLORS.white,
        borderRadius: SIZES.medium,
        justifyContent: "center",
        alignItems: "center",
  },
  contactImage: {
    width: "70%",
    height: "70%",
  },
  companyName: {
    fontSize: SIZES.medium,
    fontFamily: FONT.regular,
    color: "#B3AEC6",
    marginTop: SIZES.small / 1.5,
  },
  infoContainer: {
    flex: 1,
    marginTop: SIZES.large,
  },
  contactName: {
    fontSize: SIZES.medium,
    fontFamily: "DMBold",
    color: COLORS.primary,
  },
  location: {
    fontSize: SIZES.medium - 2,
    fontFamily: FONT.regular,
    color: "#B3AEC6",
  },
  label:{
    fontSize: SIZES.medium,
    fontFamily: FONT.regular,
    color: "#B3AEC6",
    marginTop: SIZES.small / 1.5,
  },
  detail: {
    lineHeight: 20,
    padding: 10,
    fontSize: 20,
    color: "#B3AEC6",
  },
  textContainer: {
    flex: 1,
    marginHorizontal: SIZES.medium,
  },
  jobType: {
    fontSize: SIZES.small + 2,
    fontFamily: "DMRegular",
    color: COLORS.gray,
    marginTop: 3,
    textTransform: "capitalize",
  },
});

export default ContactCard