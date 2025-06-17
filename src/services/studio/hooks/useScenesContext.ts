import { useContext } from 'react';

import { ScenesContext } from '../context/ScenesProvider';

export const useScenesContext = () => {
  const context = useContext(ScenesContext);
  if (!context) {
    throw new Error('useScenesContext deve ser usado dentro de um ScenesProvider');
  }
  return context;
};
