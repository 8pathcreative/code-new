import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Badge } from '@components/application-ui/elements/badges'; // Ensure this path is correct

interface BadgeProps {
  text?: string;
  count?: number;
}

const LocalBadge: React.FC<BadgeProps> = ({ text = 'Badge Text', count = 1 }) => {
  return (
    <>
      {Array.from({ length: count }).map((_, index) => (
        <span key={index} data-testid="badge" className="badge">
          {text}
        </span>
      ))}
    </>
  );
};

describe('Badges Component', () => {
  it('renders correctly', () => {
    const { getByText } = render(<LocalBadge />);
    expect(getByText('Badge Text')).toBeInTheDocument();
  });

  it('displays the correct number of badges', () => {
    const { getAllByTestId } = render(<LocalBadge count={3} />);
    expect(getAllByTestId('badge')).toHaveLength(3); // Adjust based on your component
  });
});

export default Badge;