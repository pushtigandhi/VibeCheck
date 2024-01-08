import PropTypes from "prop-types";
import React from "react";
import { useReducer } from "react";
//import { IconFontAwesomeFreeSolidSSearch4 } from "../../icons/IconFontAwesomeFreeSolidSSearch4";
//import "./style.css";
import { View, TouchableOpacity, StyleSheet, Text, TextInput } from 'react-native';
import { SolidClose } from "../assets/icons/SolidClose";
import { SolidSearch } from "../assets/icons/SolidSearch";
import { COLORS } from "../constants";
import { Ionicons } from "@expo/vector-icons";

export const Search = ({
  property1,
  searchButtonColor = "#6A778B",
  inputType = "text",
}) => {
  const [state, dispatch] = useReducer(reducer, {
    property1: property1 || "default",
  });


  const placeholderText =
    state.property1 === 'enter-search'
      ? 'Enter Search'
      : state.property1 === 'string'
      ? '1-2-1 Meeting'
      : undefined;

  return (
    <TouchableOpacity
      //style={`search ${state.property1} ${className}`}
      onClick={() => {
        dispatch("click");
      }}

      onMouseLeave={() => {
        dispatch("mouse_leave");
      }}
      
      style={styles.root}
    >
      {["enter-search", "string"].includes(state.property1) && (
        <TextInput
          style={styles.input}
          placeholder={placeholderText}
          keyboardType={inputType}
        />
      )}
      
      {/* <SolidSearch
          //className="instance-node"
          color={state.property1 === "default" ? searchButtonColor : "#6A778B"}
        /> */}

      {["default", "enter-search"].includes(state.property1) && (
        <Ionicons name={"search-outline"} size={20} style={styles.icon} />
      )}

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
  iconFontAwesomeFreeSolidSSearch4Color: PropTypes.string,
  inputType: PropTypes.string,
};

const styles = StyleSheet.create({
  root: {
    backgroundColor: COLORS({opacity:1}).tertiary,
    height: 30,
    weight: 30,
    borderRadius: '100%',
    alignContent: 'center',
    justifyContent: 'center',
  },
  icon: {
    color: COLORS({opacity:1}).white,
    margin: 5,
    fontWeight: '500',
  },
});