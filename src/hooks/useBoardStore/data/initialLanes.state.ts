import { type Lane } from '@/interfaces/Lane';

export const initialLanes: Lane[] = [
    {
        id: 0,
        title: 'Not Started',
        variant: 'light_grey',
        cards: [],
    },
    {
        id: 1,
        title: 'In Progress',
        variant: 'lavender',
        cards: [],
    },
    {
        id: 2,
        title: 'Blocked',
        variant: 'rose',
        cards: [],
    },
    {
        id: 3,
        title: 'Done',
        variant: 'green',
        cards: [],
    },
];
