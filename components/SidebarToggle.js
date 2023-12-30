import PropTypes from "prop-types";
import React from "react";
import { SolidBars } from "../assets/icons/SolidBars";
import { Button } from "./Button";
import { View, TouchableOpacity, StyleSheet, Text, TextInput } from 'react-native';
//import "./style.css";

export const SidebarToggle = ({
    active,
    //className,
    buttonIcon = <SolidBars color="#333333" />,
  }) => {
    return (
      <View 
      //className={`sidebar-toggle ${className}`}
      >
        <Button 
            property1="tertiary"
            icon={true}
            hover={false}
            text={false}
            //disabled={false}
            //focused={false}
            className={`${active ? "class" : "class-2"}`}
            override={buttonIcon}
        />
      </View>
    );
  };
  
  SidebarToggle.propTypes = {
    active: PropTypes.bool,
  };