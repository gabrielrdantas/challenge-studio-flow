// Production.test.tsx
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Production from './index';

jest.mock('../../services/production/hooks/useProductionsContext', () => ({
  useProductionContext: jest.fn(),
}));

jest.mock('react-router-dom', () => {
  const actual = jest.requireActual('react-router-dom');
  return {
    ...actual,
    useNavigate: jest.fn(),
  };
});

import { useProductionContext } from '../../services/production/hooks/useProductionsContext';
import { useNavigate } from 'react-router-dom';

describe('Production Component', () => {
  const mockNavigate = jest.fn();
  const mockSelectProduction = jest.fn();

  const mockProductions = [
    {
      id: '1',
      name: 'Production 1',
      description: 'Description 1',
    },
    {
      id: '2',
      name: 'Production 2',
      description: 'Description 2',
    },
  ];

  beforeEach(() => {
    (useNavigate as jest.Mock).mockReturnValue(mockNavigate);
    (useProductionContext as jest.Mock).mockReturnValue({
      productions: mockProductions,
      selectProduction: mockSelectProduction,
      deselectProduction: jest.fn(),
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render all productions', () => {
    render(<Production />, { wrapper: MemoryRouter });

    expect(screen.getByText('Production 1')).toBeInTheDocument();
    expect(screen.getByText('Production 2')).toBeInTheDocument();
    expect(screen.getAllByText('Ir para produção')).toHaveLength(2);
  });

  it('should call selectProduction and navigate on quick link click', () => {
    render(<Production />, { wrapper: MemoryRouter });

    const button = screen.getAllByText('Ir para produção')[0];
    fireEvent.click(button);

    expect(mockSelectProduction).toHaveBeenCalledWith(mockProductions[0]);
    expect(mockNavigate).toHaveBeenCalledWith('/production/1');
  });

  it('should return null if productions is not defined', () => {
    (useProductionContext as jest.Mock).mockReturnValue({
      productions: null,
      selectProduction: jest.fn(),
      deselectProduction: jest.fn(),
    });

    const { container } = render(<Production />, { wrapper: MemoryRouter });

    expect(container.firstChild).toBeNull();
  });
});
