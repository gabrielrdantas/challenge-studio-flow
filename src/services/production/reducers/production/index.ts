type ProductionAction =
  | { type: 'SET_PRODUCTIONS'; payload: TProduction[] }
  | { type: 'SELECT_PRODUCTION'; payload: TProduction }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string | null };

type TProduction = {
  id: string;
  name: string;
  description?: string;
};

type ProductionState = {
  productions: TProduction[];
  selectedProduction: TProduction | null;
  isLoading: boolean;
  error: string | null;
};

const initialState: ProductionState = {
  productions: [],
  selectedProduction: null,
  isLoading: false,
  error: null,
};

const productionReducer = (state: ProductionState, action: ProductionAction): ProductionState => {
  switch (action.type) {
    case 'SET_PRODUCTIONS':
      return {
        ...state,
        productions: action.payload,
        error: null,
      };
    case 'SELECT_PRODUCTION':
      return {
        ...state,
        selectedProduction: action.payload,
      };
    case 'SET_LOADING':
      return {
        ...state,
        isLoading: action.payload,
      };
    case 'SET_ERROR':
      return {
        ...state,
        error: action.payload,
        isLoading: false,
      };
    default:
      return state ?? initialState;
  }
};

export { initialState, productionReducer, type TProduction };
