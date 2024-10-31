import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { Navbar } from './Navbar';

describe('Navbar component', () => {
  it('renders correctly', () => {
    render(<Navbar />);
    const navbarElement = screen.getByRole('navigation');
    expect(navbarElement).toBeInTheDocument();
  });

  it('renders the logo with correct alt text', () => {
    render(<Navbar />);
    const logoElement = screen.getByAltText('Productive logo');
    expect(logoElement).toBeInTheDocument();
  });

  it('renders the heading with correct text', () => {
    render(<Navbar />);
    const headingElement = screen.getByText('Time Tracker');
    expect(headingElement).toBeInTheDocument();
  });
});
