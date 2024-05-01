/**
 * @jest-environment jsdom
 */

import React from "react";
import '@testing-library/jest-dom'
import { render, screen, fireEvent } from "@testing-library/react";
import Post from "@/components/common/Post";  // Adjust the import path as needed

describe('Post Component', () => {
    const mockPost = {
        id: 1,
        user: { name: 'John Doe' },
        photo_url: 'http://example.com/photo.jpg',
        caption: 'A beautiful sky!',
        isLiked: false,
        likes_count: 10
    };

    const mockOnLike = jest.fn();
    const mockOnBookmark = jest.fn();

    beforeEach(() => {
        render(<Post post={mockPost} onLike={mockOnLike} onBookmark={mockOnBookmark} />);
    });

    test('renders post information correctly', () => {
        expect(screen.getByText('John Doe')).toBeInTheDocument();
        expect(screen.getByText('A beautiful sky!')).toBeInTheDocument();
        expect(screen.getByText(/10 likes/i)).toBeInTheDocument();
        expect(screen.getByAltText('Sky')).toHaveAttribute('src', 'http://example.com/photo.jpg');
    });


    test('like button triggers onLike when clicked', () => {
        const likeButton = screen.getByText('❤️ 10 likes');
        fireEvent.click(likeButton);
        expect(mockOnLike).toHaveBeenCalledWith(mockPost.id);
    });

    test('displays the correct heart color based on like status', () => {
        const newMockPost = { ...mockPost, isLiked: true };
        render(<Post post={newMockPost} onLike={mockOnLike} onBookmark={mockOnBookmark} />);
        const likeButtons = screen.getAllByText(/❤️ 10 likes/i);
        const redLikeButton = likeButtons.find(button => button.classList.contains('text-red-600'));
        expect(redLikeButton).toBeTruthy();
    });
});
