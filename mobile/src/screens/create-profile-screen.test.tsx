import React from 'react';
import { fireEvent, render, waitFor } from '@testing-library/react-native';
import { CreateProfileScreen } from './create-profile-screen';
import { useAuth } from '../contexts/auth-context';

jest.mock('../contexts/auth-context', () => ({
  useAuth: jest.fn(),
}));

const mockedUseAuth = useAuth as jest.MockedFunction<typeof useAuth>;

describe('CreateProfileScreen', () => {
  function setup(registerResult: { ok: boolean; message?: string } = { ok: true }) {
    const register = jest.fn().mockResolvedValue(registerResult);
    const navigation = { replace: jest.fn(), goBack: jest.fn() };
    mockedUseAuth.mockReturnValue({
      user: null,
      token: null,
      login: jest.fn(),
      register,
      logout: jest.fn(),
      refreshUser: jest.fn(),
      updateProfile: jest.fn(),
    });

    const screen = render(<CreateProfileScreen navigation={navigation} />);
    return { screen, navigation, register };
  }

  it('shows validation error when required fields are missing', async () => {
    const { screen, register } = setup();

    fireEvent.press(screen.getByText('Create account'));

    await waitFor(() => {
      expect(screen.getByText('Username is required')).toBeTruthy();
    });
    expect(register).not.toHaveBeenCalled();
  });

  it('submits valid payload and navigates to Main', async () => {
    const { screen, navigation, register } = setup({ ok: true });

    fireEvent.changeText(screen.getByPlaceholderText('johndoe123'), ' john ');
    fireEvent.changeText(screen.getByPlaceholderText('••••••••'), 'pass123');
    fireEvent.changeText(screen.getByPlaceholderText('you@example.com'), ' john@mail.com ');
    fireEvent.changeText(screen.getByPlaceholderText('John'), ' John ');
    fireEvent.changeText(screen.getByPlaceholderText('Doe'), ' Doe ');
    fireEvent.changeText(screen.getByPlaceholderText('28'), '28');
    fireEvent.press(screen.getByText('Create account'));

    await waitFor(() => {
      expect(register).toHaveBeenCalledWith({
        username: 'john',
        password: 'pass123',
        email: 'john@mail.com',
        firstName: 'John',
        lastName: 'Doe',
        age: 28,
      });
      expect(navigation.replace).toHaveBeenCalledWith('Main');
    });
  });

  it('shows API error when register fails', async () => {
    const { screen, navigation } = setup({ ok: false, message: 'Username exists' });

    fireEvent.changeText(screen.getByPlaceholderText('johndoe123'), 'john');
    fireEvent.changeText(screen.getByPlaceholderText('••••••••'), 'pass123');
    fireEvent.changeText(screen.getByPlaceholderText('you@example.com'), 'john@mail.com');
    fireEvent.changeText(screen.getByPlaceholderText('John'), 'John');
    fireEvent.changeText(screen.getByPlaceholderText('Doe'), 'Doe');
    fireEvent.changeText(screen.getByPlaceholderText('28'), '28');
    fireEvent.press(screen.getByText('Create account'));

    await waitFor(() => {
      expect(screen.getByText('Username exists')).toBeTruthy();
    });
    expect(navigation.replace).not.toHaveBeenCalled();
  });

  it('goes back when back icon is pressed', () => {
    const { screen, navigation } = setup();

    fireEvent.press(screen.getByText('‹'));

    expect(navigation.goBack).toHaveBeenCalled();
  });
});

