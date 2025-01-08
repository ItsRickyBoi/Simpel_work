import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import EditCompany from './EditCompany';
import axios from 'axios';
import { vi } from 'vitest';

// Mock Axios
vi.mock('axios', () => {
  return {
    __esModule: true,
    default: {
      get: vi.fn(() =>
        Promise.resolve({
          data: {
            name: 'Test Company',
            company_address: '123 Test Street',
            company_tag: 'TC123',
            company_email: 'test@example.com',
          },
        })
      ),
      put: vi.fn(() =>
        Promise.resolve({
          data: {
            message: 'Company details updated successfully.',
          },
        })
      ),
    },
  };
});


// Mock User Context
vi.mock('../../UserHandler/UserContext', () => ({
  useUser: () => ({
    user: { id: 5, username: 'jdoe', company_tag: 'TC123' },
  }),
}));

// Helper function to render with Router
const renderWithRouter = (component) => {
  return render(<BrowserRouter>{component}</BrowserRouter>);
};

describe('EditCompany Component', () => {
  const mockCompanyData = {
    name: 'Test Company',
    company_address: '123 Test Street',
    company_tag: 'TC123',
    company_email: 'test@example.com',
  };

  beforeEach(() => {
    vi.clearAllMocks();
    axios.get.mockResolvedValueOnce({ data: mockCompanyData });
    axios.put.mockResolvedValueOnce({ data: { message: 'Company details updated successfully.' } });
  });

  test('1. Mampu mengeluarkan informasi company yang saat ini', async () => {
    renderWithRouter(<EditCompany />);
  
    await waitFor(() => {
      expect(screen.getByLabelText('Company name')).toHaveValue('Test Company');
      expect(screen.getByLabelText('Address')).toHaveValue('123 Test Street');
      expect(screen.getByLabelText('Company tag')).toHaveValue('TC123');
      expect(screen.getByLabelText('Company Email')).toHaveValue('test@example.com');
    });
  });

  test('2. Tombol Apply untuk mengubah informasi company dapat digunakan', async () => {
    renderWithRouter(<EditCompany />);

    await waitFor(() => screen.getByLabelText('Company name'));

    fireEvent.change(screen.getByLabelText('Company name'), {
      target: { value: 'Updated Company' },
    });

    fireEvent.click(screen.getByText('Apply'));

    await waitFor(() => {
      expect(axios.put).toHaveBeenCalledWith(
        'http://localhost:3000/api/company/TC123',
        expect.objectContaining({
          name: 'Updated Company',
        })
      );
    });
  });

  test('3. Pesan sukses mengedit informasi company dapat ditampilkan', async () => {
    renderWithRouter(<EditCompany />);

    await waitFor(() => screen.getByLabelText('Company name'));

    fireEvent.click(screen.getByText('Apply'));

    await waitFor(() => {
      expect(screen.getByText('Company details updated successfully.')).toBeInTheDocument();
    });
  });
});
