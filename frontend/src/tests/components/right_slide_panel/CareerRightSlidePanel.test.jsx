import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import CareerRightSlidePanel from '../../../components/right_slider_panel/CareerRightSlidePanel';
import mockCareer from '../../__mocks_data__/mockCareer';


describe('CareerRightSlidePanel', () => {
  it('does not render when isOpen is false', () => {
    const { container } = render(
      <CareerRightSlidePanel isOpen={false} onClose={jest.fn()} role={mockCareer} />
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
    render(<CareerRightSlidePanel isOpen={true} onClose={jest.fn()} position={mockCareer} />);
    expect(screen.getByText(mockCareer.title)).toBeInTheDocument();
    expect(screen.getByText(mockCareer.desc)).toBeInTheDocument();
    expect(screen.getByText(mockCareer.about)).toBeInTheDocument();
    expect(screen.getByText('Create wireframes')).toBeInTheDocument();
    expect(screen.getByText('You’ll work closely with product and dev teams.')).toBeInTheDocument();
    expect(screen.getByAltText(mockCareer.title)).toHaveAttribute('src', mockCareer.image);
  });

  it('renders niceToHaves section if present', () => {
    render(<CareerRightSlidePanel isOpen={true} onClose={jest.fn()} position={mockCareer} />);
    expect(screen.getByText('Nice to Haves')).toBeInTheDocument();
    expect(screen.getByText('Animation skills')).toBeInTheDocument();
  });

  it('calls onClose when close button is clicked', () => {
    const handleClose = jest.fn();
    render(<CareerRightSlidePanel isOpen={true} onClose={handleClose} position={mockCareer} />);
    fireEvent.click(screen.getByRole('button', { name: /×/ }));
    expect(handleClose).toHaveBeenCalledTimes(1);
  });

it('apply button sets correct mailto link to window.location.href', () => {
  delete window.location;
  window.location = { href: '' };

  render(<CareerRightSlidePanel isOpen={true} onClose={jest.fn()} position={mockCareer} />);
  const applyButtons = screen.getAllByRole('button', { name: /apply/i });

  const expectedHref = `mailto:salmalanazer2002@gmail.com?subject=Application for ${encodeURIComponent(mockCareer.title)}`;

  applyButtons.forEach((btn) => {
    fireEvent.click(btn);
    expect(window.location.href).toBe(expectedHref);
  });
});

});
