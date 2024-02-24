import { useSupabaseAuth } from '@/hooks/supabase/useSupabaseAuth/useSupabaseAuth';
import { IdentityProvider } from '@/types/IdentityProviders';
import { Button } from '@/ui/button';
import { useTranslation } from 'react-i18next';
import { GithubLogo } from '../assets/GithubLogo';
import { GoogleLogo } from '../assets/GoogleLogo';

export type IdentityProviderButtonType = 'login' | 'register';

export interface IdentityProviderButtonProps {
    provider: IdentityProvider;
}

export const IdentityProviderButton: React.FC<IdentityProviderButtonProps> = ({
    provider,
}) => {
    const { t } = useTranslation();
    const { signInWithOAuth } = useSupabaseAuth();

    const signInWithOAuthProvider = async () => {
        await signInWithOAuth({ provider });
    };

    const renderButtonContent = () => {
        switch (provider) {
            case 'google':
                return (
                    <>
                        {GoogleLogo}
                        {t('components.Login.loginGoogle')}
                    </>
                );
            case 'github':
                return (
                    <>
                        {GithubLogo}
                        {t('components.Login.loginGithub')}
                    </>
                );
            default:
                throw new Error('Identity provider not supported.');
        }
    };

    return (
        <Button
            type="button"
            className="flex gap-2 hover:bg-primary hover:text-primary-foreground hover:fill-primary-foreground"
            variant={'secondary'}
            data-testid="provider-button"
            onClick={() => {
                void signInWithOAuthProvider();
            }}
        >
            {renderButtonContent()}
        </Button>
    );
};
