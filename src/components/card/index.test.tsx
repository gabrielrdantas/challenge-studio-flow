import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import { Card } from './index';
import { ReactNode } from 'react';

describe('Card component', () => {
  const icon: ReactNode = <span data-testid='icon'>🔥</span>;

  it('renders title and icon', () => {
    render(<Card icon={icon} title='Test Title' />);
    expect(screen.getByText('Test Title')).toBeInTheDocument();
    expect(screen.getByTestId('icon')).toBeInTheDocument();
  });

  it('renders subtitle if provided', () => {
    render(<Card icon={icon} title='Test' subtitle='This is a subtitle' />);
    expect(screen.getByText('This is a subtitle')).toBeInTheDocument();
  });

  it('does not render subtitle if not provided', () => {
    render(<Card icon={icon} title='Test' />);
    expect(screen.queryByText('This is a subtitle')).not.toBeInTheDocument();
  });

  it('renders quick links if provided', () => {
    render(
      <Card
        icon={icon}
        title='Test'
        quickLinks={[{ label: 'Link 1' }, { label: 'Link 2', count: 5 }]}
      />,
    );
    expect(screen.getByText('Links rápidos')).toBeInTheDocument();
    expect(screen.getByText('Link 1')).toBeInTheDocument();
    expect(screen.getByText('Link 2')).toBeInTheDocument();
    expect(screen.getByText('5')).toBeInTheDocument();
  });

  it('calls quick link onClick when clicked', () => {
    const onClick = jest.fn();
    render(
      <Card
        icon={icon}
        title='Test'
        quickLinks={[{ label: 'Click me', onClick }]}
      />,
    );
    fireEvent.click(screen.getByText('Click me'));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('does not render quick links section if quickLinks is empty', () => {
    render(<Card icon={icon} title='Test' quickLinks={[]} />);
    expect(screen.queryByText('Links rápidos')).not.toBeInTheDocument();
  });

  it('renders footer button if provided', () => {
    render(
      <Card
        icon={icon}
        title='Test'
        footer={{ label: 'More details' }}
      />,
    );
    expect(screen.getByText('More details')).toBeInTheDocument();
  });

  it('calls footer onClick when clicked', () => {
    const onClick = jest.fn();
    render(
      <Card
        icon={icon}
        title='Test'
        footer={{ label: 'Click footer', onClick }}
      />,
    );
    fireEvent.click(screen.getByText('Click footer'));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('applies custom className if provided', () => {
    const { container } = render(
      <Card icon={icon} title='Test' className='custom-class' />,
    );
    expect(container.firstChild).toHaveClass('custom-class');
  });
});
