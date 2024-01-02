import PropTypes from "prop-types";
import React from "react";
import { useReducer } from "react";
//import { IconFontAwesomeFreeSolidSSearch4 } from "../../icons/IconFontAwesomeFreeSolidSSearch4";
//import "./style.css";
import { View, TouchableOpacity, StyleSheet, Text, TextInput } from 'react-native';
import { SolidClose } from "../assets/icons/SolidClose";
import { SolidSearch } from "../assets/icons/SolidSearch";


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
    <View
      //style={`search ${state.property1} ${className}`}
      onClick={() => {
        dispatch("click");
      }}
      onMouseLeave={() => {
        dispatch("mouse_leave");
      }}
    >
      {["enter-search", "string"].includes(state.property1) && (
        <TextInput
          style={styles.input}
          placeholder={placeholderText}
          keyboardType={inputType}
        />
      )}

      {["default", "enter-search"].includes(state.property1) && (
        <SolidSearch
          //className="instance-node"
          color={state.property1 === "default" ? searchButtonColor : "#6A778B"}
        />
      )}

      {state.property1 === "string" && <SolidClose />}
    </View>
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