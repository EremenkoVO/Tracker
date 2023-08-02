import React, {useContext} from 'react';
import {StyleSheet, View} from 'react-native';
import {PaperProvider, RadioButton, Text} from 'react-native-paper';
import {PreferencesContext} from '../common/PreferencesContext';
import {setTheme} from '../data/localStorage';

const Settings = () => {
  const {themeApp, theme, toggleTheme} = useContext(PreferencesContext);

  return (
    <PaperProvider theme={theme}>
      <View style={style.container}>
        <Text variant="labelLarge">Тема</Text>
        <RadioButton.Group
          onValueChange={newValue => {
            setTheme(newValue);
            toggleTheme(newValue);
          }}
          value={themeApp}>
          <View style={style.radioButton}>
            <RadioButton value="system" />
            <Text>Как в системе</Text>
          </View>
          <View style={style.radioButton}>
            <RadioButton value="dark" />
            <Text>Темная</Text>
          </View>
          <View style={style.radioButton}>
            <RadioButton value="light" />
            <Text>Светлая</Text>
          </View>
        </RadioButton.Group>
      </View>
    </PaperProvider>
  );
};

export default Settings;

const style = StyleSheet.create({
  container: {
    margin: 4,
  },
  radioButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
