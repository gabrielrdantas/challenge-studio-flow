import { render, screen, fireEvent, waitFor } from '@testing-library/react';

const createSceneMock = jest.fn();
jest.mock('../../../services/studio/api', () => ({
  saveScene: (...args: any[]) => createSceneMock(...args),
}));

import { CreateSceneModal } from './index';

const mockOnClose = jest.fn();
const mockOnCreate = jest.fn();

describe('CreateSceneModal', () => {
  beforeEach(() => {
    createSceneMock.mockReset();
  });

  it('should render modal when open', () => {
    render(<CreateSceneModal isOpen onClose={mockOnClose} onCreate={mockOnCreate} />);
    expect(screen.getByText(/Criar Nova Cena/i)).toBeInTheDocument();
  });

  it('should call onClose when cancel button is clicked', () => {
    render(<CreateSceneModal isOpen onClose={mockOnClose} onCreate={mockOnCreate} />);
    fireEvent.click(screen.getByText(/Cancelar/i));
    expect(mockOnClose).toHaveBeenCalled();
  });

  it('should fill and submit the form', async () => {
    createSceneMock.mockResolvedValue(undefined);

    render(<CreateSceneModal isOpen onClose={mockOnClose} onCreate={mockOnCreate} />);

    fireEvent.change(screen.getByLabelText(/Título/i), { target: { value: 'Nova Cena' } });
    fireEvent.change(screen.getByLabelText(/Descrição/i), { target: { value: 'Descrição' } });
    fireEvent.change(screen.getByLabelText(/Episódio/i), { target: { value: 'E01' } });
    fireEvent.change(screen.getByLabelText(/Status/i), { target: { value: '2' } });
    fireEvent.change(screen.getByLabelText(/Data de Gravação/i), { target: { value: '2025-06-15' } });
    fireEvent.change(screen.getByLabelText(/Local de Gravação/i), { target: { value: 'Estúdio A' } });

    fireEvent.click(screen.getByRole('button', { name: /^Criar$/i }));

    await waitFor(() => {
      expect(mockOnCreate).toHaveBeenCalledWith(
        expect.objectContaining({
          title: 'Nova Cena',
          description: 'Descrição',
          episode: 'E01',
          step: 2,
          recordDate: '2025-06-15',
          recordLocation: 'Estúdio A',
        })
      );
    });
  });

  it('should show error message when saveScene fails', async () => {
    createSceneMock.mockRejectedValueOnce(new Error('Erro ao salvar cena. Tente novamente.'));

    render(<CreateSceneModal isOpen onClose={mockOnClose} onCreate={mockOnCreate} />);
    fireEvent.click(screen.getByRole('button', { name: /^Criar$/i }));

    await waitFor(() => {
      expect(screen.getByText(/Erro ao salvar cena. Tente novamente./i)).toBeInTheDocument();
    });
  });
});
