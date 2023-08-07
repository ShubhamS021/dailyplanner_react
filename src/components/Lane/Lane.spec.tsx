import { act, fireEvent, render, renderHook } from '@testing-library/react';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';

import { LaneComponent } from './Lane';
import { useBoardStore } from '@/hooks/useBoardStore/useBoardStore';
import { initialBoardState } from '@/hooks/useBoardStore/data/initialBoard.state';
import { initialLanes } from '@/hooks/useBoardStore/data/initialLanes.state';
import { card, card2, card3 } from '../../../__mocks__/cards.mock';
import { useDayplannerDB } from '@/hooks/useDayplannerDB/useDayplannerDB';
import { vi } from 'vitest';

describe('Lane', () => {
    // add a default board with some columns
    beforeEach(() => {
        renderHook(() => useDayplannerDB('history'));
        const { result } = renderHook(() => useBoardStore());

        act(() => {
            const boardId = 0;
            result.current.addBoard({
                ...initialBoardState,
                lanes: [...initialLanes],
                id: boardId,
            });
        });
    });

    it('should render the correct lane text', () => {
        const laneText = 'Test Lane';
        const { getByTestId } = render(
            <LaneComponent
                id={1}
                text={laneText}
                color={'#ffffff'}
                isLastLane={false}
            />
        );
        const lane = getByTestId('lane-1');
        expect(lane).toHaveTextContent(laneText);
    });

    it('should render the correct lane color', () => {
        const laneColor = '#ff0000';
        const { getByTestId } = render(
            <LaneComponent
                id={1}
                text={'Test Lane'}
                color={laneColor}
                isLastLane={false}
            />
        );
        const lane = getByTestId('page-label');
        expect(lane).toHaveStyle(`background-color: ${laneColor}`);
    });

    it('should render an empty lane', () => {
        const { getByText } = render(
            <LaneComponent
                id={1}
                text={'Test Lane'}
                color={'#ffffff'}
                isLastLane={false}
            />
        );
        expect(getByText('Place tasks here..')).toBeInTheDocument();
    });

    it('should render cards', () => {
        const { getByTestId } = render(
            <DragDropContext onDragEnd={() => {}}>
                <Droppable droppableId="some_id">
                    {(provided: any) => (
                        <div
                            ref={provided.innerRef}
                            {...provided.droppableProps}
                        >
                            <LaneComponent
                                id={1}
                                text={'Test Lane'}
                                color={'#ffffff'}
                                cards={[card, card2, card3]}
                                isLastLane={false}
                            />
                        </div>
                    )}
                </Droppable>
            </DragDropContext>
        );
        const lane = getByTestId('lane-1');
        expect(lane).toContainElement(getByTestId('lane-1-card-1'));
        expect(lane).toContainElement(getByTestId('lane-1-card-2'));
    });

    it('should render delete all button in last lane', () => {
        const { getByTestId } = render(
            <LaneComponent
                id={1}
                text={'Test Lane'}
                color={'#ffffff'}
                isLastLane={true}
            />
        );
        expect(getByTestId('delete-all-from-lane-button')).toBeInTheDocument();
    });

    it('should open the confirmation modal when delete all button is clicked', () => {
        const { getByTestId, getByText } = render(
            <DragDropContext onDragEnd={() => {}}>
                <Droppable droppableId="some_id">
                    {(provided: any) => (
                        <div
                            ref={provided.innerRef}
                            {...provided.droppableProps}
                        >
                            <LaneComponent
                                id={1}
                                text={'Test Lane'}
                                color={'#ffffff'}
                                cards={[card, card2, card3]}
                                isLastLane={true}
                            />
                        </div>
                    )}
                </Droppable>
            </DragDropContext>
        );
        fireEvent.click(getByTestId('delete-all-from-lane-button'));
        expect(
            getByText('Warning: Deleting all cards from lane')
        ).toBeInTheDocument();
        expect(
            getByText(
                'Are you sure you want to delete all cards from this lane? This action cannot be undone.'
            )
        ).toBeInTheDocument();
    });

    it('should cancel the confirmation modal when delete all button is clicked', () => {
        const { getByTestId } = render(
            <DragDropContext onDragEnd={() => {}}>
                <Droppable droppableId="some_id">
                    {(provided: any) => (
                        <div
                            ref={provided.innerRef}
                            {...provided.droppableProps}
                        >
                            <LaneComponent
                                id={1}
                                text={'Test Lane'}
                                color={'#ffffff'}
                                cards={[card, card2, card3]}
                                isLastLane={true}
                            />
                        </div>
                    )}
                </Droppable>
            </DragDropContext>
        );
        fireEvent.click(getByTestId('delete-all-from-lane-button'));
        fireEvent.click(getByTestId('confirmation-modal-cancel-button'));

        const lane = getByTestId('lane-1');
        expect(lane).toContainElement(getByTestId('lane-1-card-1'));
        expect(lane).toContainElement(getByTestId('lane-1-card-2'));
    });

    it('should submit the confirmation modal when delete all button is clicked', () => {
        const { result } = renderHook(() => useBoardStore());
        const spy = vi.spyOn(result.current, 'removeCardsFromLane');

        const { getByTestId } = render(
            <DragDropContext onDragEnd={() => {}}>
                <Droppable droppableId="some_id">
                    {(provided: any) => (
                        <div
                            ref={provided.innerRef}
                            {...provided.droppableProps}
                        >
                            <LaneComponent
                                id={1}
                                text={'Test Lane'}
                                color={'#ffffff'}
                                cards={[card, card2, card3]}
                                isLastLane={true}
                            />
                        </div>
                    )}
                </Droppable>
            </DragDropContext>
        );
        fireEvent.click(getByTestId('delete-all-from-lane-button'));
        fireEvent.click(getByTestId('confirmation-modal-button'));

        expect(spy).toHaveBeenCalledTimes(1);
    });
});
