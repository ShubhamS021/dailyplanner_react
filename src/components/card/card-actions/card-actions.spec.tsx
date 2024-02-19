import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';
import { CardActions } from './card-actions';

describe('CardActions', () => {
    const WAIT_TILL_ACTION_MENU = 200;

    it('renders without crashing', () => {
        render(<CardActions />);
    });

    it('renders all buttons', async () => {
        const { getByTestId } = render(<CardActions />);
        const actionButton = getByTestId('card-action-button');
        await userEvent.click(actionButton, {
            delay: WAIT_TILL_ACTION_MENU,
        });

        expect(screen.getByTestId('edit-card-button')).toBeInTheDocument();
        expect(screen.getByTestId('remove-card-button')).toBeInTheDocument();
        expect(screen.getByTestId('move-card-button')).toBeInTheDocument();
    });

    it('calls onEdit when edit button is clicked', async () => {
        const onEdit = vi.fn();
        const { getByTestId } = render(<CardActions onEditCard={onEdit} />);
        const actionButton = getByTestId('card-action-button');
        await userEvent.click(actionButton, {
            delay: WAIT_TILL_ACTION_MENU,
        });

        fireEvent.click(screen.getByTestId('edit-card-button'));
        expect(onEdit).toHaveBeenCalled();
    });

    it('calls onRemove when remove button is clicked', async () => {
        const onRemove = vi.fn();
        const { getByTestId } = render(<CardActions onRemoveCard={onRemove} />);
        const actionButton = getByTestId('card-action-button');
        await userEvent.click(actionButton, {
            delay: WAIT_TILL_ACTION_MENU,
        });

        fireEvent.click(screen.getByTestId('remove-card-button'));
        expect(onRemove).toHaveBeenCalled();
    });

    it('calls onMove when move button is clicked', async () => {
        const onMove = vi.fn();
        const { getByTestId } = render(<CardActions onMoveCard={onMove} />);
        const actionButton = getByTestId('card-action-button');
        await userEvent.click(actionButton, {
            delay: WAIT_TILL_ACTION_MENU,
        });

        fireEvent.click(screen.getByTestId('move-card-button'));
        expect(onMove).toHaveBeenCalled();
    });
});
