import withObservables from '@nozbe/with-observables';
import {useState} from 'react';
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
import {deleteTracker, observeTrackers} from '../data/helpers';
import calculateDaysPassed from '../helpers/trackerDate';

const Home = ({navigation, trackers}) => {
  const [visible, setVisible] = useState(false);
  const [selectedId, setSelectedId] = useState(false);

  const hideDialog = () => setVisible(false);

  console.log(trackers);

  return (
    <Provider theme={theme}>
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
                deleteTracker(selectedId);
                hideDialog();
              }}>
              Удалить
            </Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>

      <View style={style.view}>
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

const enhanceWithTrackers = withObservables([], () => ({
  trackers: observeTrackers(),
}));

export default enhanceWithTrackers(Home);
