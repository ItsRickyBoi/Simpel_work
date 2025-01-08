import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Login from './Login';
import axios from 'axios';
import { vi } from 'vitest';
import { BrowserRouter } from 'react-router-dom';
import { UserProvider } from '../../UserHandler/UserContext';

// Mock Axios
vi.mock('axios', () => ({
  default: {
    post: vi.fn(),
    get: vi.fn().mockResolvedValue({ data: null }),
  },
}));

// Mock `useNavigate` from `react-router-dom`
const mockNavigate = vi.fn();
vi.mock('react-router-dom', async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

// Helper function to render with Router and Context
const renderWithRouterAndUserContext = (component, user = { username: 'jsmith', company_tag: 'TC123' }) => {
  return render(
    <BrowserRouter>
      <UserProvider value={{ user }}>{component}</UserProvider>
    </BrowserRouter>
  );
};

describe('Login Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test('renders the login form', () => {
    renderWithRouterAndUserContext(<Login />);
    expect(screen.getByText('USERNAME')).toBeInTheDocument();
    expect(screen.getByText('Company ID')).toBeInTheDocument();
    expect(screen.getByText('PASSWORD')).toBeInTheDocument();
    expect(screen.getByText('LOGIN')).toBeInTheDocument();
  });

  test('shows error message on invalid credentials', async () => {
    axios.post.mockRejectedValueOnce(new Error('Invalid credentials'));

    renderWithRouterAndUserContext(<Login />);
    fireEvent.change(screen.getByPlaceholderText('Enter your username'), { target: { value: 'wrongUser' } });
    fireEvent.change(screen.getByPlaceholderText('Enter your company ID'), { target: { value: 'wrongID' } });
    fireEvent.change(screen.getByPlaceholderText('Enter your password'), { target: { value: 'wrongPass' } });
    fireEvent.click(screen.getByText('LOGIN'));

    await waitFor(() => {
      expect(screen.getByText('Invalid username, password, or company ID')).toBeInTheDocument();
    });
  });

  test('navigates to home on successful login with correct credentials', async () => {
    axios.post.mockResolvedValueOnce({
      data: { user: 'jsmith', token: 'testToken' },
    });

    renderWithRouterAndUserContext(<Login />);
    fireEvent.change(screen.getByPlaceholderText('Enter your username'), { target: { value: 'jsmith' } });
    fireEvent.change(screen.getByPlaceholderText('Enter your company ID'), { target: { value: 'TC123' } });
    fireEvent.change(screen.getByPlaceholderText('Enter your password'), { target: { value: '123' } });
    fireEvent.click(screen.getByText('LOGIN'));

    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith('/');
    });
  });
});
