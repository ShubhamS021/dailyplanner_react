import { type Card } from '../src/interfaces/Card';

export const card: Card = {
    id: 1,
    title: 'Testcard 1',
    description: 'This card is a test card.',
    lowerTags: [],
    upperTags: [],
    tasks: [],
    shirt: 'XS',
};

export const cardUpdate: Card = {
    id: 1,
    title: 'Testcard 1 Update',
    description: 'This card is a updated test card.',
    lowerTags: [],
    upperTags: [],
    tasks: [],
    shirt: 'XS',
};

export const cardExtended: Card = {
    id: 1,
    title: 'Testcard 1',
    description: 'This card is a extended test card.',
    lowerTags: [],
    upperTags: [{ id: 1, text: 'Testing', color: 'N/A', tagType: 'upper' }],
    tasks: [
        { id: 1, description: 'I need to be done first.' },
        { id: 2, description: 'I need to be done second.' },
        { id: 3, description: 'I need to be done last.' },
    ],
    shirt: 'XS',
};

export const cardExtendedUpdate: Card = {
    id: 1,
    title: 'Testcard 1 Update',
    description: 'This card is a updated extended test card.',
    lowerTags: [],
    upperTags: [
        { id: 1, text: 'Testing Update', color: 'N/A', tagType: 'upper' },
    ],
    tasks: [
        { id: 1, description: 'a) I need to be done first.' },
        { id: 2, description: 'b) I need to be done second.' },
        { id: 3, description: 'c) I need to be done last.' },
    ],
    shirt: 'XS',
};

export const card2: Card = {
    id: 2,
    title: 'Testcard 2',
    description: 'This card is a test card.',
    lowerTags: [],
    upperTags: [],
    tasks: [],
    shirt: 'XS',
};

export const card3: Card = {
    id: 3,
    title: 'Testcard 3',
    description: 'This card is a test card.',
    lowerTags: [],
    upperTags: [],
    tasks: [],
    shirt: 'XS',
};
