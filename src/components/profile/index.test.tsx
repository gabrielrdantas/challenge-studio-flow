import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import { Profile } from './index';

describe('Profile component', () => {
  beforeEach(() => {
    localStorage.clear();
    document.documentElement.className = '';
  });

  it('deve renderizar o nome e o avatar', () => {
    render(<Profile />);
    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('JD')).toBeInTheDocument();
  });

  it('deve alternar o tema ao clicar no botão', () => {
    const { container } = render(<Profile />);

    const button = container.querySelector('#theme-toggle-button') as HTMLButtonElement;
    expect(document.documentElement.classList.contains('dark')).toBe(false);

    fireEvent.click(button);

    expect(document.documentElement.classList.contains('dark')).toBe(true);
    expect(localStorage.getItem('theme')).toBe('dark');

    fireEvent.click(button);

    expect(document.documentElement.classList.contains('dark')).toBe(false);
    expect(localStorage.getItem('theme')).toBe('light');
  });

  it('deve aplicar o tema armazenado no localStorage ao montar', () => {
    localStorage.setItem('theme', 'dark');
    render(<Profile />);
    expect(document.documentElement.classList.contains('dark')).toBe(true);
  });

  it('deve renderizar o painel do Popover quando clicado', () => {
    render(<Profile />);
    const name = screen.getByText('John Doe');
    fireEvent.click(name);
    expect(screen.getByText('Informações ou ações adicionais aqui')).toBeInTheDocument();
  });
});
