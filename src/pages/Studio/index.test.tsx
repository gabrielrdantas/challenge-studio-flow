import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import Studio from './index';

jest.mock('../../services/production/hooks/useProductionsContext', () => ({
  useProductionContext: jest.fn(),
}));

jest.mock('../../services/studio/hooks/useScenesContext', () => ({
  useScenesContext: jest.fn(),
}));

jest.mock('./components/scene', () => ({
  Scene: ({ title }: any) => <div>{title}</div>,
}));

import { useProductionContext } from '../../services/production/hooks/useProductionsContext';
import { useScenesContext } from '../../services/studio/hooks/useScenesContext';

describe('Studio Component', () => {
  const mockDeselectProduction = jest.fn();
  const mockSelectProductionById = jest.fn();
  const mockSetSortableScene = jest.fn();
  const mockSetNewStepScene = jest.fn();
  const mockHandleSceneUpdate = jest.fn();

  const mockScenes = [
    {
      id: '1',
      step: 1,
      title: 'Cena 1',
      description: '',
      episode: '',
      recordDate: '',
      recordLocation: '',
    },
    {
      id: '2',
      step: 2,
      title: 'Cena 2',
      description: '',
      episode: '',
      recordDate: '',
      recordLocation: '',
    },
  ];

  beforeEach(() => {
    (useProductionContext as jest.Mock).mockReturnValue({
      selectedProduction: { id: 'prod1', name: 'Produção A' },
      deselectProduction: mockDeselectProduction,
      selectProductionById: mockSelectProductionById,
    });

    (useScenesContext as jest.Mock).mockReturnValue({
      scenes: mockScenes,
      filteredScene: [],
      setSortableScene: mockSetSortableScene,
      setNewStepScene: mockSetNewStepScene,
      handleSceneUpdate: mockHandleSceneUpdate,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render all columns and scenes correctly', () => {
    render(
      <MemoryRouter initialEntries={['/production/prod1']}>
        <Routes>
          <Route path="/production/:id" element={<Studio />} />
        </Routes>
      </MemoryRouter>,
    );

    expect(screen.getByText('Produção A')).toBeInTheDocument();
    expect(screen.getByText('Cena 1')).toBeInTheDocument();
    expect(screen.getByText('Cena 2')).toBeInTheDocument();
  });

  it('should call deselectProduction and navigate back when back button is clicked', () => {
    render(
      <MemoryRouter initialEntries={['/production/prod1']}>
        <Routes>
          <Route path="/production/:id" element={<Studio />} />
        </Routes>
      </MemoryRouter>,
    );

    const backButton = screen.getByRole('button');
    fireEvent.click(backButton);

    expect(mockDeselectProduction).toHaveBeenCalled();
  });

  it('should not render anything if no selectedProduction', () => {
    (useProductionContext as jest.Mock).mockReturnValue({
      selectedProduction: null,
      deselectProduction: jest.fn(),
      selectProductionById: jest.fn(),
    });

    const { container } = render(
      <MemoryRouter initialEntries={['/production/prod1']}>
        <Routes>
          <Route path="/production/:id" element={<Studio />} />
        </Routes>
      </MemoryRouter>,
    );

    expect(container.firstChild).toBeNull();
  });
});
