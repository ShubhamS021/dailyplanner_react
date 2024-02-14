import { NavItem } from '@/types/NavItem.type';
import { BookOpenCheck, LayoutDashboard } from 'lucide-react';

export const NavItems: NavItem[] = [
    {
        title: 'My Boards',
        icon: LayoutDashboard,
        page: 'boardChoosePage',
        color: 'text-sky-500',
    },
    {
        title: 'History',
        icon: BookOpenCheck,
        page: 'boardHistoryPage',
        color: 'text-grey-500',
        // isChidren: true,
        // children: [
        //     {
        //         title: 'Example-01',
        //         icon: BookOpenCheck,
        //         color: 'text-red-500',
        //         href: '/example/employees',
        //     },
        //     {
        //         title: 'Example-02',
        //         icon: BookOpenCheck,
        //         color: 'text-red-500',
        //         href: '/example/example-02',
        //     },
        //     {
        //         title: 'Example-03',
        //         icon: BookOpenCheck,
        //         color: 'text-red-500',
        //         href: '/example/example-03',
        //     },
        // ],
    },
];
