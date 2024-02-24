import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { expect, test, vi } from 'vitest';
import { LaneActions } from './lane-actions';

describe('LaneActions', () => {
    const WAIT_TILL_ACTION_MENU = 200;
    const NOT_IMPLEMENTED_MESSAGE = 'Not implemented';
    const LANE_ACTION_BUTTON_TESTID = 'lane-action-button';

    test('renders without crashing', () => {
        render(
            <LaneActions
                isLastLane={false}
                onShowLaneEditModal={function (): void {
                    throw new Error(NOT_IMPLEMENTED_MESSAGE);
                }}
                onShowDeleteModal={function (): void {
                    throw new Error(NOT_IMPLEMENTED_MESSAGE);
                }}
            />
        );
    });

    test('renders all buttons', async () => {
        const { getByTestId } = render(
            <LaneActions
                onShowLaneEditModal={function (): void {
                    throw new Error(NOT_IMPLEMENTED_MESSAGE);
                }}
                onShowDeleteModal={function (): void {
                    throw new Error(NOT_IMPLEMENTED_MESSAGE);
                }}
                isLastLane={true}
            />
        );
        const actionButton = getByTestId(LANE_ACTION_BUTTON_TESTID);
        await userEvent.click(actionButton, {
            delay: WAIT_TILL_ACTION_MENU,
        });

        expect(screen.getByTestId('edit-lane-button')).toBeInTheDocument();
        expect(
            screen.getByTestId('delete-all-from-lane-button')
        ).toBeInTheDocument();
    });

    test('calls onEdit when edit button is clicked', async () => {
        const onEdit = vi.fn();
        const { getByTestId } = render(
            <LaneActions
                onShowLaneEditModal={onEdit}
                onShowDeleteModal={function (): void {
                    throw new Error(NOT_IMPLEMENTED_MESSAGE);
                }}
                isLastLane={false}
            />
        );
        const actionButton = getByTestId(LANE_ACTION_BUTTON_TESTID);
        await userEvent.click(actionButton, {
            delay: WAIT_TILL_ACTION_MENU,
        });

        fireEvent.click(screen.getByTestId('edit-lane-button'));
        expect(onEdit).toHaveBeenCalled();
    });

    test('calls onRemove when remove button is clicked', async () => {
        const onRemove = vi.fn();
        const { getByTestId } = render(
            <LaneActions
                onShowLaneEditModal={function (): void {
                    throw new Error(NOT_IMPLEMENTED_MESSAGE);
                }}
                onShowDeleteModal={onRemove}
                isLastLane={true}
            />
        );
        const actionButton = getByTestId(LANE_ACTION_BUTTON_TESTID);
        await userEvent.click(actionButton, {
            delay: WAIT_TILL_ACTION_MENU,
        });

        fireEvent.click(screen.getByTestId('delete-all-from-lane-button'));
        expect(onRemove).toHaveBeenCalled();
    });
});
