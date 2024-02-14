import { type Card } from '@/interfaces/Card';
import type Tag from '@/interfaces/Tag';
import { colors } from '@/theme/colors';
import { fireEvent, render } from '@testing-library/react';
import { CardAddTags } from './card-add-tags';

test('renders the basic AddCardTags', () => {
    const card: Card = {
        id: 1,
        title: 'test card',
        upperTags: [
            { id: 1, color: colors.Green, text: 'up1', tagType: 'upper' },
            { id: 2, color: colors.Green, text: 'up2', tagType: 'upper' },
        ],
        lowerTags: [
            { id: 1, color: colors.Green, text: 'low1', tagType: 'lower' },
        ],
        shirt: 'S',
    };

    const { getByTestId } = render(
        <CardAddTags
            headline={'tags'}
            card={card}
            updateTags={(tags: Tag[]) => {}}
        />
    );

    expect(getByTestId(/addcardtags-headline/).textContent).toBe('tags(2/5)');
});

test('adds a tag and colors', () => {
    const card: Card = {
        id: 1,
        title: 'test card',
        upperTags: [
            { id: 1, color: colors.Green, text: 'up1', tagType: 'upper' },
            { id: 2, color: colors.Green, text: 'up2', tagType: 'upper' },
        ],
        lowerTags: [
            { id: 1, color: colors.Green, text: 'low1', tagType: 'lower' },
        ],
        shirt: 'S',
    };

    const { getByTestId, getAllByTestId } = render(
        <CardAddTags
            headline={'tags'}
            card={card}
            updateTags={(tags: Tag[]) => {}}
        />
    );

    expect(getByTestId(/addcardtags-headline/).textContent).toBe('tags(2/5)');

    const input = getByTestId(/addcard-tags-input/) as HTMLInputElement;
    fireEvent.change(input, { target: { value: 'NEW TAG' } });

    const firstTagColor = getAllByTestId(/addcard-tag-color-button/)[0];
    fireEvent.click(firstTagColor);

    const button = getByTestId(/addcard-tag-button/);
    fireEvent.click(button);
});

test('adds a tag to empty array', () => {
    const card: Card = {
        id: 1,
        title: 'test card',
        shirt: 'S',
    };

    const { getByTestId, getAllByTestId } = render(
        <CardAddTags
            headline={'tags'}
            card={card}
            updateTags={(tags: Tag[]) => {
                card.upperTags = [...tags];
            }}
        />
    );

    expect(getByTestId(/addcardtags-headline/).textContent).toBe('tags(0/5)');

    const input = getByTestId(/addcard-tags-input/) as HTMLInputElement;
    fireEvent.change(input, { target: { value: 'NEW TAG' } });

    const firstTagColor = getAllByTestId(/addcard-tag-color-button/)[0];
    fireEvent.click(firstTagColor);

    const button = getByTestId(/addcard-tag-button/);
    fireEvent.click(button);

    render(
        <CardAddTags
            headline={'tags'}
            card={card}
            updateTags={(tags: Tag[]) => {
                card.upperTags = [...tags];
            }}
        />
    );
});
