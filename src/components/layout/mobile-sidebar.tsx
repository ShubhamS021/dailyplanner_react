import logo from '@/assets/logo.png';
import { NavItems } from '@/components/layout/constants/side-nav';
import { SideNav } from '@/components/layout/side-nav';
import { Sheet, SheetContent, SheetTrigger } from '@/ui/sheet';
import { MenuIcon } from 'lucide-react';
import { useEffect, useState } from 'react';

export const MobileSidebar = () => {
    const [open, setOpen] = useState(false);
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!isMounted) {
        return null;
    }

    return (
        <>
            <Sheet open={open} onOpenChange={setOpen}>
                <SheetTrigger asChild>
                    <div className="flex items-center justify-center gap-2">
                        <MenuIcon />
                        <img
                            src={logo}
                            alt="Dayplanner Logo"
                            className="h-10 w-10"
                        ></img>
                        <h1 className="text-lg font-medium">Dayplanner</h1>
                    </div>
                </SheetTrigger>
                <SheetContent side="left" className="w-72">
                    <div className="px-1 py-6 pt-16">
                        <SideNav items={NavItems} setOpen={setOpen} />
                    </div>
                </SheetContent>
            </Sheet>
        </>
    );
};
