const COLORS = ({ theme = 1 }) => {
  if (theme == 1) {
    return {
      primary: `rgba(35, 73, 146, 1)`, //`rgba(34, 159, 208, ${opacity})`,
      secondary: `rgba(79, 129, 222, 1)`,
      tertiary: `rgba(125, 170, 255, 1)`,
      grey: `rgba(181, 181, 181, 1)`,
      lightGrey: `rgba(193, 192, 200, 1)`,

      white: `rgba(255, 255, 255, 1)`,
      lightWhite: `rgba(250, 250, 250, 1)`,
    }
  } else if (theme == 2) {
    return {
      primary: `rgba(43, 96, 197, 1)`,
      secondary: `rgba(13, 6, 48, 1)`,
      shadow: `rgba(13, 6, 48, 1)`,

      lavendar: `rgba(164, 176, 245, 1)`,
      yellow: `rgba(241, 200, 131, 1)`,
      lightGreen: `rgba(128, 173, 173, 1)`,
      lightRed: `rgba(236, 134, 134, 1)`,
      lightBlue: `rgba(125, 170, 255, 1)`,
      grey: `rgba(181, 181, 181, 1)`,
      lightGrey: `rgba(193, 192, 200, 1)`,

      ///lightWhite: `rgba(243, 244, 248, ${opacity})`,
      white: `rgba(255, 255, 255, 1)`,
      lightWhite: `rgba(250, 250, 250, 1)`,
    }
  } else {
    return {
      primary: `rgba(43, 96, 197, 1)`,
      secondary: `rgba(13, 6, 48, 1)`,
      shadow: `rgba(13, 6, 48, 1)`,
    }
  }
};
  
const FONT = {
  regular: "DMRegular",
  medium: "DMMedium",
  bold: "DMBold",
};

const textSIZES = {
  tiny: 2,
  xxSmall: 4,
  xSmall: 10,
  small: 16,
  medium: 20,
  large: 24,
  xLarge: 28,
  xxLarge: 32,
};

const viewSIZES = {
  xxSmall: 50,
  xSmall: 75,
  small: 100,
  medium: 150,
  large: 200,
  xLarge: 300,
  xxLarge: 500,
};

const SHADOWS = {
  xSmall: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 2,
  },
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

export { COLORS, FONT, SHADOWS, textSIZES, viewSIZES };