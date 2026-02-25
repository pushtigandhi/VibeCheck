/**
 * Jest Setup File for React Native Testing
 */

import 'react-native-gesture-handler/jestSetup';

// Mock react-native-reanimated
jest.mock('react-native-reanimated', () => {
  const Reanimated = require('react-native-reanimated/mock');
  Reanimated.default.call = () => {};
  return Reanimated;
});

// Mock @react-native-async-storage/async-storage
jest.mock('@react-native-async-storage/async-storage', () =>
  require('@react-native-async-storage/async-storage/jest/async-storage-mock')
);

// Mock react-native-calendars
jest.mock('react-native-calendars', () => ({
  Calendar: 'Calendar',
  LocaleConfig: {
    defaultLocale: 'en',
    locales: {
      en: {
        monthNames: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
        monthNamesShort: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        dayNames: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
        dayNamesShort: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
        today: 'Today'
      }
    }
  }
}));

// Mock react-native-dropdown-picker
jest.mock('react-native-dropdown-picker', () => ({
  default: 'DropdownPicker'
}));

// Mock react-native-element-dropdown
jest.mock('react-native-element-dropdown', () => ({
  default: 'ElementDropdown'
}));

// Mock react-native-phone-input
jest.mock('react-native-phone-input', () => ({
  default: 'PhoneInput'
}));

// Mock react-native-switch-selector
jest.mock('react-native-switch-selector', () => ({
  default: 'SwitchSelector'
}));

// Mock react-native-tab-view
jest.mock('react-native-tab-view', () => ({
  TabView: 'TabView',
  SceneMap: 'SceneMap',
  TabBar: 'TabBar'
}));

// Mock expo modules
jest.mock('expo', () => ({
  Linking: {
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    openURL: jest.fn(),
    canOpenURL: jest.fn(),
    getInitialURL: jest.fn()
  },
  Constants: {
    manifest: {},
    expoConfig: {}
  },
  Font: {
    loadAsync: jest.fn()
  },
  ImagePicker: {
    requestMediaLibraryPermissionsAsync: jest.fn(),
    launchImageLibraryAsync: jest.fn()
  },
  SplashScreen: {
    hideAsync: jest.fn(),
    preventAutoHideAsync: jest.fn()
  }
}));

// Mock @expo/vector-icons
jest.mock('@expo/vector-icons', () => ({
  Ionicons: 'Ionicons',
  MaterialIcons: 'MaterialIcons',
  FontAwesome: 'FontAwesome'
}));

// Mock react-navigation
jest.mock('@react-navigation/native', () => ({
  NavigationContainer: ({ children }) => children,
  useNavigation: () => ({
    navigate: jest.fn(),
    goBack: jest.fn(),
    reset: jest.fn(),
    setParams: jest.fn(),
    dispatch: jest.fn(),
    canGoBack: jest.fn(),
    isFocused: jest.fn(),
    addListener: jest.fn(),
    removeListener: jest.fn()
  }),
  useRoute: () => ({
    key: 'test',
    name: 'Test',
    params: {}
  }),
  useFocusEffect: jest.fn()
}));

jest.mock('@react-navigation/native-stack', () => ({
  createNativeStackNavigator: () => ({
    Navigator: ({ children }) => children,
    Screen: ({ children }) => children
  })
}));

// Mock API module
jest.mock('../API', () => ({
  doLogin: jest.fn(),
  doSignup: jest.fn(),
  doLogout: jest.fn(),
  GETme: jest.fn(),
  GETcontacts: jest.fn(),
  GETdirectory: jest.fn(),
  GETitems: jest.fn(),
  POSTitem: jest.fn(),
  PATCHitem: jest.fn(),
  DELETEitem: jest.fn(),
  fetchWithAuth: jest.fn(),
  fetchWithAuthJSON: jest.fn(),
  saveAuth: jest.fn(),
  removeAuth: jest.fn()
}));

// Mock AsyncStorage
jest.mock('@react-native-async-storage/async-storage', () => ({
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
  getAllKeys: jest.fn(),
  multiGet: jest.fn(),
  multiSet: jest.fn(),
  multiRemove: jest.fn()
}));

// Mock NetInfo
jest.mock('@react-native-community/netinfo', () => ({
  addEventListener: jest.fn(),
  fetch: jest.fn(() => Promise.resolve({
    isConnected: true,
    isInternetReachable: true,
    type: 'wifi'
  }))
}));

// Mock DateTimePicker
jest.mock('@react-native-community/datetimepicker', () => ({
  default: 'DateTimePicker'
}));

// Mock Slider
jest.mock('@react-native-community/slider', () => ({
  default: 'Slider'
}));

// Mock Picker
jest.mock('@react-native-picker/picker', () => ({
  Picker: 'Picker',
  PickerItem: 'PickerItem'
}));

// Mock Keyboard
jest.mock('react-native/Libraries/Components/Keyboard/Keyboard', () => ({
  dismiss: jest.fn(),
  addListener: jest.fn(),
  removeListener: jest.fn()
}));

// Mock Dimensions
jest.mock('react-native/Libraries/Utilities/Dimensions', () => ({
  get: jest.fn(() => ({ width: 375, height: 812 })),
  addEventListener: jest.fn(),
  removeEventListener: jest.fn()
}));

// Mock Platform
jest.mock('react-native/Libraries/Utilities/Platform', () => ({
  OS: 'ios',
  select: jest.fn((obj) => obj.ios || obj.default)
}));

// Mock Alert
jest.mock('react-native/Libraries/Alert/Alert', () => ({
  alert: jest.fn(),
  prompt: jest.fn()
}));

// Mock Linking
jest.mock('react-native/Libraries/Linking/Linking', () => ({
  openURL: jest.fn(),
  canOpenURL: jest.fn(),
  addEventListener: jest.fn(),
  removeEventListener: jest.fn()
}));

// Mock AppState
jest.mock('react-native/Libraries/AppState/AppState', () => ({
  currentState: 'active',
  addEventListener: jest.fn(),
  removeEventListener: jest.fn()
}));

// Mock StatusBar
jest.mock('react-native/Libraries/Components/StatusBar/StatusBar', () => ({
  setBarStyle: jest.fn(),
  setBackgroundColor: jest.fn(),
  setHidden: jest.fn()
}));

// Mock SafeAreaView
jest.mock('react-native-safe-area-context', () => ({
  SafeAreaProvider: ({ children }) => children,
  SafeAreaView: ({ children }) => children,
  useSafeAreaInsets: () => ({ top: 0, bottom: 0, left: 0, right: 0 })
}));

// Mock react-native-screens
jest.mock('react-native-screens', () => ({
  enableScreens: jest.fn(),
  screensEnabled: jest.fn(() => true)
}));

// Mock react-native-gesture-handler
jest.mock('react-native-gesture-handler', () => ({
  TouchableOpacity: 'TouchableOpacity',
  TouchableWithoutFeedback: 'TouchableWithoutFeedback',
  ScrollView: 'ScrollView',
  FlatList: 'FlatList',
  Swipeable: 'Swipeable',
  DrawerLayout: 'DrawerLayout',
  State: {},
  ScrollView: 'ScrollView',
  Slider: 'Slider',
  Switch: 'Switch',
  TextInput: 'TextInput',
  ToolbarAndroid: 'ToolbarAndroid',
  ViewPagerAndroid: 'ViewPagerAndroid',
  DrawerLayoutAndroid: 'DrawerLayoutAndroid',
  WebView: 'WebView',
  NativeViewGestureHandler: 'NativeViewGestureHandler',
  TapGestureHandler: 'TapGestureHandler',
  FlingGestureHandler: 'FlingGestureHandler',
  ForceTouchGestureHandler: 'ForceTouchGestureHandler',
  LongPressGestureHandler: 'LongPressGestureHandler',
  PanGestureHandler: 'PanGestureHandler',
  PinchGestureHandler: 'PinchGestureHandler',
  RotationGestureHandler: 'RotationGestureHandler',
  RawButton: 'RawButton',
  BaseButton: 'BaseButton',
  RectButton: 'RectButton',
  BorderlessButton: 'BorderlessButton',
  PureNativeButton: 'PureNativeButton',
  gestureHandlerRootHOC: jest.fn(),
  Directions: {}
}));

// Mock react-native-keyboard-aware-scroll-view
jest.mock('react-native-keyboard-aware-scroll-view', () => ({
  KeyboardAwareScrollView: 'KeyboardAwareScrollView'
}));

// Mock react-native-modal-datetime-picker
jest.mock('react-native-modal-datetime-picker', () => ({
  default: 'DateTimePickerModal'
}));

// Mock react-native-date-picker
jest.mock('react-native-date-picker', () => ({
  default: 'DatePicker'
}));

// Mock react-native-pager-view
jest.mock('react-native-pager-view', () => ({
  PagerView: 'PagerView'
}));

// Mock react-native-svg
jest.mock('react-native-svg', () => ({
  Svg: 'Svg',
  Circle: 'Circle',
  Ellipse: 'Ellipse',
  G: 'G',
  Text: 'Text',
  TextPath: 'TextPath',
  TSpan: 'TSpan',
  Path: 'Path',
  Polygon: 'Polygon',
  Polyline: 'Polyline',
  Line: 'Line',
  Rect: 'Rect',
  Use: 'Use',
  Image: 'Image',
  Symbol: 'Symbol',
  Defs: 'Defs',
  LinearGradient: 'LinearGradient',
  RadialGradient: 'RadialGradient',
  Stop: 'Stop',
  ClipPath: 'ClipPath',
  Pattern: 'Pattern',
  Mask: 'Mask'
}));

// Mock react-native-worklets
jest.mock('react-native-worklets', () => ({
  runOnJS: jest.fn((fn) => fn),
  runOnUI: jest.fn((fn) => fn),
  createWorklet: jest.fn((fn) => fn)
}));

// Global test utilities
global.mockNavigation = {
  navigate: jest.fn(),
  goBack: jest.fn(),
  reset: jest.fn(),
  setParams: jest.fn(),
  dispatch: jest.fn(),
  canGoBack: jest.fn(),
  isFocused: jest.fn(),
  addListener: jest.fn(),
  removeListener: jest.fn()
};

global.mockRoute = {
  key: 'test',
  name: 'Test',
  params: {}
};

// Silence the warning: Animated: `useNativeDriver` is not supported
jest.mock('react-native/Libraries/Animated/NativeAnimatedHelper');

// Mock console methods to reduce noise in tests
global.console = {
  ...console,
  log: jest.fn(),
  debug: jest.fn(),
  info: jest.fn(),
  warn: jest.fn(),
  error: jest.fn()
};
