import { Button } from '@/ui/button';
import { LoginIllustration } from './assets/LoginIllustration';
import * as IdentityProviderButtons from './config/identityProviders.config.json';

import { IdentityProvider } from '@/types/IdentityProviders';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/ui/form';
import { Input } from '@/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { z } from 'zod';
import { IdentityProviderButton } from './IdentityProviderButton';

export const Login = () => {
    const { t } = useTranslation();

    const formSchema = z.object({
        email: z.string().email({
            message: 'Email must be at least 2 characters and a valid email.',
        }),
        password: z.string().min(8, {
            message: 'Password must be at least 8 characters.',
        }),
    });

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: '',
            password: '',
        },
    });

    const onSubmit = (values: z.infer<typeof formSchema>) => {
        // Do something with the form values.
        // ✅ This will be type-safe and validated.
        console.log(values);
    };

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
                                        buttonType="login"
                                    />
                                );
                            })}
                        </div>
                    </div>
                    <div className="mt-4 text-sm text-gray-500 text-center">
                        <p>{t('components.Login.loginEmail')}</p>
                    </div>

                    <Form {...form}>
                        <form
                            onSubmit={() => form.handleSubmit(onSubmit)}
                            className="flex flex-col gap-3"
                        >
                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>
                                            {t('components.Login.email')}
                                        </FormLabel>
                                        <FormControl>
                                            <Input {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="password"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>
                                            {t('components.Login.password')}
                                        </FormLabel>
                                        <FormControl>
                                            <Input {...field} type="password" />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <Button className="w-full mt-6" type="submit">
                                {t('components.Login.login')}
                            </Button>
                        </form>
                    </Form>

                    <div className="mt-4 text-sm text-gray-300 text-center">
                        <p>
                            {t('components.Login.noAccount')}
                            <a
                                href="#"
                                className="ml-2 hover:underline hover:text-primary"
                            >
                                {t('components.Login.loginHere')}
                            </a>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};
