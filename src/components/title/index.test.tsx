import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import Title from './index';

describe('Title component', () => {
  it('deve renderizar o título com o texto correto', () => {
    render(<Title title='Dashboard' />);
    const heading = screen.getByRole('heading', { name: 'Dashboard' });
    expect(heading).toBeInTheDocument();
  });

  it('deve aplicar a classe correta', () => {
    render(<Title title='Configurações' />);
    const heading = screen.getByText('Configurações');
    expect(heading).toHaveClass('text-2xl', 'font-bold', 'text-primary');
  });
});
