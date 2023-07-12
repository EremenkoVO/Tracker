import dayjs from 'dayjs';
import {useState} from 'react';
import {StyleSheet, ToastAndroid, View} from 'react-native';
import {FAB, Provider, TextInput} from 'react-native-paper';
import {DatePickerInput} from 'react-native-paper-dates';
import {theme, themeFab} from './common/theme';
import {createTracker} from './storage';

const AddTracker = ({navigation}) => {
  const [text, setText] = useState('');
  const [inputDate, setInputDate] = useState(undefined);

  const add = async () => {
    if (text.length == 0) {
      ToastAndroid.show(
        'Необходимо указать наименование трекера',
        ToastAndroid.SHORT,
      );
    } else if (!dayjs(inputDate, 'YYYY-MM-DDTHH:mm:ssZ[Z]').isValid()) {
      ToastAndroid.show(
        'Неверный формат даты начала отчета',
        ToastAndroid.SHORT,
      );
    } else {
      await createTracker(text, dayjs(inputDate).format('DD/MM/YYYY'));
      await navigation.navigate('Home');
    }
  };

  return (
    <Provider theme={theme}>
      <View style={style.view}>
        <View style={style.container}>
          <TextInput
            label="Наименование трекера"
            value={text}
            mode="outlined"
            onChangeText={text => setText(text)}></TextInput>

          <DatePickerInput
            locale="ru"
            label="Дата начала отчета"
            value={inputDate}
            mode="outlined"
            onChange={startDate => setInputDate(startDate)}
            inputMode="start"
          />
        </View>
        <FAB
          icon="check"
          theme={themeFab}
          style={style.fab}
          animated={true}
          onPress={() => add()}></FAB>
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
