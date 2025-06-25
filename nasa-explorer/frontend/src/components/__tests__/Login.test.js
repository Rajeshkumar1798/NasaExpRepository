import { render, screen, fireEvent } from '@testing-library/react';
import Login from '../Login';

test('renders login form', () => {
  render(<Login onLogin={() => {}} />);
  expect(screen.getByRole('heading', { name: /login/i })).toBeInTheDocument();
});

test('allows user to type into input fields', () => {
  render(<Login onLogin={() => {}} />);
  fireEvent.change(screen.getByPlaceholderText('Username'), { target: { value: 'john' } });
  fireEvent.change(screen.getByPlaceholderText('Password'), { target: { value: '1234' } });
  expect(screen.getByDisplayValue('john')).toBeInTheDocument();
  expect(screen.getByDisplayValue('1234')).toBeInTheDocument();
});
