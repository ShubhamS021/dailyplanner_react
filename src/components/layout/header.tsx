import logo from '@/assets/logo.png';
import { MobileSidebar } from '@/components/layout/mobile-sidebar';
import { usePageStore } from '@/hooks/usePageStore/usePageStore';
import { Button } from '@/ui/button';
import { Separator } from '@/ui/separator';
import { cn } from '@/utils';
import { Gitlab } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { DarkMode } from '../toggles/dark-mode/dark-mode';

export const Header = () => {
    const [setPage] = usePageStore((state) => [state.setPage]);
    const { t } = useTranslation();

    return (
        <div className="supports-backdrop-blur:bg-background/60 fixed left-0 right-0 top-0 z-20 border-b bg-background/95 backdrop-blur">
            <nav className="flex h-16 items-center justify-between px-4">
                <div className="hidden items-center justify-between gap-2 md:flex">
                    <img
                        src={logo}
                        alt="Dayplanner Logo"
                        className="h-10 w-10"
                    ></img>
                    <h1 className="text-lg font-medium">Dayplanner</h1>
                </div>
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
                    {/* {sessionData?.user ? (
                        <UserNav user={sessionData.user} />
                    ) : ( */}
                    <Button
                        size={'sm'}
                        onClick={() => {
                            setPage('loginPage');
                        }}
                    >
                        {t('components.Login.login')}
                    </Button>
                    {/* )} */}
                </div>
            </nav>
        </div>
    );
};
