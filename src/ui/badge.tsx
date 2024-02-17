import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';

import { cn } from '@/utils';

const badgeVariants = cva(
    'inline-flex items-center  border font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
    {
        variants: {
            variant: {
                default:
                    'border-transparent bg-primary text-primary-foreground hover:bg-primary/80',
                secondary:
                    'border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80',
                destructive:
                    'border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80',
                outline: 'text-foreground',
                green: `border-transparent bg-green text-green-foreground`,
                lavender: `border-transparent bg-lavender text-lavender-foreground`,
                rose: `border-transparent bg-rose text-rose-foreground`,
                light_grey: `border-transparent bg-light_grey text-light_grey-foreground`,
                yellow: `border-transparent bg-yellow text-yellow-foreground`,
                blue: `border-transparent bg-blue text-blue-foreground`,
                orange: `border-transparent bg-orange text-orange-foreground`,
                teal: `border-transparent bg-teal text-teal-foreground`,
            },
            size: {
                default: 'text-xs px-2.5 py-0.25 rounded-full',
                xs: 'text-xs px-2.5 py-0.25 rounded-full',
                sm: 'text-sm px-2.5 py-0.25 rounded-full',
                lg: 'text-lg px-2.5 py-0.25 rounded-full',
            },
        },
        defaultVariants: {
            variant: 'default',
            size: 'default',
        },
    }
);

export interface BadgeProps
    extends React.HTMLAttributes<HTMLDivElement>,
        VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, size, ...props }: BadgeProps) {
    return (
        <div
            className={cn(badgeVariants({ variant, size }), className)}
            {...props}
        />
    );
}

export { Badge, badgeVariants };
