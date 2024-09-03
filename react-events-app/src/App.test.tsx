import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

jest.mock('./components/layout/NavBar', () => () => <div>Mocked NavBar</div>);

test('renders NavBar component', () => {
  render(<App />);
  const navBarElement = screen.getByText(/Mocked NavBar/i);
  expect(navBarElement).toBeInTheDocument();
});
