import { act, fireEvent, render, waitFor } from '@testing-library/react';
import App from './App';

test('renders learn react link', async () => {
  const mockGeolocation = {
    getCurrentPosition: jest.fn(),
    watchPosition: jest.fn()
  };
  
  global.navigator.geolocation = mockGeolocation;
  const {getByTestId} = render(<App />);
  
  const button = await waitFor(() => getByTestId('location-identifier'));
  act(() => {
    fireEvent.click(button)
  })

  expect(mockGeolocation.getCurrentPosition).toBeCalled();
  
});
