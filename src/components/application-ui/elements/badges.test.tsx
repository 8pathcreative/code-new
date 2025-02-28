import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Badges from './Badges'; // Ensure this path is correct

describe('Badges Component', () => {
  it('renders correctly', () => {
    const { getByText } = render(<Badges />);
    expect(getByText('Badge Text')).toBeInTheDocument();
  });

  it('displays the correct number of badges', () => {
    const { getAllByTestId } = render(<Badges count={3} />);
    expect(getAllByTestId('badge')).toHaveLength(3); // Adjust based on your component
  });
});