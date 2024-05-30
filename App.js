import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreen from './screens/HomeScreen';
import Contacts from './screens/Contacts';
import ProfileScreen from './screens/ProfileScreen';
import Directory from './screens/Directory';
import DirectoryCard from './screens/cards/DirectoryCard';
import VibeCheck from './screens/VibeCheck';
import Backlog from './screens/Backlog';
import Login from './screens/LoginScreen';

import ItemCard from './screens/ItemCard';
import { useFonts } from 'expo-font';
import NewItem from './screens/NewItem';
import ItemScreen from './screens/ItemScreen';
import ScheduleView from './screens/views/ScheduleView';
import ChecklistView from './screens/views/ChecklistView';
import SelectView from './screens/SelectView';

const Stack = createNativeStackNavigator();

export default function App() {
    const [fontsLoaded] = useFonts({
      DMBold: require("./assets/fonts/DMSans-Bold.ttf"),
      DMMedium: require("./assets/fonts/DMSans-Medium.ttf"),
      DMRegular: require("./assets/fonts/DMSans-Regular.ttf"),
    });
    
  return (
    <NavigationContainer>
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {/* <Stack.Screen name="Login" component={Login}/> */}
      <Stack.Screen name="Home" component={HomeScreen}/>
      <Stack.Screen name="Contacts" component={Contacts}/>
      <Stack.Screen name="Profile" component={ProfileScreen} />
      {
      //<Stack.Screen name="Profile" component={ProfileScreen} initialParams={{ isOwnProfile: false }} />
      //<Stack.Screen name="Drafts" component={DraftsScreen}/>
      }
      <Stack.Screen name="New" component={NewItem}/>
      <Stack.Screen name="Directory" component={Directory}/>
      <Stack.Screen name="VibeCheck" component={VibeCheck}/>
      <Stack.Screen name="Backlog" component={Backlog}/>
      <Stack.Screen name="ItemScreen" component={ItemScreen}/>
      <Stack.Screen name="SelectView" component={SelectView}/>
      <Stack.Screen name="ScheduleView" component={ScheduleView}/>
      <Stack.Screen name="ChecklistView" component={ChecklistView}/>
      <Stack.Screen name="Item" component={ItemCard}/>
    </Stack.Navigator>
  </NavigationContainer>
  );
}
