import { withLinks } from './withLinks';

describe('withLinks', () => {
    it('should replace URLs with span elements', () => {
        const input = 'Check out this website: https://example.com';
        const expectedOutput =
            'Check out this website: <span class="link">https://example.com</span>';

        const result = withLinks(input);

        expect(result).toEqual(expectedOutput);
    });

    it('should replace multiple URLs with span elements', () => {
        const input =
            'Visit my blog at https://blog.example.com and my portfolio at https://portfolio.example.com';
        const expectedOutput =
            'Visit my blog at <span class="link">https://blog.example.com</span> and my portfolio at <span class="link">https://portfolio.example.com</span>';

        const result = withLinks(input);

        expect(result).toEqual(expectedOutput);
    });

    it('should not modify the string if there are no URLs', () => {
        const input = 'This is a regular string without any URLs';
        const expectedOutput = input;

        const result = withLinks(input);

        expect(result).toEqual(expectedOutput);
    });
});
