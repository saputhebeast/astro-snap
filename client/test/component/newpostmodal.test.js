/**
 * @jest-environment jsdom
 */

import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import NewPostModal from "@/components/common/NewPostModal.jsx";

describe('NewPostModal', () => {
    test('renders and can submit a new post', () => {
        const handleClose = jest.fn();
        const handleSetNewPost = jest.fn();
        const handleSubmit = jest.fn();
        const newPost = 'Test Post';

        render(<NewPostModal onClose={handleClose} newPost={newPost} setNewPost={handleSetNewPost} onSubmit={handleSubmit} />);

        const input = screen.getByRole('textbox');
        fireEvent.change(input, { target: { value: 'New test post' } });
        expect(input.value).toBe('New test post');

        const submitButton = screen.getByRole('button', { name: /Here we goo/i });  // Updated to match the actual button name
        fireEvent.click(submitButton);
        expect(handleSubmit).toHaveBeenCalled();
    });
});
