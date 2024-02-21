import { NavItems } from '@/components/layout/constants/side-nav';
import { SideNav } from '@/components/layout/side-nav';
import { useState } from 'react';

import { useSidebarStore } from '@/hooks/useSidebarStore/useSidebarStore';
import { cn } from '@/utils';
import { BsArrowLeftShort } from 'react-icons/bs';
import { LanguageChooser } from '../common/language-chooser/language-chooser';

interface SidebarProps {
    className?: string;
}

export const Sidebar: React.FC<SidebarProps> = ({ className }) => {
    const { isOpen, toggle } = useSidebarStore();
    const [status, setStatus] = useState(false);

    const handleToggle = () => {
        setStatus(true);
        toggle();
        setTimeout(() => setStatus(false), 500);
    };
    return (
        <nav
            className={cn(
                `relative hidden h-screen border-r pt-20 md:block`,
                status && 'duration-500',
                // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
                isOpen ? 'w-72' : 'w-[78px]',
                className
            )}
        >
            <BsArrowLeftShort
                className={cn(
                    'absolute -right-3 top-20 cursor-pointer rounded-full border bg-background text-3xl text-foreground',
                    // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
                    !isOpen && 'rotate-180'
                )}
                onClick={handleToggle}
            />
            <div className="h-full space-y-4 py-4">
                <div className="px-3 py-2 h-full grid grid-rows-[1fr,auto]">
                    <div className="mt-3 space-y-1">
                        <SideNav
                            className="text-background opacity-0 transition-all duration-300 group-hover:z-50 group-hover:ml-4 group-hover:rounded group-hover:bg-foreground group-hover:p-2 group-hover:opacity-100"
                            items={NavItems}
                        />
                    </div>
                    <div className="flex items-center justify-center">
                        <LanguageChooser small={!isOpen} />
                    </div>
                </div>
            </div>
        </nav>
    );
};
