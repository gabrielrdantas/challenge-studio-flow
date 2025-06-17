
import { toast } from 'sonner';
import { createContext, useEffect, useReducer } from 'react';
import { type ReactNode } from 'react';

import { fetchProductions } from '../api';
import { type TProduction, initialState, productionReducer } from '../reducers/ProductionReducer';

type ProductionState = {
  productions: TProduction[];
  selectedProduction: TProduction | null;
  isLoading: boolean;
  error: string | null;
};

interface ProductionContextType extends ProductionState {
  productions: TProduction[];
  selectProduction: (production: TProduction) => void;
  deselectProduction: () => void;
  selectProductionById: (id: string) => void;
}

const ProductionContext = createContext<ProductionContextType | undefined>(undefined);

function ProductionProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(productionReducer, initialState);

  const getProductions = async () => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      const data = await fetchProductions();
      dispatch({ type: 'SET_PRODUCTIONS', payload: data });
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Failed to fetch productions';
      dispatch({
        type: 'SET_ERROR',
        payload :message,
      });
      toast.error(message);
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };

  const selectProductionById = (productionId: string) => {
    const production = state.productions.find((p) => p.id === productionId);
    if (production) {
      dispatch({ type: 'SELECT_PRODUCTION', payload: production });
    }
  };

  const selectProduction = (production: TProduction) => {
    dispatch({ type: 'SELECT_PRODUCTION', payload: production });
  };

  const deselectProduction = () => {
    dispatch({ type: 'SELECT_PRODUCTION', payload: initialState.productions[0] });
  };

  useEffect(() => {
    getProductions();
  }, []);

  return (
    <ProductionContext.Provider
      value={{
        ...state,
        selectProduction,
        deselectProduction,
        selectProductionById,
      }}
    >
      {children}
    </ProductionContext.Provider>
  );
}

export { ProductionProvider, ProductionContext, type TProduction };
