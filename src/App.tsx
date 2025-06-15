import Routes from './routes';
import { ProductionProvider } from './services/studio/contexts/production';
import './shared/styles/global.css';

function App() {
  return (
    <ProductionProvider>
      <Routes />
    </ProductionProvider>
  );
}

export default App;
