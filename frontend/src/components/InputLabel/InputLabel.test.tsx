import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { InputLabel } from './InputLabel';

describe('<InputLabel />', () => {
  it('renders children', () => {
    render(<InputLabel>Label text</InputLabel>);
    expect(screen.getByText('Label text')).toBeInTheDocument();
  });

  it('sets htmlFor prop', () => {
    render(<InputLabel htmlFor="input-id">Label</InputLabel>);
    const label = screen.getByText('Label');
    expect(label).toHaveAttribute('for', 'input-id');
  });

  it('shows required asterisk when required', () => {
    render(<InputLabel required>Label</InputLabel>);
    expect(screen.getByText('*')).toBeInTheDocument();
  });
});
