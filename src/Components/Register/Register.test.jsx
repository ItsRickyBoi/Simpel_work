import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Register from './Register';
import { BrowserRouter } from 'react-router-dom';
import axios from 'axios';
import { vi } from 'vitest';

// Mock Axios for API testing
vi.mock('axios', () => ({
  default: {
    post: vi.fn(),
  },
}));

// Wrap component with BrowserRouter for routing functionality
const renderWithRouter = (component) => {
  return render(<BrowserRouter>{component}</BrowserRouter>);
};

describe('Register Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test('renders the first step of the registration form', () => {
    renderWithRouter(<Register />);
    expect(screen.getByText('Start Managing your Company')).toBeInTheDocument();
  });

  test('shows validation message when company name and tag are empty', () => {
    renderWithRouter(<Register />);
    fireEvent.click(screen.getByText('Next ➞'));
    expect(screen.getByText('Company name and tag are required.')).toBeInTheDocument();
  });

  test('navigates to the next step when valid data is provided in step 1', () => {
    renderWithRouter(<Register />);
    fireEvent.change(screen.getByPlaceholderText('Enter your company name'), { target: { value: 'Test Company' } });
    fireEvent.change(screen.getByPlaceholderText('Enter unique tag'), { target: { value: 'TEST01' } });
    fireEvent.click(screen.getByText('Next ➞'));
    expect(screen.getByText('Information of CEO')).toBeInTheDocument();
  });

  test('handles successful registration', async () => {
    axios.post.mockResolvedValue({ status: 200 });
  
    renderWithRouter(<Register />);
  
    // Complete all steps
    fireEvent.change(screen.getByPlaceholderText('Enter your company name'), { target: { value: 'Test Company' } });
    fireEvent.change(screen.getByPlaceholderText('Enter unique tag'), { target: { value: 'TEST01' } });
    fireEvent.click(screen.getByText('Next ➞'));
  
    fireEvent.change(screen.getByPlaceholderText('First name'), { target: { value: 'John' } });
    fireEvent.change(screen.getByPlaceholderText('Last name'), { target: { value: 'Doe' } });
    fireEvent.change(screen.getByPlaceholderText('Email'), { target: { value: 'john.doe@example.com' } });
    fireEvent.click(screen.getByText('Next ➞'));
  
    fireEvent.change(screen.getByPlaceholderText('Address'), { target: { value: '123 Main St' } });
    fireEvent.change(screen.getByPlaceholderText("Company's email"), { target: { value: 'company@example.com' } });
    fireEvent.change(screen.getByPlaceholderText('Username'), { target: { value: 'testuser' } });
    fireEvent.change(screen.getByPlaceholderText('Password'), { target: { value: 'password123' } });
    fireEvent.change(screen.getByPlaceholderText('Confirm Password'), { target: { value: 'password123' } });
    fireEvent.click(screen.getByText('Next ➞'));
  
    fireEvent.click(screen.getByRole('checkbox'));
    fireEvent.click(screen.getByText('Register ➞'));
  
    await waitFor(() => {
      expect(screen.getByText('Registration successful! Redirecting to login page...')).toBeInTheDocument();
    });
  });
  
  test('handles registration error', async () => {
    axios.post.mockRejectedValue(new Error('Request failed'));
  
    renderWithRouter(<Register />);
  
    // Complete all steps
    fireEvent.change(screen.getByPlaceholderText('Enter your company name'), { target: { value: 'Test Company' } });
    fireEvent.change(screen.getByPlaceholderText('Enter unique tag'), { target: { value: 'TEST01' } });
    fireEvent.click(screen.getByText('Next ➞'));
  
    fireEvent.change(screen.getByPlaceholderText('First name'), { target: { value: 'John' } });
    fireEvent.change(screen.getByPlaceholderText('Last name'), { target: { value: 'Doe' } });
    fireEvent.change(screen.getByPlaceholderText('Email'), { target: { value: 'john.doe@example.com' } });
    fireEvent.click(screen.getByText('Next ➞'));
  
    fireEvent.change(screen.getByPlaceholderText('Address'), { target: { value: '123 Main St' } });
    fireEvent.change(screen.getByPlaceholderText("Company's email"), { target: { value: 'company@example.com' } });
    fireEvent.change(screen.getByPlaceholderText('Username'), { target: { value: 'testuser' } });
    fireEvent.change(screen.getByPlaceholderText('Password'), { target: { value: 'password123' } });
    fireEvent.change(screen.getByPlaceholderText('Confirm Password'), { target: { value: 'password123' } });
    fireEvent.click(screen.getByText('Next ➞'));
  
    fireEvent.click(screen.getByRole('checkbox'));
    fireEvent.click(screen.getByText('Register ➞'));
  
    await waitFor(() => {
      expect(screen.getByText('Registration failed. Please try again.')).toBeInTheDocument();
    });
  });  
});
