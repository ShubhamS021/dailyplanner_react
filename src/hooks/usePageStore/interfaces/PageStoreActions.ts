import { AppPage } from '@/hooks/usePageStore/types/AppPage';

export interface PageStoreActions {
    setPage: (page: AppPage) => void;
}
