import { type LucideProps } from 'lucide-react';
import { type ForwardRefExoticComponent } from 'react';

export interface Content {
    text: string;
    subtext: string;
    icon?: ForwardRefExoticComponent<LucideProps>;
}

export interface ContentSection {
    header: string;
    subheader: string;
    image?: string;
    content: Content[];
}
