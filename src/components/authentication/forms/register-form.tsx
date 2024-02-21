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
import { t } from 'i18next';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { registerFormSchema } from './form.schema';

export const RegisterForm = () => {
    const { signUp } = useSupabaseAuth();
    const [setPage] = usePageStore((state) => [state.setPage]);

    const form = useForm<z.infer<typeof registerFormSchema>>({
        resolver: zodResolver(registerFormSchema),
        defaultValues: {
            username: '',
            email: '',
            password: '',
        },
    });

    const onSubmit = async (values: z.infer<typeof registerFormSchema>) => {
        const signUpReseponse = await signUp({
            email: values.email,
            password: values.password,
        });

        setPage(
            signUpReseponse.error === null ? 'boardDefaultPage' : 'registerPage'
        );
    };
    return (
        <Form {...form}>
            <form
                // ignore needed, as we're using the `zodResolver`
                // eslint-disable-next-line @typescript-eslint/no-misused-promises
                onSubmit={form.handleSubmit(onSubmit)}
                className="flex flex-col gap-3"
                data-testid="register-form"
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
                            <FormDescription>
                                {t('components.Register.emailExample')}
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
                                {t('components.Register.password')}
                            </FormLabel>
                            <FormControl>
                                <Input {...field} type="password" />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button className="w-full mt-6" type="submit">
                    {t('components.Register.signUp')}
                </Button>
            </form>
        </Form>
    );
};
