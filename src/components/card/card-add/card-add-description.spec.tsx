import { fireEvent, render } from '@testing-library/react';
import { t } from 'i18next';
import { expect, test, vi } from 'vitest';
import { CardAddDescription } from './card-add-description';

describe('AddCardDescription', () => {
    test('renders the basic AddCardDescription', () => {
        const { getByTestId } = render(
            <CardAddDescription
                headline={'description'}
                card={{
                    id: 1,
                    title: 'card',
                    description: 'card description',
                    shirt: 'S',
                }}
                updateDescription={(description: string) => {}}
                updateTitle={(title: string) => {}}
            />
        );

        expect(getByTestId(/addcarddescription-headline/).textContent).toBe(
            t('components.AddCard.modal.AddCardDescription.placeholderTitle')
        );
    });

    test('changes description', () => {
        const handleUpdateDescription = vi.fn();

        const { getByTestId } = render(
            <CardAddDescription
                headline={'description'}
                card={{
                    id: 1,
                    title: 'card',
                    description: 'card description',
                    shirt: 'S',
                }}
                updateDescription={(description: string) => {
                    handleUpdateDescription(description);
                }}
                updateTitle={() => {}}
            />
        );

        const input = getByTestId(
            /addcard-description-input/
        ) as HTMLInputElement;
        fireEvent.input(input, { target: { value: 'NEW DESCRIPTION' } });

        expect(handleUpdateDescription).toHaveBeenCalledWith('NEW DESCRIPTION');
    });
});
