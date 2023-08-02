import {getHeaderTitle} from '@react-navigation/elements';
import React, {useState} from 'react';
import {Appbar, Menu} from 'react-native-paper';

export default function CustomNavigationBar({
  navigation,
  route,
  options,
  back,
}) {
  const title = getHeaderTitle(options, route.name);

  const [visible, setVisible] = useState(false);

  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);

  return (
    <Appbar.Header>
      {back ? <Appbar.BackAction onPress={navigation.goBack} /> : null}
      <Appbar.Content title={title} />
      {route.name === 'Home' ? (
        <Menu
          visible={visible}
          onDismiss={closeMenu}
          anchor={<Appbar.Action icon="dots-vertical" onPress={openMenu} />}>
          <Menu.Item
            onPress={() => {
              closeMenu();
              navigation.navigate('Settings');
            }}
            title="Настройки"
          />
        </Menu>
      ) : null}
    </Appbar.Header>
  );
}
