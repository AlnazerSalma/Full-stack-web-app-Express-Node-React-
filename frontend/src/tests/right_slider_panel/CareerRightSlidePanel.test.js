import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import CareerRightSlidePanel from '../../components/right_slider_panel/CareerRightSlidePanel';

const mockRole = {
  title: 'UI/UX Designer',
  desc: 'Design intuitive user experiences.',
  type: 'Full-Time',
  location: 'Remote',
  mode: 'Flexible',
  image: 'https://example.com/uiux.jpg',
  about: 'We are a design-focused company...',
  responsibilities: ['Create wireframes', 'Collaborate with developers'],
  qualifications: ['2+ years experience', 'Strong design portfolio'],
  niceToHaves: ['Animation skills', 'Figma plugin development'],
  workingTogether: 'You’ll work closely with product and dev teams.',
  application: 'Send us your portfolio and resume.',
};

describe('CareerRightSlidePanel', () => {
  it('does not render when isOpen is false', () => {
    const { container } = render(
      <CareerRightSlidePanel isOpen={false} onClose={jest.fn()} role={mockRole} />
    );
    // eslint-disable-next-line testing-library/no-node-access
    expect(container.firstChild).toBeNull();
  });

  it('does not render when role is null', () => {
    const { container } = render(
      <CareerRightSlidePanel isOpen={true} onClose={jest.fn()} role={null} />
    );
    // eslint-disable-next-line testing-library/no-node-access
    expect(container.firstChild).toBeNull();
  });

  it('renders role content when isOpen is true and role is provided', () => {
    render(<CareerRightSlidePanel isOpen={true} onClose={jest.fn()} role={mockRole} />);
    expect(screen.getByText(mockRole.title)).toBeInTheDocument();
    expect(screen.getByText(mockRole.desc)).toBeInTheDocument();
    expect(screen.getByText(mockRole.about)).toBeInTheDocument();
    expect(screen.getByText('Create wireframes')).toBeInTheDocument();
    expect(screen.getByText('You’ll work closely with product and dev teams.')).toBeInTheDocument();
    expect(screen.getByAltText(mockRole.title)).toHaveAttribute('src', mockRole.image);
  });

  it('renders niceToHaves section if present', () => {
    render(<CareerRightSlidePanel isOpen={true} onClose={jest.fn()} role={mockRole} />);
    expect(screen.getByText('Nice to Haves')).toBeInTheDocument();
    expect(screen.getByText('Animation skills')).toBeInTheDocument();
  });

  it('calls onClose when close button is clicked', () => {
    const handleClose = jest.fn();
    render(<CareerRightSlidePanel isOpen={true} onClose={handleClose} role={mockRole} />);
    fireEvent.click(screen.getByRole('button', { name: /×/ }));
    expect(handleClose).toHaveBeenCalledTimes(1);
  });

it('apply button sets correct mailto link to window.location.href', () => {
  delete window.location;
  window.location = { href: '' };

  render(<CareerRightSlidePanel isOpen={true} onClose={jest.fn()} role={mockRole} />);
  const applyButtons = screen.getAllByRole('button', { name: /apply/i });

  const expectedHref = `mailto:salmalanazer2002@gmail.com?subject=Application for ${encodeURIComponent(mockRole.title)}`;

  applyButtons.forEach((btn) => {
    fireEvent.click(btn);
    expect(window.location.href).toBe(expectedHref);
  });
});


});
