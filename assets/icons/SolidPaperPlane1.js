import PropTypes from "prop-types";
import React from "react";
import { Svg, G, Path, Defs, Rect, ClipPath } from 'react-native-svg';


export const SolidPaperPlane1 = ({ color = "#2A45A6" }) => {
  return (
    <Svg
      fill="none"
      height="17"
      viewBox="0 0 16 17"
      width="16"
    >
      <Path
        className="path"
        d="M13.7284 1.91743L1.66052 8.87957C1.18926 9.15035 1.24915 9.80647 1.7178 10.0043L4.48547 11.1656L11.9657 4.57315C12.1089 4.44557 12.312 4.64084 12.1897 4.78925L5.91748 12.4309V14.5269C5.91748 15.1413 6.65952 15.3835 7.02403 14.9383L8.67734 12.9256L11.9215 14.2847C12.2912 14.441 12.713 14.2092 12.7807 13.8109L14.6553 2.56313C14.7438 2.0372 14.1788 1.65707 13.7284 1.91743Z"
        fill={color}
      />
    </Svg>
  );
};

SolidPaperPlane1.propTypes = {
  color: PropTypes.string,
};