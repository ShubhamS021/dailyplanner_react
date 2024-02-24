import { NavItem } from '@/types/NavItem.type';
import { History, Kanban, LayoutDashboard } from 'lucide-react';

const DEFAULT_NAV_COLOR = 'text-grey-500';

export const NavItems: NavItem[] = [
    {
        title: 'components.side-nav.boards',
        icon: LayoutDashboard,
        page: 'boardChoosePage',
        color: DEFAULT_NAV_COLOR,
    },
    {
        title: 'components.side-nav.board',
        icon: Kanban,
        page: 'boardDefaultPage',
        disabledBy: 'boardsEmpty',
        color: DEFAULT_NAV_COLOR,
    },
    {
        title: 'components.side-nav.history',
        icon: History,
        page: 'boardHistoryPage',
        disabledBy: 'boardsEmpty',
        color: DEFAULT_NAV_COLOR,
    },
];
