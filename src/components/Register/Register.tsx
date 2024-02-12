import { Button } from '@/ui/button';
import { GithubLogo } from './assets/GithubLogo';
import { GoogleLogo } from './assets/GoogleLogo';
import { RegisterIllustration } from './assets/RegisterIllustration';

import { type IdentityProvider } from '@/types/IdentityProviders';
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

export const Register = () => {
    const { t } = useTranslation();

    const formSchema = z.object({
        username: z.string().min(2, {
            message: 'Username must be at least 2 characters.',
        }),
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
            username: '',
            email: '',
            password: '',
        },
    });

    const onSubmit = (values: z.infer<typeof formSchema>) => {
        // Do something with the form values.
        // ✅ This will be type-safe and validated.
        console.log(values);
    };

    const handleIdentityProviderSignUp = (provider: IdentityProvider) => {
        console.log(provider);
    };

    return (
        <div className="flex h-screen">
            <div className="hidden lg:flex items-center justify-center flex-1 text-black bg-gray-700">
                <div className="max-w-md text-center">
                    {RegisterIllustration}
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
                        <div className="w-full lg:w-1/2 mb-2 lg:mb-0">
                            <Button
                                type="button"
                                className="flex gap-2"
                                onClick={() => {
                                    handleIdentityProviderSignUp('google');
                                }}
                            >
                                {GoogleLogo}
                                {t('components.Register.signUpGoogle')}
                            </Button>
                        </div>
                        <div className="w-full lg:w-1/2 ml-0 lg:ml-2">
                            <Button
                                type="button"
                                className="flex gap-2"
                                onClick={() =>
                                    handleIdentityProviderSignUp('github')
                                }
                            >
                                {GithubLogo}
                                {t('components.Register.signUpGithub')}
                            </Button>
                        </div>
                    </div>
                    <div className="mt-4 text-sm text-gray-500 text-center">
                        <p>{t('components.Register.signUpEmail')}</p>
                    </div>

                    <Form {...form}>
                        <form
                            onSubmit={() => form.handleSubmit(onSubmit)}
                            className="flex flex-col gap-3"
                        >
                            <FormField
                                control={form.control}
                                name="username"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>
                                            {t('components.Register.username')}
                                        </FormLabel>
                                        <FormControl>
                                            <Input {...field} />
                                        </FormControl>
                                        {/* <FormDescription>
                                            This is your public display name.
                                        </FormDescription> */}
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>
                                            {t('components.Register.email')}
                                        </FormLabel>
                                        <FormControl>
                                            <Input {...field} />
                                        </FormControl>
                                        {/* <FormDescription>
                                            Your email to connect your account
                                            to.
                                        </FormDescription> */}
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
                                            {t('components.Register.password')}
                                        </FormLabel>
                                        <FormControl>
                                            <Input {...field} type="password" />
                                        </FormControl>
                                        {/* <FormDescription>
                                            Set a secure password.
                                        </FormDescription> */}
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <Button className="w-full mt-6" type="submit">
                                {t('components.Register.signUp')}
                            </Button>
                        </form>
                    </Form>

                    <div className="mt-4 text-sm text-gray-300 text-center">
                        <p>
                            {t('components.Register.alreadyHaveAccount')}
                            <a
                                href="#"
                                className="ml-2 hover:underline hover:text-primary"
                            >
                                {t('components.Register.loginHere')}
                            </a>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};
