import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {Appearance} from 'react-native';
import {PaperProvider} from 'react-native-paper';
import {registerTranslation} from 'react-native-paper-dates';

import 'react-native-gesture-handler';

import {PreferencesContext} from './common/PreferencesContext';
import {CombinedDarkTheme, CombinedDefaultTheme} from './common/theme';
import {getTheme} from './data/localStorage';
import AddTracker from './Screens/AddTracker';
import Home from './Screens/Home';
import Settings from './Screens/Settings';

import ru from './common/calendar/ru';

import CustomNavigationBar from './components/Appbar';

registerTranslation('ru', ru);

const Stack = createStackNavigator();

const App = () => {
  const colorSchema = Appearance.getColorScheme();
  const [themeApp, setIsThemeDark] = useState('');
  let theme;

  useEffect(() => {
    getTheme(setIsThemeDark);
  }, []);

  if (themeApp === 'dark') {
    theme = CombinedDarkTheme;
  } else if (themeApp === 'light') {
    theme = CombinedDefaultTheme;
  } else if (themeApp === 'system') {
    theme = colorSchema === 'dark' ? CombinedDarkTheme : CombinedDefaultTheme;
  }

  const toggleTheme = useCallback(newValue => {
    return setIsThemeDark(newValue);
  }, []);

  const preferences = useMemo(
    () => ({
      toggleTheme,
      themeApp,
      theme,
    }),
    [toggleTheme, themeApp, theme],
  );

  return (
    <PreferencesContext.Provider value={preferences}>
      <PaperProvider theme={theme}>
        <NavigationContainer theme={theme}>
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
            <Stack.Screen
              name="Settings"
              title="Настройки"
              options={{title: 'Настройки'}}
              component={Settings}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </PaperProvider>
    </PreferencesContext.Provider>
  );
};

export default App;
