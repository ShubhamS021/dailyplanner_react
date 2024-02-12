import { IdentityProvider } from '@/types/IdentityProviders';
import { Button } from '@/ui/button';
import { useTranslation } from 'react-i18next';
import { GithubLogo } from './assets/GithubLogo';
import { GoogleLogo } from './assets/GoogleLogo';

export type IdentityProviderButtonType = 'login' | 'register';

export interface IdentityProviderButtonProps {
    provider: IdentityProvider;
    buttonType: IdentityProviderButtonType;
}

export const IdentityProviderButton: React.FC<IdentityProviderButtonProps> = ({
    provider,
    buttonType,
}) => {
    const { t } = useTranslation();

    const handleIdentityProviderLogin = () => {
        console.log('handleIdentityProviderLogin', provider, buttonType);

        throw new Error('Function not implemented.');
    };

    const handleIdentityProviderRegister = () => {
        console.log('handleIdentityProviderRegister', provider, buttonType);

        throw new Error('Function not implemented.');
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

    const handleButtonAction = () => {
        switch (buttonType) {
            case 'login':
                handleIdentityProviderLogin();
                break;
            case 'register':
                handleIdentityProviderRegister();
                break;
            default:
                throw new Error('Invalid buttonType.');
        }
    };

    return (
        <Button
            type="button"
            className="flex gap-2"
            onClick={() => {
                handleButtonAction();
            }}
        >
            {renderButtonContent()}
        </Button>
    );
};
