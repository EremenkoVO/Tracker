import dayjs from 'dayjs';
import React, {useContext, useState} from 'react';
import {StyleSheet, ToastAndroid, View} from 'react-native';
import {FAB, Provider, TextInput} from 'react-native-paper';
import {DatePickerInput} from 'react-native-paper-dates';
import {PreferencesContext} from '../common/PreferencesContext';
import {saveTracker} from '../data/helpers';

const AddTracker = ({navigation}) => {
  const {theme} = useContext(PreferencesContext);
  const [name, setName] = useState('');
  const [date, setDate] = useState('');

  const add = async () => {
    if (name.length === 0) {
      ToastAndroid.show(
        'Необходимо указать наименование трекера',
        ToastAndroid.SHORT,
      );
      return;
    } else if (!dayjs(date, 'YYYY-MM-DDTHH:mm:ssZ[Z]').isValid()) {
      ToastAndroid.show(
        'Неверный формат даты начала отчета',
        ToastAndroid.SHORT,
      );
      return;
    }

    await saveTracker(name, dayjs(date).format('DD/MM/YYYY'));
    await navigation.navigate('Home');
  };

  return (
    <Provider theme={theme}>
      <View style={style.view}>
        <View style={style.container}>
          <TextInput
            label="Наименование трекера"
            value={name}
            mode="outlined"
            onChangeText={text => setName(text)}
          />

          <DatePickerInput
            locale="ru"
            label="Дата начала отчета"
            value={date}
            mode="outlined"
            onChange={startDate => setDate(startDate)}
            inputMode="start"
          />
        </View>
        <FAB
          icon="check"
          style={style.fab}
          animated={true}
          onPress={() => add()}
        />
      </View>
    </Provider>
  );
};

const style = StyleSheet.create({
  view: {
    flex: 1,
  },
  appBar: {
    backgroundColor: '#464646',
    color: '#fff',
  },
  container: {
    margin: 8,
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
  },
});

export default AddTracker;
