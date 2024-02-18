import PageTitle from '@/components/common/page-title/page-title';
import { useBoardStore } from '@/hooks/useBoardStore/useBoardStore';
import { type HistoryListEntry } from '@/hooks/useHistory/interfaces/HistoryListEntry';
import { useTranslation } from 'react-i18next';

import { useHistory } from '@/hooks/useHistory/useHistory';
import { Badge } from '@/ui/badge';
import { Table, TableBody, TableCell, TableHeader, TableRow } from '@/ui/table';

export const BoardHistory = () => {
    const [board] = useBoardStore((state) => [state.board]);

    const { history } = useHistory(board.id);

    const { t } = useTranslation();

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
                                        <Badge variant={'lavender'}>
                                            {t(
                                                `components.BoardHistory.` +
                                                    h.type.toLowerCase()
                                            )}
                                        </Badge>
                                        <br />

                                        {`${t(
                                            `components.BoardHistory.additionaldata`
                                        )}: ${renderAdditionalData(h)}`}
                                    </TableCell>
                                    <TableCell className="py-4 max-w-[20vw]">
                                        {JSON.stringify(h.data.card, null, 4)}
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
        <div className="px-5 py-10">
            <div className="h-16 mb-6 grid grid-cols-[auto,1fr] items-center">
                <PageTitle
                    title={`${t('components.BoardHistory.historyFor')} ${
                        board.title
                    }`}
                    subtitle={
                        t('components.BoardHistory.historyForDescription') ?? ''
                    }
                />
            </div>
            <div className="grid gap-6" data-testid="page-board">
                {history.length === 0 ? renderNoData() : renderHistoryTable()}
            </div>
        </div>
    );
};
