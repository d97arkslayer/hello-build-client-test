import React, { useContext, useState, useEffect } from 'react';
import { gitClonePrefix, lang } from '../utils/Consts';

const GitCloneStateContext = React.createContext();

export const useGitCloneState = () => (useContext(GitCloneStateContext));
export var GitCloneStateProvider = function ({ children }) {
  const [translation, setTranslation] = useState(lang);
  const data = { prefix: gitClonePrefix, translation, setTranslation };
  return (
    <GitCloneStateContext.Provider value={data}>{children}</GitCloneStateContext.Provider>
  );
};
