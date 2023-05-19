import { type Lane } from '../interfaces/Lane';
import { colors } from '../theme/colors';

export const initialLanes: Lane[] = [
    {
        id: 0,
        title: 'Not Started',
        color: colors.light_grey,
        cards: [],
    },
    {
        id: 1,
        title: 'In Progress',
        color: colors.lavender,
        cards: [],
    },
    {
        id: 2,
        title: 'Blocked',
        color: colors.rose,
        cards: [],
    },
    {
        id: 3,
        title: 'Done',
        color: colors.green,
        cards: [],
    },
];
