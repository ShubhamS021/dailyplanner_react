import { LoginIllustration } from '../assets/LoginIllustration';
import * as IdentityProviderButtons from '../config/identityProviders.config.json';

import { usePageStore } from '@/hooks/usePageStore/usePageStore';
import { IdentityProvider } from '@/types/IdentityProviders';
import { useTranslation } from 'react-i18next';
import { LoginForm } from '../forms/login-form';
import { IdentityProviderButton } from './identity-provider-button';

export const Login = () => {
    const [setPage] = usePageStore((state) => [state.setPage]);
    const { t } = useTranslation();

    return (
        <div className="flex h-screen">
            <div className="hidden lg:flex items-center justify-center flex-1 text-black bg-gray-700">
                <div className="max-w-md text-center">{LoginIllustration}</div>
            </div>

            <div className="w-full bg-[#F8F8F8] dark:bg-[#212932] lg:w-1/2 flex items-center justify-center">
                <div className="max-w-md w-full p-6">
                    <h1 className="text-3xl font-semibold mb-6 text-grey-300 text-center">
                        {t('components.Login.login')}
                    </h1>
                    <div className="text-sm font-semibold mb-6 text-gray-500 text-center">
                        {t('components.Login.loginProvider')}
                    </div>
                    <div className="mt-4 flex flex-col lg:flex-row items-center justify-between">
                        <div className="w-full flex flex-row gap-1 place-content-evenly">
                            {(
                                IdentityProviderButtons.availableProviders as Array<{
                                    id: number;
                                    name: IdentityProvider;
                                }>
                            ).map((provider) => {
                                return (
                                    <IdentityProviderButton
                                        provider={provider.name}
                                        key={`${provider.id}-${provider.name}-login`}
                                    />
                                );
                            })}
                        </div>
                    </div>
                    <div className="mt-4 text-sm text-gray-500 text-center">
                        <p>{t('components.Login.loginEmail')}</p>
                    </div>

                    <LoginForm />

                    <div className="mt-4 text-sm text-gray-300 text-center">
                        <p>
                            {t('components.Login.noAccount')}
                            <button
                                className="ml-2 hover:underline hover:text-primary"
                                data-testid="register-button"
                                onClick={() => {
                                    setPage('registerPage');
                                }}
                            >
                                {t('components.Login.registerHere')}
                            </button>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};
