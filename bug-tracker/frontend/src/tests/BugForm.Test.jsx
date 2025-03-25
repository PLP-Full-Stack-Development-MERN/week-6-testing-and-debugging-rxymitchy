import { render, screen, fireEvent } from '@testing-library/react';
import BugForm from '../pages/BugForm';
import { createBug } from '../services/bugService';

// Mock the API service
jest.mock('../services/bugService');

describe('BugForm', () => {
  const mockOnBugCreated = jest.fn();
  const mockNavigate = jest.fn();

  beforeEach(() => {
    // Mock useNavigate hook
    jest.mock('react-router-dom', () => ({
      ...jest.requireActual('react-router-dom'),
      useNavigate: () => mockNavigate,
    }));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders the form correctly', () => {
    render(<BugForm onBugCreated={mockOnBugCreated} />);
    
    expect(screen.getByLabelText('Title')).toBeInTheDocument();
    expect(screen.getByLabelText('Description')).toBeInTheDocument();
    expect(screen.getByLabelText('Severity')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Submit Bug' })).toBeInTheDocument();
  });

  it('validates form fields', async () => {
    render(<BugForm onBugCreated={mockOnBugCreated} />);
    
    fireEvent.click(screen.getByRole('button', { name: 'Submit Bug' }));
    
    expect(await screen.findByText('Title is required')).toBeInTheDocument();
    expect(await screen.findByText('Description is required')).toBeInTheDocument();
    expect(mockOnBugCreated).not.toHaveBeenCalled();
  });

  it('submits the form with valid data', async () => {
    const mockBug = { 
      _id: '123', 
      title: 'Test Bug', 
      description: 'Test Description', 
      severity: 'medium' 
    };
    
    createBug.mockResolvedValue(mockBug);
    
    render(<BugForm onBugCreated={mockOnBugCreated} />);
    
    fireEvent.change(screen.getByLabelText('Title'), {
      target: { value: 'Test Bug' }
    });
    
    fireEvent.change(screen.getByLabelText('Description'), {
      target: { value: 'Test Description' }
    });
    
    fireEvent.click(screen.getByRole('button', { name: 'Submit Bug' }));
    
    expect(await screen.findByText('Submitting...')).toBeInTheDocument();
    expect(createBug).toHaveBeenCalledWith({
      title: 'Test Bug',
      description: 'Test Description',
      severity: 'medium'
    });
    expect(mockOnBugCreated).toHaveBeenCalledWith(mockBug);
    expect(mockNavigate).toHaveBeenCalledWith('/');
  });

  it('handles submission errors', async () => {
    createBug.mockRejectedValue(new Error('API Error'));
    
    render(<BugForm onBugCreated={mockOnBugCreated} />);
    
    fireEvent.change(screen.getByLabelText('Title'), {
      target: { value: 'Test Bug' }
    });
    
    fireEvent.change(screen.getByLabelText('Description'), {
      target: { value: 'Test Description' }
    });
    
    fireEvent.click(screen.getByRole('button', { name: 'Submit Bug' }));
    
    expect(await screen.findByText('API Error')).toBeInTheDocument();
  });
});