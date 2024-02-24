import { render } from '@testing-library/react';
import { t } from 'i18next';
import { expect, test } from 'vitest';
import { Login } from './login';

describe('Login', () => {
    test('renders login heading', () => {
        const { getByRole } = render(<Login />);
        const heading = getByRole('heading', {
            name: t('components.Login.login'),
        });
        expect(heading).toBeInTheDocument();
    });

    test('renders login with provider text', () => {
        const { getByText } = render(<Login />);
        const text = getByText(t('components.Login.loginProvider'));
        expect(text).toBeInTheDocument();
    });

    test('renders identity provider buttons', () => {
        const { getAllByTestId } = render(<Login />);
        const buttons = getAllByTestId('provider-button');
        expect(buttons).toHaveLength(2);
    });

    test('renders login with email text', () => {
        const { getByText } = render(<Login />);
        const text = getByText(t('components.Login.loginEmail'));
        expect(text).toBeInTheDocument();
    });

    test('renders login form', () => {
        const { getByTestId } = render(<Login />);
        const form = getByTestId('login-form');
        expect(form).toBeInTheDocument();
    });

    test('renders register link', () => {
        const { getByTestId, getByText } = render(<Login />);
        const button = getByTestId('register-button');
        const text = getByText(t('components.Login.registerHere'));
        expect(button).toBeInTheDocument();
        expect(text).toBeInTheDocument();
    });
});
