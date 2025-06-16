import { useContext } from 'react';

import { ProductionContext } from '../../contexts/production';

export const useProductionContext = () => {
  const context = useContext(ProductionContext);
  if (!context) {
    throw new Error('useProductionContext deve ser usado dentro de um ProductionProvider');
  }
  return context;
};
