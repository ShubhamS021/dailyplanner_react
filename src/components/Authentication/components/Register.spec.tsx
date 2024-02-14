import { render } from '@testing-library/react';
import { t } from 'i18next';
import { Register } from './register';

describe('Register', () => {
    it('renders register heading', () => {
        const { getByRole } = render(<Register />);
        const heading = getByRole('heading', {
            name: t('components.Register.signUp'),
        });
        expect(heading).toBeInTheDocument();
    });

    it('renders register with provider text', () => {
        const { getByText } = render(<Register />);
        const text = getByText(t('components.Register.signUpProvider'));
        expect(text).toBeInTheDocument();
    });

    it('renders identity provider buttons', () => {
        const { getAllByTestId } = render(<Register />);
        const buttons = getAllByTestId('provider-button');
        expect(buttons).toHaveLength(2);
    });

    it('renders register with email text', () => {
        const { getByText } = render(<Register />);
        const text = getByText(t('components.Register.signUpEmail'));
        expect(text).toBeInTheDocument();
    });

    it('renders register form', () => {
        const { getByTestId } = render(<Register />);
        const form = getByTestId('register-form');
        expect(form).toBeInTheDocument();
    });

    it('renders login link', () => {
        const { getByRole } = render(<Register />);
        const link = getByRole('button', {
            name: t('components.Register.loginHere'),
        });
        expect(link).toBeInTheDocument();
    });
});
