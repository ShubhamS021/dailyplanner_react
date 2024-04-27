import { type ContentSection } from '@/interfaces/HeroContents';

export const featureCards: ContentSection = {
    header: `components.featureCards.header`,
    subheader: `components.featureCards.subheader`,
    content: [
        {
            text: `components.featureCards.customBoards.text`,
            subtext: `components.featureCards.customBoards.subtext`,
            icon: 'customBoards',
        },
        {
            text: `components.featureCards.tags.text`,
            subtext: `components.featureCards.tags.subtext`,
            icon: 'tags',
        },
        {
            text: `components.featureCards.supabase.text`,
            subtext: `components.featureCards.supabase.subtext`,
            icon: 'supabase',
        },
    ],
};

export const features: ContentSection = {
    header: `Features`,
    subheader: `Why use Next Landing?`,
    image: `/features-img.webp`,
    content: [
        {
            text: `SEO Optimized`,
            subtext: `Improved website visibility on search engines`,
            icon: 'fileSearch',
        },
        {
            text: `Highly Performant`,
            subtext: `Fast loading times and smooth performance`,
            icon: 'barChart',
        },
        {
            text: `Easy Customizability`,
            subtext: `Change your content and layout with little effort`,
            icon: 'settings',
        },
    ],
};
