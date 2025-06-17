import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import { Input } from './index';

describe('Input component', () => {
  it('deve renderizar o input com valor padrão e classe default', () => {
    render(<Input placeholder='Digite algo' />);
    const input = screen.getByPlaceholderText('Digite algo');
    expect(input).toBeInTheDocument();
    expect(input).toHaveClass('border-input');
  });

  it('deve aplicar a classe de erro quando error=true', () => {
    render(<Input placeholder='Erro' error />);
    const input = screen.getByPlaceholderText('Erro');
    expect(input).toHaveClass('border-destructive');
  });

  it('deve aplicar inputSize "sm"', () => {
    render(<Input placeholder='Pequeno' inputSize='sm' />);
    const input = screen.getByPlaceholderText('Pequeno');
    expect(input).toHaveClass('h-9');
  });

  it('deve aplicar inputSize "lg"', () => {
    render(<Input placeholder='Grande' inputSize='lg' />);
    const input = screen.getByPlaceholderText('Grande');
    expect(input).toHaveClass('h-11');
  });

  it('deve propagar props como "type", "value" e "onChange"', () => {
    const handleChange = jest.fn();
    render(<Input type='email' value='teste@exemplo.com' onChange={handleChange} />);
    const input = screen.getByDisplayValue('teste@exemplo.com');
    expect(input).toHaveAttribute('type', 'email');
    fireEvent.change(input, { target: { value: 'novo@exemplo.com' } });
    expect(handleChange).toHaveBeenCalled();
  });

  it('deve aplicar classe customizada passada via className', () => {
    render(<Input placeholder='Customizado' className='bg-red-500' />);
    const input = screen.getByPlaceholderText('Customizado');
    expect(input).toHaveClass('bg-red-500');
  });
});
