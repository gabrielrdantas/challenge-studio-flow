import Routes from './routes';
import { ProductionProvider } from './services/production/contexts/ProductionProvider';
import { ScenesProvider } from './services/studio/context/ScenesProvider';
import './styles/global.css';

function App() {
  return (
    <ProductionProvider>
      <ScenesProvider>
        <Routes />
      </ScenesProvider>
    </ProductionProvider>
  );
}

export default App;
