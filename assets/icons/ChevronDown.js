import React from "react";
import { Svg, Path } from 'react-native-svg';

export const ChevronDown = () => {
  return (
    <Svg
      //className={`icon-font-awesome-free-solid-c-chevron-down ${className}`}
      fill="none"
      height="17"
      viewBox="0 0 16 17"
      width="16"
      xmlns="http://www.w3.org/2000/svg"
    >
      <Path
        className="path"
        d="M7.48185 12.3312L1.54798 6.39727C1.2618 6.11108 1.2618 5.6471 1.54798 5.36095L2.24007 4.66886C2.52577 4.38316 2.9888 4.38261 3.27517 4.66763L8.00003 9.37035L12.7248 4.66763C13.0112 4.38261 13.4743 4.38316 13.7599 4.66886L14.452 5.36095C14.7382 5.64713 14.7382 6.11111 14.452 6.39727L8.5182 12.3312C8.23202 12.6173 7.76804 12.6173 7.48185 12.3312Z"
        fill="#0C41FF"
      />
    </Svg>
  );
};