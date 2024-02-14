import { NavItems } from '@/components/layout/constants/side-nav';
import { SideNav } from '@/components/layout/side-nav';
import { useState } from 'react';

import { useSidebarStore } from '@/hooks/useSidebarStore/useSidebarStore';
import { cn } from '@/utils/utils';
import { BsArrowLeftShort } from 'react-icons/bs';

interface SidebarProps {
    className?: string;
}

export default function Sidebar({ className }: SidebarProps) {
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
            <div className="space-y-4 py-4">
                <div className="px-3 py-2">
                    <div className="mt-3 space-y-1">
                        <SideNav
                            className="text-background opacity-0 transition-all duration-300 group-hover:z-50 group-hover:ml-4 group-hover:rounded group-hover:bg-foreground group-hover:p-2 group-hover:opacity-100"
                            items={NavItems}
                        />
                    </div>
                </div>
            </div>
        </nav>
    );
}
