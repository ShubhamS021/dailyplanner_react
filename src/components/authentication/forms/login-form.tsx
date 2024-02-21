import { useSupabaseAuth } from '@/hooks/supabase/useSupabaseAuth/useSupabaseAuth';
import { usePageStore } from '@/hooks/usePageStore/usePageStore';
import { Button } from '@/ui/button';
import {
    Form,
    FormControl,
    FormDescription,
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
import { loginFormSchema } from './form.schema';

export const LoginForm = () => {
    const { t } = useTranslation();
    const { signInWithPassword } = useSupabaseAuth();
    const [setPage] = usePageStore((state) => [state.setPage]);

    const form = useForm<z.infer<typeof loginFormSchema>>({
        resolver: zodResolver(loginFormSchema),
        defaultValues: {
            email: '',
            password: '',
        },
    });

    const onSubmit = async (values: z.infer<typeof loginFormSchema>) => {
        const signInReseponse = await signInWithPassword({
            email: values.email,
            password: values.password,
        });

        setPage(
            signInReseponse.error === null ? 'boardDefaultPage' : 'loginPage'
        );
    };
    return (
        <Form {...form}>
            <form
                // ignore needed, as we're using the `zodResolver`
                // eslint-disable-next-line @typescript-eslint/no-misused-promises
                onSubmit={form.handleSubmit(onSubmit)}
                className="flex flex-col gap-3"
                data-testid="login-form"
            >
                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>{t('components.Login.email')}</FormLabel>
                            <FormControl>
                                <Input {...field} />
                            </FormControl>
                            <FormDescription>
                                {t('components.Login.emailExample')}
                            </FormDescription>
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
    );
};
