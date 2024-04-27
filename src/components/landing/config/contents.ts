import { type ContentSection } from '@/interfaces/HeroContents';
import {
    Clock1,
    GlobeLock,
    Palette,
    Save,
    SquareKanban,
    Tag,
} from 'lucide-react';

export const featureCards: ContentSection = {
    header: `components.featureCards.header`,
    subheader: `components.featureCards.subheader`,
    content: [
        {
            text: `components.featureCards.customBoards.text`,
            subtext: `components.featureCards.customBoards.subtext`,
            icon: SquareKanban,
        },
        {
            text: `components.featureCards.tags.text`,
            subtext: `components.featureCards.tags.subtext`,
            icon: Tag,
        },
        {
            text: `components.featureCards.supabase.text`,
            subtext: `components.featureCards.supabase.subtext`,
            icon: GlobeLock,
        },
    ],
};

export const features: ContentSection = {
    header: `components.features.header`,
    subheader: `components.features.subheader`,
    image: `/landing.png`,
    content: [
        {
            text: `components.features.feature-flexibility.text`,
            subtext: `components.features.feature-flexibility.subtext`,
            icon: Palette,
        },
        {
            text: `components.features.feature-data.text`,
            subtext: `components.features.feature-data.subtext`,
            icon: Save,
        },
        {
            text: `components.features.feature-history.text`,
            subtext: `components.features.feature-history.subtext`,
            icon: Clock1,
        },
    ],
};
