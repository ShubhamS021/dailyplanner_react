import { render } from '@testing-library/react';
import { t } from 'i18next';
import { Login } from './login';

describe('Login', () => {
    it('renders login heading', () => {
        const { getByRole } = render(<Login />);
        const heading = getByRole('heading', {
            name: t('components.Login.login'),
        });
        expect(heading).toBeInTheDocument();
    });

    it('renders login with provider text', () => {
        const { getByText } = render(<Login />);
        const text = getByText(t('components.Login.loginProvider'));
        expect(text).toBeInTheDocument();
    });

    it('renders identity provider buttons', () => {
        const { getAllByTestId } = render(<Login />);
        const buttons = getAllByTestId('provider-button');
        expect(buttons).toHaveLength(2);
    });

    it('renders login with email text', () => {
        const { getByText } = render(<Login />);
        const text = getByText(t('components.Login.loginEmail'));
        expect(text).toBeInTheDocument();
    });

    it('renders login form', () => {
        const { getByTestId } = render(<Login />);
        const form = getByTestId('login-form');
        expect(form).toBeInTheDocument();
    });

    it('renders register link', () => {
        const { getByTestId, getByText } = render(<Login />);
        const button = getByTestId('register-button');
        const text = getByText(t('components.Login.registerHere'));
        expect(button).toBeInTheDocument();
        expect(text).toBeInTheDocument();
    });
});
