/**
 * @jest-environment jsdom
 */

import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import {Input} from "@/components/ui/input.jsx";

describe('Input component', () => {
    test('renders input element with correct props', () => {
        const { getByRole } = render(<Input type="text" placeholder="Enter text" />);
        const inputElement = getByRole('textbox');

        expect(inputElement).toBeInTheDocument();
        expect(inputElement).toHaveAttribute('type', 'text');
        expect(inputElement).toHaveAttribute('placeholder', 'Enter text');
    });

    test('applies additional className correctly', () => {
        const { getByRole } = render(<Input type="text" className="custom-class" />);
        const inputElement = getByRole('textbox');

        expect(inputElement).toHaveClass('custom-class');
    });

    test('calls onChange handler when input value changes', () => {
        const handleChange = jest.fn();
        const { getByRole } = render(<Input type="text" onChange={handleChange} />);
        const inputElement = getByRole('textbox');

        fireEvent.change(inputElement, { target: { value: 'test' } });

        expect(handleChange).toHaveBeenCalledTimes(1);
    });
});
