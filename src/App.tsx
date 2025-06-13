import { ProductionProvider } from './contexts/production';
import Routes from './routes';
import './styles/global.css';

function App() {
  return (
    <ProductionProvider>
      <Routes />
    </ProductionProvider>
  );
}

export default App;
