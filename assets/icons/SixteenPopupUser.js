import PropTypes from "prop-types";
import React from "react";
import { Svg, G, Path, Defs, Rect, ClipPath } from 'react-native-svg';


export const SixteenPopupUser = ({ color = "black"}) => {
  return (
    <Svg
      fill="none"
      height="30"
      viewBox="0 0 34 35"
      width="30"
      xmlns="http://www.w3.org/2000/svg"
    >
      <G className="g" clipPath="url(#clip0_4_43)">
        <Path
          className="path"
          clipRule="evenodd"
          d="M8.30128 8.75C8.30128 3.9375 12.0369 0 16.6026 0C23.8662 0 27.6018 9.40625 22.621 15.0938C17.2252 20.3438 8.30128 16.4062 8.30128 8.75ZM33.2051 30.4062V35H0V30.8438C0 26.0312 7.26362 22.0938 16.6026 22.0938C25.9415 22.0938 33.2051 25.8125 33.2051 30.4062Z"
          fill={color}
          fillRule="evenodd"
        />
      </G>
      <Defs className="defs">
        <ClipPath className="clip-path" id="clip0_4_43">
          <Rect className="rect" fill="white" height="35" width="33.2051" />
        </ClipPath>
      </Defs>
    </Svg>
  );
};

SixteenPopupUser.propTypes = {
  color: PropTypes.string,
};
