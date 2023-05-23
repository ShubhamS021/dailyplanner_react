type Colors = Record<string, string>;

export const colors: Colors = {
    // base styles
    white: '#fff',
    rose: '#ffdce0',
    green: '#cbdfd8',
    lavender: '#f0e7f6',
    light_grey: '#e1e4e8',
    grey: '#4d4d4d',
    dark_grey: '#5a5a65',

    // sulzer colors: non-transparent
    sulzer100_yellow: '#ffcd00',
    sulzer100_blue: '#004680',
    sulzer100_red: '#e0004d',
    sulzer100_purple: '#5f249f',

    // sulzer colors: 33% transparency
    sulzer66_yellow: 'rgba(255, 205, 0, 0.66)',
    sulzer66_blue: 'rgba(0, 70, 128, 0.66)',
    sulzer66_red: 'rgba(224, 0, 77, 0.66)',
    sulzer66_purple: 'rgba(95, 36, 159, 0.66)',

    // sulzer colors: 33% transparency
    sulzer33_yellow: 'rgba(255, 205, 0, 0.33)',
    sulzer33_blue: 'rgba(0, 70, 128, 0.33)',
    sulzer33_red: 'rgba(224, 0, 77, 0.33)',
    sulzer33_purple: 'rgba(95, 36, 159, 0.33)',
};
