import {useEffect, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {
  Button,
  Dialog,
  FAB,
  IconButton,
  List,
  MD3Colors,
  Portal,
  Provider,
} from 'react-native-paper';
import {theme} from '../common/theme';
import calculateDaysPassed from '../helpers/trackerDate';
import {deleteTracker, getTrackers} from '../storage';

const Home = ({navigation}) => {
  const [trackers, setTrackers] = useState([]);
  const [visible, setVisible] = useState(false);
  const [selectedId, setSelectedId] = useState(false);

  const hideDialog = () => setVisible(false);

  useEffect(() => {
    fetchTrackers();
  }, []);

  const fetchTrackers = async () => {
    await getTrackers(setTrackers);
  };

  return (
    <Provider theme={theme}>
      <View style={style.view}>
        <Portal>
          <Dialog visible={visible} onDismiss={hideDialog}>
            <Dialog.Content>
              <Dialog.Title>Удалить трекер?</Dialog.Title>
            </Dialog.Content>
            <Dialog.Actions>
              <Button onPress={() => hideDialog()}>Отменить</Button>
              <Button
                textColor={MD3Colors.error40}
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
                  right={() => (
                    <IconButton
                      icon="trash-can-outline"
                      size={20}
                      mode="contained-tonal"
                      onPress={() => {
                        setVisible(true);
                        setSelectedId(id);
                      }}
                    />
                  )}></List.Item>
              );
            })}
          </ScrollView>
        </View>
        <FAB
          icon="plus"
          style={style.fab}
          animated={true}
          variant="secondary"
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
