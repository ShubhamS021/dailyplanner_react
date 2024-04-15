import { truncate } from './truncate';

describe('truncate', () => {
    it('should return the original string if it is shorter than or equal to the specified length', () => {
        const str = 'Hello, world!';
        const length = 20;

        const result = truncate(str, length);

        expect(result).toEqual(str);
    });

    it('should truncate the string and append ellipsis if it is longer than the specified length', () => {
        const str = 'This is a long string that needs to be truncated';
        const length = 20;

        const result = truncate(str, length);

        expect(result).toEqual('This is a long strin...');
    });
});
