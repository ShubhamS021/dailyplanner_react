import { ColorVariant, colorVariants } from '@/types/ColorVariant';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';
import { ColorChooser } from './color-chooser';

describe('ColorChooser', () => {
    test('renders color options', () => {
        render(<ColorChooser onSelectColor={vi.fn()} />);

        colorVariants.forEach((variant) => {
            expect(
                screen.getByTestId(`badge-color-${variant}`)
            ).toBeInTheDocument();
        });
    });

    test('calls onSelectColor when option clicked', async () => {
        const onSelectColor = vi.fn();
        const { getByTestId } = render(
            <ColorChooser onSelectColor={onSelectColor} />
        );

        await userEvent.click(getByTestId('badge-color-green'));
        expect(onSelectColor).toHaveBeenCalledWith('green' as ColorVariant);
    });

    test('sets selected color index on click', async () => {
        const onSelectColor = vi.fn();
        const onSelectColorIndex = vi.fn();
        render(
            <ColorChooser
                onSelectColorIndex={onSelectColorIndex}
                onSelectColor={onSelectColor}
            />
        );

        await userEvent.click(screen.getByTestId('badge-color-teal'));
        expect(onSelectColorIndex).toHaveBeenCalledWith(7);
    });
});
