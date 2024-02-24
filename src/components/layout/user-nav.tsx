import { Avatar, AvatarFallback, AvatarImage } from '@/ui/avatar';
import { LifeBuoy, LogOut, Route, Settings, User } from 'lucide-react';

import { useSupabase } from '@/hooks/supabase/useSuperbase/useSuperbase';
import { useUserSessionStore } from '@/hooks/useUserSessionStore/useUserSessionStore';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/ui/dropdown-menu';

import { toast } from '@/ui/use-toast';
import { url } from 'gravatar';
import { t } from 'i18next';
import { useEffect, useState } from 'react';

export const UserNav = () => {
    const { auth } = useSupabase();
    const { user } = useUserSessionStore();
    const [gravatar, setGravatar] = useState<string>('');

    const onSignOut = async () => {
        await auth.signOut();
        toast({
            title: t('components.user-nav.signOut.title'),
            description: t('components.user-nav.signOut.description'),
        });
    };

    useEffect(() => {
        const avatarUrl = url(user?.email ?? '', { protocol: 'https' });
        setGravatar(avatarUrl);
    }, [user]);

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Avatar className="hover:cursor-pointer hover:ring-2 hover:ring-primary">
                    {gravatar !== '' && <AvatarImage src={gravatar} />}

                    <AvatarFallback>
                        <User
                            width={24}
                            height={24}
                            className="stroke-primary stroke-1"
                        />
                    </AvatarFallback>
                </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
                <DropdownMenuLabel>
                    <div>{t('components.user-nav.myaccount')}</div>
                    <div className="text-xs text-muted-foreground">
                        {user?.email}
                    </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                    {/* <DropdownMenuItem>
                        <User className="mr-2 h-4 w-4" />
                        <span>Profile</span>
                        <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
                    </DropdownMenuItem> */}
                    {/* <DropdownMenuItem>
                        <CreditCard className="mr-2 h-4 w-4" />
                        <span>Billing</span>
                        <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
                    </DropdownMenuItem> */}
                    <DropdownMenuItem disabled>
                        <Settings className="mr-2 h-4 w-4" />
                        <span>{t('components.user-nav.settings')}</span>
                        {/* <DropdownMenuShortcut>⌘S</DropdownMenuShortcut> */}
                    </DropdownMenuItem>
                    {/* <DropdownMenuItem>
                        <Keyboard className="mr-2 h-4 w-4" />
                        <span>Keyboard shortcuts</span>
                        <DropdownMenuShortcut>⌘K</DropdownMenuShortcut>
                    </DropdownMenuItem> */}
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                {/* <DropdownMenuGroup>
                    <DropdownMenuItem>
                        <Users className="mr-2 h-4 w-4" />
                        <span>Team</span>
                    </DropdownMenuItem>
                    <DropdownMenuSub>
                        <DropdownMenuSubTrigger>
                            <UserPlus className="mr-2 h-4 w-4" />
                            <span>Invite users</span>
                        </DropdownMenuSubTrigger>
                        <DropdownMenuPortal>
                            <DropdownMenuSubContent>
                                <DropdownMenuItem>
                                    <Mail className="mr-2 h-4 w-4" />
                                    <span>Email</span>
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                    <MessageSquare className="mr-2 h-4 w-4" />
                                    <span>Message</span>
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem>
                                    <PlusCircle className="mr-2 h-4 w-4" />
                                    <span>More...</span>
                                </DropdownMenuItem>
                            </DropdownMenuSubContent>
                        </DropdownMenuPortal>
                    </DropdownMenuSub>
                    <DropdownMenuItem>
                        <Plus className="mr-2 h-4 w-4" />
                        <span>New Team</span>
                        <DropdownMenuShortcut>⌘+T</DropdownMenuShortcut>
                    </DropdownMenuItem>
                </DropdownMenuGroup> */}
                {/* <DropdownMenuSeparator /> */}
                <DropdownMenuItem disabled>
                    <Route className="mr-2 h-4 w-4" />
                    <span>{t('components.user-nav.tour')}</span>
                </DropdownMenuItem>
                <DropdownMenuItem disabled>
                    <LifeBuoy className="mr-2 h-4 w-4" />
                    <span>{t('components.user-nav.support')}</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                {/* eslint-disable @typescript-eslint/no-misused-promises */}
                <DropdownMenuItem onClick={onSignOut}>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>{t('components.user-nav.signOut.signOut')}</span>
                    {/* <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut> */}
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};
