import '@testing-library/jest-dom';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { Header } from './index';

// Mock dos componentes filhos
jest.mock('../../modals/scene/create', () => ({
  CreateSceneModal: ({ isOpen }: { isOpen: boolean }) =>
    isOpen ? <div data-testid='modal'>Modal Aberto</div> : null,
}));

jest.mock('../profile', () => ({
  Profile: () => <div data-testid='profile' />,
}));

jest.mock('../../services/studio/hooks/useScenesContext', () => ({
  useScenesContext: () => ({
    searchScene: jest.fn(),
  }),
}));

jest.mock('../../services/production/hooks/useProductionsContext', () => ({
  useProductionContext: () => ({
    selectedProduction: jest.fn(),
  }),
}));

describe('Header component', () => {
  it('deve renderizar o título', () => {
    render(<Header />);
    expect(screen.getByText('StudioFlow')).toBeInTheDocument();
  });

  it('deve renderizar o input e o botão', () => {
    render(<Header />);
    expect(screen.getByPlaceholderText('Digite o titulo da cena')).toBeInTheDocument();
    expect(screen.getByText('Criar')).toBeInTheDocument();
  });

  it('deve renderizar o componente Profile', () => {
    render(<Header />);
    expect(screen.getByTestId('profile')).toBeInTheDocument();
  });

  it('deve abrir o modal ao clicar no botão "Criar"', () => {
    render(<Header />);
    fireEvent.click(screen.getByText('Criar'));
    expect(screen.getByTestId('modal')).toBeInTheDocument();
  });

  it('deve chamar searchScene após digitar no input com debounce', async () => {
    const searchSceneMock = jest.fn();
    jest.spyOn(require('../../services/studio/hooks/useScenesContext'), 'useScenesContext').mockReturnValue({
      searchScene: searchSceneMock,
    });

    render(<Header />);
    const input = screen.getByPlaceholderText('Digite o titulo da cena');

    fireEvent.input(input, { target: { value: 'Nova Cena' } });

    await waitFor(() => {
      expect(searchSceneMock).toHaveBeenCalledWith('Nova Cena');
    });
  });
});
