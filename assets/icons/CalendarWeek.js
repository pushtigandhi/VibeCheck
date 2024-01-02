import PropTypes from "prop-types";
import React from "react";
import { Svg, Path } from 'react-native-svg';

export const CalendarWeek = ({ color = "#0C41FF", className }) => {
  return (
    <Svg
      className={`icon-font-awesome-free-solid-c-calendar-week-2 ${className}`}
      fill="none"
      height="16"
      viewBox="0 0 24 24"
      width="16"
    >
      <Path
        className="path"
        d="M3.25 20.125C3.25 21.1602 4.08984 22 5.125 22H18.875C19.9102 22 20.75 21.1602 20.75 20.125V9.5H3.25V20.125ZM5.75 12.625C5.75 12.2812 6.03125 12 6.375 12H17.625C17.9688 12 18.25 12.2812 18.25 12.625V15.125C18.25 15.4688 17.9688 15.75 17.625 15.75H6.375C6.03125 15.75 5.75 15.4688 5.75 15.125V12.625ZM18.875 4.5H17V2.625C17 2.28125 16.7188 2 16.375 2H15.125C14.7812 2 14.5 2.28125 14.5 2.625V4.5H9.5V2.625C9.5 2.28125 9.21875 2 8.875 2H7.625C7.28125 2 7 2.28125 7 2.625V4.5H5.125C4.08984 4.5 3.25 5.33984 3.25 6.375V8.25H20.75V6.375C20.75 5.33984 19.9102 4.5 18.875 4.5Z"
        fill={color}
      />
    </Svg>
  );
};

CalendarWeek.propTypes = {
  color: PropTypes.string,
};
