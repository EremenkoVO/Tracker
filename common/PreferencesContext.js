import React from 'react';

export const PreferencesContext = React.createContext({
  toggleTheme: () => {},
  themeApp: 'system',
  theme: null,
});
