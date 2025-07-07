import { render, screen } from '@testing-library/react';
import { describe, it, expect } from '@jest/globals';
import { Loader } from './Loader';

describe('Loader', () => {
  it('renders without crashing and displays the status element', () => {
    render(<Loader />);
    const loaderElement = screen.getByRole('status', { name: /loading…/i });
    expect(loaderElement).toBeTruthy();
  });
});