/* eslint-disable testing-library/no-node-access */
import React from 'react'; 
import { render, screen } from '@testing-library/react';
import Techstack from '../../components/stack/TechStack';

describe('Techstack component', () => {
  beforeEach(() => {
    // eslint-disable-next-line testing-library/no-render-in-setup
    render(<Techstack />);
  });

  test('renders gallery container with correct class and data-testid', () => {
    // Prefer querying by test id
    const gallery = screen.getByTestId('gallery');
    expect(gallery).toBeInTheDocument();

    // Also verify it has the gallery class
    expect(gallery).toHaveClass('gallery');
  });

  test('renders all 14 tech icons with correct titles', () => {
    const gallery = screen.getByTestId('gallery');

    // Query all avatars inside the gallery container
    const avatars = gallery.querySelectorAll('.avatar');
    expect(avatars.length).toBe(14);

    avatars.forEach((avatar) => {
      expect(avatar).toHaveAttribute('title');
      expect(avatar.getAttribute('title')).toBeTruthy();
    });
  });

  test('gallery has CSS animation class applied (cannot test animation directly)', () => {
    const gallery = screen.getByTestId('gallery');
    expect(gallery.classList.contains('gallery')).toBe(true);
  });
  test('matches snapshot', () => {
  const { asFragment } = render(<Techstack />);
  expect(asFragment()).toMatchSnapshot();
});

});

