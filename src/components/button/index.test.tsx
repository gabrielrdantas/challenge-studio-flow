import { forwardRef } from 'react';
import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';

import { Button } from './index';

describe('Button component', () => {
  it('should render with default variant and size', () => {
    render(<Button>Click me</Button>);
    const button = screen.getByText('Click me');
    expect(button.tagName).toBe('BUTTON');
    expect(button).toHaveClass('bg-primary');
    expect(button).toHaveClass('h-10');
  });

  it('should apply the "destructive" variant and "lg" size', () => {
    render(
      <Button variant='destructive' size='lg'>
        Delete
      </Button>,
    );
    const button = screen.getByText('Delete');
    expect(button).toHaveClass('bg-destructive');
    expect(button).toHaveClass('h-11');
  });

  it('should apply extra className', () => {
    render(<Button className='custom-class'>With class</Button>);
    const button = screen.getByText('With class');
    expect(button).toHaveClass('custom-class');
  });

  it('should call onClick handler when clicked', () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Click</Button>);
    const button = screen.getByText('Click');
    fireEvent.click(button);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('should render as HeadlessButton when asChild is true', () => {
    const CustomWrapper = forwardRef<HTMLSpanElement, any>((props, ref) => (
      <span ref={ref} data-testid='headless' {...props} />
    ));

    render(
      <Button asChild>
        <CustomWrapper>Headless Child</CustomWrapper>
      </Button>,
    );

    const element = screen.getByTestId('headless');
    expect(element).toBeInTheDocument();
    expect(element).toHaveTextContent('Headless Child');
  });

  it('should render disabled button', () => {
    render(<Button disabled>Disabled</Button>);
    const button = screen.getByText('Disabled');
    expect(button).toBeDisabled();
    expect(button).toHaveClass('disabled:opacity-50');
  });
});
