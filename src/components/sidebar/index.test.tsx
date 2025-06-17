import '@testing-library/jest-dom';
import { MemoryRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { Sidebar } from './index';

describe('Sidebar component', () => {
  it('deve renderizar o título do menu', () => {
    render(
      <MemoryRouter>
        <Sidebar />
      </MemoryRouter>,
    );

    expect(screen.getByText('Menu')).toBeInTheDocument();
  });

  it('deve renderizar o item de navegação "Studio"', () => {
    render(
      <MemoryRouter>
        <Sidebar />
      </MemoryRouter>,
    );

    const link = screen.getByText('Studio');
    expect(link).toBeInTheDocument();
    expect(link.closest('a')).toHaveAttribute('href', '/');
  });

  it('deve aplicar a classe de item ativo corretamente', async () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <Sidebar />
      </MemoryRouter>,
    );

    const link = screen.getByText('Studio');
    expect(link.closest('a')).toHaveClass('bg-primary');
  });

  it('deve aplicar classe de hover quando não ativo', async () => {
    render(
      <MemoryRouter initialEntries={['/outra-rota']}>
        <Sidebar />
      </MemoryRouter>,
    );

    const link = screen.getByText('Studio');
    expect(link.closest('a')).toHaveClass('hover:bg-accent');
    expect(link.closest('a')).not.toHaveClass('bg-primary');
  });
});
