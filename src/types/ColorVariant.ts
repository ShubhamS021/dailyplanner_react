export const colorVariants = [
    'green',
    'lavender',
    'rose',
    'light_grey',
    'yellow',
    'orange',
    'blue',
    'teal',
] as const;

export type ColorVariant = (typeof colorVariants)[number];
