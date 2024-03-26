import { type ContentSection } from '@/interfaces/HeroContents';

export const featureCards: ContentSection = {
    header: `Powered by`,
    subheader: `What makes Next Landing possible`,
    content: [
        {
            text: `Next.js`,
            subtext: `The React Framework`,
            icon: 'nextjs',
        },
        {
            text: `shadcn/ui`,
            subtext: `Beautifully designed components`,
            icon: 'shadcnUi',
        },
        {
            text: `Vercel`,
            subtext: `Develop. Preview. Ship.`,
            icon: 'vercel',
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
