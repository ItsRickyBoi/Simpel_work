import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import DashboardCEO from './DashboardCEO';
import { BrowserRouter } from 'react-router-dom';
import axios from 'axios';
import { vi } from 'vitest';

// Mock Axios
vi.mock('axios', () => ({
  __esModule: true,
  default: {
    get: vi.fn(),
  },
}));

// Mock User Context
vi.mock('../../UserHandler/UserContext', () => ({
  useUser: () => ({
    user: { id: 5, username: 'jdoe', company_tag: 'TC123' },
  }),
}));

// Helper function to render component with Router
const renderWithRouter = (component) => {
  return render(<BrowserRouter>{component}</BrowserRouter>);
};

describe('DashboardCEO Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test('renders the CEO dashboard correctly with employee data', async () => {
    axios.get
      .mockResolvedValueOnce({
        data: [
          { id: 1, first_name: 'John', last_name: 'Doe', company_tag: 'TC123' },
        ],
      })
      .mockResolvedValueOnce({
        data: [
          { date: '2025-01-08', clock_in: '08:00', clock_out: '17:00' },
        ],
      })
      .mockResolvedValueOnce({
        data: [
          { status: 'done' },
        ],
      });
  
    renderWithRouter(<DashboardCEO />);
  
    await waitFor(() => {
      expect(screen.getByText('List of Employees')).toBeInTheDocument();
      expect(screen.getByText('John Doe')).toBeInTheDocument();
    });
  });
});
