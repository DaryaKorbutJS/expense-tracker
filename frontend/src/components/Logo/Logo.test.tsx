import { render, screen } from '@testing-library/react';
import {describe, it, expect} from '@jest/globals';
import { Logo } from './Logo';

describe('Logo', () => {
  it('renders without crashing and displays the logo image', () => {
    render(<Logo />);
    const logoElement = screen.getByRole('img', { name: /company logo/i });
    expect(logoElement).toBeTruthy();;
  });
});
