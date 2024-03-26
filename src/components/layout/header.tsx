import logo from '@/assets/logo.png';
import { MobileSidebar } from '@/components/layout/mobile-sidebar';
import { useSupabase } from '@/hooks/supabase/useSuperbase/useSuperbase';
import { useBoardStore } from '@/hooks/useBoardStore/useBoardStore';
import { usePageStore } from '@/hooks/usePageStore/usePageStore';
import { useUserSessionStore } from '@/hooks/useUserSessionStore/useUserSessionStore';
import { Button } from '@/ui/button';
import { Separator } from '@/ui/separator';
import { cn } from '@/utils';
import { AuthSession } from '@supabase/supabase-js';
import { Gitlab } from 'lucide-react';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { DarkMode } from '../toggles/dark-mode/dark-mode';
import { UserNav } from './user-nav';

export const Header = () => {
    const [setPage] = usePageStore((state) => [state.setPage]);
    const [board, boards] = useBoardStore((state) => [
        state.board,
        state.boards,
    ]);
    const { t } = useTranslation();
    const { auth } = useSupabase();
    const { user, setSession, setUser } = useUserSessionStore();

    useEffect(() => {
        auth.onAuthStateChange(
            (_event: string, session: AuthSession | null) => {
                setSession(session);
                session != null ? setUser(session?.user) : setUser(undefined);
            }
        );
    }, []);

    const handleLogoClick = () => {
        setPage(
            !('id' in board) || boards.length === 0
                ? 'landingPage'
                : 'boardDefaultPage'
        );
    };
    return (
        <div className="supports-backdrop-blur:bg-background/60 border-b bg-background/95 backdrop-blur">
            <nav className="flex h-16 items-center justify-between px-4">
                <button
                    className="hidden items-center justify-between gap-2 md:flex"
                    onClick={handleLogoClick}
                >
                    <img
                        src={logo}
                        alt="Dayplanner Logo"
                        className="h-10 w-10"
                    ></img>
                    <h1 className="text-lg font-medium">Dayplanner</h1>
                </button>
                <div className={cn('block md:!hidden')}>
                    <MobileSidebar />
                </div>

                <div className="flex items-center gap-2 h-8">
                    <a
                        href="https://gitlab.com/Kevin.Hahn/dayplanner"
                        title={`Follow the project on GitLab. Git Commit - ${
                            import.meta.env.VITE_APP_VERSION
                        }`}
                    >
                        <Button
                            size={'sm'}
                            variant={'ghost'}
                            className="hover:text-[#FC6D27]"
                        >
                            <div className="flex gap-2 items-center">
                                <Gitlab height={18} width={18} />
                                {t('components.Header.gitlab')}
                            </div>
                        </Button>
                    </a>
                    <Separator orientation="vertical" />
                    <DarkMode />
                    {user != null ? (
                        <UserNav />
                    ) : (
                        <Button
                            size={'sm'}
                            onClick={() => {
                                setPage('loginPage');
                            }}
                        >
                            {t('components.Login.login')}
                        </Button>
                    )}
                </div>
            </nav>
        </div>
    );
};
