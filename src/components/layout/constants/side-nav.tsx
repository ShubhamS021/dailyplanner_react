import { NavItem } from '@/types/NavItem.type';
import { History, Kanban, LayoutDashboard } from 'lucide-react';

export const NavItems: NavItem[] = [
    {
        title: 'components.side-nav.boards',
        icon: LayoutDashboard,
        page: 'boardChoosePage',
        color: 'text-grey-500',
    },
    {
        title: 'components.side-nav.board',
        icon: Kanban,
        page: 'boardDefaultPage',
        color: 'text-grey-500',
    },
    {
        title: 'components.side-nav.history',
        icon: History,
        page: 'boardHistoryPage',
        color: 'text-grey-500',
    },
];
