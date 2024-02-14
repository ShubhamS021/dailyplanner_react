import { AppPage } from '@/hooks/usePageStore/types/AppPage';
import { type LucideIcon } from 'lucide-react';

export interface NavItem {
    title: string;
    page: AppPage;
    icon: LucideIcon;
    color?: string;
    isChidren?: boolean;
    children?: NavItem[];
}
