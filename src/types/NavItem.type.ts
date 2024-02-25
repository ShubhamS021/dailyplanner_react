import { type AppPage } from '@/hooks/usePageStore/types/AppPage';
import { type LucideIcon } from 'lucide-react';

export interface NavItem {
    title: string;
    page: AppPage;
    icon: LucideIcon;
    color?: string;
    disabledBy?: 'boardsEmpty';
    isChildren?: boolean;
    children?: NavItem[];
}
