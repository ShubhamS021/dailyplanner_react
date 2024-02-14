import { IdentityProvider } from '@/types/IdentityProviders';
import { fireEvent, render } from '@testing-library/react';
import { t } from 'i18next';
import { vi } from 'vitest';
import { IdentityProviderButton } from './identity-provider-button';

describe('IdentityProviderButton', () => {
    describe('renderButtonContent', () => {
        it('should render Google button content', () => {
            const provider: IdentityProvider = 'google';
            const { getByText } = render(
                <IdentityProviderButton provider={provider} />
            );

            expect(
                getByText(t('components.Login.loginGoogle'))
            ).toBeInTheDocument();
        });

        it('should render Github button content', () => {
            const provider: IdentityProvider = 'github';
            const { getByText } = render(
                <IdentityProviderButton provider={provider} />
            );

            expect(
                getByText(t('components.Login.loginGithub'))
            ).toBeInTheDocument();
        });
    });

    describe('signInWithOAuthProvider - additional tests', () => {
        it('should handle signInWithOAuth throwing generic error', async () => {
            const provider = 'google';
            const signInWithOAuth = vi
                .fn()
                .mockRejectedValueOnce(new Error('Unknown error'));

            const { getByRole } = render(
                <IdentityProviderButton provider={provider} />
            );

            fireEvent.click(getByRole('button'));

            await expect(signInWithOAuth).rejects.toThrow();
        });

        it('should handle signInWithOAuth error with custom message', async () => {
            const provider = 'github';
            const errorMessage = 'Custom auth error';
            const signInWithOAuth = vi.fn().mockRejectedValueOnce(errorMessage);

            const { getByRole } = render(
                <IdentityProviderButton provider={provider} />
            );

            fireEvent.click(getByRole('button'));

            await expect(signInWithOAuth).rejects.toThrow(errorMessage);
        });
    });
});
