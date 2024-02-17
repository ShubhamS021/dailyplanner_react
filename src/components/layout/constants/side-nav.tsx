import { NavItem } from '@/types/NavItem.type';
import { BookOpenText, LayoutDashboard } from 'lucide-react';

export const NavItems: NavItem[] = [
    {
        title: 'Boards',
        icon: LayoutDashboard,
        page: 'boardChoosePage',
        color: 'text-sky-500',
    },
    {
        title: 'History',
        icon: BookOpenText,
        page: 'boardHistoryPage',
        color: 'text-grey-500',
        // isChidren: true,
        // children: [
        //     {
        //         title: 'Example-01',
        //         icon: BookOpenCheck,
        //         color: 'text-red-500',
        //         page: 'boardCreatePage',
        //     },
        //     {
        //         title: 'Example-02',
        //         icon: BookOpenCheck,
        //         color: 'text-red-500',
        //         page: 'boardCustomLanesPage',
        //     },
        //     {
        //         title: 'Example-03',
        //         icon: BookOpenCheck,
        //         color: 'text-red-500',
        //         page: 'boardDefaultPage',
        //     },
        // ],
    },
];
