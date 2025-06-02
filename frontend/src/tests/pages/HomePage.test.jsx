import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import HomePage from '../../pages/HomePage';

jest.mock('../../components/Home/Home2', () => () => <div data-testid="home2">Home2 Loaded</div>);

jest.mock('../../components/Home/Type', () => () => <div data-testid="type">Typing Animation</div>);
jest.mock('../../components/Home/hiring_right_side/HiringRightSide', () => () => <div data-testid="hero-right">Hero Right Section</div>);

describe('HomePage', () => {
  test('renders main headings and child components', async () => {
    render(<HomePage />);

    // heading content
    expect(screen.getByText(/haptic/i)).toBeInTheDocument();
    expect(screen.getByText(/We help ambitious/i)).toBeInTheDocument();

    // Type component
    expect(screen.getByTestId('type')).toBeInTheDocument();

    // Hero right side
    expect(screen.getByTestId('hero-right')).toBeInTheDocument();

    // Suspense fallback should appear initially
    expect(screen.getByText(/Loading more content.../i)).toBeInTheDocument();

    // Wait for lazy-loaded Home2
    await waitFor(() => {
      expect(screen.getByTestId('home2')).toBeInTheDocument();
    });
  });
});
