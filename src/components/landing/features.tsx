import { useTranslation } from 'react-i18next';
import { features } from './config/contents';
import { HeadingText } from './heading-text';

export const Features = () => {
    const { t } = useTranslation();
    return (
        <section className="container space-y-8 py-12 lg:py-20" id="features">
            {features.header.length > 0 || features.subheader.length > 0 ? (
                <HeadingText
                    subtext={t(features.subheader)}
                    className="text-center"
                >
                    {t(features.header)}
                </HeadingText>
            ) : null}
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                <div className="grid grid-cols-1 gap-8">
                    {features.content.map((cards) => {
                        return (
                            <div
                                key={cards.text}
                                className="flex flex-col items-center gap-2 text-center md:flex-row md:gap-8 md:text-left"
                            >
                                <div className="flex">
                                    {cards.icon != null && <cards.icon />}
                                </div>
                                <div className="flex-1">
                                    <p className="md:text4xl text-2xl font-semibold">
                                        {t(cards.text)}
                                    </p>
                                    <p className="font-light text-muted-foreground md:text-lg">
                                        {t(cards.subtext)}
                                    </p>
                                </div>
                            </div>
                        );
                    })}
                </div>
                <div
                    className="md:border"
                    style={{
                        backgroundImage: `url(${features.image})`,
                        backgroundRepeat: `no-repeat`,
                        backgroundSize: `cover`,
                    }}
                ></div>
            </div>
        </section>
    );
};
