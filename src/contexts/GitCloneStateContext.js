import React, { useContext, useState } from 'react';
import { gitClonePrefix, lang } from '../utils/Consts';

const GitCloneStateContext = React.createContext();

export const useGitCloneState = () => (useContext(GitCloneStateContext));
export const GitCloneStateProvider = function ({ children }) {
  const [translation, setTranslation] = useState(lang);
  // eslint-disable-next-line react/jsx-no-constructed-context-values
  const data = { prefix: gitClonePrefix, translation, setTranslation };
  return (
    <GitCloneStateContext.Provider value={data}>{children}</GitCloneStateContext.Provider>
  );
};
