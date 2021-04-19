import { render, screen } from '@testing-library/react';
import App from './App';

test('renders header text', () => {
  render(<App />);
  const headerElement = screen.getByText(/Milk Monster/i);
  expect(headerElement).toBeInTheDocument();
});

test('renders raearnold link', () => {
  render(<App />);
  const linkElement = screen.getByText(/Rachael Arnold/i);
  expect(linkElement).toBeInTheDocument();
});