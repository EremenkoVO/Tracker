import {database} from './database';

export const getTheme = async setIsThemeDark => {
  const theme = await database.localStorage.get('theme');
  await setIsThemeDark(theme ?? 'system');
};

export const setTheme = async type => {
  await database.localStorage.set('theme', type);
};
