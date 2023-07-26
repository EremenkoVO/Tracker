import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {registerTranslation} from 'react-native-paper-dates';

import 'react-native-gesture-handler';

import AddTracker from './Screens/AddTracker';
import Home from './Screens/Home';
import ru from './common/calendar/ru';
import CustomNavigationBar from './components/Appbar';

registerTranslation('ru', ru);

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        gestureDirection="vertical"
        initialRouteName="Home"
        screenOptions={{
          header: props => <CustomNavigationBar {...props} />,
        }}>
        <Stack.Screen
          name="Home"
          title="Список трекеров"
          options={{
            title: 'Список трекеров',
          }}
          component={Home}
        />
        <Stack.Screen
          name="AddTracker"
          title="Добавить трекер"
          options={{
            title: 'Добавить трекер',
          }}
          component={AddTracker}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
