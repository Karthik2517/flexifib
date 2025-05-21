import { render, screen } from '@testing-library/react';
import App from './App';

test('renders App component without crashing', () => {
  render(<App />);
  // Add a more meaningful test here, for example, checking for a specific element that should always be present.
  // Example: expect(screen.getByRole('navigation')).toBeInTheDocument();
});