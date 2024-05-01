/**
 * @jest-environment jsdom
 */

import { render } from '@testing-library/react';
import React from "react";
import {Label} from "@/components/ui/label.jsx";
import '@testing-library/jest-dom';

describe('Label component', () => {
    test('renders label text correctly', () => {
        const labelText = 'Email';
        const { getByText } = render(<Label>{labelText}</Label>);
        expect(getByText(labelText)).toBeInTheDocument();
    });

    test('applies additional className', () => {
        const additionalClassName = 'custom-class';
        const { container } = render(<Label className={additionalClassName}>Label</Label>);
        expect(container.firstChild).toHaveClass(additionalClassName);
    });

    test('applies styles for disabled state', () => {
        const { container, rerender } = render(<Label disabled>Label</Label>);
        expect(container.firstChild).toHaveClass('peer-disabled:cursor-not-allowed');
        expect(container.firstChild).toHaveClass('peer-disabled:opacity-70');

        rerender(<Label disabled={false}>Label</Label>);
        expect(container.firstChild).toHaveClass('text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70');
    });

});
