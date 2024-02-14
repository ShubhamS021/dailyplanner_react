import logo from '@/assets/logo.png';
import { MobileSidebar } from '@/components/layout/mobile-sidebar';
import { usePageStore } from '@/hooks/usePageStore/usePageStore';
import { Button } from '@/ui/button';
import { cn } from '@/utils/utils';
import { DarkMode } from '../toggles/dark-mode/dark-mode';

export default function Header() {
    const [setPage] = usePageStore((state) => [state.setPage]);

    return (
        <div className="supports-backdrop-blur:bg-background/60 fixed left-0 right-0 top-0 z-20 border-b bg-background/95 backdrop-blur">
            <nav className="flex h-16 items-center justify-between px-4">
                <div className="hidden items-center justify-between gap-2 md:flex">
                    <img
                        src={logo}
                        alt="Dayplanner Logo"
                        className="h-10 w-10"
                    ></img>
                    <h1 className="text-lg font-semibold">Dayplanner</h1>
                </div>
                <div className={cn('block md:!hidden')}>
                    <MobileSidebar />
                </div>

                <div className="flex items-center gap-2">
                    <DarkMode />
                    {/* {sessionData?.user ? (
                        <UserNav user={sessionData.user} />
                    ) : ( */}
                    <Button
                        size="sm"
                        onClick={() => {
                            setPage('loginPage');
                        }}
                    >
                        Sign In
                    </Button>
                    {/* )} */}
                </div>
            </nav>
        </div>
    );
}
