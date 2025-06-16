import { useContext } from 'react';

import { ScenesContext } from '../../context/scenes';

export const useScenesContext = () => {
  const context = useContext(ScenesContext);
  if (!context) {
    throw new Error('useScenesContext deve ser usado dentro de um ScenesProvider');
  }
  return context;
};
