import PageTitle from '@/components/page-title/page-title';
import { useBoardStore } from '@/hooks/useBoardStore/useBoardStore';
import { type HistoryListEntry } from '@/hooks/useHistory/interfaces/HistoryListEntry';
import { usePageStore } from '@/hooks/usePageStore/usePageStore';
import { ArrowLeftIcon } from '@/ui/Icons/Icons';
import { useTranslation } from 'react-i18next';

import { useHistory } from '@/hooks/useHistory/useHistory';
import { Table, TableBody, TableCell, TableHeader, TableRow } from '@/ui/table';

export const BoardHistory = () => {
    const [board] = useBoardStore((state) => [state.board]);

    const [setPage] = usePageStore((state) => [state.setPage]);

    const { history } = useHistory(board.id);

    const { t } = useTranslation();

    const handleBackToBoard = () => {
        setPage('boardDefaultPage');
    };

    const renderAdditionalData = (entry: HistoryListEntry) => {
        switch (entry.type) {
            case 'MOVEMENT':
                return `${t('components.BoardHistory.movedFrom')} ${
                    entry.data.laneStart ?? -1
                } ${t(`components.BoardHistory.movedTo`)} ${
                    entry.data.laneEnd ?? -1
                }`;
            case 'BOARDMOVEMENT':
                return `${t('components.BoardHistory.movedToBoard')} ${
                    entry.data.boardEnd ?? -1
                }`;
            case 'CREATION':
            case 'UPDATE':
            case 'DELETION':
            default:
                return '---';
        }
    };

    const renderNoData = () => {
        return <>{t('components.BoardHistory.noData')}</>;
    };

    const renderHistoryTable = () => {
        return (
            <div className="relative overflow-x-auto">
                <Table className="w-full text-left">
                    <TableHeader>
                        <TableRow>
                            <TableCell scope="col" className="px-6 pb-4">
                                {t('components.BoardHistory.time')}
                            </TableCell>
                            <TableCell scope="col" className="pb-4">
                                {t('components.BoardHistory.type')}
                            </TableCell>
                            <TableCell scope="col" className="pb-4">
                                {t('components.BoardHistory.data')}
                            </TableCell>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {history.map((h) => {
                            return (
                                <TableRow key={h.id} data-testid={h.type}>
                                    <TableCell
                                        scope="row"
                                        className="px-6 py-4"
                                    >
                                        {new Date(h.id).toLocaleString()}
                                    </TableCell>
                                    <TableCell className="py-4">
                                        {t(
                                            `components.BoardHistory.` +
                                                h.type.toLowerCase()
                                        )}
                                        <br />

                                        {`${t(
                                            `components.BoardHistory.additionaldata`
                                        )}: ${renderAdditionalData(h)}`}
                                    </TableCell>
                                    <TableCell className="py-4 max-w-[20vw]">
                                        {JSON.stringify(h.data.card)}
                                    </TableCell>
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </div>
        );
    };

    return (
        <div className="p-10">
            <div className="h-16 mb-6 grid grid-cols-[auto,1fr] items-center">
                <div
                    className="cursor-pointer mr-4 stroke-[#14161F] dark:stroke-[#DEDEDE]"
                    data-testid="btnBackToBoard"
                    onClick={() => {
                        handleBackToBoard();
                    }}
                >
                    <ArrowLeftIcon />
                </div>
                <PageTitle
                    title={`${t('components.BoardHistory.historyFor')} ${
                        board.title
                    }`}
                    subtitle={
                        t('components.BoardHistory.historyForDescription') ?? ''
                    }
                />
            </div>
            <div className={`grid gap-6`} data-testid="page-board">
                {history.length === 0 ? renderNoData() : renderHistoryTable()}
            </div>
        </div>
    );
};
