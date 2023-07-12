import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {useEffect} from 'react';
import {registerTranslation} from 'react-native-paper-dates';
import {createTable} from './storage';

import 'react-native-gesture-handler';

import AddTracker from './AddTracker';
import CustomNavigationBar from './components/Appbar';
import Home from './Home';

registerTranslation('ru', {
  save: 'Сохранить',
  selectSingle: 'Выбрать дату',
  selectMultiple: 'Выбрать даты',
  selectRange: 'Выбрать период',
  notAccordingToDateFormat: inputFormat =>
    `Формат даты должен быть ${inputFormat}`,
  mustBeHigherThan: date => `Должно быть позже ${date}`,
  mustBeLowerThan: date => `Должно быть раньше ${date}`,
  mustBeBetween: (startDate, endDate) =>
    `Должно быть между ${startDate} - ${endDate}`,
  dateIsDisabled: 'Недопустимая дата',
  previous: 'Предыдущая',
  next: 'Следующая',
  typeInDate: 'Формат даты',
  pickDateFromCalendar: 'Выбрать дату из календаря',
  close: 'Закрыть',
});

const Stack = createStackNavigator();

export default function App() {
  useEffect(() => {
    createTable();
  }, []);

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
