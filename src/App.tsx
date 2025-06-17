import Routes from './routes';
import { ProductionProvider } from './services/production/contexts/ProductionProvider';
import { ScenesProvider } from './services/studio/context/ScenesProvider';
import './styles/global.css';
import { Toaster } from 'sonner';

function App() {
  return (
    <>
      <ProductionProvider>
        <ScenesProvider>
          <Routes />
        </ScenesProvider>
      </ProductionProvider>
      <Toaster
        position='top-right'
        toastOptions={{
          className: 'bg-destructive text-destructive-foreground',
          style: {
            borderRadius: '8px',
            padding: '16px',
            fontSize: '14px',
          },
        }} />
    </>
  );
}

export default App;
