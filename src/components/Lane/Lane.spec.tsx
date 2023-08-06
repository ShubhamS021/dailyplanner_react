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

    it('should remove a card from lane', () => {
        const { result } = renderHook(() => useBoardStore());
        const spy = vi.spyOn(result.current, 'removeCardFromLane');

        const { getAllByTestId } = render(
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
        const removeButton = getAllByTestId('remove-card-button')[0];
        fireEvent.click(removeButton);

        expect(spy).toHaveBeenCalledTimes(1);
    });

    it('should cancel edit a card from lane', () => {
        const { getAllByTestId } = render(
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
        const editButton = getAllByTestId('edit-card-button')[0];
        fireEvent.click(editButton);
    });

    it('should submit edit a card from lane', () => {
        const { result } = renderHook(() => useBoardStore());
        const spy = vi.spyOn(result.current, 'updateCard');

        const { getByTestId, getAllByTestId } = render(
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
        fireEvent.click(getAllByTestId('edit-card-button')[0]);

        // updateDescription
        const descriptionInput = getByTestId(
            /addcard-description-input/
        ) as HTMLInputElement;
        fireEvent.change(descriptionInput, {
            target: { value: 'NEW DESCRIPTION' },
        });

        // updateTasks
        const taskInput = getByTestId(
            /addcard-subtask-input/
        ) as HTMLInputElement;
        fireEvent.change(taskInput, { target: { value: 'NEW TASK' } });

        fireEvent.click(getByTestId(/addcard-subtask-button/));

        // updateTags
        const tagInput = getByTestId(/addcard-tags-input/) as HTMLInputElement;
        fireEvent.change(tagInput, { target: { value: 'NEW TAG' } });
        fireEvent.click(getAllByTestId(/addcard-tag-color-button/)[0]);
        fireEvent.click(getByTestId(/addcard-tag-button/));

        // updateLowerTags
        const lowerTagInput = getByTestId(
            /addcard-lowertags-input/
        ) as HTMLInputElement;
        fireEvent.change(lowerTagInput, { target: { value: '2000-01-01' } });
        fireEvent.click(getByTestId(/addcard-lowertags-button/));

        // save card
        fireEvent.click(getByTestId(/addcard-modal-button/));

        // assert what the card have on the lane
        expect(spy).toBeCalledWith(
            {
                description: 'NEW DESCRIPTION',
                id: 1,
                lowerTags: [
                    {
                        color: '#cbdfd8',
                        id: 1,
                        text: '2000-01-01',
                        tagType: 'lower',
                    },
                ],
                title: 'Testcard 1',
                tasks: [{ description: 'NEW TASK', id: 1, fulfilled: false }],
                upperTags: [
                    {
                        color: '#cbdfd8',
                        id: 1,
                        text: 'NEW TAG',
                        tagType: 'upper',
                    },
                ],
                shirt: 'XS',
            },
            1
        );
    });
});
