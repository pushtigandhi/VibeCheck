import PropTypes from "prop-types";
import React from "react";
import { TypeButtonBoldWrapper } from "./TypeButtonBoldWrapper";
import { View, TouchableOpacity, StyleSheet, Text, TextInput } from 'react-native';

export const EventTypes = ({
  size,
  description,
  orientation,
  colour,
  pastel,
  className,
  typeButtonBoldWrapperTypeButtonBoldClassName,
  typeButtonBoldWrapperText = "Event Name",
  typeButtonBoldWrapperDivClassName,
  typeButtonBoldWrapperTypeButtonBoldClassNameOverride,
  typeButtonBoldWrapperText1 = "08:00",
}) => {
  return (
    <View
      style={[
        styles.eventTypes,
        styles.color,
      ]}
      className={`event-types size-${size} description-${description} ${orientation} pastel-${pastel} ${colour} ${className}`}
    >
      {size === "default" && !description && <View className="bell" />}

      {(description || size === "small") && (
        <View className="name-time-container">
          <View className="name-container">
            {size === "default" && (
              <>
                <View className="bell-2" />
                <TypeButtonBoldWrapper
                  bold
                  className="typography-instance"
                  divClassName={`${
                    pastel && colour === "green"
                      ? "class"
                      : pastel && colour === "red"
                      ? "class-2"
                      : colour === "amber"
                      ? "class-3"
                      : pastel && colour === "purple"
                      ? "class-4"
                      : pastel && colour === "blue"
                      ? "class-5"
                      : "class-6"
                  }`}
                  text="Event Name"
                  type="body"
                />
              </>
            )}
          </View>
          <TypeButtonBoldWrapper
            bold={size === "small" ? true : undefined}
            className={typeButtonBoldWrapperTypeButtonBoldClassName}
            divClassName={`${
              pastel && description && colour === "green"
                ? "class"
                : pastel && colour === "red" && description
                ? "class-2"
                : size === "default" && colour === "amber"
                ? "class-3"
                : pastel && colour === "purple" && description
                ? "class-4"
                : pastel && colour === "blue" && description
                ? "class-5"
                : pastel && !description && colour === "green"
                ? "class-7"
                : pastel && colour === "red" && !description
                ? "class-8"
                : !pastel && !description && colour === "green"
                ? "class-9"
                : !pastel && !description && colour === "blue"
                ? "class-10"
                : !pastel && colour === "purple" && !description
                ? "class-11"
                : colour === "amber" && size === "small"
                ? "class-12"
                : pastel && colour === "purple" && !description
                ? "class-13"
                : pastel && !description && colour === "blue"
                ? "class-14"
                : !pastel && colour === "red" && !description
                ? "class-15"
                : "class-6"
            }`}
            text={typeButtonBoldWrapperText}
            type={size === "small" ? "small" : "body"}
          />
        </View>
      )}

      <TypeButtonBoldWrapper
        bold={description || size === "small" ? false : true}
        className={`${
          orientation === "vertical" && size === "default" && !description
            ? "class-24"
            : description || size === "small"
            ? typeButtonBoldWrapperTypeButtonBoldClassNameOverride
            : "class-25"
        }`}
        divClassName={`${
          pastel && !description && size === "default" && orientation === "horizontal" && colour === "green"
            ? "class-16"
            : orientation === "vertical" && pastel && !description && size === "default" && colour === "green"
            ? "class"
            : pastel && !description && colour === "red" && size === "default" && orientation === "horizontal"
            ? "class-17"
            : orientation === "vertical" && pastel && !description && colour === "red" && size === "default"
            ? "class-2"
            : (colour === "blue" && !description && orientation === "vertical" && !pastel && size === "default") ||
              (colour === "green" && !description && orientation === "vertical" && !pastel && size === "default") ||
              (colour === "purple" && !description && orientation === "vertical" && !pastel && size === "default")
            ? "class-6"
            : size === "default" && orientation === "horizontal" && colour === "amber" && !description
            ? "class-18"
            : orientation === "vertical" && size === "default" && colour === "amber" && !description
            ? "class-3"
            : pastel && colour === "purple" && !description && size === "default" && orientation === "horizontal"
            ? "class-19"
            : orientation === "vertical" && pastel && colour === "purple" && !description && size === "default"
            ? "class-4"
            : pastel && colour === "blue" && !description && size === "default" && orientation === "horizontal"
            ? "class-20"
            : orientation === "vertical" && pastel && colour === "blue" && !description && size === "default"
            ? "class-5"
            : !pastel && !description && colour === "red" && size === "default" && orientation === "horizontal"
            ? "class-21"
            : orientation === "vertical" && !pastel && !description && colour === "red" && size === "default"
            ? "class-22"
            : description || size === "small"
            ? typeButtonBoldWrapperDivClassName
            : "class-23"
        }`}
        text={description || size === "small" ? typeButtonBoldWrapperText1 : "Event Name"}
        type="body"
      />
      {size === "default" && !description && (
        <TypeButtonBoldWrapper
          bold={false}
          className="typography-instance"
          divClassName={`${
            pastel && colour === "green"
              ? "class"
              : pastel && colour === "red"
              ? "class-2"
              : colour === "amber"
              ? "class-3"
              : pastel && colour === "purple"
              ? "class-4"
              : pastel && colour === "blue"
              ? "class-5"
              : !pastel && colour === "red"
              ? "class-22"
              : "class-6"
          }`}
          text="08:00"
          type="body"
        />
      )}
    </View>
  );
};

EventTypes.propTypes = {
  size: PropTypes.oneOf(["small", "default"]),
  description: PropTypes.bool,
  orientation: PropTypes.oneOf(["vertical", "horizontal"]),
  colour: PropTypes.oneOf(["blue", "green", "amber", "red", "purple"]),
  pastel: PropTypes.bool,
  typeButtonBoldWrapperText: PropTypes.string,
  typeButtonBoldWrapperText1: PropTypes.string,
};

const styles = StyleSheet.create({
    eventTypes: {
      borderRadius: 3,
      display: 'flex',
      position: 'relative',
      width: 98,
    },
    bell: {
      backgroundPosition: '50% 50%',
      backgroundSize: 'cover',
      height: 10,
      position: 'relative',
      width: 10,
    },
    nameTimeContainer: {
      position: 'relative',
    },
    nameContainer: {
      position: 'relative',
    },
    bell2: {
      backgroundImage: 'url(https://c.animaapp.com/tYPXz0Sm/img/bell-39@2x.png)',
      backgroundPosition: '50% 50%',
      backgroundSize: 'cover',
      height: 10,
      position: 'relative',
      width: 10,
    },
    class: {
      color: 'var(--dark-green)',
      fontSize: 10,
    },
    class2: {
      color: 'var(--dark-red)',
      fontSize: 10,
    },
    class3: {
      color: 'var(--dark-amber)',
      fontSize: 10,
    },
    class4: {
      color: 'var(--dark-purple)',
      fontSize: 10,
    },
    class5: {
      color: 'var(--dark-blue)',
      fontSize: 10,
    },
    class6: {
      color: 'var(--white)',
      fontSize: 10,
    },
    typographyInstance: {
      flex: 0,
    },
    class7: {
      color: 'var(--dark-green)',
    },
    class8: {
      color: 'var(--dark-red)',
    },
    class9: {
      color: 'var(--green-darker)',
    },
    class10: {
      color: 'var(--blue-darker)',
    },
    class11: {
      color: 'var(--purple-darker)',
    },
    class12: {
      color: 'var(--dark-amber)',
    },
    class13: {
      color: 'var(--dark-purple)',
    },
    class14: {
      color: 'var(--dark-blue)',
    },
    class15: {
      color: 'var(--red-darker)',
    },
    class16: {
      color: 'var(--dark-green)',
      fontSize: 10,
      marginRight: -15,
    },
    class17: {
      color: 'var(--dark-red)',
      fontSize: 10,
      marginRight: -15,
    },
    class18: {
      color: 'var(--dark-amber)',
      fontSize: 10,
      marginRight: -15,
    },
    class19: {
      color: 'var(--dark-purple)',
      fontSize: 10,
      marginRight: -15,
    },
    class20: {
      color: 'var(--dark-blue)',
      fontSize: 10,
      marginRight: -15,
    },
    class21: {
      color: '#ffffff',
      fontSize: 10,
      marginRight: -15,
    },
    class22: {
      color: '#ffffff',
      fontSize: 10,
    },
    class23: {
      color: 'var(--white)',
      fontSize: 10,
      marginRight: -15,
    },
    class24: {
      alignSelf: 'stretch',
      display: 'flex',
      flex: 0,
      width: '100%',
    },
    class25: {
      display: 'flex',
      flex: 1,
      flexGrow: 1,
    },
    sizeSmall: {
      alignItems: 'flex-start',
      padding: 2,
    },
    descriptionTrue: {
      alignItems: 'flex-start',
      flexDirection: 'column',
      gap: 4,
    },
    sizeDefault: {
      border: 1,
      borderColor: 'black',
      padding: 4,
    },
    vertical: {
      alignItems: 'flex-start',
      flexDirection: 'column',
    },
    sizeSmallVertical: {
      gap: 4,
    },
    sizeDefaultDescriptionFalse: {
      gap: 2,
    },
    descriptionTruePastelTrueGreen: {
      backgroundColor: 'var(--pastel-green)',
      borderColor: 'var(--pastel-green-darker)',
    },
    sizeDefaultAmberPastelTrue: {
      backgroundColor: 'var(--amber-pastel)',
      borderColor: 'var(--amber-pastel-darker)',
    },
    redHorizontalSizeSmall: {
      justifyContent: 'space-between',
    },
    purpleSizeDefaultPastelFalse: {
      backgroundColor: 'var(--purple)',
      borderColor: 'var(--purple-darker)',
    },
    sizeDefaultHorizontalDescriptionFalse: {
      alignItems: 'center',
    },
    sizeDefaultPastelTrueRed: {
      backgroundColor: 'var(--pastel-red)',
      borderColor: 'var(--pastel-red-darker)',
    },
    purpleHorizontalSizeSmall: {
      justifyContent: 'space-between',
    },
    pastelFalseSizeDefaultAmber: {
      backgroundColor: 'var(--amber)',
      borderColor: 'var(--amber-darker)',
    },
    purpleSizeDefaultPastelTrue: {
      backgroundColor: 'var(--purple-pastel)',
      borderColor: 'var(--purple-pastel-darker)',
    },
    amberHorizontalSizeSmall: {
      justifyContent: 'space-between',
    },
    pastelTrueSizeSmallGreen: {
      gap: 4,
    },
    sizeDefaultPastelTrueBlue: {
      backgroundColor: 'var(--blue-pastel)',
      borderColor: 'var(--blue-pastel-darker)',
    },
    pastelFalseSizeDefaultRed: {
      backgroundColor: 'var(--red)',
      borderColor: 'var(--red-darker)',
    },
    pastelFalseSizeDefaultGreen: {
      backgroundColor: 'var(--green)',
      borderColor: 'var(--green-darker)',
    },
    pastelFalseSizeDefaultBlue: {
      backgroundColor: 'var(--blue)',
      borderColor: 'var(--blue-darker)',
    },
    horizontalSizeSmallBlue: {
      justifyContent: 'space-between',
    },
    pastelFalseHorizontalSizeSmall: {
      justifyContent: 'space-between',
    },
    sizeDefaultPastelTrueVerticalDescriptionFalse: {
      justifyContent: 'center',
    },
    sizeDefaultPastelTrueGreenDescriptionFalse: {
      backgroundColor: '#bdffdb',
      borderColor: '#8edbb2',
    },
    horizontalBell: {
      backgroundImage: 'url(https://c.animaapp.com/tYPXz0Sm/img/bell-39@2x.png)',
    },
    verticalBell: {
      backgroundImage: 'url(https://c.animaapp.com/tYPXz0Sm/img/bell-38@2x.png)',
    },
    blueNameTimeContainer: {
      flex: 0,
    },
    sizeSmallNameTimeContainer: {
      gap: 2,
    },
    redNameTimeContainer: {
      flex: 0,
    },
    descriptionTrueNameTimeContainer: {
      alignSelf: 'stretch',
      display: 'flex',
      flex: 0,
      width: '100%',
    },
    pastelFalseNameTimeContainer: {
      flex: 0,
    },
    horizontalNameTimeContainer: {
      alignItems: 'center',
    },
    amberNameTimeContainer: {
      flex: 0,
    },
    verticalNameTimeContainer: {
      alignItems: 'flex-start',
      flex: 0,
      flexDirection: 'column',
    },
    purpleNameTimeContainer: {
      flex: 0,
    },
    amberDescriptionFalseNameTimeContainer: {
      display: 'inline-flex',
    },
    pastelTrueGreenNameTimeContainer: {
      display: 'flex',
    },
    descriptionTrueHorizontalNameTimeContainer: {
      justifyContent: 'space-between',
    },
    purpleDescriptionFalseNameTimeContainer: {
      display: 'inline-flex',
    },
    blueDescriptionFalseNameTimeContainer: {
      display: 'inline-flex',
    },
    pastelFalseDescriptionFalseNameTimeContainer: {
      display: 'inline-flex',
      justifyContent: 'center',
    },
    redDescriptionFalseNameTimeContainer: {
      display: 'inline-flex',
    },
    amberHorizontalDescriptionFalseNameTimeContainer: {
      justifyContent: 'center',
    },
    purpleHorizontalDescriptionFalseNameTimeContainer: {
      justifyContent: 'center',
    },
    redHorizontalDescriptionFalseNameTimeContainer: {
      justifyContent: 'center',
    },
    verticalGreenDescriptionFalseNameTimeContainer: {
      justifyContent: 'center',
    },
    horizontalBlueDescriptionFalseNameTimeContainer: {
      justifyContent: 'center',
    },
    pastelTrueVerticalGreenNameTimeContainer: {
      alignSelf: 'stretch',
      width: '100%',
    },
    pastelTrueHorizontalGreenDescriptionFalseNameTimeContainer: {
      flex: 1,
      flexGrow: 1,
    },
    sizeSmallNameContainer: {
      borderRadius: 4,
      height: 8,
      width: 8,
    },
    sizeDefaultNameContainer: {
      alignItems: 'center',
      display: 'inline-flex',
      flex: 0,
      gap: 4,
    },
    blueSizeSmallNameContainer: {
      backgroundColor: 'var(--blue)',
    },
    purplePastelTrueDescriptionFalseNameContainer: {
      backgroundColor: 'var(--purple-pastel-darker)',
    },
    purplePastelFalseDescriptionFalseNameContainer: {
      backgroundColor: 'var(--purple)',
    },
    amberPastelTrueDescriptionFalseNameContainer: {
      backgroundColor: 'var(--amber-pastel-darker)',
    },
    pastelFalseGreenDescriptionFalseNameContainer: {
      backgroundColor: 'var(--green)',
    },
    pastelTrueGreenDescriptionFalseNameContainer: {
      backgroundColor: '#8fdcb2',
    },
    redPastelTrueDescriptionFalseNameContainer: {
      backgroundColor: 'var(--pastel-red-darker)',
    },
    pastelFalseAmberDescriptionFalseNameContainer: {
      backgroundColor: 'var(--amber)',
    },
    pastelFalseDescriptionTrueRedNameContainer: {
      justifyContent: 'center',
    },
    pastelFalseRedDescriptionFalseNameContainer: {
      backgroundColor: 'var(--red-darker)',
    },
  });