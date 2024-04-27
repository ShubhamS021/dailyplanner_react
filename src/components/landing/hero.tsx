import { usePageStore } from '@/hooks/usePageStore/usePageStore';
import { buttonVariants } from '@/ui/button';
import { cn } from '@/utils';
import { useTranslation } from 'react-i18next';
import { BoardIllustration } from './assets/BoardIllustration';

export const Hero = () => {
    const { t } = useTranslation();
    const [setPage] = usePageStore((state) => [state.setPage]);

    return (
        <section className="container flex flex-col gap-4 pb-12 pt-4 text-center lg:items-center lg:gap-8 lg:py-20">
            <div className="flex flex-1 flex-col items-center gap-4 text-center lg:gap-8">
                <div className="space-y-4">
                    <h1 className="text-4xl font-bold lg:text-6xl">
                        {t('components.landing.hero.header')}
                    </h1>
                    <h2 className="text-lg font-light text-muted-foreground lg:text-3xl">
                        {t('components.landing.hero.subheader')}
                    </h2>
                </div>
                <button
                    onClick={() => setPage('boardCreatePage')}
                    className={`w-[10rem] ${cn(buttonVariants({ size: 'lg' }))}`}
                >
                    {t('components.landing.hero.cta')}
                </button>
            </div>
            <div className="flex flex-1 justify-center lg:justify-end">
                {BoardIllustration}
            </div>
        </section>
    );
};
