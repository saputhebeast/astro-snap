/**
 * @jest-environment jsdom
 */

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import {Button} from "@/components/ui/button.jsx";

describe('Button Component', () => {
    it('renders the button with default props', () => {
        render(<Button>Click me</Button>);
        const button = screen.getByRole('button', { name: 'Click me' });
        expect(button).toBeInTheDocument();
        expect(button).toHaveClass('bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2');
    });

    it('renders a destructive button', () => {
        render(<Button variant="destructive">Delete</Button>);
        const button = screen.getByRole('button', { name: 'Delete' });
        expect(button).toHaveClass('bg-destructive text-destructive-foreground hover:bg-destructive/90');
    });

    it('renders a small button', () => {
        render(<Button size="sm">Small Button</Button>);
        const button = screen.getByRole('button', { name: 'Small Button' });
        expect(button).toHaveClass('h-9 rounded-md px-3');
    });

    it('responds to click events', () => {
        const handleClick = jest.fn();
        render(<Button onClick={handleClick}>Clickable</Button>);
        const button = screen.getByRole('button', { name: 'Clickable' });
        fireEvent.click(button);
        expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('uses a custom component via the asChild prop', () => {
        const TestComp = ({ children }) => <div role="button">{children}</div>;
        render(<Button asChild><TestComp>Custom Component</TestComp></Button>);
        const button = screen.getByRole('button', { name: 'Custom Component' });
        expect(button).toBeInTheDocument();
    });
});
