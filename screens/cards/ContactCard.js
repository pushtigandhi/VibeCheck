import { Modal, View, Text, TouchableOpacity, Image, ScrollView, StyleSheet } from "react-native";
import { COLORS, FONT, textSIZES } from "../../constants";
import { Ionicons } from "@expo/vector-icons";

const defaultImage = require("../../assets/icon.png");

export default function ContactCard ({contact, visible, onClose}) {

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <View style={styles.modalHeader}>
            <View style={styles.modalAvatarContainer}>
              <Image 
                source={defaultImage}
                resizeMode='contain'
                style={styles.modalAvatar}
              />
              <Text style={styles.modalName}>{contact?.name || "Name"}</Text>
              {contact?.handle && (
                <Text style={styles.modalHandle}>@{contact.handle}</Text>
              )}
            </View>
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <Ionicons name="close" size={textSIZES.large} style={styles.closeIcon} />
            </TouchableOpacity>
          </View>
          <ScrollView style={styles.modalScrollView}>
            {contact?.company && (
              <View style={styles.property}>
                <Text style={styles.label}>Company</Text>
                <Text style={styles.value}>{contact.company}</Text>
              </View>
            )}
            {contact?.phoneNumber && (
              <View style={styles.property}>
                <Text style={styles.label}>Phone</Text>
                <Text style={styles.value}>{contact.phoneNumber}</Text>
              </View>
            )}
            {contact?.birthday && (
              <View style={styles.property}>
                <Text style={styles.label}>Birthday</Text>
                <Text style={styles.value}>{contact.birthday}</Text>
              </View>
            )}
            {contact?.address && (
              <View style={styles.property}>
                <Text style={styles.label}>Address</Text>
                <Text style={styles.value}>{contact.address}</Text>
              </View>
            )}
            {contact?.notes && (
              <View style={styles.property}>
                <Text style={styles.label}>Latest Update</Text>
                <Text style={styles.value}>{contact.notes}</Text>
              </View>
            )}
          </ScrollView>
        </View>
      </View>
    </Modal>
  )
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: COLORS({opacity:1}).white,
    borderRadius: textSIZES.small,
    padding: textSIZES.small,
    margin: textSIZES.xSmall,
    width: '90%',
    maxHeight: '80%',
    shadowColor: COLORS({opacity:1}).black,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 8,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: textSIZES.small,
  },
  modalAvatarContainer: {
    alignItems: 'center',
    flex: 1,
  },
  modalAvatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 3,
    borderColor: COLORS({opacity:0.3}).primary,
    backgroundColor: COLORS({opacity:0.1}).primary,
    marginBottom: textSIZES.xSmall,
  },
  modalName: {
    fontSize: textSIZES.large,
    fontFamily: FONT.medium,
    color: COLORS({opacity:1}).primary,
    textAlign: 'center',
    marginBottom: textSIZES.tiny,
  },
  modalHandle: {
    fontSize: textSIZES.small,
    color: COLORS({opacity:0.7}).primary,
    textAlign: 'center',
  },
  modalScrollView: {
    maxHeight: 400,
  },
  property: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: textSIZES.small,
  },
  label: {
    fontSize: textSIZES.small,
    fontFamily: FONT.medium,
    color: COLORS({opacity:0.7}).primary,
  },
  value: {
    fontSize: textSIZES.small,
    fontFamily: FONT.regular,
    color: COLORS({opacity:1}).primary,
  },
});