/**
 * @jest-environment jsdom
 */

import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Icons } from "@/components/ui/Icons";

describe('Icons Component', () => {
    it('renders the logo icon correctly', () => {
        const { getByTestId } = render(<Icons.logo data-testid="logo-icon" />);
        const logoIcon = getByTestId('logo-icon');
        expect(logoIcon).toBeInTheDocument();
        expect(logoIcon).toHaveAttribute('viewBox', '0 0 256 256');
    });

    it('renders the twitter icon correctly', () => {
        const { getByTestId } = render(<Icons.twitter data-testid="twitter-icon" />);
        const twitterIcon = getByTestId('twitter-icon');
        expect(twitterIcon).toBeInTheDocument();
        expect(twitterIcon).toHaveAttribute('viewBox', '0 0 1200 1227');
    });

    it('renders the gitHub icon correctly', () => {
        const { getByTestId } = render(<Icons.gitHub data-testid="github-icon" />);
        const githubIcon = getByTestId('github-icon');
        expect(githubIcon).toBeInTheDocument();
        expect(githubIcon).toHaveAttribute('viewBox', '0 0 438.549 438.549');
    });
});
