import Tag from '@/interfaces/Tag';
import { fireEvent, render, screen } from '@testing-library/react';
import { vi } from 'vitest';
import { CardTags } from './card-tags';

describe('CardTags', () => {
    test('renders tags', () => {
        const tags: Tag[] = [
            { id: 1, text: 'Tag 1', variant: 'green', tagType: 'upper' },
            { id: 2, text: 'Tag 2', variant: 'green', tagType: 'upper' },
        ];

        render(<CardTags tags={tags} />);

        expect(screen.getByTestId('card-tags')).toBeInTheDocument();
        expect(screen.getByText('Tag 1')).toBeInTheDocument();
        expect(screen.getByText('Tag 2')).toBeInTheDocument();
    });

    test('renders tags in edit mode', () => {
        const tags: Tag[] = [
            { id: 1, text: 'Tag 1', variant: 'green', tagType: 'upper' },
            { id: 2, text: 'Tag 2', variant: 'green', tagType: 'upper' },
        ];

        const onRemoveTag = vi.fn();

        render(<CardTags tags={tags} editMode onRemoveTag={onRemoveTag} />);

        expect(screen.getByTestId('card-edit-tags')).toBeInTheDocument();
        expect(screen.getAllByTestId('tag-remove-button')).toHaveLength(2);
        fireEvent.click(screen.getAllByTestId('tag-remove-button')[0]);
        expect(onRemoveTag).toHaveBeenCalledWith(tags[0]);
    });
});
