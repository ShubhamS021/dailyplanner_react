import {
    calculateIlluminance,
    hex2Rgb,
    isHexColor,
    isRGBaColor,
    rgba2rgb,
} from './color.util';

describe('hex2Rgb', () => {
    it('should convert a valid hexadecimal color string to RGB format', () => {
        const hexColor = '#FF0000';
        const rgb = hex2Rgb(hexColor);
        expect(rgb).toEqual({ r: 255, g: 0, b: 0 });
    });

    it('should return null for an invalid hexadecimal color string', () => {
        const invalidHexColor = '#ZZZZZZ';
        const rgb = hex2Rgb(invalidHexColor);
        expect(rgb).toBeNull();
    });
});

describe('rgba2rgb', () => {
    it('should convert a valid RGBA color string to RGB format', () => {
        const rgbaColor = 'rgba(255, 0, 0, 0.5)';
        const rgb = rgba2rgb(rgbaColor);
        expect(rgb).toEqual({ r: 255, g: 0, b: 0 });
    });

    it('should return null for an invalid RGBA color string', () => {
        const invalidRgbaColor = 'rgba(300, 0, 0, 0.5)';
        const rgb = rgba2rgb(invalidRgbaColor);
        expect(rgb).toBeNull();
    });
});

describe('isHexColor', () => {
    it('should return true for a valid hexadecimal color string', () => {
        const hexColor = '#FF0000';
        const result = isHexColor(hexColor);
        expect(result).toBe(true);
    });

    it('should return false for an invalid hexadecimal color string', () => {
        const invalidHexColor = '#ZZZZZZ';
        const result = isHexColor(invalidHexColor);
        expect(result).toBe(false);
    });
});

describe('isRGBaColor', () => {
    it('should return true for a valid RGBA color string', () => {
        const rgbaColor = 'rgba(255, 0, 0, 0.5)';
        const result = isRGBaColor(rgbaColor);
        expect(result).toBe(true);
    });

    it('should return false for an invalid RGBA color string', () => {
        const invalidRgbaColor = 'rgba(300, 0, 0, 0.5)';
        const result = isRGBaColor(invalidRgbaColor);
        expect(result).toBe(false);
    });
});

describe('calculateIlluminance', () => {
    it('should calculate the illuminance of a valid color string', () => {
        const color = '#FF0000';
        const illuminance = calculateIlluminance(color);
        expect(illuminance).toBeCloseTo(0.2126);
    });

    it('should throw an error for an invalid color string', () => {
        const invalidColor = '#ZZZZZZ';
        expect(() => {
            calculateIlluminance(invalidColor);
        }).toThrowError(`Couldn't determine hex2Rgb for '${invalidColor}'`);
    });
});
