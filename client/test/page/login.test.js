/**
 * @jest-environment jsdom
 */

import React from 'react';
import '@testing-library/jest-dom'
import { render, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { loginUser } from '@/services/auth.js';
import Login from "@/pages/Login.jsx";

jest.mock('@/services/auth.js', () => ({
    loginUser: jest.fn(),
}));

jest.mock('@/assets/nasa.jpg');

describe('Login component', () => {
    it('should render the login form', () => {
        const { getByText, getByPlaceholderText } = render(
            <Router>
                <Login />
            </Router>
        );
        expect(getByText('Login')).toBeInTheDocument();
        expect(getByPlaceholderText('Enter your email')).toBeInTheDocument();
        expect(getByPlaceholderText('Enter your password')).toBeInTheDocument();
        expect(getByText('Login')).toBeInTheDocument();
        expect(getByText('Dont have an account?')).toBeInTheDocument();
    });

    it('should call loginUser when form is submitted with valid credentials', async () => {
        const email = 'test@example.com';
        const password = 'password';
        const token = 'mockToken';

        loginUser.mockResolvedValueOnce(token);

        const { getByPlaceholderText, getByText } = render(
            <Router>
                <Login />
            </Router>
        );

        fireEvent.change(getByPlaceholderText('Enter your email'), { target: { value: email } });
        fireEvent.change(getByPlaceholderText('Enter your password'), { target: { value: password } });

        fireEvent.click(getByText('Login'));

        await waitFor(() => expect(loginUser).toHaveBeenCalled());

        expect(localStorage.setItem).toHaveBeenCalledWith('token', token);
    });
});
