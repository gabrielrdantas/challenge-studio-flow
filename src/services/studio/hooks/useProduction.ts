import { useContext } from 'react';

import { ProductionContext } from '../contexts/production';

export function useProduction() {
  const context = useContext(ProductionContext);

  if (context === undefined) {
    throw new Error('useProduction must be used within a ProductionProvider');
  }

  return context;
}
