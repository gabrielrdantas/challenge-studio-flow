import { render, screen, fireEvent, waitFor } from '@testing-library/react';

const updateSceneMock = jest.fn();
jest.mock('../../../services/studio/api', () => ({
  updateScene: (...args: any[]) => updateSceneMock(...args),
}));

import { UpdateSceneModal } from './index';

const mockScene = {
  id: '1',
  title: 'Test Scene',
  description: 'Scene description',
  episode: '1',
  step: 2,
  recordDate: '2025-06-20',
  recordLocation: 'Studio A',
};

describe('UpdateSceneModal', () => {
  beforeEach(() => {
    updateSceneMock.mockReset(); 
  });

  it('should render the modal with initial scene data', () => {
    render(<UpdateSceneModal isOpen scene={mockScene} onClose={jest.fn()} />);

    expect(screen.getByDisplayValue('Test Scene')).toBeInTheDocument();
    expect(screen.getByDisplayValue('Scene description')).toBeInTheDocument();
    expect(screen.getByDisplayValue('1')).toBeInTheDocument();
    expect(screen.getByDisplayValue('20/06/2025')).toBeInTheDocument();
    expect(screen.getByDisplayValue('Studio A')).toBeInTheDocument();
  });

  it('should allow editing fields and save the changes', async () => {
    updateSceneMock.mockResolvedValueOnce(undefined);

    const onUpdate = jest.fn();
    const onClose = jest.fn();

    render(<UpdateSceneModal isOpen scene={mockScene} onClose={onClose} onUpdate={onUpdate} />);

    fireEvent.change(screen.getByDisplayValue('Test Scene'), {
      target: { value: 'Updated Title' },
    });

    fireEvent.click(screen.getByText(/Salvar/i));

    await waitFor(() => {
      expect(onUpdate).toHaveBeenCalledWith(expect.objectContaining({ title: 'Updated Title' }));
      expect(onClose).toHaveBeenCalled();
    });
  });

it('should call toast.error if update fails', async () => {
  const toastErrorSpy = jest.spyOn(require('sonner').toast, 'error').mockImplementation(() => {});
  
  updateSceneMock.mockRejectedValueOnce(new Error('Erro ao salvar cena. Tente novamente.'));

  render(<UpdateSceneModal isOpen scene={mockScene} onClose={jest.fn()} onUpdate={jest.fn()} />);

  fireEvent.click(screen.getByText(/Salvar/i));

  await waitFor(() => {
    expect(toastErrorSpy).toHaveBeenCalledWith(
      'Erro ao salvar cena. Tente novamente.'
    );
  });

  toastErrorSpy.mockRestore();
});

});
