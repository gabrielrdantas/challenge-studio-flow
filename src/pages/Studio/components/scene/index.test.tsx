// cena.test.tsx
import { render, screen, fireEvent } from '@testing-library/react';
import { Scene } from './index';

jest.mock('@dnd-kit/sortable', () => ({
  useSortable: () => ({
    attributes: {},
    listeners: {},
    setNodeRef: jest.fn(),
    transform: null,
    active: null,
  }),
}));

jest.mock('../../../../modals/scene/update', () => ({
  UpdateSceneModal: ({ isOpen }: { isOpen: boolean }) =>
    isOpen ? <div>UpdateSceneModal Opened</div> : null,
}));

describe('Scene component', () => {
  const sceneMock = {
    id: 'scene-1',
    title: 'Cena teste',
    description: 'Descrição teste',
    columnId: 'column-1',
    step: 1,
    episode: 'E01',
    recordDate: '2024-01-01',
    recordLocation: 'Estúdio A',
    onUpdate: jest.fn(),
  };

  it('should render title and description', () => {
    render(<Scene {...sceneMock} />);
    expect(screen.getByText('Cena teste')).toBeInTheDocument();
    expect(screen.getByText('Descrição teste')).toBeInTheDocument();
  });

  it('should open update modal on click', () => {
    const { container } = render(<Scene {...sceneMock} />);
    
    const div = container.querySelector('.scene-card') as HTMLDivElement;


    fireEvent.click(div);
    expect(screen.getByText('UpdateSceneModal Opened')).toBeInTheDocument();
  });
});