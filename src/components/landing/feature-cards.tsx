import { Card, CardDescription, CardTitle } from '@/ui/card';
import { BsCardImage } from 'react-icons/bs';
import { featureCards } from './config/contents';
import HeadingText from './heading-text';

export default function FeatureCards() {
    return (
        <section className="bg-slate-50 dark:bg-slate-900">
            <div className="container space-y-8 py-12 text-center lg:py-20">
                {featureCards.header || featureCards.subheader ? (
                    <HeadingText subtext={featureCards.subheader}>
                        {featureCards.header}
                    </HeadingText>
                ) : null}
                <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                    {featureCards.content.map((cards) => {
                        return (
                            <Card
                                key={cards.text}
                                className="flex flex-grow flex-col items-center justify-between gap-4 p-8 dark:bg-secondary"
                            >
                                <div className="flex">
                                    <BsCardImage></BsCardImage>
                                </div>
                                <div className="space-y-2">
                                    <CardTitle>{cards.text}</CardTitle>
                                    <CardDescription>
                                        {cards.subtext}
                                    </CardDescription>
                                </div>
                            </Card>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
