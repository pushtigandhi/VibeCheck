import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import { useReducer } from "react";
//import { IconFontAwesomeFreeSolidSSearch4 } from "../../icons/IconFontAwesomeFreeSolidSSearch4";
//import "./style.css";
import { View, TouchableOpacity, StyleSheet, Text, TextInput } from 'react-native';
import { SolidClose } from "../assets/icons/SolidClose";
import { COLORS, SIZES } from "../constants";
import { Ionicons } from "@expo/vector-icons";

export const Search = ({
  property1,
  searchButtonColor = "rgba(35, 73, 146, 0.5)",
  inputType = "text",
}) => {
  const [state, dispatch] = useReducer(reducer, {
    property1: property1 || "default",
  });

  const [expandSearchBar, setSearchBar] = useState(false);

  const placeholderText =
    state.property1 === 'enter-search'
      ? 'Enter Search'
      : state.property1 === 'string'
      ? '1-2-1 Meeting'
      : undefined;

  const toggleExpandSearchBar = () => {
    setSearchBar(!expandSearchBar);
  };

  return (
    <TouchableOpacity
      //style={`search ${state.property1} ${className}`}
      // onPress={() => {
      //   dispatch("click");
      // }}

      // onMouseLeave={() => {
      //   dispatch("mouse_leave");
      // }}

      onPress={() => {
        toggleExpandSearchBar();
      }}
      
      style={[styles.root]}
    >
      {/* {["enter-search", "string"].includes(state.property1) && ( */}
      <Ionicons name={"search-outline"} size={20} style={styles.icon} />

      {expandSearchBar && (
        <TextInput
          style={styles.input}
          placeholder={placeholderText}
        />
      )}
      
      {/* <SolidSearch
          //className="instance-node"
          color={state.property1 === "default" ? searchButtonColor : "#6A778B"}
        /> 

      {["default", "enter-search"].includes(state.property1) && (
        <Ionicons name={"search-outline"} size={20} style={styles.icon} />
      )}*/}

      {state.property1 === "string" && <SolidClose />}
    </TouchableOpacity>
  );
};

function reducer(state, action) {
  if (state.property1 === "default") {
    switch (action) {
      case "click":
        return {
          property1: "enter-search",
        };
    }
  }

  if (state.property1 === "enter-search") {
    switch (action) {
      case "click":
        return {
          property1: "string",
        };

      case "mouse_leave":
        return {
          property1: "default",
        };
    }
  }

  if (state.property1 === "string") {
    switch (action) {
      case "click":
        return {
          property1: "default",
        };
    }
  }

  return state;
}

Search.propTypes = {
  property1: PropTypes.oneOf(["enter-search", "string", "default"]),
  inputType: PropTypes.string,
};

const styles = StyleSheet.create({
  root: {
    backgroundColor: COLORS({opacity:0.8}).primary,
    height: SIZES.xxLarge,
    borderRadius: '100%',
    alignContent: 'center',
    justifyContent: 'center',
    flexDirection: "row",
  },
  default: {
    width: SIZES.xxLarge,
  },
  input: {
    width: SIZES.xxLarge*3,
  },
  icon: {
    color: COLORS({opacity:1}).white,
    margin: SIZES.xxSmall,
    fontWeight: '500',
  },
});