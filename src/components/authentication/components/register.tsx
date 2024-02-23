import { RegisterIllustration } from '../assets/RegisterIllustration';
import * as IdentityProviderButtons from '../config/identityProviders.config.json';

import { usePageStore } from '@/hooks/usePageStore/usePageStore';
import { type IdentityProvider } from '@/types/IdentityProviders';
import { Button } from '@/ui/button';
import { ArrowLeft } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { RegisterForm } from '../forms/register-form';
import { IdentityProviderButton } from './identity-provider-button';

export const Register = () => {
    const [setPage] = usePageStore((state) => [state.setPage]);
    const { t } = useTranslation();

    return (
        <div className="flex h-screen">
            <div className="flex gap-2 items-center justify-center flex-1 text-black bg-gray-700">
                <div className="mx-3 text-white hover:text-primary">
                    <Button
                        onClick={() => setPage('boardChoosePage')}
                        variant={'ghost'}
                        title={t('components.Register.back')}
                    >
                        <ArrowLeft />
                    </Button>
                </div>
                <div className="hidden lg:flex items-center justify-center flex-1">
                    <div className="max-w-md text-center">
                        {RegisterIllustration}
                    </div>
                </div>
            </div>

            <div className="w-full bg-[#F8F8F8] dark:bg-[#212932] lg:w-1/2 flex items-center justify-center">
                <div className="max-w-md w-full p-6">
                    <h1 className="text-3xl font-semibold mb-6 text-grey-300 text-center">
                        {t('components.Register.signUp')}
                    </h1>
                    <div className="text-sm font-semibold mb-6 text-gray-500 text-center">
                        {t('components.Register.signUpProvider')}
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
                                        key={`${provider.id}-${provider.name}-register`}
                                    />
                                );
                            })}
                        </div>
                    </div>
                    <div className="mt-4 text-sm text-gray-500 text-center">
                        <p>{t('components.Register.signUpEmail')}</p>
                    </div>

                    <RegisterForm />

                    <div className="mt-4 text-sm text-secondary-foreground text-center">
                        <p>
                            {t('components.Register.alreadyHaveAccount')}
                            <button
                                className="ml-2 hover:underline hover:text-primary"
                                onClick={() => {
                                    setPage('loginPage');
                                }}
                            >
                                {t('components.Register.loginHere')}
                            </button>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};
