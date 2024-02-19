import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';
import { LaneActions } from './lane-actions';

describe('LaneActions', () => {
    const WAIT_TILL_ACTION_MENU = 200;

    it('renders without crashing', () => {
        render(
            <LaneActions
                isLastLane={false}
                onShowLaneEditModal={function (): void {
                    throw new Error('Function not implemented.');
                }}
                onShowDeleteModal={function (): void {
                    throw new Error('Function not implemented.');
                }}
            />
        );
    });

    it('renders all buttons', async () => {
        const { getByTestId } = render(
            <LaneActions
                onShowLaneEditModal={function (): void {
                    throw new Error('Function not implemented.');
                }}
                onShowDeleteModal={function (): void {
                    throw new Error('Function not implemented.');
                }}
                isLastLane={true}
            />
        );
        const actionButton = getByTestId('lane-action-button');
        await userEvent.click(actionButton, {
            delay: WAIT_TILL_ACTION_MENU,
        });

        expect(screen.getByTestId('edit-lane-button')).toBeInTheDocument();
        expect(
            screen.getByTestId('delete-all-from-lane-button')
        ).toBeInTheDocument();
    });

    it('calls onEdit when edit button is clicked', async () => {
        const onEdit = vi.fn();
        const { getByTestId } = render(
            <LaneActions
                onShowLaneEditModal={onEdit}
                onShowDeleteModal={function (): void {
                    throw new Error('Function not implemented.');
                }}
                isLastLane={false}
            />
        );
        const actionButton = getByTestId('lane-action-button');
        await userEvent.click(actionButton, {
            delay: WAIT_TILL_ACTION_MENU,
        });

        fireEvent.click(screen.getByTestId('edit-lane-button'));
        expect(onEdit).toHaveBeenCalled();
    });

    it('calls onRemove when remove button is clicked', async () => {
        const onRemove = vi.fn();
        const { getByTestId } = render(
            <LaneActions
                onShowLaneEditModal={function (): void {
                    throw new Error('Function not implemented.');
                }}
                onShowDeleteModal={onRemove}
                isLastLane={true}
            />
        );
        const actionButton = getByTestId('lane-action-button');
        await userEvent.click(actionButton, {
            delay: WAIT_TILL_ACTION_MENU,
        });

        fireEvent.click(screen.getByTestId('delete-all-from-lane-button'));
        expect(onRemove).toHaveBeenCalled();
    });
});
