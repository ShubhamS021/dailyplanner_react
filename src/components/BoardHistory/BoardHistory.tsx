import { useTranslation } from 'react-i18next';
import BoardTitle from '../../components/Board/BoardTitle/BoardTitle';
import useHistory from '../../hooks/useHistory/useHistory';
import { type HistoryListEntry } from '../../hooks/useHistory/interfaces/HistoryListEntry';
import { useBoardStore } from 'hooks/useBoardStore/useBoardStore';
import { shallow } from 'zustand/shallow';
import { ArrowLeftIcon } from 'ui/Icons/Icons';

export const BoardHistory = () => {
    const [board, toggleBoardMode] = useBoardStore(
        (state) => [state.board, state.toggleBoardMode],
        shallow
    );

    const { history } = useHistory(board.id);
    const { t } = useTranslation();

    const handleBackToBoard = () => {
        toggleBoardMode('boardDefaultMode');
    };

    const renderAdditionalData = (entry: HistoryListEntry) => {
        switch (entry.type) {
            case 'MOVEMENT':
                return `${t(`components.BoardHistory.movedFrom`)} ${
                    entry.data.laneStart ?? -1
                } ${t(`components.BoardHistory.movedTo`)} ${
                    entry.data.laneEnd ?? -1
                }`;
            case 'BOARDMOVEMENT':
                return `${t(`components.BoardHistory.movedToBoard`)} ${
                    entry.data.boardEnd ?? -1
                }`;
            case 'CREATION':
            case 'UPDATE':
            case 'DELETION':
            default:
                return '---';
        }
    };

    const renderHistoryTable = () => {
        return (
            <div className="relative overflow-x-auto">
                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 ">
                        <tr>
                            <th scope="col" className="px-6 pb-4">
                                {t(`components.BoardHistory.time`)}
                            </th>
                            <th scope="col" className="pb-4">
                                {t(`components.BoardHistory.type`)}
                            </th>
                            <th scope="col" className="pb-4">
                                {t(`components.BoardHistory.data`)}
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {history.map((h) => {
                            return (
                                <tr
                                    key={h.id}
                                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                                >
                                    <th
                                        scope="row"
                                        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                                    >
                                        {new Date(h.id).toLocaleString()}
                                    </th>
                                    <td className="py-4">
                                        {t(
                                            `components.BoardHistory.` +
                                                h.type.toLowerCase()
                                        )}
                                        <br />

                                        {`${t(
                                            `components.BoardHistory.additionaldata`
                                        )}: ${renderAdditionalData(h)}`}
                                    </td>
                                    <td className="py-4 max-w-[20vw]">
                                        {JSON.stringify(h.data.card)}
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        );
    };

    return (
        <main className="p-10">
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
                <BoardTitle
                    title={`${t('components.BoardHistory.historyFor')} ${
                        board.title
                    }`}
                    subtitle={
                        t('components.BoardHistory.historyForDescription') ?? ''
                    }
                />
            </div>
            <div
                className={`p-5 rounded-2xl bg-[#F8F8F8] grid gap-6 dark:bg-[#212932]`}
                data-testid="page-board"
            >
                <div className="table">{renderHistoryTable()}</div>
            </div>
        </main>
    );
};
