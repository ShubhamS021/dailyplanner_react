import { AppPage } from '@/hooks/usePageStore/types/AppPage';
import { usePageStore } from '@/hooks/usePageStore/usePageStore';
import { act, render, renderHook } from '@testing-library/react';
import { t } from 'i18next';
import { expect, test } from 'vitest';
import App from './app';

describe('App component', () => {
    test('checks all titles in the app', () => {
        // Arrange
        const { result: pageStore } = renderHook(() => usePageStore());
        const pageDefinitions: Array<{ page: AppPage; titleKey: string }> = [
            { page: 'boardChoosePage', titleKey: 'components.MyBoards.title' },
            { page: 'boardCreatePage', titleKey: 'components.board-add.title' },
            // {
            //     page: 'boardCustomLanesPage',
            //     titleKey: 'components.MyBoardLanes.define',
            // },
            // { page: 'boardDefaultPage', titleKey: '' },
            // { page: 'boardHistoryPage', titleKey: '' },
            { page: 'loginPage', titleKey: 'components.Login.login' },
            { page: 'registerPage', titleKey: 'components.Register.signUp' },
        ];

        pageDefinitions.forEach((definition) => {
            // Act
            const { getAllByText } = render(<App />);
            act(() => {
                pageStore.current.setPage(definition.page);
            });

            // Assert
            expect(getAllByText(t(definition.titleKey)).length).toBeGreaterThan(
                0
            );
        });
    });
});
