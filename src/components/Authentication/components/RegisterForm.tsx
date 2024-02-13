import { useSupabaseAuth } from '@/hooks/supabase/useSupabaseAuth/useSupabaseAuth';
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

export const RegisterForm = () => {
    const { signUp } = useSupabaseAuth();

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

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        console.log(values);

        const signUpReseponse = await signUp({
            email: values.email,
            password: values.password,
            options: { data: { username: values.username } },
        });

        console.log(signUpReseponse);
    };
    return (
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
