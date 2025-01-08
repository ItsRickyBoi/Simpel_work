import React from 'react';
import { render, screen, waitFor, fireEvent, act } from '@testing-library/react';
import Dashboard from './DashboardEmployee';
import { BrowserRouter } from 'react-router-dom';
import axios from 'axios';
import { vi } from 'vitest';

// Mock Axios
vi.mock('axios', () => ({
  __esModule: true,
  default: {
    get: vi.fn().mockResolvedValue({
      data: [
        { date: '2025-01-08', clock_in: '08:00', clock_out: '17:00' },
      ],
    }),
    post: vi.fn().mockResolvedValue({}),
    put: vi.fn().mockResolvedValue({}),
    defaults: { baseURL: '' },
  },
}));

// Mock User Context
vi.mock('../../UserHandler/UserContext', () => ({
  useUser: () => ({
    user: { id: 6, username: 'jsmith', company_tag: 'TC123' },
  }),
}));

// Helper function to render Dashboard with Router and User Context
const renderWithRouterAndUserContext = (component) => {
  return render(
    <BrowserRouter>
      {component}
    </BrowserRouter>
  );
};

describe('DashboardEmployee Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    axios.defaults.baseURL = 'http://localhost:3000';
  });

  test('renders the dashboard tabs correctly', async () => {
    await act(async () => {
      renderWithRouterAndUserContext(<Dashboard />);
    });

    expect(screen.getByText('Absensi')).toBeInTheDocument();
    expect(screen.getByText('Tasks')).toBeInTheDocument();
  });

  test('fetches and displays tasks and attendance', async () => {
    await act(async () => {
      renderWithRouterAndUserContext(<Dashboard />);
    });

    await waitFor(() => {
      expect(screen.getByText((content) => content.includes('2025-01-08'))).toBeInTheDocument();
      expect(screen.getByText((content) => content.includes('Clock in: 08:00'))).toBeInTheDocument();
      expect(screen.getByText((content) => content.includes('Clock out: 17:00'))).toBeInTheDocument();
    });
  });

  test('handles clock in action', async () => {
    renderWithRouterAndUserContext(<Dashboard />);
  
    await waitFor(() => expect(screen.getByText('CLOCK IN')).toBeEnabled());
  
    fireEvent.click(screen.getByText('CLOCK IN'));
  
    await waitFor(() => {
      expect(screen.getByText((content) => content.includes('Clock in:'))).toBeInTheDocument();
    });
  });
  

  test('handles clock out action', async () => {
    renderWithRouterAndUserContext(<Dashboard />);
  
    await waitFor(() => expect(screen.getByText('CLOCK OUT')).toBeEnabled());
  
    fireEvent.click(screen.getByText('CLOCK OUT'));
  
    await waitFor(() => {
      expect(screen.getByText((content) => content.includes('Clock out:'))).toBeInTheDocument();
    });
  });
  
});
