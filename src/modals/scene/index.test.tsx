import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { toast } from 'sonner';
import { SceneModal } from './index';
import { format } from 'date-fns';


jest.mock('sonner', () => ({
  toast: {
    error: jest.fn(),
  },
}));

const mockSaveScene = jest.fn();
const mockUpdateScene = jest.fn();

jest.mock('../../services/studio/api', () => ({
  saveScene: (...args: any[]) => mockSaveScene(...args),
  updateScene: (...args: any[]) => mockUpdateScene(...args),
}));

const mockScene = {
  id: '1',
  columnId: 'column-1',
  title: 'Cena Original',
  description: 'Descrição original',
  episode: '01',
  step: 2,
  recordDate: '2025-06-20',
  recordLocation: 'Local original',
};

describe('SceneModal', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render modal in update mode with initial data', () => {
    render(
      <SceneModal
        isOpen
        scene={mockScene}
        onClose={jest.fn()}
        onFinish={jest.fn()}
      />
    );

    expect(screen.getByDisplayValue('Cena Original')).toBeInTheDocument();
    expect(screen.getByDisplayValue('Descrição original')).toBeInTheDocument();
    expect(screen.getByDisplayValue('Local original')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Salvar/i })).toBeInTheDocument();
  });

  it('should call onClose when cancel button is clicked', () => {
    const onClose = jest.fn();

    render(
      <SceneModal isOpen onClose={onClose} onFinish={jest.fn()} />
    );

    fireEvent.click(screen.getByText(/Cancelar/i));
    expect(onClose).toHaveBeenCalled();
  });

  it('should fill and submit form in create mode', async () => {
    mockSaveScene.mockResolvedValue(undefined);
    const onFinish = jest.fn();
    const onClose = jest.fn();

    render(
      <SceneModal isOpen onClose={onClose} onFinish={onFinish} />
    );

    fireEvent.change(screen.getByLabelText(/Título/i), {
      target: { value: 'Nova Cena' },
    });
    fireEvent.change(screen.getByLabelText(/Descrição/i), {
      target: { value: 'Descrição nova' },
    });
    fireEvent.change(screen.getByLabelText(/Episódio/i), {
      target: { value: 'E02' },
    });
    fireEvent.change(screen.getByLabelText(/Status/i), {
      target: { value: '2' },
    });
    const todayFormatted = format(new Date(), 'dd/MM/yyyy');

    fireEvent.input(screen.getByLabelText(/Data de Gravação/i), {
      target: { value: todayFormatted },
    });
    fireEvent.change(screen.getByLabelText(/Local de Gravação/i), {
      target: { value: 'Novo local' },
    });

    fireEvent.click(screen.getByRole('button', { name: /Salvar/i }));

    await waitFor(() => {
      expect(onFinish).toHaveBeenCalled();
      expect(onClose).toHaveBeenCalled();
    });
  });

  it('should submit scene in update mode', async () => {
    mockUpdateScene.mockResolvedValue(undefined);
    const onFinish = jest.fn();
    const onClose = jest.fn();

    render(
      <SceneModal
        isOpen
        scene={mockScene}
        onClose={onClose}
        onFinish={onFinish}
      />
    );

    fireEvent.change(screen.getByDisplayValue('Cena Original'), {
      target: { value: 'Cena Atualizada' },
    });

    fireEvent.click(screen.getByRole('button', { name: /Salvar/i }));

    await waitFor(() => {
      expect(onFinish).toHaveBeenCalled();
      expect(onClose).toHaveBeenCalled();
    });
  });

  it('should show error toast when creation fails', async () => {
    mockSaveScene.mockRejectedValue(new Error('Erro ao salvar'));
    render(
      <SceneModal isOpen onClose={jest.fn()} onFinish={jest.fn()} />
    );

    fireEvent.click(screen.getByRole('button', { name: /Salvar/i }));

    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith("Por favor, preencha todos os campos.");
    });
  });

  it('should show error toast when update fails', async () => {
    mockUpdateScene.mockRejectedValue(new Error('Falha na atualização'));

    render(
      <SceneModal
        isOpen
        scene={mockScene}
        onClose={jest.fn()}
        onFinish={jest.fn()}
      />
    );

    fireEvent.click(screen.getByRole('button', { name: /Salvar/i }));

    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith('Falha na atualização');
    });
  });
});
