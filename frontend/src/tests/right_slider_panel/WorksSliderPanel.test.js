import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import WorksSliderPanel from '../../components/right_slider_panel/WorksCareerRightSlidePanel';

const mockRole = {
  image: 'https://example.com/image.png',
  title: 'Frontend Developer',
  minTitle: 'React Specialist',
  desc: 'Responsible for building UI components.',
  minDesc: 'Works on interactive UIs.',
  type: 'Web, UI, Frontend',
  media: [
    { src: 'https://example.com/video.mp4', type: 'video' },
    { src: 'https://example.com/image.jpg', type: 'image' },
  ],
};

describe('WorksSliderPanel', () => {
  it('does not render when isOpen is false', () => {
    const { container } = render(
      <WorksSliderPanel isOpen={false} onClose={jest.fn()} role={mockRole} />
    );
    // eslint-disable-next-line testing-library/no-node-access
    expect(container.firstChild).toBeNull();
  });

  it('does not render when role is null', () => {
    const { container } = render(
      <WorksSliderPanel isOpen={true} onClose={jest.fn()} role={null} />
    );
    // eslint-disable-next-line testing-library/no-node-access
    expect(container.firstChild).toBeNull();
  });

  it('renders correctly when isOpen is true and role is provided', () => {
    render(<WorksSliderPanel isOpen={true} onClose={jest.fn()} role={mockRole} />);
    expect(screen.getByText(mockRole.title)).toBeInTheDocument();
    expect(screen.getByText(mockRole.minTitle)).toBeInTheDocument();
    expect(screen.getByText(mockRole.desc)).toBeInTheDocument();
    expect(screen.getByText(mockRole.minDesc)).toBeInTheDocument();
    expect(screen.getAllByRole('img')).toHaveLength(2); // role.icon + media image
  });

  it('renders role tags', () => {
    render(<WorksSliderPanel isOpen={true} onClose={jest.fn()} role={mockRole} />);
    expect(screen.getByText('Web')).toBeInTheDocument();
    expect(screen.getByText('UI')).toBeInTheDocument();
    expect(screen.getByText('Frontend')).toBeInTheDocument();
  });

  it('calls onClose when close button is clicked', () => {
    const handleClose = jest.fn();
    render(<WorksSliderPanel isOpen={true} onClose={handleClose} role={mockRole} />);
    const closeBtn = screen.getByRole('button');
    fireEvent.click(closeBtn);
    expect(handleClose).toHaveBeenCalledTimes(1);
  });
});
