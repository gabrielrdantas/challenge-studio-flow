import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { Column } from './index';

jest.mock('@dnd-kit/core', () => ({
  useDroppable: () => ({
    setNodeRef: jest.fn(),
    isOver: false,
    active: null,
    over: null,
  }),
}));

describe('Column component', () => {
  const baseProps = {
    id: 'column-1',
    step: 1,
    label: 'Step 1',
  };

  it('renders label', () => {
    render(<Column {...baseProps} />);
    expect(screen.getByText('Step 1')).toBeInTheDocument();
  });

  it('renders count when provided', () => {
    render(<Column {...baseProps} count={3} />);
    expect(screen.getByText('3')).toBeInTheDocument();
  });

  it('does not render count when not provided', () => {
    render(<Column {...baseProps} />);
    expect(screen.queryByText('0')).not.toBeInTheDocument();
  });

  it('renders description when provided', () => {
    render(<Column {...baseProps} description='This is a step' />);
    expect(screen.getByText('This is a step')).toBeInTheDocument();
  });

  it('renders children', () => {
    render(
      <Column {...baseProps}>
        <div>Child content</div>
      </Column>,
    );
    expect(screen.getByText('Child content')).toBeInTheDocument();
  });

  it('has base styles and layout classes', () => {
    const { container } = render(<Column {...baseProps} />);
    expect(container.firstChild).toHaveClass('flex flex-col');
  });
});
