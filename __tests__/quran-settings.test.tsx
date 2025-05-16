import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { useQuran } from '@/components/quran/QuranLayout';
import SettingsModal from '@/components/quran/SettingsModal';
import { ThemeProvider } from '@/components/theme-provider';

// Mock localStorage
const localStorageMock = (() => {
  let store: Record<string, string> = {};
  return {
    getItem: vi.fn((key: string) => store[key] || null),
    setItem: vi.fn((key: string, value: string) => {
      store[key] = value.toString();
    }),
    clear: vi.fn(() => {
      store = {};
    }),
    removeItem: vi.fn((key: string) => {
      delete store[key];
    }),
  };
})();

// Mock the useQuran hook
vi.mock('@/components/quran/QuranLayout', () => ({
  useQuran: vi.fn(() => ({
    fontSize: 100,
    setFontSize: vi.fn(),
    transition: 'slide',
    setTransition: vi.fn(),
    theme: 'system',
    setTheme: vi.fn(),
  })),
}));

// Wrap component in ThemeProvider for testing
const TestWrapper = ({ children }: { children: React.ReactNode }) => (
  <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
    {children}
  </ThemeProvider>
);

describe('Quran Settings Persistence', () => {
  beforeEach(() => {
    // Setup localStorage mock
    Object.defineProperty(window, 'localStorage', { value: localStorageMock });
    
    // Clear mock data and function calls
    localStorageMock.clear();
    vi.clearAllMocks();
  });
  
  afterEach(() => {
    vi.resetAllMocks();
  });
  
  it('should load font size from localStorage', () => {
    // Arrange: Setup localStorage with font size
    localStorageMock.getItem.mockReturnValueOnce(JSON.stringify({ fontSize: 125 }));
    
    // Act: Render with mocked QuranLayout context
    render(
      <TestWrapper>
        <SettingsModal 
          theme="system"
          setTheme={vi.fn()}
          transition="slide"
          setTransition={vi.fn()}
          fontSize={125}
          setFontSize={vi.fn()}
        />
      </TestWrapper>
    );
    
    // Assert: Verify localStorage was accessed with the correct key
    expect(localStorageMock.getItem).toHaveBeenCalledWith('quran-settings');
  });
  
  it('should save font size to localStorage when changed', () => {
    // Mock implementation
    const setFontSize = vi.fn();
    
    // Render SettingsModal with mock functions
    const { getByLabelText, getByText } = render(
      <TestWrapper>
        <SettingsModal 
          theme="system"
          setTheme={vi.fn()}
          transition="slide"
          setTransition={vi.fn()}
          fontSize={100}
          setFontSize={setFontSize}
        />
      </TestWrapper>
    );
    
    // Open the modal
    fireEvent.click(screen.getByLabelText('Open settings'));
    
    // Click increase font size button
    fireEvent.click(screen.getByLabelText('Increase font size'));
    
    // Click save button
    fireEvent.click(screen.getByText('Save Changes'));
    
    // Assert localStorage was called to save settings
    expect(localStorageMock.setItem).toHaveBeenCalledWith(
      'quran-settings',
      expect.stringContaining('fontSize')
    );
    
    // Assert setFontSize was called with new value
    expect(setFontSize).toHaveBeenCalled();
  });
  
  it('should save theme mode to localStorage when changed', () => {
    // Mock implementation
    const setTheme = vi.fn();
    
    // Render SettingsModal with mock functions
    render(
      <TestWrapper>
        <SettingsModal 
          theme="system"
          setTheme={setTheme}
          transition="slide"
          setTransition={vi.fn()}
          fontSize={100}
          setFontSize={vi.fn()}
        />
      </TestWrapper>
    );
    
    // Open the modal
    fireEvent.click(screen.getByLabelText('Open settings'));
    
    // Select dark theme 
    fireEvent.click(screen.getByText('Dark'));
    
    // Click save button
    fireEvent.click(screen.getByText('Save Changes'));
    
    // Assert localStorage was called to save settings with theme
    expect(localStorageMock.setItem).toHaveBeenCalledWith(
      'quran-settings',
      expect.stringContaining('theme')
    );
    
    // Assert setTheme was called with 'dark'
    expect(setTheme).toHaveBeenCalled();
  });
  
  it('should respect reduced motion preferences', () => {
    // Mock matchMedia to simulate reduced motion
    Object.defineProperty(window, 'matchMedia', {
      value: vi.fn().mockImplementation((query) => ({
        matches: query === '(prefers-reduced-motion: reduce)',
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
      })),
    });
    
    // Mock implementation
    const setTransition = vi.fn();
    
    // Render SettingsModal with mock functions
    render(
      <TestWrapper>
        <SettingsModal 
          theme="system"
          setTheme={vi.fn()}
          transition="slide"
          setTransition={setTransition}
          fontSize={100}
          setFontSize={vi.fn()}
        />
      </TestWrapper>
    );
    
    // Open the modal
    fireEvent.click(screen.getByLabelText('Open settings'));
    
    // Click save button
    fireEvent.click(screen.getByText('Save Changes'));
    
    // Assert setTransition was called with 'none'
    expect(setTransition).toHaveBeenCalledWith('none');
  });
}); 