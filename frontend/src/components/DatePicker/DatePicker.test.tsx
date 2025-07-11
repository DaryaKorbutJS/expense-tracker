import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import { CustomDatePicker } from './DatePicker';

describe('CustomDatePicker', () => {
  const setup = (initialDate = '2023-08-18', onChange = jest.fn()) => {
    render(<CustomDatePicker value={initialDate} onChange={onChange} />);
    return { onChange };
  };

  it('renders with initial date', () => {
    setup();
    expect(screen.getByDisplayValue('18/08/2023')).toBeInTheDocument();
  });

  it('opens calendar popup on click', () => {
    setup();
    const input = screen.getByDisplayValue('18/08/2023');
    fireEvent.click(input);
    expect(screen.getByText(/August 2023/i)).toBeInTheDocument();
    expect(screen.getByText('Mo')).toBeInTheDocument();
  });

  it('navigates to previous and next month', () => {
    setup();
    fireEvent.click(screen.getByDisplayValue('18/08/2023'));
    const prevButton = screen.getByLabelText('Go to previous month');
    const nextButton = screen.getByLabelText('Go to next month');
    fireEvent.click(prevButton);
    expect(screen.getByText('July 2023')).toBeInTheDocument();
    fireEvent.click(nextButton);
    fireEvent.click(nextButton);
    expect(screen.getByText('September 2023')).toBeInTheDocument();
  });

  it('selects a new date and calls onChange', () => {
    const { onChange } = setup('2023-08-01');
    fireEvent.click(screen.getByDisplayValue('01/08/2023'));
    fireEvent.click(screen.getByText('10'));
    expect(onChange).toHaveBeenCalledWith('2023-08-10');
  });
});
