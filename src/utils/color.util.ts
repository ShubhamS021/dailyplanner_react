import { type RGB } from '../interfaces/RGB';

/**
 * Converts a hexadecimal color string to RGB format.
 * @param {string} hex - The hexadecimal color string to be converted.
 * @returns {RGB | null} The RGB representation of the color string, or null if the input string is invalid.
 */
export const hex2Rgb = (hex: string): RGB | null => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result != null
        ? {
              r: parseInt(result[1], 16),
              g: parseInt(result[2], 16),
              b: parseInt(result[3], 16),
          }
        : null;
};

/**
 * Converts an RGBA color string to RGB format.
 * @param {string} rgbaString - The RGBA color string to be converted.
 * @returns {RGB | null} The RGB representation of the color string, or null if the input string is invalid.
 */
export const rgba2rgb = (rgbaString: string): RGB | null => {
    const rgbaRegex =
        /^rgba?\(\s*([01]?\d{1,2}|2[0-4]\d|25[0-5])\s*,\s*([01]?\d{1,2}|2[0-4]\d|25[0-5])\s*,\s*([01]?\d{1,2}|2[0-4]\d|25[0-5])\s*(,\s*(0|1|0?\.\d+))?\s*\)$/i;

    const matches = rgbaRegex.exec(rgbaString);

    if (matches != null) {
        const r = parseInt(matches[1], 10);
        const g = parseInt(matches[2], 10);
        const b = parseInt(matches[3], 10);
        return { r, g, b };
    }

    return null;
};

/**
 * Determines if a string is a valid hex string
 * @param color a color string e.g. #fff or rgba(...)
 * @returns boolean
 */
export const isHexColor = (color: string): boolean => {
    const hexRegex = /^#([0-9A-Fa-f]{3}){1,2}$/i;
    return hexRegex.test(color);
};

/**
 * Determines if a string is a valid rgba() string
 * @param color a color string e.g. #fff or rgba(...)
 * @returns boolean
 */
export const isRGBaColor = (color: string): boolean => {
    const rgbaRegex =
        /^rgba?\(\s*([01]?\d{1,2}|2[0-4]\d|25[0-5])\s*,\s*([01]?\d{1,2}|2[0-4]\d|25[0-5])\s*,\s*([01]?\d{1,2}|2[0-4]\d|25[0-5])\s*(,\s*(0|1|0?\.\d+))?\s*\)$/i;
    return rgbaRegex.test(color);
};

/**
 * Calculates the illuminance of a given color value
 * @param {string} color - The color to calculate the illuminance for.
 * @returns {number} The illuminance value of the color.
 * @throws {Error} If the color format is invalid and cannot be converted to RGB.
 */
export const calculateIlluminance = (color: string) => {
    let rgbColor = null;
    if (isHexColor(color)) rgbColor = hex2Rgb(color);
    if (isRGBaColor(color)) rgbColor = rgba2rgb(color);

    if (rgbColor == null)
        throw new Error(`Couldn't determine hex2Rgb for '${color}'`);

    const { r, g, b } = rgbColor;
    const a = [r, g, b].map((v) => {
        v /= 255;
        return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
    });
    return a[0] * 0.2126 + a[1] * 0.7152 + a[2] * 0.0722;
};
