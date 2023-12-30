import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreen from './screens/HomeScreen';
// import ContactList from './components/ContactList';
// import ProfileScreen from './components/ProfileScreen';
// import NewItem from './components/NewItem';
// import Directory from './components/Directory';
// import VibeCheck from './components/VibeCheck';
import { useFonts } from 'expo-font';

const Stack = createNativeStackNavigator();

export default function App() {
    const [fontsLoaded] = useFonts({
      DMBold: require("./assets/fonts/DMSans-Bold.ttf"),
      DMMedium: require("./assets/fonts/DMSans-Medium.ttf"),
      DMRegular: require("./assets/fonts/DMSans-Regular.ttf"),
    });
    
  return (
    <HomeScreen />
  //   <NavigationContainer>
  //   <Stack.Navigator>
  //     <Stack.Screen name="Home" component={HomeScreen}/>
  //     <Stack.Screen name="ContactList" component={ContactList}/>
  //     <Stack.Screen name="Profile" component={ProfileScreen} />
  //     {
  //     //<Stack.Screen name="Profile" component={ProfileScreen} initialParams={{ isOwnProfile: false }} />
  //     //<Stack.Screen name="Drafts" component={DraftsScreen}/>
  //     }
  //     <Stack.Screen name="New" component={NewItem}/>
  //     <Stack.Screen name="Directory" component={Directory}/>
  //     <Stack.Screen name="VibeCheck" component={VibeCheck}/>
  //   </Stack.Navigator>
  // </NavigationContainer>
  );
}
