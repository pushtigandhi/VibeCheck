const COLORS = ({ opacity = 1 }) => ({
    primary: `rgba(34, 159, 208, ${opacity})`,
    secondary: `rgba(102, 187, 220, ${opacity})`,
    tertiary: `rgba(170, 214, 231, ${opacity})`,

    navy: `rgba(43, 96, 197, ${opacity})`,
    darkBlue: `rgba(56, 78, 119, ${opacity})`,
    indigo: `rgba(13, 6, 48, ${opacity})`,

    lavendar: `rgba(164, 176, 245, ${opacity})`,
    yellow: `rgba(241, 200, 131, ${opacity})`,
    lightGreen: `rgba(128, 173, 173, ${opacity})`,
    lightRed: `rgba(236, 134, 134, ${opacity})`,
    
    grey: `rgba(181, 181, 181, ${opacity})`,
    lightGrey: `rgba(193, 192, 200, ${opacity})`,
  
    white: `rgba(243, 244, 248, ${opacity})`,
    lightWhite: `rgba(250, 250, 252, ${opacity})`,
  });
  
  const FONT = {
    regular: "DMRegular",
    medium: "DMMedium",
    bold: "DMBold",
  };
  
  const SIZES = {
    xxSmall: 5,
    xSmall: 10,
    small: 12,
    medium: 16,
    large: 20,
    xLarge: 24,
    xxLarge: 32,
  };
  
  const SHADOWS = {
    small: {
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 2,
    },
    medium: {
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 5.84,
      elevation: 5,
    },
  };
  
  export { COLORS, FONT, SIZES, SHADOWS };
  