import {
    act,
    fireEvent,
    render,
    renderHook,
    screen,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';

import { initialBoardState } from '@/hooks/useBoardStore/data/initialBoard.state';
import { initialLanes } from '@/hooks/useBoardStore/data/initialLanes.state';
import { useBoardStore } from '@/hooks/useBoardStore/useBoardStore';
import { useDayplannerDB } from '@/hooks/useDayplannerDB/useDayplannerDB';
import { expect, test, vi } from 'vitest';
import { card, card2, card3 } from '../../../__mocks__/cards.mock';
import { LaneComponent } from './lane';

describe('Lane', () => {
    const WAIT_TILL_ACTION_MENU = 200;
    const LANE_ACTION_BUTTON_TESTID = 'lane-action-button';
    const LANE_ACTION_BUTTON_DELETE_TESTID = 'delete-all-from-lane-button';
    const CARD_ACTION_BUTTON_TESTID = 'card-action-button';

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

    test('should render the correct lane text', () => {
        const laneText = 'Test Lane';
        const { getByTestId } = render(
            <LaneComponent
                id={1}
                text={laneText}
                variant={'green'}
                isLastLane={false}
            />
        );
        const lane = getByTestId('lane-1');
        expect(lane).toHaveTextContent(laneText);
    });

    test('should render the correct lane variant', () => {
        const lanevariant = 'green';
        const { getByText } = render(
            <LaneComponent
                id={1}
                text={'Test Lane'}
                variant={lanevariant}
                isLastLane={false}
            />
        );
        const lane = getByText('Test Lane');
        expect(lane).toHaveClass(`bg-${lanevariant}`);
    });

    test('should render an empty lane', () => {
        const { getByText } = render(
            <LaneComponent
                id={1}
                text={'Test Lane'}
                variant={'green'}
                isLastLane={false}
            />
        );
        expect(getByText('Place tasks here..')).toBeInTheDocument();
    });

    test('should render cards', () => {
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
                                variant={'green'}
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

    test('should render delete all button in last lane', async () => {
        const { getByTestId, getAllByTestId } = render(
            <LaneComponent
                id={1}
                text={'Test Lane'}
                variant={'green'}
                isLastLane={true}
            />
        );

        const [laneActionButton] = getAllByTestId(LANE_ACTION_BUTTON_TESTID);
        await userEvent.click(laneActionButton, {
            delay: WAIT_TILL_ACTION_MENU,
        });

        expect(
            getByTestId(LANE_ACTION_BUTTON_DELETE_TESTID)
        ).toBeInTheDocument();
    });

    test('should open the confirmation modal when delete all button is clicked', async () => {
        const { getAllByTestId, getByText } = render(
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
                                variant={'green'}
                                cards={[card, card2, card3]}
                                isLastLane={true}
                            />
                        </div>
                    )}
                </Droppable>
            </DragDropContext>
        );
        const [laneActionButton] = getAllByTestId(LANE_ACTION_BUTTON_TESTID);
        await userEvent.click(laneActionButton, {
            delay: WAIT_TILL_ACTION_MENU,
        });

        const deleteButton = screen.getByTestId(
            LANE_ACTION_BUTTON_DELETE_TESTID
        );
        await userEvent.click(deleteButton);
        expect(
            getByText('Warning: Deleting all cards from lane')
        ).toBeInTheDocument();
        expect(
            getByText(
                'Are you sure you want to delete all cards from this lane? This action cannot be undone.'
            )
        ).toBeInTheDocument();
    });

    test('should cancel the confirmation modal when delete all button is clicked', async () => {
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
                                variant={'green'}
                                cards={[card, card2, card3]}
                                isLastLane={true}
                            />
                        </div>
                    )}
                </Droppable>
            </DragDropContext>
        );
        const [laneActionButton] = getAllByTestId(LANE_ACTION_BUTTON_TESTID);
        await userEvent.click(laneActionButton, {
            delay: WAIT_TILL_ACTION_MENU,
        });

        const deleteButton = screen.getByTestId(
            LANE_ACTION_BUTTON_DELETE_TESTID
        );
        await userEvent.click(deleteButton);

        const confirmationButton = screen.getByTestId(
            'confirmation-modal-cancel-button'
        );
        await userEvent.click(confirmationButton);

        const lane = getByTestId('lane-1');
        expect(lane).toContainElement(getByTestId('lane-1-card-1'));
        expect(lane).toContainElement(getByTestId('lane-1-card-2'));
    });

    test('should submit the confirmation modal when delete all button is clicked', async () => {
        const { result } = renderHook(() => useBoardStore());
        const spy = vi.spyOn(result.current, 'removeCardsFromLane');

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
                                variant={'green'}
                                cards={[card, card2, card3]}
                                isLastLane={true}
                            />
                        </div>
                    )}
                </Droppable>
            </DragDropContext>
        );
        const [laneActionButton] = getAllByTestId(LANE_ACTION_BUTTON_TESTID);
        await userEvent.click(laneActionButton, {
            delay: WAIT_TILL_ACTION_MENU,
        });

        const deleteButton = screen.getByTestId(
            LANE_ACTION_BUTTON_DELETE_TESTID
        );
        await userEvent.click(deleteButton);

        const confirmationButton = screen.getByTestId(
            'confirmation-modal-button'
        );
        await userEvent.click(confirmationButton);

        expect(spy).toHaveBeenCalledTimes(1);
    });

    test('should remove a card from lane', async () => {
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
                                variant={'green'}
                                cards={[card, card2, card3]}
                                isLastLane={true}
                            />
                        </div>
                    )}
                </Droppable>
            </DragDropContext>
        );

        const [cardActionButton] = getAllByTestId(CARD_ACTION_BUTTON_TESTID);
        await userEvent.click(cardActionButton);

        const removeButton = screen.getByTestId('remove-card-button');
        fireEvent.click(removeButton);
        expect(spy).toHaveBeenCalledTimes(1);
    });

    test('should cancel edit a card from lane', async () => {
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
                                variant={'green'}
                                cards={[card, card2, card3]}
                                isLastLane={true}
                            />
                        </div>
                    )}
                </Droppable>
            </DragDropContext>
        );

        const [cardActionButton] = getAllByTestId(CARD_ACTION_BUTTON_TESTID);
        await userEvent.click(cardActionButton);

        const editButton = screen.getByTestId('edit-card-button');
        fireEvent.click(editButton);
    });

    test('should submit edit a card from lane', async () => {
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
                                variant={'green'}
                                cards={[card, card2, card3]}
                                isLastLane={true}
                            />
                        </div>
                    )}
                </Droppable>
            </DragDropContext>
        );

        const [cardActionButton] = getAllByTestId(CARD_ACTION_BUTTON_TESTID);
        await userEvent.click(cardActionButton, {
            delay: WAIT_TILL_ACTION_MENU,
        });

        const editButton = screen.getByTestId('edit-card-button');
        await userEvent.click(editButton);

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

        await userEvent.click(getByTestId(/addcard-subtask-button/));

        // updateTags
        const tagInput = getByTestId(/addcard-tags-input/) as HTMLInputElement;
        fireEvent.change(tagInput, { target: { value: 'NEW TAG' } });
        await userEvent.click(getByTestId('badge-color-teal'));
        await userEvent.click(getByTestId(/addcard-tag-button/));

        // add a duedate
        // TODO: find solution for shadcn calender tests
        // const calender = getByTestId('addcard-duedate-calender');
        // await userEvent.click(calender, {
        //     delay: WAIT_TILL_ACTION_MENU,
        // });

        // setTimeout(() => {
        //     const select = getByTestId('addcard-duedate-select');
        //     fireEvent.click(select);
        // }, 500);

        // setTimeout(() => {
        //     const selectToday = getByTestId('addcard-duedate-today');
        //     fireEvent.click(selectToday);
        // }, 1000);

        // save card
        fireEvent.click(getByTestId(/addcard-modal-button/));

        // assert what the card have on the lane
        expect(spy).toHaveBeenCalledWith(
            {
                description: 'NEW DESCRIPTION',
                id: 1,
                lowerTags: [
                    // {
                    //     color: '#cbdfd8',
                    //     id: 1,
                    //     text: '2000-01-01',
                    //     tagType: 'lower',
                    // },
                ],
                title: 'Testcard 1',
                tasks: [{ description: 'NEW TASK', id: 1, fulfilled: false }],
                upperTags: [
                    // {
                    //     variant: 'teal',
                    //     id: 1,
                    //     text: 'NEW TAG',
                    //     tagType: 'upper',
                    // },
                ],
                shirt: 'XS',
            },
            1
        );
    });
});
