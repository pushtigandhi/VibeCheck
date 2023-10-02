import React from 'react';
import {View} from 'react-native';
import PropTypes from 'prop-types';


export const checkImageURL = (url) => {
    if (!url) return false
    else {
        const pattern = new RegExp('^https?:\\/\\/.+\\.(png|jpg|jpeg|bmp|gif|webp)$', 'i');
        return pattern.test(url);
    }
};

export const Spacer = ({horizontal, size}) => {
    const defaultValue = 'auto';
  
    return (
      <>
      <View
        style={{
          width: horizontal ? size : defaultValue,
          height: !horizontal ? size : defaultValue,
        }}
      />
      </>
    );
  };
  
  Spacer.propTypes = {
    size: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.string
    ]).isRequired,
    horizontal: PropTypes.bool,
  };
  
  Spacer.defaultProps = {
    horizontal: false,
  };