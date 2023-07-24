import dayjs from 'dayjs';
import {useEffect, useState} from 'react';
import {StyleSheet, ToastAndroid, View} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {
  Button,
  Dialog,
  FAB,
  List,
  MD3Colors,
  Portal,
  Provider,
} from 'react-native-paper';
import {theme} from './common/theme';
import {deleteTracker, getTrackers} from './storage';

const Home = ({navigation}) => {
  const [trackers, setTrackers] = useState([]);
  const [visible, setVisible] = useState(false);
  const [selectedId, setSelectedId] = useState(false);

  const showToast = () => {
    ToastAndroid.show(
      'Ждите меня с первым лучом солнца, я приду на пятый день, с востока',
      ToastAndroid.SHORT,
    );
  };

  const hideDialog = () => setVisible(false);

  useEffect(() => {
    fetchTrackers();
  }, []);

  const fetchTrackers = async () => {
    await getTrackers(setTrackers);
  };

  function declOfNum(n, text_forms) {
    n = Math.abs(n) % 100;
    var n1 = n % 10;
    if (n > 10 && n < 20) {
      return text_forms[2];
    }
    if (n1 > 1 && n1 < 5) {
      return text_forms[1];
    }
    if (n1 == 1) {
      return text_forms[0];
    }
    return text_forms[2];
  }

  const calculateDaysPassed = dateString => {
    const parts = dateString.split('/');
    const day = parseInt(parts[0], 10);
    const month = parseInt(parts[1], 10) - 1;
    const year = parseInt(parts[2], 10);

    const inputDate = new Date(year, month, day);
    const currentDate = new Date();

    if (inputDate > currentDate)
      return `Трекер начнется ${dayjs(inputDate).format('DD.MM.YYYY')}`;

    const timeDiff = Math.abs(currentDate.getTime() - inputDate.getTime());
    const daysPassed = Math.ceil(timeDiff / (1000 * 3600 * 24) - 1);

    return `${declOfNum(daysPassed, [
      'Прошел',
      'Прошли',
      'Прошло',
    ])} ${daysPassed} ${declOfNum(daysPassed, ['день', 'дня', 'дней'])}`;
  };

  return (
    <Provider theme={theme}>
      <View style={style.view}>
        <Portal>
          <Dialog visible={visible} onDismiss={hideDialog}>
            <Dialog.Content>
              <Dialog.Icon icon="trash-can-outline"></Dialog.Icon>
              <Dialog.Title>Удалить трекер?</Dialog.Title>
            </Dialog.Content>
            <Dialog.Actions>
              <Button onPress={() => hideDialog()}>Отменить</Button>
              <Button
                onPress={() => {
                  deleteTracker(selectedId, setTrackers);
                  hideDialog();
                }}>
                Удалить
              </Button>
            </Dialog.Actions>
          </Dialog>
        </Portal>

        <View>
          <ScrollView>
            {trackers?.map(({id, name, date}) => {
              return (
                <List.Item
                  key={id}
                  title={name}
                  description={calculateDaysPassed(date)}
                  left={props => (
                    <List.Icon
                      {...props}
                      icon="leaf-circle"
                      color={MD3Colors.primary20}></List.Icon>
                  )}
                  onLongPress={() => {
                    setVisible(true);
                    setSelectedId(id);
                  }}></List.Item>
              );
            })}
          </ScrollView>
        </View>
        <FAB
          icon="plus"
          style={style.fab}
          animated={true}
          variant="secondary"
          onLongPress={showToast}
          onPress={() => {
            getTrackers(setTrackers);
            navigation.navigate('AddTracker');
          }}></FAB>
      </View>
    </Provider>
  );
};

const style = StyleSheet.create({
  view: {
    flex: 1,
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
  },
});

export default Home;
