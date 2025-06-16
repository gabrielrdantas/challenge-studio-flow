import Routes from './routes';
import { ProductionProvider } from './services/production/contexts/production';
import { ScenesProvider } from './services/studio/context/scenes';
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
