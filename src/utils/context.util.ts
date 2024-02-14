import i18next from 'i18next';
import { initialBoardState } from '../hooks/useBoardStore/data/initialBoard.state';
import { initialLanes } from '../hooks/useBoardStore/data/initialLanes.state';

export const getLocalizedInitialBoardState = () => {
    return {
        ...initialBoardState,
        title: i18next.t('state.board.title') ?? 'My tasks',
        subtitle:
            i18next.t('state.board.subtitle') ?? 'An overview of my tasks.',
    };
};

export const getLocalizedInitialLanesState = () => {
    let localizedLanes = [...initialLanes];
    const localizeKeys = [
        'state.lanes.notStarted',
        'state.lanes.inProgress',
        'state.lanes.blocked',
        'state.lanes.done',
    ];
    localizedLanes = localizedLanes.map((lane, index) => {
        return { ...lane, title: i18next.t(localizeKeys[index]) };
    });
    return localizedLanes;
};
