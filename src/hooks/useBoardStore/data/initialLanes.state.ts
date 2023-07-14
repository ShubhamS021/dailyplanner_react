import { type Lane } from '../../../interfaces/Lane';
import { colors } from '../../../theme/colors';

export const initialLanes: Lane[] = [
    {
        id: 0,
        title: 'Not Started',
        color: colors.Light_Grey,
        cards: [],
    },
    {
        id: 1,
        title: 'In Progress',
        color: colors.Lavender,
        cards: [],
    },
    {
        id: 2,
        title: 'Blocked',
        color: colors.Rose,
        cards: [],
    },
    {
        id: 3,
        title: 'Done',
        color: colors.Green,
        cards: [],
    },
];
